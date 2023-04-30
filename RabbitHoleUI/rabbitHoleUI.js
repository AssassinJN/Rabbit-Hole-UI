var textOutput = document.querySelector('#textOutput')
var imageOutput = document.querySelector('#imageOutput')
var newBatchButton = document.querySelector('#newBatch')
var newTestButton = document.querySelector('#newTest')
var newHyperButton = document.querySelector('#newHyperImage')
var cancelQueueButton = document.querySelector('#cancelQueue')

let tempToday = new Date()
const offset = tempToday.getTimezoneOffset()
tempToday = new Date(tempToday.getTime() - (offset*60*1000))
let today = tempToday.toISOString().split('T')[0]
let queue = 'stopped'
let display_mode = document.getElementById('display_mode').value

let models = []
let gfpgans = []
let hypernetworks = []
let vaes = []
let loras = []
let tasks = []
 
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

    changeAppConfig({
        //'render_devices': getCurrentRenderDeviceSelection(),
        'update_branch': 'beta',
        //'ui_open_browser_on_start': uiOpenBrowserOnStartField.checked,
        //'listen_to_network': listenToNetworkField.checked,
        //'listen_port': listenPortField.value,
        'test_diffusers': document.getElementById('use_test_samplers').value
    })
    if(display_mode == "scroll"){imageOutput.classList.add('scrollMode')}
    startServer()
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
        "use_lora_model" : document.getElementById('use_lora_model').value,
        "lora_alpha" : Math.round(document.getElementById('lora_alpha').value)*.01,
        "hypernetwork_strength" : Math.round(document.getElementById('hypernetwork_strength').value)*.01,
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
        let samplerOptions = document.querySelectorAll('#sampler_name option:not([value="random"])')
        let samplerIndex = Math.floor(Math.random() * (samplerOptions.length))
        taskSettings.sampler_name = samplerOptions.item(samplerIndex).value
        randoms.push('sampler_name')
    }
    if(taskSettings.use_stable_diffusion_model == "random"){
        let modelOptions = document.querySelectorAll('#use_stable_diffusion_model option:not([value="random"])')
        let modelIndex = Math.floor(Math.random() * (modelOptions.length))
        taskSettings.use_stable_diffusion_model = modelOptions.item(modelIndex).value
        randoms.push('use_stable_diffusion_model')
    }
    taskSettings.randoms = randoms;
    
    return taskSettings;
}

function addTask(renderType, inputTask, batchID, imgID){
    if(inputTask){
        var task = inputTask
    } else {
        var task = loadDefaults(batchID);
    }
    task.batchID = batchID
    if(renderType == 'test'){
        task.use_upscale = ''
        task.use_face_correction = ''
        task.output_quality = 50
        task.save_to_disk_path = ''
        task.type = 'test'
    }
    if(renderType == 'hyper'){
        task.use_upscale = 'RealESRGAN_x4plus'
        task.upscale_amount = 4
        task.type = 'hyper'
    }
    if(document.getElementById('session_id').value){
        task.sessionId = document.getElementById('session_id').value;
    }else{
        task.sessionId = RABBIT_HOLE_ID
    }
    let prompts = document.getElementById('prompt').value.split("\n")
    prompts.forEach((prompt, index) => {
        if(prompt == ''){
            return
        }
        let newImgID = imgID + index
        let tempTask = { ...task }
        tempTask.imgID = newImgID
        tempTask.prompt = prompt
        textOutput.querySelector('#t'+batchID+' .batchDetails .collapsible').innerHTML = toHTML(tempTask, 'batch')
        let requestID = "ti_" + newImgID
        let imageStatus = document.createElement("div")
        imageStatus.classList.add('imageStatus', 'queued')
        imageStatus.id=requestID
        tempTask.requestID = requestID
        imageStatus.innerHTML = "Waiting in Queue..."
        let batchContainer = document.getElementById('t'+batchID)
        batchContainer.querySelector('.collapsible').append(imageStatus);
        tempTask.statusContainer = imageStatus
        if(prompts.length > 1){
            tempTask.randoms.push('prompt')
        }
        tasks[newImgID] = tempTask
    })
}

