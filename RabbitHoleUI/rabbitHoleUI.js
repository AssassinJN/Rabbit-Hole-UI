var textOutput = document.querySelector('#textOutput');
var imageOutput = document.querySelector('#imageOutput');
var newBatchButton = document.querySelector('#newBatch');
var newTestButton = document.querySelector('#newTest');

let tempToday = new Date()
const offset = tempToday.getTimezoneOffset()
tempToday = new Date(tempToday.getTime() - (offset*60*1000))
let today = tempToday.toISOString().split('T')[0]

let models = []
let gfpgans = []
let hypernetworks = []
let vaes = []
 
const RABBIT_HOLE_ID = 'rh-'+today

async function startServer() {
    if(document.getElementById('session_id').value){
        SD.sessionId = document.getElementById('session_id').value;
    }else{
        SD.sessionId = RABBIT_HOLE_ID
    }
    await SD.init()
    //console.log(SD)
}



function rhSetup(){
    rhLoadModels()
    startServer()
    setBeta()
    setup()
}


function loadDefaults() {
    
    let taskSettings = {
        "prompt" : document.getElementById('prompt').value,
        "negative_prompt" : document.getElementById('negative_prompt').value,
        "width" : parseInt(document.getElementById('width').value),
        "height" : parseInt(document.getElementById('height').value),
        "num_inference_steps" : parseInt(document.getElementById('num_inference_steps').value),
        "show_only_filtered_image" : document.getElementById('show_only_filtered_image').value == 'true',
        "use_face_correction" : document.getElementById('use_face_correction').value,
        "use_upscale" : document.getElementById('use_upscale').value,
        "use_hypernetwork_model" : document.getElementById('use_hypernetwork_model').value,
        "use_vae_model" : document.getElementById('use_vae_model').value,
        //"session_id" : RABBIT_HOLE_ID, //document.getElementById('session_id').value,
        "seed" : parseInt(document.getElementById('seed').value),
        "sampler_name" : document.getElementById('sampler_name').value,
        "use_stable_diffusion_model" : document.getElementById('use_stable_diffusion_model').value,
        "guidance_scale" : Math.round(parseFloat(document.getElementById('guidance_scale').value)*10)/10,
        "output_quality" : parseInt(document.getElementById('output_quality').value),
        "save_to_disk_path" : document.getElementById('save_to_disk_path').value,
        "metadata_output_format" : document.getElementById('metadata_output_format').value,
    }
    if(taskSettings.seed == 0){
        taskSettings.seed = 'random'
    }
    let randoms = [];
    if(taskSettings.seed == 'random'){
        taskSettings.seed = Math.floor(Math.random() * 1000000);
        randoms.push('seed')
    }
    if(taskSettings.sampler_name == "random"){
        let samplerOptions = document.querySelectorAll('#sampler_name option')
        let samplerIndex = Math.floor(Math.random() * (samplerOptions.length - 1))+1
        taskSettings.sampler_name = samplerOptions.item(samplerIndex).value
        randoms.push('sampler_name')
    }
    taskSettings.randoms = randoms;
    
    return taskSettings;
}

function asyncDelay(timeout) {
    timeout = timeout * 1000
    return new Promise(function(resolve, reject) {
        setTimeout(resolve, timeout, true)
    })
}

