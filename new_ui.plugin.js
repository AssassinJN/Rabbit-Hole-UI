const style = document.createElement('style');

style.textContent = `
	.UIButton, #preview.focused .ActionButton, .ActionButtonGallery {
		padding:5px 10px;
		background-color:var(--accent-color);
		margin-right:10px;
		display:inline-block;
	}
	.ActionButton {
		display:none;
	}
	#preview.focused .UIButton, #preview.focused .ActionButtonGallery {
		display:none;
	}

	.menuButton {
		display:none;
	}
	.menuButton {
		display:inline-block;
		font-size:2em;
		background:none;
	}

	#tab-content-wrapper{
		margin-top:58px;
	}
	#editor {
		width:500px;
		position:fixed;
		overflow-y: auto;
		overflow-x:hidden;
		margin-bottom:200px;
		height: calc(100vh - 58px);
		background:#444444;
		z-index:1000;
	}
	.img2imgOnly {
		display:none;
	}
	.notImg2img {
		display:revert;
	}
	#editor.img2img .img2imgOnly {
		display:revert;
	}
	#editor.img2img .notImg2img {
		display:none;
	}
	.hidden #editor {
		left:-500px;
	}
	#editor-modifiers {
		overflow-x:unset;
		overflow-y:unset;
	}
	#preview {
		margin-left:510px;
		margin-right:0;
		padding-left:0;
		padding-top:40px;
		min-height: calc(100vh - 270px);
		outline:none !important;
	}
	#preview-tools {
		position:fixed;
		top:62px;
		padding:8px 25px 8px 0;
		background:var(--background-color1);
		right:0;
		left:513px;
		z-index:100;
	}
	.hidden #preview {
		margin-left:0;
	}
	.model-list {
		max-width: 310px;
	}
	#footer {
		position:absolute;
		bottom:0;
		left:500px;
		right:0;
	}
	.hidden #footer {
		left:0;
	}
	#top-nav {
		position:fixed;
		width:100%;
		z-index:1000;
	}
	.hidden #preview-tools {
		left:3px;
	}
	#preview .collapsible-content {
		padding:0;
	}
	.minimalUI .imageTaskContainer {
		--grid_num: 3;
		border:1px solid rgba(128,128,128,0.3);
		padding:0;
		border-radius:0;
		display:inline-block;
		width:calc(99%/var(--grid_num));
		padding:3px;
		vertical-align:top;
		box-shadow:none;
		margin-bottom:0px;
	}
	.minimalUI .drag-handle {
		display:none;
	}
	.ZoomButton {
		display:none;
	}
	.minimalUI #preview:not(.focused) .ZoomButton {
		padding:5px 10px;
		margin:0 4px;
		display:inline-block;
	}
	.PrevNextBtn {
		display:none;
	}
	#preview.focused .PrevNextBtn {
		padding:5px 10px;
		margin:0 4px;
		display:inline-block;
	}

	.minimalUI .imageTaskContainer.condensed:not(.expanded) .img-batch {
		display:inline-block;
		width:calc(100%/6);
	}

	.minimalUI .imageTaskContainer.condensed:not(.expanded) .img-batch:first-child:nth-last-child(1) {
		width: 100%;
	}

	.minimalUI .imageTaskContainer.condensed:not(.expanded) .img-batch:first-child:nth-last-child(2) ~ .img-batch,
	.minimalUI .imageTaskContainer.condensed:not(.expanded) .img-batch:first-child:nth-last-child(2),
	.minimalUI .imageTaskContainer.condensed:not(.expanded) .img-batch:first-child:nth-last-child(3),
	.minimalUI .imageTaskContainer.condensed:not(.expanded) .img-batch:first-child:nth-last-child(3) ~ .img-batch,
	.minimalUI .imageTaskContainer.condensed:not(.expanded) .img-batch:first-child:nth-last-child(4),
	.minimalUI .imageTaskContainer.condensed:not(.expanded) .img-batch:first-child:nth-last-child(4) ~ .img-batch {
		width: 50%;
	}

	.minimalUI .imageTaskContainer.condensed:not(.expanded) .img-batch:first-child:nth-last-child(5),
	.minimalUI .imageTaskContainer.condensed:not(.expanded) .img-batch:first-child:nth-last-child(5) ~ .img-batch,
	.minimalUI .imageTaskContainer.condensed:not(.expanded) .img-batch:first-child:nth-last-child(6),
	.minimalUI .imageTaskContainer.condensed:not(.expanded) .img-batch:first-child:nth-last-child(6) ~ .img-batch,
	.minimalUI .imageTaskContainer.condensed:not(.expanded) .img-batch:first-child:nth-last-child(7),
	.minimalUI .imageTaskContainer.condensed:not(.expanded) .img-batch:first-child:nth-last-child(7) ~ .img-batch,
	.minimalUI .imageTaskContainer.condensed:not(.expanded) .img-batch:first-child:nth-last-child(8),
	.minimalUI .imageTaskContainer.condensed:not(.expanded) .img-batch:first-child:nth-last-child(8) ~ .img-batch,
	.minimalUI .imageTaskContainer.condensed:not(.expanded) .img-batch:first-child:nth-last-child(9),
	.minimalUI .imageTaskContainer.condensed:not(.expanded) .img-batch:first-child:nth-last-child(9) ~ .img-batch {
		width: 33.333%;
	}

	.minimalUI .imageTaskContainer.condensed:not(.expanded) .img-batch:first-child:nth-last-child(10),
	.minimalUI .imageTaskContainer.condensed:not(.expanded) .img-batch:first-child:nth-last-child(10) ~ .img-batch,
	.minimalUI .imageTaskContainer.condensed:not(.expanded) .img-batch:first-child:nth-last-child(11),
	.minimalUI .imageTaskContainer.condensed:not(.expanded) .img-batch:first-child:nth-last-child(11) ~ .img-batch,
	.minimalUI .imageTaskContainer.condensed:not(.expanded) .img-batch:first-child:nth-last-child(12),
	.minimalUI .imageTaskContainer.condensed:not(.expanded) .img-batch:first-child:nth-last-child(12) ~ .img-batch,
	.minimalUI .imageTaskContainer.condensed:not(.expanded) .img-batch:first-child:nth-last-child(13),
	.minimalUI .imageTaskContainer.condensed:not(.expanded) .img-batch:first-child:nth-last-child(13) ~ .img-batch,
	.minimalUI .imageTaskContainer.condensed:not(.expanded) .img-batch:first-child:nth-last-child(14),
	.minimalUI .imageTaskContainer.condensed:not(.expanded) .img-batch:first-child:nth-last-child(14) ~ .img-batch,
	.minimalUI .imageTaskContainer.condensed:not(.expanded) .img-batch:first-child:nth-last-child(15),
	.minimalUI .imageTaskContainer.condensed:not(.expanded) .img-batch:first-child:nth-last-child(15) ~ .img-batch,
	.minimalUI .imageTaskContainer.condensed:not(.expanded) .img-batch:first-child:nth-last-child(16),
	.minimalUI .imageTaskContainer.condensed:not(.expanded) .img-batch:first-child:nth-last-child(16) ~ .img-batch {
		width: 25%;
	}

	.minimalUI .imageTaskContainer.condensed:not(.expanded) .img-batch:first-child:nth-last-child(17),
	.minimalUI .imageTaskContainer.condensed:not(.expanded) .img-batch:first-child:nth-last-child(17) ~ .img-batch,
	.minimalUI .imageTaskContainer.condensed:not(.expanded) .img-batch:first-child:nth-last-child(18),
	.minimalUI .imageTaskContainer.condensed:not(.expanded) .img-batch:first-child:nth-last-child(18) ~ .img-batch,
	.minimalUI .imageTaskContainer.condensed:not(.expanded) .img-batch:first-child:nth-last-child(19),
	.minimalUI .imageTaskContainer.condensed:not(.expanded) .img-batch:first-child:nth-last-child(19) ~ .img-batch,
	.minimalUI .imageTaskContainer.condensed:not(.expanded) .img-batch:first-child:nth-last-child(20),
	.minimalUI .imageTaskContainer.condensed:not(.expanded) .img-batch:first-child:nth-last-child(20) ~ .img-batch,
	.minimalUI .imageTaskContainer.condensed:not(.expanded) .img-batch:first-child:nth-last-child(21),
	.minimalUI .imageTaskContainer.condensed:not(.expanded) .img-batch:first-child:nth-last-child(21) ~ .img-batch,
	.minimalUI .imageTaskContainer.condensed:not(.expanded) .img-batch:first-child:nth-last-child(22),
	.minimalUI .imageTaskContainer.condensed:not(.expanded) .img-batch:first-child:nth-last-child(22) ~ .img-batch,
	.minimalUI .imageTaskContainer.condensed:not(.expanded) .img-batch:first-child:nth-last-child(23),
	.minimalUI .imageTaskContainer.condensed:not(.expanded) .img-batch:first-child:nth-last-child(23) ~ .img-batch,
	.minimalUI .imageTaskContainer.condensed:not(.expanded) .img-batch:first-child:nth-last-child(24),
	.minimalUI .imageTaskContainer.condensed:not(.expanded) .img-batch:first-child:nth-last-child(24) ~ .img-batch,
	.minimalUI .imageTaskContainer.condensed:not(.expanded) .img-batch:first-child:nth-last-child(25),
	.minimalUI .imageTaskContainer.condensed:not(.expanded) .img-batch:first-child:nth-last-child(25) ~ .img-batch {
		width: 20%;
	}

	.imageTaskContainer .imgItemInfo {
		display:none;
		opacity:1;
	}

	#preview.focused.showActions .imageTaskContainer .imgItemInfo,
	#preview.showActionsGallery .imageTaskContainer .imgItemInfo,
	#preview.focused.hoverActions .imageTaskContainer .imgContainer:hover .imgItemInfo,
	#preview.hoverActionsGallery .imageTaskContainer .imgContainer:hover .imgItemInfo {
		display:flex;
	}
	#container.noGroupHover.minimalUI #preview.hoverActionsGallery .imageTaskContainer.condensed .imgContainer:hover .imgItemInfo {
		display:none;
	}

	@keyframes highlight {
	from {
		box-shadow: 0px 0px 10px 10px rgba(255,255,255,1);
	}
	to {
		box-shadow: 0px 0px 0px 0px rgba(255,255,255,1);
	}
	}
	.minimalUI .imgItem, .minimalUI .imgItem img {
		width:100%;
		height:auto;
		margin:0;
	}
	.highlightRing {
		animation: highlight 0.8s;
		z-index:100;
	}
	.minimalUI .imageTaskContainer .header-content {
		position:relative;
	}
	.minimalUI #preview:not(.focused) .imageTaskContainer .header-content .collapsible-handle,
	.minimalUI #preview:not(.focused) .imageTaskContainer .header-content .taskStatusLabel,
	.minimalUI #preview:not(.focused) .imageTaskContainer .header-content .secondaryButton,
	.minimalUI #preview:not(.focused) .imageTaskContainer .header-content .preview-prompt,
	.minimalUI #preview:not(.focused) .imageTaskContainer .header-content .taskConfig,
	.minimalUI #preview:not(.focused) .imageTaskContainer .header-content .outputMsg
	{
		display:none !important;
	}

	.minimalUI #preview:not(.focused) .imageTaskContainer .header-content button.useSettings,
	.minimalUI #preview:not(.focused) .imageTaskContainer .header-content button.stopTask {
		display:none;
	}

	#preview.focused .imageTaskContainer {
		display:none;
	}
	#preview.focused .imageTaskContainer.expanded {
		width:99%;
		display:block;
	}
	.minimalUI #preview.focused .imageTaskContainer.expanded .imgItem,
	.minimalUI #preview.focused .imageTaskContainer.expanded .imgItem img {
		height:auto;
		width:auto;
		max-width:100%;
		max-height:calc(100vh - 180px);
	}
	#preview.focused #clear-all-previews {
		display:none;
	}

	.tab-content {
		margin-bottom:200px;
	}

	@media screen and (max-width: 1349px) {
		.minimalUI #tab-content-wrapper {
			margin-top: 95px;
		}
		.minimalUI #preview-tools {
			top: 98px;
		}
		.minimalUI #tab-container {
			margin-top:5px;
		}
		#top-nav {
			flex-direction: column;
		}
	}
	@media screen and (max-width:700px){
		#editor {
			width: revert;
			position: revert;
			overflow: revert;
			margin: revert;
			height: revert;
		}
		#preview {
			margin-left: 0;
			padding-top:0;
			min-height:revert;
			margin-bottom:0;
		}
		#preview-tools {
			position:revert;
		}
		#preview-tools .auto-scroll {
			margin-top:10px;
			line-height:30px;
		}
		#footer {
			left:0;
		}
	}
	#newRabbitHoleBtn {
		width:98%;
		padding:10px;
		margin-top:10px;
	}
	#editor .simple-tooltip {
		right:0 !important;
		top:100% !important;
		left:unset !important;
		bottom:unset !important;
		transform: translate(0, -50%) !important;
	}
	#editor :hover > .simple-tooltip {
		transform: translate(0,0) !important;
	}
	#tab-content-settings {
		text-align:center;
	}
	#tab-content-settings .tab-content-inner {
		display:inline-block;
		vertical-align:top;
	}
	#calcMaxButton {
		border-radius: 0;
		background: none;
		margin-left: 5px;
		font-size: 1.1rem;
		vertical-align: middle;
	}
`;