async function render(task)  {
    if(task.type == 'outOfMemory'){
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
        task.randoms.push('height')
        task.randoms.push('width')
    }else if (task.type == 'hyper'){
        task.save_to_disk_path = ''
    }
    let combinedPrompt = loadModelText(task.use_stable_diffusion_model)+loadModelText(task.use_hypernetwork_model)+loadModelText(task.use_vae_model)+loadModelText(task.use_lora_model)+task.prompt
    SD.sessionId = task.sessionId;
    let error = ""
    const result = await SD.render({
        "prompt": combinedPrompt,
        "negative_prompt": task.negative_prompt,
        "width": task.width,
        "height": task.height,
        "num_inference_steps": task.num_inference_steps,
        "show_only_filtered_image": task.show_only_filtered_image,
        "use_face_correction": task.use_face_correction,
        "use_upscale": task.use_upscale,
        "upscale_amount": task.upscale_amount,
        "use_hypernetwork_model" : task.use_hypernetwork_model,
        "use_vae_model" : task.use_vae_model,
        "use_lora_model" : task.use_lora_model,
        "session_id": task.session_id,
        "request_id": task.requestID,
        "seed": task.seed,
        "sampler_name": task.sampler_name,
        "use_stable_diffusion_model": task.use_stable_diffusion_model,
        "guidance_scale": task.guidance_scale,
        "output_quality": task.output_quality,
        "save_to_disk_path": task.save_to_disk_path,
        "metadata_output_format": task.metadata_output_format,
        "stream_image_progress": false,
        "original_prompt": task.original_prompt,
        "init_image": task.init_image,
        "prompt_strength": task.prompt_strength,
        "lora_alpha": task.lora_alpha,
        "hypernetwork_strength": task.hypernetwork_strength,
    }, function(event) {
        if ('update' in event) {
            const stepUpdate = event.update
            
            if(stepUpdate.step){
                task.statusContainer.innerHTML = 'Rendering...<span style="float:right;">'+stepUpdate.step + ' of ' + stepUpdate.total_steps + '</span>';
                task.statusContainer.setAttribute('style','--img-done: '+(stepUpdate.step/stepUpdate.total_steps))
            }else if(stepUpdate.status == 'succeeded' && task.type != 'hyper'){
                task.statusContainer.innerHTML = '<div class="header">Render Complete <span class="f-right"><img width="15" class="arrow" src="images/down-arrow.svg"></span></div><div class="collapsible">'+ toHTML(task, 'image') +'</div>';
                let buttonContainer = document.createElement('div')
                buttonContainer.classList.add('buttonContainer')
                let hyperButton = document.createElement("button")
                hyperButton.innerHTML = 'HyperSize'
                hyperButton.addEventListener('click', function(){addTask('hyper', task, task.batchID, task.imgID);loopBatch();})
                buttonContainer.append(hyperButton)
                task.statusContainer.querySelector('.collapsible').append(buttonContainer)
                task.statusContainer.querySelector('.header').addEventListener('click', collapseToggle)
                task.statusContainer.setAttribute('style','--img-done: 0')
                task.statusContainer.classList.add('done')
                let batchContainer = task.statusContainer.closest('.batchStatus')
                batchContainer.querySelector('.count').innerHTML = parseInt(batchContainer.querySelectorAll('.done').length)+' of '+parseInt(batchContainer.querySelectorAll('.imageStatus').length)+' images done.'
            }

            if(stepUpdate.status == 'failed'){
                if(stepUpdate.detail.includes('CUDA out of memory.')){
                    task.statusContainer.innerHTML = 'Out of Memory, trying again..'
                    task.statusContainer.setAttribute('style','--img-done: 0')
                    error = "outOfMemory"
                }else{
                    task.statusContainer.innerHTML = 'Render Failed <span class="f-right"><img width="15" class="arrow" src="images/down-arrow.svg"></span><br/><div class="collapsible">'+ toHTML(task) +'</div>';
                    task.statusContainer.addEventListener('click', collapseToggle)
                }
            }
        }
    })
    if(task.type == 'hyper'){
        let imgData = result.output.slice(-1);
        task.save_to_disk_path = document.getElementById('save_to_disk_path').value
        task.type = 'img2img'
        task.sampler_name = 'ddim';
        task.prompt_strength = Math.round(document.getElementById('prompt_strength').value)*.01;
        task.lora_alpha = Math.round(document.getElementById('lora_alpha').value)*.01;
        task.hypernetwork_strength = Math.round(document.getElementById('hypernetwork_strength').value)*.01;
        task.init_image = imgData[0].data;
        task.use_upscale = 'RealESRGAN_x4plus'
        task.upscale_amount = 4
        task.height = task.height * 4
        task.width = task.width * 4
        task.original_prompt = task.prompt
        task.use_lora_model = ''
        task.use_hypernetwork_model = ''
        /*if(maskSetting.checked == false){
            delete task.mask;
        }*/
        return(render(task))
    }
    if(error == "outOfMemory"){
        task.type = 'outOfMemory'
        return(render(task))
    }
    recordTask(task, 'history')
    
    return(result)
}