async function render(renderType, inputTask, batchID)  {
    if(inputTask){
        var task = inputTask
    } else {
        var task = loadDefaults(batchID);
    }
    textOutput.querySelector('#t'+batchID+' .batchDetails .collapsible').innerHTML = toHTML(task, 'batch')
    if(renderType == 'test'){
        task.use_upscale = '';
        task.use_face_correction = '';
        task.output_quality = 50,
        task.save_to_disk_path = '';
    }else if(renderType == 'outOfMemory'){
        var hwratio = task.height/task.width;
        if(task.height>=task.width){
            task.width = task.width/64 - 1
            task.height = Math.round(task.width*hwratio)
        }else{
            task.height = task.height/64 - 1
            task.width = Math.round(task.height/hwratio)
        }
        task.width = task.width*64
        task.height = task.height*64
    }
    let error = ""
    if(document.getElementById('session_id').value){
        SD.sessionId = document.getElementById('session_id').value;
    }else{
        SD.sessionId = RABBIT_HOLE_ID
    }
    const requestID = "i_" + new Date().getTime()
    const imageStatus = document.createElement("div")
    imageStatus.classList.add('imageStatus')
    imageStatus.id=requestID
    imageStatus.innerHTML = "Waiting in Queue..."
    let batchContainer = document.getElementById('t'+batchID)
    batchContainer.querySelector('.collapsible').append(imageStatus);
    let result = await SD.render({
        "prompt": task.prompt,
        "negative_prompt": task.negative_prompt,
        "width": task.width,
        "height": task.height,
        "num_inference_steps": task.num_inference_steps,
        "show_only_filtered_image": task.show_only_filtered_image,
        "use_face_correction": task.use_face_correction,
        "use_upscale": task.use_upscale,
        "use_hypernetwork_model" : task.use_hypernetwork_model,
        "use_vae_model" : task.use_vae_model,
        "session_id": task.session_id,
        "request_id": requestID,
        "seed": task.seed,
        "sampler_name": task.sampler_name,
        "use_stable_diffusion_model": task.use_stable_diffusion_model,
        "guidance_scale": task.guidance_scale,
        "output_quality": task.output_quality,
        "save_to_disk_path": task.save_to_disk_path,
        "metadata_output_format": task.metadata_output_format,
        "stream_image_progress": false
        }, function(event) {
            console.log(event)
            if ('update' in event) {
                const stepUpdate = event.update
            
                if(stepUpdate.step){
                    imageStatus.innerHTML = 'Rendering...<span style="float:right;">'+stepUpdate.step + ' of ' + stepUpdate.total_steps + '</span>';
                    imageStatus.setAttribute('style','--img-done: '+(stepUpdate.step/stepUpdate.total_steps))
                }else if(stepUpdate.status == 'succeeded'){
                    imageStatus.innerHTML = 'Render Complete <span class="f-right"><img width="15" class="arrow" src="images/down-arrow.svg"></span><br/><div class="collapsible">'+ toHTML(task, 'image') +'</div>';
                    imageStatus.addEventListener('click', collapseToggle)
                    imageStatus.setAttribute('style','--img-done: 1')
                    imageStatus.classList.add('done')
                    batchContainer.querySelector('.count').innerHTML = batchContainer.querySelectorAll('.imageStatus.done').length
                }

                if(stepUpdate.status == 'failed'){
                    if(stepUpdate.detail.includes('CUDA out of memory.')){
                        console.log('out of memory error, try again')
                        error = "outOfMemory"
                    }else{
                        imageStatus.innerHTML = 'Render Failed <span class="f-right"><img width="15" class="arrow" src="images/down-arrow.svg"></span><br/><div class="collapsible">'+ toHTML(task) +'</div>';
                        imageStatus.addEventListener('click', collapseToggle)
                    }
                }
            }
        })
        
    if(error == "outOfMemory"){
        return(render('outOfMemory',task))
    }
    //recordTask(task, 'history')
    console.log(result)

    return(result)
}

function recordTask(task, type){
    
    if(type == 'history'){
        
        //console.log(tempToday)
        //RabbitHoleUI.taskHistory.requestID = task
    }
}