document.head.appendChild(style);
document.getElementById('container').classList.add('minimalUI');
let rhModifiers = {}, models = [], gfpgans = [], hypernetworks = [], vaes = [], loras = [], customModifierList = [];
var editor = document.getElementById('editor');
var preview = document.getElementById('preview');
var GS_slider = document.getElementById('guidance_scale_slider');
var PS_slider = document.getElementById('prompt_strength_slider');
var LORA_slider = document.getElementById('lora_alpha_slider');
var HS_slider = document.getElementById('hypernetwork_strength_slider');
var imageTaskContainer = document.getElementsByClassName('imageTaskContainer');
let UIButton = document.createElement("button");
let ActionButtonGallery = document.createElement("button");
let ActionButton = document.createElement("button");
let menuButton = document.createElement("button");
let I2ICount = 5;
let useModifierCount = 0;
var settings = {
	galleryActions: 'hidden',
	actions: 'hover',
	zoom: 3,
	maxImagesToGenerate: 2,
	useSeeds: 0,
	scaleCount: 0,
	scaleStep: 0,
	scaleMid: 0,
	promptStrengthCount: 0,
	promptStrengthStep: 0,
	promptStrengthMid: 0,
	hyperStrengthCount: 0,
	hyperStrengthStep: 0,
	hyperStrengthMid: 0,
	loraAlphaCount: 0,
	loraAlphaStep: 0,
	loraAlphaMid: 0,
	ISCount: 0,
	ISStep: 0,
	ISMid: 0,
	useModels: 0,
	useGfpgans: 0,
	useHypernetworks: 0,
	useVaes: 0,
	useLoras: 0,
	useSamplers: 0,
	useCustomModifiers: 0,
	ISButton1: -20,
	ISButton2: -10,
	ISButton3: 10,
	ISButton4: 20,
	ISButton5: 40,
	GSButton1: -2.0,
	GSButton2: -1.0,
	GSButton3: 1.0,
	GSButton4: 2.0,
	GSButton5: 3.0,
	disable_hover_on_group: false,
	rabbitHoleOpen: false,
	useModifiers: {}
};

function save(){
	localStorage.setItem('settings', JSON.stringify(settings));
}
function load() {
	tempSettings = JSON.parse(localStorage.getItem('settings'));
	for(var key in tempSettings){
		if(key == 'useModifiers'){
			console.log(tempSettings[key])
			for(var mod in tempSettings[key]){
				
				settings[key][mod] = tempSettings[key][mod];
				console.log('mod',settings[key][mod],tempSettings[key][mod])
			}
		}else{
			settings[key] = tempSettings[key];
		}
		
	}
	console.log(tempSettings,settings)
}
function setup() {
	//If local storage doesn't exist, save a copy, else load existing.
	if(localStorage.getItem('settings') === null){
		save();
	}else{
		load();
	}
	rhLoadModels();
	rhLoadModifiers();
	updateZoom();
	addRabbitHoleSettings();
	addSettingsTabInfo();
	rh_makeButtons();
	loadCustomModifierList();
	rhLoadSamplers();
	
	//ActionButtonGallery
	if(settings.galleryActions === 'hidden'){
		ActionButtonGallery.innerHTML = "Actions: Hidden";
		preview.classList.remove('showActionsGallery','hoverActionsGallery');
	} else if(settings.galleryActions === 'visible'){
		ActionButtonGallery.innerHTML = "Actions: Visible";
		preview.classList.remove('hoverActionsGallery');
		preview.classList.add('showActionsGallery');
	} else if(settings.galleryActions === 'hover'){
		ActionButtonGallery.innerHTML = "Actions: Hover";
		preview.classList.remove('showActionsGallery');
		preview.classList.add('hoverActionsGallery');
	}
	//ActionButton
	if(settings.actions === 'hidden'){
		ActionButton.innerHTML = "Actions: Hidden";
		preview.classList.remove('showActions','hoverActions');
		preview.classList.add('hideActions');
	} else if(settings.actions === 'visible'){
		ActionButton.innerHTML = "Actions: Visible";
		preview.classList.remove('hideActions','hoverActions');
		preview.classList.add('showActions');
	} else if(settings.actions === 'hover'){
		ActionButton.innerHTML = "Actions: Hover";
		preview.classList.remove('hideActions', 'showActions');
		preview.classList.add('hoverActions');
	}
		//Disable hover actions on groups
	if(settings.disable_hover_on_group){
		document.getElementById('container').classList.add('noGroupHover');
		document.getElementById('disable_hover_on_group_input').checked = true;
	}
	document.querySelector('#reset-rh-settings').addEventListener('click', resetRH);
}