function recordTask(task, type){
    
    if(type == 'history'){
        
        //console.log(tempToday)
        //RabbitHoleUI.taskHistory.requestID = task
    }
}

function setRows(imgContainer){
    let count = imgContainer.querySelectorAll('div.img').length+1
    let rows = 1
    do {
        let imagesPerRow = count/rows
        let tempImageWidth = imageOutput.clientWidth/imagesPerRow
        let rowImageWidth = imageOutput.clientHeight/(rows+1)*document.getElementById('width').value/document.getElementById('height').value
        if(tempImageWidth < rowImageWidth){
            rows++
        }else{
            break
        }
    }while(rows < count)

    imgContainer.setAttribute('style','--img-width:'+(100/Math.ceil(count/rows))+"%;");
}

function newRenderBatch(renderType){
    const requestID = "b_"+ new Date().getTime()
    const imgContainer = document.createElement("div")
    imgContainer.classList.add('active', 'batchContainer')
    imgContainer.id = 'i'+requestID
    imgContainer.tabIndex = 1
    let removeImageContainer = imageOutput.querySelector('div.remove');
    if(removeImageContainer){removeImageContainer.remove();}
    let oldImageContainer = imageOutput.querySelector('div.active');
    imageOutput.appendChild(imgContainer);
    let count = document.getElementById('image_count').value
    if(oldImageContainer){oldImageContainer.classList.remove('active');}
    if(renderType == 'test' || renderType == 'hyper'){
        count = 1
    }
    

    //imgContainer.setAttribute('style','--img-width:'+(100/Math.floor(imageOutput.clientWidth/imageOutput.clientHeight*2*(parseInt(document.getElementById('height').value)/parseInt(document.getElementById('width').value)))+"%;"));
    imgContainer.focus()
    const batchStatus = document.createElement("div")
    batchStatus.classList.add('batchStatus')
    batchStatus.id='t'+requestID
    batchStatus.innerHTML = '<div class="batchHeader"><a href="#" onclick="showBatch(\''+requestID+'\');event.stopPropagation();">Batch '+requestID+'</a><span class="f-right"><img width="15" class="arrow down" src="images/down-arrow.svg"></span><br/><div><small><span class="count">0 of '+count+' Image'+((count>1)?'s':'')+' done.</span></small></div></div><div class="collapsible show"></div>'
    batchStatus.querySelector('.batchHeader').addEventListener('click', collapseToggle)
    textOutput.append(batchStatus);
    const batchDetails = document.createElement("div")
    batchDetails.classList.add('batchDetails')
    batchDetails.innerHTML = 'Batch Settings<span class="f-right"><img width="15" class="arrow down" src="images/down-arrow.svg"></span><br/><div class="collapsible"></div>'
    batchDetails.addEventListener('click', collapseToggle)
    batchStatus.querySelector('.collapsible').append(batchDetails);
    let removeButton = document.createElement("button")
    removeButton.innerHTML = 'Remove Batch'
    removeButton.classList.add('removeBatch')
    removeButton.addEventListener('click', function(){removeBatch(requestID);})
    batchDetails.append(removeButton)
    highlightBatch(requestID)
    let lastID 
    for(let x = 1; x<=count; x++) {
        let imgID = performance.now().toString().replace('.', 7)
        if(imgID == lastID){
            imgID = imgID + "1"
        }
        lastID = imgID
        addTask(renderType, null, requestID, imgID)
    }
    loopBatch()
}