function newRenderBatch(renderType){
    const requestID = "b_"+ new Date().getTime()
    const imgContainer = document.createElement("div")
    imgContainer.classList.add('active', 'batchContainer')
    imgContainer.id = 'i'+requestID
    imgContainer.tabIndex = 1
    imgContainer.addEventListener('keydown', updateKeys)
    let removeImageContainer = imageOutput.querySelector('div.remove');
    if(removeImageContainer){removeImageContainer.remove();}
    let oldImageContainer = imageOutput.querySelector('div.active');
    imageOutput.appendChild(imgContainer);
    
    if(oldImageContainer){oldImageContainer.classList.remove('active');}
    let count = document.getElementById('image_count').value
    if(renderType == 'test'){
        count = 1
    }
    console.log('Image height: '+ parseInt(document.getElementById('height').value) + '\n Image Width: ' + parseInt(document.getElementById('width').value) +
    '\n Area Height: ' + imageOutput.clientHeight + '\n Area Width: ' + imageOutput.clientWidth)

    if(imageOutput.clientHeight < imageOutput.clientWidth){
        imgContainer.setAttribute('style','--img-width:'+(100/Math.ceil(imageOutput.clientWidth/imageOutput.clientHeight*2*(parseInt(document.getElementById('height').value)/parseInt(document.getElementById('width').value)))+"%;"));
    }else{
        imgContainer.setAttribute('style','--img-width:'+(100/Math.ceil(imageOutput.clientWidth/imageOutput.clientHeight*2*(parseInt(document.getElementById('width').value)/parseInt(document.getElementById('height').value)))+"%;"));
    }
    
    imgContainer.focus()
    const batchStatus = document.createElement("div")
    batchStatus.classList.add('batchStatus')
    batchStatus.id='t'+requestID
    batchStatus.innerHTML = '<div class="batchHeader"><a href="#" onclick="showBatch(\''+requestID+'\');event.stopPropagation();">Batch '+requestID+'</a><span class="f-right"><img width="15" class="arrow down" src="images/down-arrow.svg"></span><br/><div><small><span class="count">0</span> of '+count+' Image'+((count>1)?'s':'')+' done.</small></div></div><div class="collapsible show"></div>'
    batchStatus.addEventListener('click', collapseToggle)
    textOutput.prepend(batchStatus);
    const batchDetails = document.createElement("div")
    batchDetails.classList.add('batchDetails')
    batchDetails.innerHTML = 'Batch Settings<span class="f-right"><img width="15" class="arrow down" src="images/down-arrow.svg"></span><br/><div class="collapsible"></div>'
    batchDetails.addEventListener('click', collapseToggle)
    batchStatus.querySelector('.collapsible').append(batchDetails);
    highlightBatch(requestID)
    /*startNext = true
    for(let x = 1; x<=count; x++) {
        if(startNext){
            render(renderType, null, requestID)
            .then((serverReady) => {startNext = serverReady});
        }else{
            asyncDelay(10)
        }
        
    }   */
    for(let x = 1; x<=count; x++) {
        render(renderType, null, requestID)
        .then((result) => {
            console.log(result)
            const imgContainer = imageOutput.querySelector('#i'+batchID)
            let imgData = result.output.slice(-1);
            const img = document.createElement("div");
            img.classList.add('img')
            img.style.backgroundImage = "url('"+imgData[0].data+"')"
            imgContainer.appendChild(img);
            img.addEventListener('click', function(){this.classList.toggle('enlarge')})
        });
    }  
}


function saveImage(){
    let imgData = imageOutput.querySelector('div.active').style.backgroundImage
    imgData = imgData.substr(5)
    imgData = imgData.substr(0, imgData.length - 2)
    let fileCount = {}
    var todaysCount = 0

    if(localStorage.getItem('fileCount') === null){
        todaysCount = 0
    }else{
        fileCount = JSON.parse(localStorage.getItem('fileCount'))
        console.log(fileCount)
        todaysCount = parseInt(fileCount[today])
        console.log(todaysCount)
        todaysCount++
    }
    fileCount[today] = todaysCount
    console.log(fileCount)
    localStorage.setItem('fileCount', JSON.stringify(fileCount))
    const imgDownload = document.createElement('a')
    todaysCount = "00000"+todaysCount
    todaysCount = todaysCount.substring(-6)
    imgDownload.download = todaysCount+'.png'
    imgDownload.href = imgData
    console.log(imgDownload)
    imgDownload.click()
}

function showPromptEditor() {
    var promptEditor = document.getElementById('prompt-editor')
    promptEditor.classList.add('show')
}


function closeModal(event) {
    event.target.closest('.modal').classList.remove('show');
}

var promptInputs = document.querySelectorAll('#prompt-editor input, #prompt-editor textarea, #prompt-editor select')
promptInputs.forEach(input => {
    input.addEventListener('input', save);
    input.addEventListener('change', save);
});
newBatchButton.addEventListener('click', newRenderBatch);
newTestButton.addEventListener('click', function(){newRenderBatch('test')}, false);