function resetRH(event){
	let rhinputs = document.querySelectorAll('#rabbit-settings-entries input');
	rhinputs.forEach(rhinput => {
		if(rhinput.id != 'useSeeds_input' && rhinput.id != 'maxImagesToGenerate_input'){
			rhinput.value = 0;
		}
	})
	event.stopPropagation();
}

function rh_makeButtons(){
	UIButton.innerHTML = "Show Classic View";
	UIButton.classList.add('UIButton');
	UIButton.addEventListener("click", function () {
		document.getElementById('container').classList.toggle('minimalUI');
		if(UIButton.innerHTML == "Show Classic View"){
			UIButton.innerHTML = "Show Gallery View";
		}else{
			UIButton.innerHTML = "Show Classic View";
		}
	});
	document.getElementsByClassName('auto-scroll')[0].prepend(UIButton);

	ActionButtonGallery.classList.add('ActionButtonGallery');
	ActionButtonGallery.addEventListener("click", function () {
		if(ActionButtonGallery.innerHTML == "Actions: Hidden"){
			ActionButtonGallery.innerHTML = "Actions: Visible";
			preview.classList.remove('hoverActionsGallery');
			preview.classList.add('showActionsGallery');
			settings.galleryActions = 'visible';
		}else if(ActionButtonGallery.innerHTML == "Actions: Visible"){
			ActionButtonGallery.innerHTML = "Actions: Hover";
			preview.classList.remove('showActionsGallery');
			preview.classList.add('hoverActionsGallery');
			settings.galleryActions = 'hover';
		}else{
			ActionButtonGallery.innerHTML = "Actions: Hidden";
			preview.classList.remove('showActionsGallery','hoverActionsGallery');
			settings.galleryActions = 'hidden';
		}
		save();
	});
	document.getElementsByClassName('auto-scroll')[0].prepend(ActionButtonGallery);
	ActionButton.classList.add('ActionButton');
	ActionButton.addEventListener("click", function () {
		if(ActionButton.innerHTML == "Actions: Hidden"){
			ActionButton.innerHTML = "Actions: Visible";
			preview.classList.remove('hideActions','hoverActions');
			preview.classList.add('showActions');
			settings.actions = 'visible';
		}else if(ActionButton.innerHTML == "Actions: Visible"){
			ActionButton.innerHTML = "Actions: Hover";
			preview.classList.remove('hideActions', 'showActions');
			preview.classList.add('hoverActions');
			settings.actions = 'hover';
		}else{
			ActionButton.innerHTML = "Actions: Hidden";
			preview.classList.remove('showActions','hoverActions');
			preview.classList.add('hideActions');
			settings.actions = 'hidden';
		}
		save();
	});
	document.getElementsByClassName('auto-scroll')[0].prepend(ActionButton);
	menuButton.innerHTML = "<i class='fa fa-bars'></i>";
	menuButton.classList.add('menuButton');
	menuButton.addEventListener("click", function () {
		document.getElementById('container').classList.toggle('hidden');
	});
	document.getElementById('logo').prepend(menuButton);
	let GridUP = document.createElement("button");
	GridUP.innerHTML = "Zoom <i class='fa fa-minus'></i>";
	GridUP.classList.add('ZoomButton');
	GridUP.addEventListener("click", function () {
		settings.zoom++;
		updateZoom();
	});
	document.getElementById('show-download-popup').after(GridUP);
	let GridDown = document.createElement("button");
	GridDown.innerHTML = "Zoom <i class='fa fa-plus'></i>";
	GridDown.classList.add('ZoomButton');
	GridDown.addEventListener("click", function () {
		if(settings.zoom > 1){
			settings.zoom--;
		}
		updateZoom();
	});
	GridUP.after(GridDown);

	let PrevBut = document.createElement("button");
	PrevBut.innerHTML = "<i class='fa fa-chevron-left'></i> Prev";
	PrevBut.classList.add('PrevNextBtn');
	PrevBut.addEventListener("click", function () {
		prevTask();
	});
	GridDown.after(PrevBut);

	let NextBut = document.createElement("button");
	NextBut.innerHTML = "Next <i class='fa fa-chevron-right'></i>";
	NextBut.classList.add('PrevNextBtn');
	NextBut.addEventListener("click", function () {
		nextTask();
	});
	PrevBut.after(NextBut);

	var stepList = [settings.ISButton1,settings.ISButton2,settings.ISButton3,settings.ISButton4,settings.ISButton5];
	let showLabel = false;
	let rhbuttons = [{ html: '<span>IS: </span>' }]
	stepList.forEach((count) => {
		if(count != 0){
			showLabel = true;
			rhbuttons.push(
				{ html: count, on_click: getStartNewTaskHandler(count, 'IS'), class: "is-button" }
			);
		}
	});
	if(showLabel){
		PLUGINS['IMAGE_INFO_BUTTONS'].push(rhbuttons)
	}
	var stepList = [settings.GSButton1,settings.GSButton2,settings.GSButton3,settings.GSButton4,settings.GSButton5];
	showLabel = false;
	rhbuttons = [{ html: '<span>GS: </span>' }]
	stepList.forEach((count) => {
		if(count != 0){
			showLabel = true;
			rhbuttons.push(
				{ html: count, on_click: getStartNewTaskHandler(count, 'GS'), class: "gs-button" }
			);
		}
	});
	if(showLabel){
		PLUGINS['IMAGE_INFO_BUTTONS'].push(rhbuttons)
	}
	
	var stepList = [5];
	stepList.forEach((count) => {
		if(count > 0){
			//PLUGINS['IMAGE_INFO_BUTTONS'].push({ text: "I2I Render "+count+"x", on_click: getStartNewTaskHandler(count, 'I2I') });
		}
	});
	PLUGINS["IMAGE_INFO_BUTTONS"].push({ text: "Draw RH Variants", on_click: startRequest });
}


for(let i = 0; i < imageTaskContainer.length; i++){
	if(imageTaskContainer[i].querySelector('.img-batch').length>1){
		imageTaskContainer[i].classList.add('condensed');
	}
}


var previewObserver = new MutationObserver(function (mutations) {
	mutations.forEach(function (mutation) {
		updateZoom();
		if(mutation.addedNodes.length>0 && mutation.addedNodes[0].classList){
			if(mutation.addedNodes[0].classList.contains('fa-trash-can')){
				mutation.target.addEventListener('click' , (event) => {
					preview.classList.remove('focused');
				});
			}
			if(mutation.addedNodes[0].classList.contains('imgItem')){
				let Xbutton = mutation.addedNodes[0].querySelector('.image_clear_btn')
				Xbutton.addEventListener('click' , (event) => {
					let focusedTaskContainer = preview.querySelector('.imageTaskContainer.expanded')
					if(focusedTaskContainer){
						let images = focusedTaskContainer.querySelectorAll('.imgItem')
						let count = 0
						images.forEach(
							function(node) {
								if(node.style.display != 'none'){
									count++
								}else{
									node.closest('.img-batch').remove()
								}
							}
						)
						if(count == 1){
							focusedTaskContainer.classList.remove('condensed')
						}
					}else{
						preview.classList.remove('focused')
					}					
				});
			}
		}
		if(mutation.target.className == 'img-batch'){
			var imageTaskContainer = mutation.target.closest('.imageTaskContainer');
			if(imageTaskContainer.querySelectorAll('.img-batch').length > 1){
				imageTaskContainer.classList.add('condensed');
			}
			cleanup(mutation.target);
		}
	})
})
previewObserver.observe((preview), {
	childList: true,
	subtree: true
})

var rh_initImagePreviewContainer = document.getElementById('init_image_preview_container');
var editorObserver = new MutationObserver(function (mutations) {
	mutations.forEach(function (mutation) {
		if(rh_initImagePreviewContainer.classList.contains('has-image')){
			editor.classList.add('img2img');
		}else{
			editor.classList.remove('img2img');
		}
	})
})
editorObserver.observe((rh_initImagePreviewContainer), {
	childList: false,
	attributes: true
})

var rh_modifierContainer = document.getElementById('editor-modifiers');
var modifierObserver = new MutationObserver(function (mutations) {
	mutations.forEach(function (mutation) {
		if(customModifierList[0] === "" || customModifierList.length == 0){document.getElementById('useCustomModifiersContainer').style.display = "none";}
		else{document.getElementById('useCustomModifiersContainer').style.display = "revert";}
	})
	console.log(customModifierList)
})
modifierObserver.observe((rh_modifierContainer), {
	childList: true,
	attributes: true,
	subtree: true
})