function loopBatch(){
    if(queue == 'running'){
        return false
    }
    let activeTask = textOutput.querySelectorAll('.imageStatus.active')
    if(activeTask.length == 0){
        let activeTask = textOutput.querySelector('.imageStatus.queued')
        activeTask.classList.remove('queued')
        activeTask.classList.add('active')
        let imgID = activeTask.id.toString().substring(3)
        render(tasks[imgID])
        .then((taskResult) => {
            if(taskResult.output){
                setRows(imageOutput.querySelector('#i'+tasks[imgID].batchID))
                let imgData = taskResult.output.slice(-1);
                const img = document.createElement("div");
                img.classList.add('img')
                img.id = 'i_'+imgID
                img.style.backgroundImage = "url('"+imgData[0].data+"')"
                //img.style.width = 100/Math.floor(Math.ceil(Math.sqrt(count)),10)+"%"
                //img.style.height = 100/Math.floor(Math.ceil(Math.sqrt(count)),10)+"%"
                imageOutput.querySelector('#i'+tasks[imgID].batchID).appendChild(img);
                img.addEventListener('click', function(){focusImage(this)})
                img.addEventListener('mouseover', function(){
                    document.getElementById('ti_'+imgID).classList.add('highlight')
                })
                img.addEventListener('mouseout', function(){
                    document.getElementById('ti_'+imgID).classList.remove('highlight')
                })
                activeTask.classList.remove('active')
            }
            if (textOutput.querySelectorAll('.imageStatus.queued').length > 0) {
                setTimeout(loopBatch, document.getElementById('delay_between').value * 1000);
            }else{
                queue = 'stopped'
            }
        });
        
    }
   
}

function removeBatch(requestID) {
    let imageContainer = document.getElementById('i'+requestID)
    let statusContainer = document.getElementById('t'+requestID)
    imageContainer.parentNode.removeChild(imageContainer)
    statusContainer.parentNode.removeChild(statusContainer)
    nextBatch()
}

function cancelQueue() {
    let cancelList = textOutput.querySelectorAll('.queued')
    cancelList.forEach(task => {
        task.classList.replace('queued', 'cancelled')
        task.innerHTML = 'Cancelled.<button class="restartImageButton" onclick="restartImage(this)">Restart Image</button>'
    })
}