function updateSelects(){
    if(gfpgans.length > 0){
    document.getElementById('use_face_correction').innerHTML = '<option>None</option>'
    gfpgans.forEach(gfpgan => {
        document.getElementById('use_face_correction').innerHTML += '<option value="'+gfpgan+'">'+gfpgan+'</option>'
    })}
    document.getElementById('use_face_correction').value = RabbitHoleUI.currentPrompt.use_face_correction

    document.getElementById('use_stable_diffusion_model').innerHTML = '<option>None</option>'
    models.forEach(model => {
        document.getElementById('use_stable_diffusion_model').innerHTML += '<option value="'+model+'">'+model+'</option>'
    })
    document.getElementById('use_stable_diffusion_model').value = RabbitHoleUI.currentPrompt.use_stable_diffusion_model

    document.getElementById('use_hypernetwork_model').innerHTML = '<option>None</option>'
    hypernetworks.forEach(hypernetwork => {
        document.getElementById('use_hypernetwork_model').innerHTML += '<option value="'+hypernetwork+'">'+hypernetwork+'</option>'
    })
    document.getElementById('use_hypernetwork_model').value = RabbitHoleUI.currentPrompt.use_hypernetwork_model

    document.getElementById('use_vae_model').innerHTML = '<option>None</option>'
    vaes.forEach(vae => {
        document.getElementById('use_vae_model').innerHTML += '<option value="'+vae+'">'+vae+'</option>'
    })
    document.getElementById('use_vae_model').value = RabbitHoleUI.currentPrompt.use_vae_model
}

async function rhLoadModels() {
    try {
        let res = await fetch('/get/models')
        const getmodels = await res.json()
        let modelOptions = getmodels['options']
        let stableDiffusionOptions = modelOptions['stable-diffusion']
        let gfpganOptions = modelOptions['gfpgan']
        let hypernetworkOptions = modelOptions['hypernetwork']
        let vaeOptions = modelOptions['vae']
        models = []
        gfpgans = []
        hypernetworks = []
        vaes = []
        stableDiffusionOptions.forEach(modelName => {
            if(Array.isArray(modelName)){
                modelName[1].forEach(subModel => {
                    models.push(modelName[0]+"/"+subModel);
                })
            } else {
                models.push(modelName);
            }
        })
        if(gfpganOptions){
        gfpganOptions.forEach(gfpganName => {
            if(Array.isArray(gfpganName)){
                gfpganName[1].forEach(subgfpgan => {
                    gfpgans.push(gfpganName[0]+"/"+subgfpgan);
                })
            } else {
                gfpgans.push(gfpganName);
            }
        })}
        if(hypernetworkOptions){
        hypernetworkOptions.forEach(hypernetworkName => {
            if(Array.isArray(hypernetworkName)){
                hypernetworkName[1].forEach(subhypernetwork => {
                    hypernetworks.push(hypernetworkName[0]+"/"+subhypernetwork);
                })
            } else {
                hypernetworks.push(hypernetworkName);
            }
        })}
        if(vaeOptions){
        vaeOptions.forEach(vaeName => {
            if(Array.isArray(vaeName)){
                vaeName[1].forEach(subvae => {
                    vaes.push(vaeName[0]+"/"+subvae);
                })
            } else {
                vaes.push(vaeName);
            }
        })}
        updateSelects();
    } catch (e) {
        console.log('get models error', e)
    }
}

async function setBeta(){
    /*if (!isServerAvailable()) {
        // logError('The server is still starting up..')
        const tryagain = setTimeout(setBeta, 3000)
        return false
    }*/
    try {
        let res = await fetch('/app_config', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'update_branch': "beta"
            })
        })
        res = await res.json()
    
        console.log('set config status response', res)
    } catch (e) {
        console.log('set config status error', e)
    }
}

function highlightBatch(batchID) {
    var batchStatusList = textOutput.querySelectorAll('.batchStatus')
    batchStatusList.forEach(function (node, currentIndex) {
        if(node.id == 't'+batchID){
            batchStatusList.item(currentIndex).classList.add('active')
        }else{
            batchStatusList.item(currentIndex).classList.remove('active')
        }
    })
}