function scrollVisible(target){
	const yOffset = -175; 
	const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
	window.scrollTo({top: y, behavior: 'smooth'});
}

function cleanup(target) {
	var imageTaskContainer = target.parentNode.parentNode.parentNode;
	if(imageTaskContainer.dataset.i2irendersLeft > 0){
		var currentTaskInfo = getCurrentUserRequest();
		var newTaskRequest = buildRequest(imageTaskContainer.dataset.i2irendersLeft, 'I2I', currentTaskInfo.reqBody, imageTaskContainer.querySelector('img'));
		var taskID = createTask(newTaskRequest);
		
		var newTask = document.querySelector('#'+taskID);
		newTask.dataset.i2irendersLeft = newTaskRequest.steps;
		
		//getStartNewTaskHandler(imageTaskContainer.dataset.i2irendersLeft, 'I2I');
		//currentTaskInfo.reqBody, imageTaskContainer.querySelector('img'), 
	}
	var imageList = target.querySelectorAll('img');
	imageList.forEach(function (img) {
		img.addEventListener('click', (event) => {
			//imageTaskContainer.classList.toggle('condensed');
			imageTaskContainer.classList.toggle('expanded');
			preview.classList.toggle('focused');
			scrollVisible(img);
			img.classList.add('highlightRing');
			setTimeout(()=> img.classList.remove('highlightRing'), 800);
		});
	});
}

function updateZoom(){
	for(let i = 0; i < imageTaskContainer.length; i++){
		imageTaskContainer[i].setAttribute('style','--grid_num:'+settings.zoom);
	}
	save();
}

function nextTask(){
	imageTaskContainer = document.getElementsByClassName('imageTaskContainer');
	for(let i = 0; i < imageTaskContainer.length; i++){
		if(imageTaskContainer[i].classList.contains('expanded')){
			if((i+1)==(imageTaskContainer.length)){i = -1;}//loop around
			imageTaskContainer[i].classList.remove('expanded');
			imageTaskContainer[i+1].classList.add('expanded');
			break;
		}
	}
}
function prevTask(){
	imageTaskContainer = document.getElementsByClassName('imageTaskContainer');
	for(let i = 0; i < imageTaskContainer.length; i++){
		if(imageTaskContainer[i].classList.contains('expanded')){
			if(i==0){i=imageTaskContainer.length}//loop around
			imageTaskContainer[i].classList.remove('expanded');
			imageTaskContainer[i-1].classList.add('expanded');
			break;
		}
	}
}