function restartImage(button){
    let task = button.parentNode;
    task.classList.replace('cancelled', 'queued')
    task.innerHTML = 'Waiting in Queue...'
    loopBatch()
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

function showSaveFavorite() {
    var saveFavoriteModal = document.getElementById('save-favorite')
    saveFavoriteModal.classList.add('show')
}
function showFavoriteModal() {
    closeModal()
    var favoriteManagerModal = document.getElementById('favorites-manager')
    favoriteManagerModal.classList.add('show')
    loadFavorites()
}
function showPromptEditor(fav) {
    closeModal()
    var promptEditor = document.getElementById('prompt-editor')
    promptEditor.classList.add('show')
    promptEditor.querySelector('.fav-title').textContent = fav
}
function showGeneralSettings() {
    closeModal()
    var generalSettings = document.getElementById('general-settings')
    generalSettings.classList.add('show')
}
function showModelManager() {
    closeModal()
    var modelManager = document.getElementById('model-manager')
    modelManager.classList.add('show')
    document.getElementById('txt_stable_diffusion').value = loadModelText(document.getElementById('txt_stable_diffusion_model').value).slice(0,-2)
    document.getElementById('txt_hypernetwork').value = loadModelText(document.getElementById('txt_hypernetwork_model').value).slice(0,-2)
    document.getElementById('txt_vae').value = loadModelText(document.getElementById('txt_vae_model').value).slice(0,-2)
    document.getElementById('txt_lora').value = loadModelText(document.getElementById('txt_lora_model').value).slice(0,-2)
}


function closeModal() {
    if(document.querySelector('.modal.show')){
        document.querySelector('.modal.show').classList.remove('show');
    }
}

var promptInputs = document.querySelectorAll('#prompt-editor input, #prompt-editor textarea, #prompt-editor select, #general-settings input')
promptInputs.forEach(input => {
    input.addEventListener('input', function(){
        document.querySelector('#prompt-editor .fav-title').textContent = ""
        save()
    });
    input.addEventListener('change', function(){
        document.querySelector('#prompt-editor .fav-title').textContent = ""
        save()
    });
});
var modelManagerInputs = document.querySelectorAll('#model-manager input')
modelManagerInputs.forEach(input => {
    input.addEventListener('input', save);
    input.addEventListener('change', save);
});
var modelManagerInputs = document.querySelectorAll('#model-manager select')
modelManagerInputs.forEach(input => {
    input.addEventListener('change', function(){
        modelText = loadModelText(this.value).slice(0,-2)
        target = this.id.slice(0, -6)
        document.getElementById('model-manager').querySelector('#'+target).value = modelText
    });
});

newBatchButton.addEventListener('click', newRenderBatch);
newTestButton.addEventListener('click', function(){newRenderBatch('test')}, false);
newHyperButton.addEventListener('click', function(){newRenderBatch('hyper')}, false);
cancelQueueButton.addEventListener('click', cancelQueue);

function updateSelects(){
    if(gfpgans.length > 0){
    document.getElementById('use_face_correction').innerHTML = '<option>None</option>'
    gfpgans.forEach(gfpgan => {
        document.getElementById('use_face_correction').innerHTML += '<option value="'+gfpgan+'">'+gfpgan+'</option>'
    })}
    document.getElementById('use_face_correction').value = RabbitHoleUI.currentPrompt.use_face_correction

    document.getElementById('use_stable_diffusion_model').innerHTML = '<option value="random">Random</option>'
    models.forEach(model => {
        document.getElementById('use_stable_diffusion_model').innerHTML += '<option value="'+model+'">'+model+'</option>'
        document.getElementById('txt_stable_diffusion_model').innerHTML += '<option value="'+model+'">'+model+'</option>'
    })
    document.getElementById('use_stable_diffusion_model').value = RabbitHoleUI.currentPrompt.use_stable_diffusion_model

    document.getElementById('use_hypernetwork_model').innerHTML = '<option>None</option>'
    hypernetworks.forEach(hypernetwork => {
        document.getElementById('use_hypernetwork_model').innerHTML += '<option value="'+hypernetwork+'">'+hypernetwork+'</option>'
        document.getElementById('txt_hypernetwork_model').innerHTML += '<option value="'+hypernetwork+'">'+hypernetwork+'</option>'
    })
    document.getElementById('use_hypernetwork_model').value = RabbitHoleUI.currentPrompt.use_hypernetwork_model

    document.getElementById('use_vae_model').innerHTML = '<option>None</option>'
    vaes.forEach(vae => {
        document.getElementById('use_vae_model').innerHTML += '<option value="'+vae+'">'+vae+'</option>'
        document.getElementById('txt_vae_model').innerHTML += '<option value="'+vae+'">'+vae+'</option>'
    })
    document.getElementById('use_vae_model').value = RabbitHoleUI.currentPrompt.use_vae_model

    document.getElementById('use_lora_model').innerHTML = '<option>None</option>'
    loras.forEach(lora => {
        document.getElementById('use_lora_model').innerHTML += '<option value="'+lora+'">'+lora+'</option>'
        document.getElementById('txt_lora_model').innerHTML += '<option value="'+lora+'">'+lora+'</option>'
    })
    document.getElementById('use_lora_model').value = RabbitHoleUI.currentPrompt.use_lora_model
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
        let loraOptions = modelOptions['lora']
        models = []
        gfpgans = []
        hypernetworks = []
        vaes = []
        loras = []
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
        if(loraOptions){
            loraOptions.forEach(loraName => {
                if(Array.isArray(loraName)){
                    loraName[1].forEach(sublora => {
                        loras.push(loraName[0]+"/"+sublora);
                    })
                } else {
                    loras.push(loraName);
                }
            })}
        updateSelects();
    } catch (e) {
        console.log('get models error', e)
    }
}

