async function doMakeImage(task) {
    if (task.stopped) {
        return
    }

    const reqBody = task.reqBody
    const batchCount = task.batchCount
    const outputContainer = document.createElement('div')

    outputContainer.className = 'img-batch'
    task.outputContainer.appendChild(outputContainer)

    const outputMsg = task['outputMsg']
    const previewPrompt = task['previewPrompt']
    const progressBar = task['progressBar']

    let res = undefined
    try {
        const lastTask = serverState.task
        let renderRequest = undefined
        do {
            res = await fetch('/render', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(reqBody)
            })
            renderRequest = await res.json()
            // status_code 503, already a task running.
        } while (renderRequest.status_code === 503 && await asyncDelay(30 * 1000))
        if (typeof renderRequest?.stream !== 'string') {
            console.log('Endpoint response: ', renderRequest)
            throw new Error('Endpoint response does not contains a response stream url.')
        }
        task['taskStatusLabel'].innerText = "Waiting"
        task['taskStatusLabel'].classList.add('waitingTaskLabel')
        task['taskStatusLabel'].classList.remove('activeTaskLabel')

        do { // Wait for server status to update.
            await asyncDelay(250)
            if (!isServerAvailable()) {
                throw new Error('Connexion with server lost.')
            }
        } while (serverState.time > (Date.now() - (10 * 1000)) && serverState.task !== renderRequest.task)
        if (serverState.session !== 'pending' && serverState.session !== 'running' && serverState.session !== 'buffer') {
            if (serverState.session === 'stopped') {
                return false
            }

            throw new Error('Unexpected server task state: ' + serverState.session || 'Undefined')
        }
        while (serverState.task === renderRequest.task && serverState.session === 'pending') {
            // Wait for task to start on server.
            await asyncDelay(1500)
        }

        // Task started!
        res = await fetch(renderRequest.stream, {
            headers: {
                'Content-Type': 'application/json'
            },
        })

        task['taskStatusLabel'].innerText = "Processing"
        task['taskStatusLabel'].classList.add('activeTaskLabel')
        task['taskStatusLabel'].classList.remove('waitingTaskLabel')

        let stepUpdate = undefined
        let reader = res.body.getReader()
        let textDecoder = new TextDecoder()
        let finalJSON = ''
        let readComplete = false
        while (!readComplete || finalJSON.length > 0) {
            let t = Date.now()
            let jsonStr = ''
            if (!readComplete) {
                const {value, done} = await reader.read()
                if (done) {
                    readComplete = true
                }
                if (value) {
                    jsonStr = textDecoder.decode(value)
                }
            }
            stepUpdate = undefined
            try {
                // hack for a middleman buffering all the streaming updates, and unleashing them on the poor browser in one shot.
                // this results in having to parse JSON like {"step": 1}{"step": 2}{"step": 3}{"ste...
                // which is obviously invalid and can happen at any point while rendering.
                // So we need to extract only the next {} section
                if (finalJSON.length > 0) {
                    // Append new data when required
                    if (jsonStr.length > 0) {
                        jsonStr = finalJSON + jsonStr
                    } else {
                        jsonStr = finalJSON
                    }
                    finalJSON = ''
                }
                // Find next delimiter
                let lastChunkIdx = jsonStr.indexOf('}{')
                if (lastChunkIdx !== -1) {
                    finalJSON = jsonStr.substring(0, lastChunkIdx + 1)
                    jsonStr = jsonStr.substring(lastChunkIdx + 1)
                } else {
                    finalJSON = jsonStr
                    jsonStr = ''
                }
                // Try to parse
                stepUpdate = (finalJSON.length > 0 ? JSON.parse(finalJSON) : undefined)
                finalJSON = jsonStr
            } catch (e) {
                if (e instanceof SyntaxError && !readComplete) {
                    finalJSON += jsonStr
                } else {
                    throw e
                }
            }
            if (typeof stepUpdate === 'object' && 'step' in stepUpdate) {
                let batchSize = stepUpdate.total_steps
                let overallStepCount = stepUpdate.step + task.batchesDone * batchSize
                let totalSteps = batchCount * batchSize
                let percent = 100 * (overallStepCount / totalSteps)
                percent = (percent > 100 ? 100 : percent)
                percent = percent.toFixed(0)
                let timeTaken = stepUpdate.step_time // sec

                let stepsRemaining = totalSteps - overallStepCount
                stepsRemaining = (stepsRemaining < 0 ? 0 : stepsRemaining)
                let timeRemaining = (timeTaken === -1 ? '' : stepsRemaining * timeTaken * 1000) // ms

                outputMsg.innerHTML = `Batch ${task.batchesDone+1} of ${batchCount}`
                outputMsg.innerHTML += `. Generating image(s): ${percent}%`

                timeRemaining = (timeTaken !== -1 ? millisecondsToStr(timeRemaining) : '')
                outputMsg.innerHTML += `. Time remaining (approx): ${timeRemaining}`
                outputMsg.style.display = 'block'

                if (stepUpdate.output !== undefined) {
                    showImages(reqBody, stepUpdate, outputContainer, true)
                }
            }
            if (stepUpdate?.status) {
                break
            }
            if (readComplete && finalJSON.length <= 0) {
                if (res.status === 200) {
                    await asyncDelay(1000)
                    res = await fetch(renderRequest.stream, {
                        headers: {
                            'Content-Type': 'application/json'
                        },
                    })
                    reader = res.body.getReader()
                    readComplete = false
                } else {
                    console.log('Stream stopped: ', res)
                }
            }
        }

        if (typeof stepUpdate === 'object' && stepUpdate.status !== 'succeeded') {
            let msg = ''
            if ('detail' in stepUpdate && typeof stepUpdate.detail === 'string' && stepUpdate.detail.length > 0) {
                msg = stepUpdate.detail
                if (msg.toLowerCase().includes('out of memory')) {
                    msg += `<br/><br/>
                            <b>Suggestions</b>:
                            <br/>
                            1. If you have set an initial image, please try reducing its dimension to ${MAX_INIT_IMAGE_DIMENSION}x${MAX_INIT_IMAGE_DIMENSION} or smaller.<br/>
                            2. Try disabling the '<em>Turbo mode</em>' under '<em>Advanced Settings</em>'.<br/>
                            3. Try generating a smaller image.<br/>`
                }
            } else {
                msg = `Unexpected Read Error:<br/><pre>StepUpdate: ${JSON.stringify(stepUpdate, undefined, 4)}</pre>`
            }
            logError(msg, res, outputMsg)
            return false
        }
        if (typeof stepUpdate !== 'object' || !res || res.status != 200) {
            if (!isServerAvailable()) {
                logError("Stable Diffusion is still starting up, please wait. If this goes on beyond a few minutes, Stable Diffusion has probably crashed. Please check the error message in the command-line window.", res, outputMsg)
            } else if (typeof res === 'object') {
                let msg = 'Stable Diffusion had an error reading the response: '
                try { // 'Response': body stream already read
                    msg += 'Read: ' + await res.text()
                } catch(e) {
                    msg += 'Unexpected end of stream. '
                }
                if (finalJSON) {
                    msg += 'Buffered data: ' + finalJSON
                }
                logError(msg, res, outputMsg)
            } else {
                let msg = `Unexpected Read Error:<br/><pre>Response: ${res}<br/>StepUpdate: ${typeof stepUpdate === 'object' ? JSON.stringify(stepUpdate, undefined, 4) : stepUpdate}</pre>`
                logError(msg, res, outputMsg)
            }
            progressBar.style.display = 'none'
            return false
        }

        lastPromptUsed = reqBody['prompt']
        showImages(reqBody, stepUpdate, outputContainer, false)
    } catch (e) {
        console.log('request error', e)
        logError('Stable Diffusion had an error. Please check the logs in the command-line window. <br/><br/>' + e + '<br/><pre>' + e.stack + '</pre>', res, outputMsg)
        setStatus('request', 'error', 'error')
        progressBar.style.display = 'none'
        return false
    }
    return true
}

function makeImage() {
    if (!isServerAvailable()) {
        alert('The server is not available.')
        return
    }
    const taskTemplate = getCurrentUserRequest()
    const newTaskRequests = []
    getPrompts().forEach((prompt) => newTaskRequests.push(Object.assign({}, taskTemplate, {
        reqBody: Object.assign({ prompt: prompt }, taskTemplate.reqBody)
    })))
    newTaskRequests.forEach(createTask)

    initialText.style.display = 'none'
}