preview.tabIndex = "1000";
preview.addEventListener("keydown", (event) => {
  if (event.isComposing || event.keyCode === 229) {
    return;
  } else if (event.keyCode === 39) {
	  nextTask();
  } else if (event.keyCode === 37) {
	  prevTask();
  } else if (event.keyCode === 27) {
	var expandedTask = document.getElementsByClassName('expanded')[0];
	if(expandedTask){
		expandedTask.classList.remove('expanded');
	}
	preview.classList.remove('focused');
  }
});


	function setSettings(){
		//Max Images
		settings.maxImagesToGenerate = parseInt(maxImagesToGenerate_input.value);
		settings.useSeeds = parseInt(useSeeds_input.value);
		//Guidance Scale Size, scaleCount is how many numbers you want to run, scaleStep is how far apart you want those numbers
		//Ex. Current Image is 7.5, count of 3, step of 1 would run 6.5, 7.5, 8.5
		//scaleMid allows you to overwrite the mid point of the numbers series, 0 will use current.
		settings.scaleCount = parseInt(scaleCount_input.value);
		settings.scaleStep = parseFloat(scaleStep_input.value);
		settings.scaleMid = parseFloat(scaleMid_input.value);
		settings.promptStrengthCount = parseInt(promptStrengthCount_input.value);
		settings.promptStrengthStep = parseFloat(promptStrengthStep_input.value);
		settings.promptStrengthMid = parseFloat(promptStrengthMid_input.value);
		settings.hyperStrengthCount = parseInt(hyperStrengthCount_input.value);
		settings.hyperStrengthStep = parseFloat(hyperStrengthStep_input.value);
		settings.hyperStrengthMid = parseFloat(hyperStrengthMid_input.value);
		settings.loraAlphaCount = parseInt(loraAlphaCount_input.value);
		settings.loraAlphaStep = parseFloat(loraAlphaStep_input.value);
		settings.loraAlphaMid = parseFloat(loraAlphaMid_input.value);
		//Inference Steps, works the same as Guidance Scale
		settings.ISCount = parseInt(ISCount_input.value);
		settings.ISStep = parseInt(ISStep_input.value);
		settings.ISMid = parseInt(ISMid_input.value);
		settings.useModels = parseInt(useModels_input.value);
		settings.useGfpgans = parseInt(useGfpgans_input.value);
		settings.useHypernetworks = parseInt(useHypernetworks_input.value);
		settings.useVaes = parseInt(useVaes_input.value);
		settings.useLoras = parseInt(useLoras_input.value);
		settings.useSamplers = parseInt(useSamplers_input.value);
		
		
		rhLoadModifiers();
		loadCustomModifierList();
		console.log('useCustomModifiers',useCustomModifiers_input)
		settings.useCustomModifiers = parseInt(useCustomModifiers_input.value);
		console.log('useCustomModifiers',settings.useCustomModifiers)
		
		useModifierCount = 0;
		for (const group in rhModifiers) {
			settings.useModifiers[group] = parseInt(document.getElementById('use'+group+'_input').value)
			if(settings.useModifiers[group] > rhModifiers[group].length){
				settings.useModifiers[group] = rhModifiers[group].length; 
				document.getElementById('use'+group+'_input').value = rhModifiers[group].length;
			}
			useModifierCount += parseInt(settings.useModifiers[group]);
			console.log('settings group: ',group,settings.useModifiers[group])
		}
		console.log('settings',settings)

		settings.ISButton1 = parseInt(ISButton1_input.value);
		settings.ISButton2 = parseInt(ISButton2_input.value);
		settings.ISButton3 = parseInt(ISButton3_input.value);
		settings.ISButton4 = parseInt(ISButton4_input.value);
		settings.ISButton5 = parseInt(ISButton5_input.value);
		settings.GSButton1 = parseFloat(GSButton1_input.value);
		settings.GSButton2 = parseFloat(GSButton2_input.value);
		settings.GSButton3 = parseFloat(GSButton3_input.value);
		settings.GSButton4 = parseFloat(GSButton4_input.value);
		settings.GSButton5 = parseFloat(GSButton5_input.value);
		settings.disable_hover_on_group = disable_hover_on_group_input.checked;
		settings.rabbitHoleOpen = document.getElementById('rabbit-settings').getElementsByTagName('h4')[0].classList.contains('active');
		
		if(settings.disable_hover_on_group){document.getElementById('container').classList.add('noGroupHover');}
		else{document.getElementById('container').classList.remove('noGroupHover');}
		
		rhLoadModels();
		rhLoadSamplers();
		

		//Check Max Settings

		if(settings.useModels > models.length){settings.useModels = models.length; useModels_input.value = models.length;}
		if(settings.useGfpgans > gfpgans.length){settings.useGfpgans = gfpgans.length; useGfpgans_input.value = gfpgans.length;}
		if(settings.useHypernetworks > hypernetworks.length){settings.useHypernetworks = hypernetworks.length; useHypernetworks_input.value = hypernetworks.length;}
		if(settings.useVaes > vaes.length){settings.useVaes = vaes.length; useVaes_input.value = vaes.length;}
		if(settings.useLoras > loras.length){settings.useLoras = loras.length; useLoras_input.value = loras.length;}
		if(settings.useSamplers > samplers.length){settings.useSamplers = samplers.length; useSamplers_input.value = samplers.length;}

		save();
		
		
	}
	
	function rhLoadSamplers() {
		if(test_diffusers.checked == true){
			var samplerList = document.querySelectorAll('#sampler_name option:not(.k_diffusion-only)');
		}else{
			var samplerList = document.querySelectorAll('#sampler_name option');
		}
		
		samplers = [];
		samplerList.forEach((samplerOption) => {
			samplers.push(samplerOption.value);
		});
	}
	
	function shuffle(array) {
	  let currentIndex = array.length,  randomIndex;

	  // While there remain elements to shuffle.
	  while (currentIndex != 0) {

		// Pick a remaining element.
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		// And swap it with the current element.
		[array[currentIndex], array[randomIndex]] = [
		  array[randomIndex], array[currentIndex]];
	  }

	  return array;
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
			gfpganOptions.forEach(gfpganName => {
				if(Array.isArray(gfpganName)){
					gfpganName[1].forEach(subgfpgan => {
						gfpgans.push(gfpganName[0]+"/"+subgfpgan);
					})
				} else {
					gfpgans.push(gfpganName);
				}
			})
			hypernetworkOptions.forEach(hypernetworkName => {
				if(Array.isArray(hypernetworkName)){
					hypernetworkName[1].forEach(subhypernetwork => {
						hypernetworks.push(hypernetworkName[0]+"/"+subhypernetwork);
					})
				} else {
					hypernetworks.push(hypernetworkName);
				}
			})
			vaeOptions.forEach(vaeName => {
				if(Array.isArray(vaeName)){
					vaeName[1].forEach(subvae => {
						vaes.push(vaeName[0]+"/"+subvae);
					})
				} else {
					vaes.push(vaeName);
				}
			})
			loraOptions.forEach(loraName => {
				if(Array.isArray(loraName)){
					loraName[1].forEach(sublora => {
						loras.push(loraName[0]+"/"+sublora);
					})
				} else {
					loras.push(loraName);
				}
			})
		} catch (e) {
			console.log('get models error', e)
		}
	}
	
	/* Dynamic Modifier Load */
	async function rhLoadModifiers() {
		try {
			let res = await fetch('/get/modifiers')
			if (res.status === 200) {
				res = await res.json()
				let tempModifiers = [];
				modifiers = res; // update global variable
				res.forEach((modifierGroup) => {
					const title = modifierGroup.category.replaceAll(' ', '-')
					const modifiers = modifierGroup.modifiers
					rhModifiers[title] = []
					modifiers.forEach(mod => {
						if(title != 'addEventListener'){
							rhModifiers[title].push(mod['modifier'])
						}
					})
				})
				//rhModifiers = tempModifiers;
			}
			for (let group in rhModifiers) {
				settings.useModifiers[group] = 0
			}
			let tempHTML = "";
			tempHTML = `<tr id="modHeading"><td colspan="2"><b class="settings-subheader">Image Modifier Settings</b></td></tr>`;
			for (const group in rhModifiers) {
				if((!document.getElementById(`use${group}_input`))){
					tempHTML += `<tr class="pl-5"><td><label for="use${group}_input">Random ${group.replaceAll('-', ' ')}:</label></td><td> <input id="use${group}_input" name="use${group}_input" size="10" value="`+parseInt(settings.useModifiers[group])+`" onkeypress="preventNonNumericalInput(event)" onchange="setSettings()"></td></tr>`
				}
			}

			document.getElementById('modHeading').outerHTML = tempHTML;
		} catch (e) {
			console.log('error fetching modifiers', e)
		}
	}
	
	function loadCustomModifierList() {
		if(localStorage.getItem('customModifiers')){
			customModifierList = localStorage.getItem('customModifiers').split("\n");
			customModifierList = customModifierList.filter(element => element !== '');
		}
		customModifierList = customModifierList.filter(element => element[0] != "#");
		if(customModifierList[0] === "" || customModifierList.length == 0){
			customModifierList = null;
			customModifierList = [];
			document.getElementById('useCustomModifiersContainer').style.display = "none";
		}else{
			for (let c = 0; c < customModifierList.length; c++) {
				customModifierList[c] = ', '+customModifierList[c];
			}
			document.getElementById('useCustomModifiersContainer').style.display = "revert";
		}
	}
	
	
	/* End of Modifier load */

	
	//Generate Modifier Array
	function getTaskSettings(reqBody, img){
		var outputTasks = [];
		var tempSeeds=[];
		var tempModels=[];
		var tempGfpgans=[];
		var tempHypernetworks=[];
		var tempVaes=[];
		var tempLoras=[];
		var tempModifiers = {};
		var tempCusomModifiers=[];
		var tempScales = [];
		var tempISs = [];
		var tempMaxImagesToGenerate, tempScaleMid, tempISMid, tempPromptStrengthMid, tempHyperStrengthMid, tempLoraAlphaMid, 
			tempPromptStrengthCount, tempScaleCount, tempISCount, tempHyperStrengthCount, tempLoraAlphaCount,
			tempPromptStrengthStep, tempScaleStep, tempISStep, tempHyperStrengthStep, tempLoraAlphaStep;
		var tempSamplers = [];
		var tempPromptStrengths = [];
		var tempHyperStrengths = [];
		var tempLoraAlphas = [];
		tempPromptStrengthMid = (settings.promptStrengthMid ? settings.promptStrengthMid : parseFloat(reqBody.prompt_strength));
		tempHyperStrengthMid = (settings.hyperStrengthMid ? settings.hyperStrengthMid : parseFloat(reqBody.hypernetwork_strength));
		tempLoraAlphaMid = settings.loraAlphaMid;
		tempScaleMid = (settings.scaleMid ? settings.scaleMid : parseFloat(reqBody.guidance_scale));
		tempISMid = (settings.ISMid ? settings.ISMid : parseInt(reqBody.num_inference_steps));
		tempPromptStrengthCount = (settings.promptStrengthCount ? settings.promptStrengthCount : 1);
		tempHyperStrengthCount = (settings.hyperStrengthCount ? settings.hyperStrengthCount : 1);
		tempLoraAlphaCount = (settings.loraAlphaCount ? settings.loraAlphaCount : 1);
		tempScaleCount = (settings.scaleCount ? settings.scaleCount : 1);
		tempISCount = (settings.ISCount ? settings.ISCount : 1);
		tempPromptStrengthStep = (settings.promptStrengthStep ? settings.promptStrengthStep : 0.1);
		tempHyperStrengthStep = (settings.hyperStrengthStep ? settings.hyperStrengthStep : 0.1);
		tempLoraAlphaStep = (settings.loraAlphaStep ? settings.loraAlphaStep : 0.1);
		tempScaleStep = (settings.scaleStep ? settings.scaleStep : 1.0);
		tempISStep = (settings.ISStep ? settings.ISStep : 5);
		if(reqBody.init_image != null){
			for (let i = (Math.floor(tempPromptStrengthCount/2)*tempPromptStrengthStep*-1); i <= ((Math.floor(tempPromptStrengthCount/2)*tempPromptStrengthStep*-1) + tempPromptStrengthStep*(tempPromptStrengthCount-1)); i+=tempPromptStrengthStep) {
				if((tempPromptStrengthMid + i)>=0.01 && (tempPromptStrengthMid + i)<=PS_slider.getAttribute('max')/100){
					tempPromptStrengths.push(Math.round((tempPromptStrengthMid + i)*100)/100);
				}else{
					console.log("invalid prompt strength: "+(tempPromptStrengthMid + i));
				}
			}
		}
		for (let i = (Math.floor(tempHyperStrengthCount/2)*tempHyperStrengthStep*-1); i <= (Math.floor(tempHyperStrengthCount/2)*tempHyperStrengthStep*-1)+tempHyperStrengthStep*(tempHyperStrengthCount-1); i+=tempHyperStrengthStep) {
			if((tempHyperStrengthMid + i)>=HS_slider.getAttribute('min')/100 && (tempHyperStrengthMid + i)<=HS_slider.getAttribute('max')/100){
				tempHyperStrengths.push(Math.round((tempHyperStrengthMid + i)*100)/100);
			}else{
				console.log("invalid prompt strength: "+(tempHyperStrengthMid + i));
			}
		}
		for (let i = (Math.floor(tempLoraAlphaCount/2)*tempLoraAlphaStep*-1); i <= (Math.floor(tempLoraAlphaCount/2)*tempLoraAlphaStep*-1)+tempLoraAlphaStep*(tempLoraAlphaCount-1); i+=tempLoraAlphaStep) {
			console.log('tempLoraMid',i)
			if((tempLoraAlphaMid + i)>=LORA_slider.getAttribute('min')/100 && (tempLoraAlphaMid + i)<=LORA_slider.getAttribute('max')/100){
				tempLoraAlphas.push(Math.round((tempLoraAlphaMid + i)*100)/100);
			}else{
				console.log("invalid prompt strength: "+(tempLoraAlphaMid + i));
			}
		}
		for (let i = (Math.floor(tempScaleCount/2)*tempScaleStep*-1); i <= (Math.floor(tempScaleCount/2)*tempScaleStep*-1)+tempScaleStep*(tempScaleCount-1); i+=tempScaleStep) {
			if((tempScaleMid + i)>=GS_slider.getAttribute('min')/10 && (tempScaleMid + i)<=GS_slider.getAttribute('max')/10){
				tempScales.push(Math.round((tempScaleMid + i)*100)/100);
			} else {
				console.log("invalid guidance scale: "+(tempScaleMid + i));
			}
		}
		for (let i = (Math.floor(tempISCount/2)*tempISStep*-1); i <= (Math.floor(tempISCount/2)*tempISStep*-1)+tempISStep*(tempISCount-1); i+=tempISStep) {
			var tempIS = tempISMid + i;
			if((tempIS)>0){
				tempISs.push(tempIS);
			} else {
				console.log("invalid inference step: "+tempIS);
			}
		}
		if(settings.useSeeds>0){
			for (let i = 1; i <= settings.useSeeds; i++) {
				tempSeeds.push(Math.floor(Math.random() * 2000000000));
			} 
		} else {
			tempSeeds[0] = reqBody.seed;
		}
		if(settings.useModels>0){
			tempModels = models;
			shuffle(tempModels);
			tempModels = tempModels.slice(0,settings.useModels);
		}
		if(settings.useGfpgans>0){
			tempGfpgans = gfpgans;
			tempGfpgans.push('');
			shuffle(tempGfpgans);
			tempGfpgans = tempGfpgans.slice(0,settings.useGfpgans);
		}
		if(settings.useHypernetworks>0){
			tempHypernetworks = hypernetworks;
			tempHypernetworks.push('');
			shuffle(tempHypernetworks);
			tempHypernetworks = tempHypernetworks.slice(0,settings.useHypernetworks);
		}
		if(settings.useVaes>0){
			tempVaes = vaes;
			tempVaes.push('');
			shuffle(tempVaes);
			tempVaes = tempVaes.slice(0,settings.useVaes);
		}
		if(settings.useLoras>0){
			tempLoras = loras;
			tempLoras.push('');
			shuffle(tempLoras);
			tempLoras = tempLoras.slice(0,settings.useLoras);
		}
		if(settings.useSamplers>0){
			tempSamplers = samplers;
			shuffle(tempSamplers);
			tempSamplers = tempSamplers.slice(0,settings.useSamplers);
		}
		
		for (const group in rhModifiers) {
			if(settings.useModifiers[group]>0){
				tempModifiers[group] = rhModifiers[group];
				tempModifiers[group].push('');
				shuffle(tempModifiers[group]);
				tempModifiers[group] = tempModifiers[group].slice(0,settings.useModifiers[group]);
			}
		}
		
		if(settings.useCustomModifiers>0){
			tempCusomModifiers = customModifierList;
			tempCusomModifiers.push('');
			shuffle(tempCusomModifiers);
			
			tempCusomModifiers = tempCusomModifiers.slice(0,settings.useCustomModifiers);
			console.log('tempCusomModifiers',tempCusomModifiers)
		}
		
		var maxVariations = parseInt(Math.max(tempSeeds.length,1)*Math.max(tempPromptStrengths.length,1)*Math.max(tempHyperStrengths.length,1)*Math.max(tempLoraAlphas.length,1)*Math.max(tempScales.length,1)*Math.max(tempISs.length,1)*Math.max(tempModels.length,1)*Math.max(tempGfpgans.length,1)*Math.max(tempHypernetworks.length,1)*Math.max(tempVaes.length,1)*Math.max(tempLoras.length,1)*Math.max(tempSamplers.length,1)*Math.max(useModifierCount,1)*Math.max(tempCusomModifiers.length,1));
		tempMaxImagesToGenerate = Math.min(settings.maxImagesToGenerate, maxVariations);
		for(let i = 0; i<tempMaxImagesToGenerate; i++){
			var tempTask = {};
			tempTask = {
				IS: tempISs[Math.round(Math.random() * (tempISs.length - 1))],
				GS: tempScales[Math.round(Math.random() * (tempScales.length - 1))],
				PS: tempPromptStrengths[Math.round(Math.random() * (tempPromptStrengths.length - 1))],
				HS: tempHyperStrengths[Math.round(Math.random() * (tempHyperStrengths.length - 1))],
				LS: tempLoraAlphas[Math.round(Math.random() * (tempLoraAlphas.length - 1))],
				seed: tempSeeds[Math.round(Math.random() * (tempSeeds.length - 1))],
				model: (settings.useModels>0 ? tempModels[Math.round(Math.random() * (tempModels.length - 1))]: reqBody.use_stable_diffusion_model),
				gfpgan: (settings.useGfpgans>0 ? tempGfpgans[Math.round(Math.random() * (tempGfpgans.length - 1))]: reqBody.use_face_correction),
				hypernetwork: (settings.useHypernetworks>0 ? tempHypernetworks[Math.round(Math.random() * (tempHypernetworks.length - 1))]: reqBody.use_hypernetwork_model),
				vae: (settings.useVaes>0 ? tempVaes[Math.round(Math.random() * (tempVaes.length - 1))]: reqBody.use_vae_model),
				lora: (settings.useLoras>0 ? tempLoras[Math.round(Math.random() * (tempLoras.length - 1))]: reqBody.use_lora_model),
				sampler: (settings.useSamplers>0 ? tempSamplers[Math.round(Math.random() * (tempSamplers.length - 1))]: reqBody.sampler_name),
				customModifier: (settings.useCustomModifiers>0 ? tempCusomModifiers[Math.round(Math.random() * (tempCusomModifiers.length - 1))] : ''),
				modifiers: {},
			}
			for (const group in rhModifiers) {
				tempTask.modifiers[group] = (settings.useModifiers[group]>0 ? tempModifiers[group][Math.round(Math.random() * (tempModifiers[group].length - 1))] : '');
			}
			var inTasks = false;
			for(let ot = 0; ot<outputTasks.length; ot++){
				if(JSON.stringify(outputTasks[ot]) === JSON.stringify(tempTask)){
					inTasks = true;
					i--;
				}
			}
			if(!inTasks){
				outputTasks.push(tempTask);
			}
		}
		//Finish fixing sort order for lowest first
		outputTasks.sort((firstItem, secondItem) => (firstItem.PS < secondItem.PS) ? 1 : -1);
		outputTasks.sort((firstItem, secondItem) => (firstItem.GS < secondItem.GS) ? 1 : -1);
		outputTasks.sort((firstItem, secondItem) => (firstItem.IS < secondItem.IS) ? 1 : -1);
		outputTasks.sort((firstItem, secondItem) => (firstItem.HS < secondItem.HS) ? 1 : -1);
		outputTasks.sort((firstItem, secondItem) => (firstItem.LS < secondItem.LS) ? 1 : -1);
		outputTasks.sort((firstItem, secondItem) => (firstItem.sampler < secondItem.sampler) ? 1 : -1);
		outputTasks.sort((firstItem, secondItem) => (firstItem.hypernetwork < secondItem.hypernetwork) ? 1 : -1);
		outputTasks.sort((firstItem, secondItem) => (firstItem.lora < secondItem.lora) ? 1 : -1);
		outputTasks.sort((firstItem, secondItem) => (firstItem.seed < secondItem.seed) ? 1 : -1);
		outputTasks.sort((firstItem, secondItem) => (firstItem.model < secondItem.model) ? 1 : -1);
		return outputTasks;
	}
	
	function startRequest(reqBody, img){
		setSettings();
		loopRequests(reqBody, img);
	}
	
	function loopRequests(reqBody, img){
		var newTaskList = [];
		var taskSettings = getTaskSettings(reqBody, img);

		taskSettings.forEach(function(taskSetting){
			var tempPrompt = reqBody.prompt;
			for (const group in rhModifiers) {
				if(taskSetting.modifiers[group] != ''){
					tempPrompt += ', '+taskSetting.modifiers[group];
				}
			}
			tempPrompt += taskSetting.customModifier;
			const newTaskRequest = modifyCurrentRequest(reqBody, {
				//num_outputs: 1,
				seed: taskSetting.seed,
				guidance_scale: taskSetting.GS,
				num_inference_steps: taskSetting.IS,
				prompt: tempPrompt,
				sampler_name: taskSetting.sampler,
				use_stable_diffusion_model: taskSetting.model,
				use_face_correction: taskSetting.gfpgan,
				use_hypernetwork_model: taskSetting.hypernetwork,
				use_vae_model: taskSetting.vae,
				use_lora_model: taskSetting.lora,
			});
			newTaskRequest.batchCount = document.querySelector('#num_outputs_total').value;
			newTaskRequest.numOutputsTotal = document.querySelector('#num_outputs_total').value;
			if(reqBody.init_image != null){
				newTaskRequest.reqBody.prompt_strength = taskSetting.PS;
				newTaskRequest.reqBody.sampler_name = "ddim";
			}
			if(newTaskRequest.use_hypernetwork_model != ''){
				newTaskRequest.reqBody.hypernetwork_strength = taskSetting.HS
			}
			if(newTaskRequest.use_lora_model != ''){
				newTaskRequest.reqBody.lora_alpha = taskSetting.LS
			}
			//delete newTaskRequest.reqBody.mask;
			newTaskList.push(newTaskRequest);
		});
		
		
		
				
		newTaskList.forEach(function(newTask) {
			createTask(newTask);
		});
	}	
	
	
	