async function changeAppConfig(configDelta) {
    try {
        let res = await fetch('/app_config', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(configDelta)
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
            if(display_mode == 'scroll'){
                imageOutput.scrollTo(0, batchList.item(currentIndex).offsetTop);
            }
        }else{
            batchList.item(currentIndex).classList.remove('active')
        }
    })
    highlightBatch(batchID)
}

function nextBatch(){
    var batchList = imageOutput.querySelectorAll('.batchContainer')
    if(batchList.length == 0){return}
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
        if(display_mode == 'scroll'){
            imageOutput.scrollTo(0, batchList.item(batchIndex+1).offsetTop);
        }
    }else{
        batchList.item(0).classList.add('active')
        highlightBatch(batchList[0].id.substring(1))
        if(display_mode == 'scroll'){
            imageOutput.scrollTo(0, batchList.item(0).offsetTop);
        }
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
        if(display_mode == 'scroll'){
            imageOutput.scrollTo(0, batchList.item(batchIndex-1).offsetTop);
        }
    }else{
        batchList.item(batchList.length-1).classList.add('active')
        highlightBatch(batchList[batchList.length-1].id.substring(1))
        if(display_mode == 'scroll'){
            imageOutput.scrollTo(0, batchList.item(batchList.length-1).offsetTop);
        }
    }
    
}

function focusImage(img){
    let openStatuses = textOutput.querySelectorAll('.imageStatus .collapsible.show')
    openStatuses.forEach(target => {
        target.classList.remove('show')
    })
    let statusBlock = textOutput.querySelector('#t'+img.id+' .collapsible')
    if(img.classList.contains('enlarge')){
        statusBlock.classList.remove('show')
    }else{
        statusBlock.classList.add('show')
    }
    img.classList.toggle('enlarge')
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
        focusImage(imageList.item(imageIndex+1))
    }else{
        focusImage(imageList.item(0))
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
        focusImage(imageList.item(imageIndex-1))
    }else{
        focusImage(imageList.item(imageList.length-1))
    }
}

updateKeys = function(e){
    //set current key
    currentKey = e.keyCode
    if(e.target.tagName == "INPUT" || e.target.tagName == "TEXTAREA" || e.target.tagName == "SELECT"){
        return
    }
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
document.addEventListener('keydown', updateKeys)

function showLog(){
    
    if(textOutput.classList.contains('show')){
        textOutput.classList.remove('show')
        imageOutput.querySelector('.batchContainer.active').focus()
    }else{
        textOutput.classList.add('show')
    }
}

function collapseToggle(event) {
    this.parentElement.querySelector('.collapsible').classList.toggle('show')
    this.parentElement.querySelector('.arrow').classList.toggle('down')
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

function setDisplay(){
    display_mode = document.getElementById('display_mode').value
    if(display_mode.value == 'scroll'){
        imageOutput.classList.add('scrollMode')
    }else if (display_mode.value == 'page'){
        imageOutput.classList.remove('scrollMode')
    }
    
}

rhSetup();





//instance = new SD.RenderTask(eventInfo.reqBody || newTaskReqBody)