function showBatch(batchID) {
    var batchList = imageOutput.querySelectorAll('.batchContainer')
    batchList.forEach(function (node, currentIndex) {
        if(node.id == 'i'+batchID){
            batchList.item(currentIndex).classList.add('active')
        }else{
            batchList.item(currentIndex).classList.remove('active')
        }
    })
    highlightBatch(batchID)
}

function nextBatch(){
    var batchList = imageOutput.querySelectorAll('.batchContainer')
    var batchIndex
    batchList.forEach(function (node, currentIndex) {
        if(node.classList.contains('active')){
            batchIndex = currentIndex
        }
    })
    batchList.item(batchIndex).classList.remove('active')
    if(batchIndex+1 < batchList.length){
        batchList.item(batchIndex+1).classList.add('active')
        highlightBatch(batchList[batchIndex+1].id.substring(1))
    }else{
        batchList.item(0).classList.add('active')
        highlightBatch(batchList[0].id.substring(1))
    }
    
}

function prevBatch(){
    var batchList = imageOutput.querySelectorAll('.batchContainer')
    var batchIndex
    batchList.forEach(function (node, currentIndex) {
        if(node.classList.contains('active')){
            batchIndex = currentIndex
        }
    })
    batchList.item(batchIndex).classList.remove('active')
    if(batchIndex-1 >= 0){
        batchList.item(batchIndex-1).classList.add('active')
        highlightBatch(batchList[batchIndex-1].id.substring(1))
    }else{
        batchList.item(batchList.length-1).classList.add('active')
        highlightBatch(batchList[batchList.length-1].id.substring(1))
    }
    
}

function nextImage(){
    var imageList = imageOutput.querySelectorAll('.active .img')
    var imageIndex
    imageList.forEach(function (node, currentIndex) {
        if(node.classList.contains('enlarge')){
            imageIndex = currentIndex
        }
    })
    imageList.item(imageIndex).classList.remove('enlarge')
    if(imageIndex+1 < imageList.length){
        imageList.item(imageIndex+1).classList.add('enlarge')
    }else{
        imageList.item(0).classList.add('enlarge')
    }
}

function prevImage(){
    var imageList = imageOutput.querySelectorAll('.active .img')
    var imageIndex
    imageList.forEach(function (node, currentIndex) {
        if(node.classList.contains('enlarge')){
            imageIndex = currentIndex
        }
    })
    imageList.item(imageIndex).classList.remove('enlarge')
    if(imageIndex-1 >= 0){
        imageList.item(imageIndex-1).classList.add('enlarge')
    }else{
        imageList.item(imageList.length-1).classList.add('enlarge')
    }
}

updateKeys = function(e){
    //set current key
    currentKey = e.keyCode
    var imageList = imageOutput.querySelectorAll('.active .img')
    var imageIndex
    imageList.forEach(function (node, currentIndex) {
        if(node.classList.contains('enlarge')){
            imageIndex = currentIndex
        }
    })
    
    if(imageIndex >= 0){ //zoomed in switch image
        if(currentKey == 37){
            prevImage()
        }else if(currentKey == 39){
            nextImage()
        }
    }else{ //zoomed out switch batch
        if(currentKey == 37){
            prevBatch()
        }else if(currentKey == 39){
            nextBatch()
        }
    }
}

function showLog(){
    textOutput.classList.toggle('show')
}

function collapseToggle(event) {
    this.querySelector('.collapsible').classList.toggle('show')
    this.querySelector('.arrow').classList.toggle('down')
    event.stopImmediatePropagation()
}

function toHTML(task, option){
    var output = ''
    for (const element in task) {
        if(option == 'batch'){
            if(!task.randoms.includes(element)){
                output += '<div class="key">'+element+'</div><div class="value">'+task[element]+'</div>';
            }
        }else if(option == 'image'){
            if(task.randoms.includes(element)){
                output += '<div class="key">'+element+'</div><div class="value">'+task[element]+'</div>';
            }   
        }else{
            output += '<div class="key">'+element+'</div><div class="value">'+task[element]+'</div>';
        }
    }
    return output
}

rhSetup();





//instance = new SD.RenderTask(eventInfo.reqBody || newTaskReqBody)