function addRabbitHoleSettings(){
	var openCheck = '';
	if(settings.rabbitHoleOpen){openCheck = ' active';}
	var rabbitHoleSettings = document.createElement('div');
	rabbitHoleSettings.id = 'rabbit-settings';
	rabbitHoleSettings.classList.add('panel-box');
	let tempHTML =  
			`<h4 class="collapsible `+openCheck+`">Rabbit Hole Settings
				<i id="reset-rh-settings" class="fa-solid fa-arrow-rotate-left section-button">
					<span class="simple-tooltip top-left">
						Reset Rabbit Hole Settings
					</span>
				</i>
			</h4>
			<div id="rabbit-settings-entries" class="collapsible-content" style="display: block;margin-top:15px;">
				<table><tbody>
					<tr><td><b class="settings-subheader">Image Settings</b></td></tr>
					<tr class="pl-5"><td><label for="maxImagesToGenerate_input">Max Image to Generate:</label></td><td> <input id="maxImagesToGenerate_input" name="maxImagesToGenerate_input" size="10" value="`+settings.maxImagesToGenerate+`" onkeypress="preventNonNumericalInput(event)" onchange="setSettings()"><button id="calcMaxButton"><i class="fa fa-calculator"></i></button></td></tr>
					<tr class="pl-5"><td><label for="useSeeds_input">Seeds to Generate:</label></td><td> <input id="useSeeds_input" name="useSeeds_input" size="10" value="`+settings.useSeeds+`" onkeypress="preventNonNumericalInput(event)" onchange="setSettings()"></td></tr>
					<tr class="pl-5"><td><label for="useModels_input">Random Models:</label></td><td> <input id="useModels_input" name="useModels_input" size="10" value="`+settings.useModels+`" onkeypress="preventNonNumericalInput(event)" onchange="setSettings()"></td></tr>
					<tr class="pl-5"><td><label for="useVaes_input">Random VAEs:</label></td><td> <input id="useVaes_input" name="useVaes_input" size="10" value="`+settings.useVaes+`" onkeypress="preventNonNumericalInput(event)" onchange="setSettings()"></td></tr>
					<tr class="pl-5"><td><label for="useLoras_input">Random LORAs:</label></td><td> <input id="useLoras_input" name="useLoras_input" size="10" value="`+settings.useLoras+`" onkeypress="preventNonNumericalInput(event)" onchange="setSettings()"></td></tr>
					<tr class="pl-5"><td><label for="loraAlphaCount_input">LORA Strength Count:</label></td><td> <input id="loraAlphaCount_input" name="loraAlphaCount_input" size="10" value="`+settings.loraAlphaCount+`" onkeypress="preventNonNumericalInput(event)" onchange="setSettings()"></td></tr>
					<tr class="pl-5"><td><label for="loraAlphaStep_input">LORA Strength Step Size:</label></td><td> <input id="loraAlphaStep_input" name="loraAlphaStep_input" size="10" value="`+settings.loraAlphaStep+`" pattern="^[0-9\\.]+$" onkeypress="preventNonNumericalInput(event)" onchange="setSettings()"></td></tr>
					<tr class="pl-5"><td><label for="loraAlphaMid_input">LORA Strength Midpoint:</label></td><td> <input id="loraAlphaMid_input" name="loraAlphaMid_input" size="10" value="`+settings.loraAlphaMid+`" pattern="^[0-9\\.]+$" onkeypress="preventNonNumericalInput(event)" onchange="setSettings()"></td></tr>
					<tr class="pl-5 notImg2img"><td><label for="useSamplers_input">Random Samplers:</label></td><td> <input id="useSamplers_input" name="useSamplers_input" size="10" value="`+settings.useSamplers+`" onkeypress="preventNonNumericalInput(event)" onchange="setSettings()"></td></tr>
					<tr class="pl-5"><td><label for="ISCount_input">Inference Steps Count:</label></td><td> <input id="ISCount_input" name="ISCount_input" size="10" value="`+settings.ISCount+`" onkeypress="preventNonNumericalInput(event)" onchange="setSettings()"></td></tr>
					<tr class="pl-5"><td><label for="ISStep_input">Inference Steps Step Size:</label></td><td> <input id="ISStep_input" name="ISStep_input" size="10" value="`+settings.ISStep+`" onkeypress="preventNonNumericalInput(event)" onchange="setSettings()"></td></tr>
					<tr class="pl-5"><td><label for="ISMid_input">Inference Steps Midpoint:</label></td><td> <input id="ISMid_input" name="ISMid_input" size="10" value="`+settings.ISMid+`" onkeypress="preventNonNumericalInput(event)" onchange="setSettings()"></td></tr>
					<tr class="pl-5"><td><label for="scaleCount_input">Guidance Scale Count:</label></td><td> <input id="scaleCount_input" name="scaleCount_input" size="10" value="`+settings.scaleCount+`" onkeypress="preventNonNumericalInput(event)" onchange="setSettings()"></td></tr>
					<tr class="pl-5"><td><label for="scaleStep_input">Guidance Scale Step Size:</label></td><td> <input id="scaleStep_input" name="scaleStep_input" size="10" value="`+settings.scaleStep+`" pattern="^[0-9\\.]+$" onkeypress="preventNonNumericalInput(event)" onchange="setSettings()"></td></tr>
					<tr class="pl-5"><td><label for="scaleMid_input">Guidance Scale Midpoint:</label></td><td> <input id="scaleMid_input" name="scaleMid_input" size="10" value="`+settings.scaleMid+`" pattern="^[0-9\\.]+$" onkeypress="preventNonNumericalInput(event)" onchange="setSettings()"></td></tr>
					<tr class="pl-5 img2imgOnly"><td><label for="promptStrengthCount_input">Prompt Strength Count:</label></td><td> <input id="promptStrengthCount_input" name="promptStrengthCount_input" size="10" value="`+settings.promptStrengthCount+`" onkeypress="preventNonNumericalInput(event)" onchange="setSettings()"></td></tr>
					<tr class="pl-5 img2imgOnly"><td><label for="promptStrengthStep_input">Prompt Strength Step Size:</label></td><td> <input id="promptStrengthStep_input" name="promptStrengthStep_input" size="10" value="`+settings.promptStrengthStep+`" pattern="^[0-9\\.]+$" onkeypress="preventNonNumericalInput(event)" onchange="setSettings()"></td></tr>
					<tr class="pl-5 img2imgOnly"><td><label for="promptStrengthMid_input">Prompt Strength Midpoint:</label></td><td> <input id="promptStrengthMid_input" name="promptStrengthMid_input" size="10" value="`+settings.promptStrengthMid+`" pattern="^[0-9\\.]+$" onkeypress="preventNonNumericalInput(event)" onchange="setSettings()"></td></tr>
					<tr class="pl-5"><td><label for="useHypernetworks_input">Random Hypernetworks:</label></td><td> <input id="useHypernetworks_input" name="useHypernetworks_input" size="10" value="`+settings.useHypernetworks+`" onkeypress="preventNonNumericalInput(event)" onchange="setSettings()"></td></tr>
					<tr class="pl-5"><td><label for="hyperStrengthCount_input">Hyper Strength Count:</label></td><td> <input id="hyperStrengthCount_input" name="hyperStrengthCount_input" size="10" value="`+settings.hyperStrengthCount+`" onkeypress="preventNonNumericalInput(event)" onchange="setSettings()"></td></tr>
					<tr class="pl-5"><td><label for="hyperStrengthStep_input">Hyper Strength Step Size:</label></td><td> <input id="hyperStrengthStep_input" name="hyperStrengthStep_input" size="10" value="`+settings.hyperStrengthStep+`" pattern="^[0-9\\.]+$" onkeypress="preventNonNumericalInput(event)" onchange="setSettings()"></td></tr>
					<tr class="pl-5"><td><label for="hyperStrengthMid_input">Hyper Strength Midpoint:</label></td><td> <input id="hyperStrengthMid_input" name="hyperStrengthMid_input" size="10" value="`+settings.hyperStrengthMid+`" pattern="^[0-9\\.]+$" onkeypress="preventNonNumericalInput(event)" onchange="setSettings()"></td></tr>
					<tr class="pl-5"><td><label for="useGfpgans_input">Random GFPGANs:</label></td><td> <input id="useGfpgans_input" name="useGfpgans_input" size="10" value="`+settings.useGfpgans+`" onkeypress="preventNonNumericalInput(event)" onchange="setSettings()"></td></tr>
					
					<tr><td>&nbsp;</td></tr>
					<tr id="modHeading"><td colspan="2"><b class="settings-subheader">Image Modifier Settings</b></td></tr>					
					<tr class="pl-5" id="useCustomModifiersContainer"><td><label for="useCustomModifiers_input">Random Custom Modifiers:</label></td><td> <input id="useCustomModifiers_input" name="useCustomModifiers_input" size="10" value="`+settings.useCustomModifiers+`" onkeypress="preventNonNumericalInput(event)" onchange="setSettings()"></td></tr>
					<tr><td>&nbsp;</td></tr>
				</tbody></table>
				<button id="newRabbitHoleBtn" class="primaryButton">Start New Rabbit Hole</button></div>
			</div>`;
	rabbitHoleSettings.innerHTML = tempHTML;
	var editorSettings = document.getElementById('editor-settings');
	editorSettings.parentNode.insertBefore(rabbitHoleSettings, editorSettings.nextSibling);
	document.getElementById('newRabbitHoleBtn').addEventListener("click", function () {
		const taskTemplate = getCurrentUserRequest();
		const newTaskRequests = [];
		//console.log(taskTemplate);
		getPrompts().forEach((prompt) => newTaskRequests.push(Object.assign({}, taskTemplate, {
			reqBody: Object.assign({ prompt: prompt }, taskTemplate.reqBody)
		})));
		newTaskRequests.forEach((task) => startRequest(task.reqBody, task.img));
		initialText.style.display = 'none';
	});
	document.getElementById('calcMaxButton').addEventListener("click", function () {
		if(document.getElementById('editor').classList.contains('img2img')){
			document.getElementById('maxImagesToGenerate_input').value = Math.max(settings.useSeeds,1)*Math.max(settings.scaleCount,1)*Math.max(settings.promptStrengthCount,1)*Math.max(settings.loraAlphaCount,1)*Math.max(settings.hyperStrengthCount,1)*Math.max(settings.ISCount,1)*Math.max(settings.useModels,1)*Math.max(settings.useGfpgans,1)*Math.max(settings.useHypernetworks,1)*Math.max(settings.useVaes,1)*Math.max(settings.useLoras,1)*Math.max(settings.useSamplers,1)*Math.max(useModifierCount,1)*Math.max(settings.useCustomModifiers,1);
		} else {
			document.getElementById('maxImagesToGenerate_input').value = Math.max(settings.useSeeds,1)*Math.max(settings.scaleCount,1)*Math.max(settings.loraAlphaCount,1)*Math.max(settings.hyperStrengthCount,1)*Math.max(settings.ISCount,1)*Math.max(settings.useModels,1)*Math.max(settings.useGfpgans,1)*Math.max(settings.useHypernetworks,1)*Math.max(settings.useVaes,1)*Math.max(settings.useLoras,1)*Math.max(settings.useSamplers,1)*Math.max(useModifierCount,1)*Math.max(settings.useCustomModifiers,1);
		}
		setSettings();
	});
	createCollapsibles(rabbitHoleSettings);
	if(document.querySelector(settings.rabitHoleOpen == false)){
		document.querySelector('#rabbit-settings h4').classList.remove('active')
	}
	document.querySelector('#rabbit-settings h4').addEventListener("click", function () {
		if(settings.rabbitHoleOpen == true){
			settings.rabbitHoleOpen = false
		}else{
			settings.rabbitHoleOpen = true
		}
		save()
	});
}


function buildRequest(steps, mode, reqBody, img) {
	let imageSeed = img.getAttribute('data-seed');
	if (mode == "I2I"){imageSeed = Math.floor(Math.random() * 200000000);}
	const newTaskRequest = modifyCurrentRequest(reqBody, {
		seed: imageSeed
	});
	newTaskRequest.numOutputsTotal = 1;
	newTaskRequest.batchCount = 1;
	if(mode == 'IS'){
		newTaskRequest.reqBody.num_inference_steps = parseInt(reqBody.num_inference_steps) + steps;
	}else if (mode == 'GS'){
		newTaskRequest.reqBody.guidance_scale = parseFloat(reqBody.guidance_scale) + steps;
	}else if (mode == "I2I"){
		const imageElem = img;
        const imgData = imageElem.src;
		initImageSelector.value = null
        initImagePreview.src = imgData
		initImagePreviewContainer.style.display = 'block';
        promptStrengthContainer.style.display = 'table-row';
        //maskSetting.checked = false;
        samplerSelectionContainer.style.display = 'none';
		newTaskRequest.reqBody.sampler_name = 'ddim';
		newTaskRequest.reqBody.prompt_strength = reqBody.prompt_strength;
		newTaskRequest.reqBody.init_image = imageElem.src;
		newTaskRequest.steps = steps-1;
		if(maskSetting.checked == false){
			delete newTaskRequest.reqBody.mask;
		}
	}
	return newTaskRequest;
}
function getStartNewTaskHandler(steps, mode) {
	return async function(reqBody, img) {
		const newTaskRequest = buildRequest(steps, mode, reqBody, img);
		taskID = createTask(newTaskRequest);
		var newTask = document.querySelector('#'+taskID)
		newTask.dataset.i2irendersLeft = newTaskRequest.steps;
	}
}

function addSettingsTabInfo(){
	//Settings Content
	var settingsPageContent = document.createElement('div');
	settingsPageContent.id = 'settingsPageContent';
	settingsPageContent.classList.add('tab-content-inner');
	settingsPageContent.innerHTML = `<h1>Rabbit Hole UI Plugin Settings</h1>
		<div class="parameters-table">
			<div>
				<div><i class="fa fa-gear"></i></div>
				<div><label for="">Inference Steps Buttons</label><small>set values for 4 action buttons, a value of 0 removes a button</small></div>
				<div>
					<input id="ISButton1_input" name="ISButton1_input" size="4" value="`+settings.ISButton1+`" pattern="^[0-9\\.]+$" onkeypress="preventNonNumericalInput(event)" onchange="setSettings();">&nbsp;
					<input id="ISButton2_input" name="ISButton1_input" size="4" value="`+settings.ISButton2+`" pattern="^[0-9\\.]+$" onkeypress="preventNonNumericalInput(event)" onchange="setSettings();">&nbsp;
					<input id="ISButton3_input" name="ISButton1_input" size="4" value="`+settings.ISButton3+`" pattern="^[0-9\\.]+$" onkeypress="preventNonNumericalInput(event)" onchange="setSettings();">&nbsp;
					<input id="ISButton4_input" name="ISButton1_input" size="4" value="`+settings.ISButton4+`" pattern="^[0-9\\.]+$" onkeypress="preventNonNumericalInput(event)" onchange="setSettings();">&nbsp;
					<input id="ISButton5_input" name="ISButton1_input" size="4" value="`+settings.ISButton5+`" pattern="^[0-9\\.]+$" onkeypress="preventNonNumericalInput(event)" onchange="setSettings();">
				</div>
			</div>
			<div>
				<div><i class="fa fa-gear"></i></div>
				<div><label for="">Guidance Scale Buttons</label><small>set values for 4 action buttons, a value of 0 removes a button</small></div>
				<div>
					<input id="GSButton1_input" name="GSButton1_input" size="4" value="`+settings.GSButton1+`" pattern="^[0-9\\.]+$" onkeypress="preventNonNumericalInput(event)" onchange="setSettings();">&nbsp;
					<input id="GSButton2_input" name="GSButton1_input" size="4" value="`+settings.GSButton2+`" pattern="^[0-9\\.]+$" onkeypress="preventNonNumericalInput(event)" onchange="setSettings();">&nbsp;
					<input id="GSButton3_input" name="GSButton1_input" size="4" value="`+settings.GSButton3+`" pattern="^[0-9\\.]+$" onkeypress="preventNonNumericalInput(event)" onchange="setSettings();">&nbsp;
					<input id="GSButton4_input" name="GSButton1_input" size="4" value="`+settings.GSButton4+`" pattern="^[0-9\\.]+$" onkeypress="preventNonNumericalInput(event)" onchange="setSettings();">&nbsp;
					<input id="GSButton5_input" name="GSButton1_input" size="4" value="`+settings.GSButton5+`" pattern="^[0-9\\.]+$" onkeypress="preventNonNumericalInput(event)" onchange="setSettings();">
				</div>
			</div>
			<div>
				<div><i class="fa fa-gear"></i></div>
				<div><label for="disable_hover_on_group">Disable Hover on Groups</label><small>when set to hover, actions won't show on grouped images</small></div>
				<div>
					<div class="input-toggle"><input id="disable_hover_on_group_input" name="disable_hover_on_group_input" type="checkbox" onchange="setSettings();"><label for="disable_hover_on_group_input"></label></div>
				</div>
			</div>
		</div>
		<p>Don't expect this to have everything: <a href="/plugins/user/RabbitHoleUI/index.html" target="_rh">New RabbitHoleUI Alpha</a></p>
		<p>These settings auto-save, reload browser after changing.</p>
			

	`;
	var settingsPage = document.getElementById('tab-content-settings');
	settingsPage.appendChild(settingsPageContent);
}	
	
setup();