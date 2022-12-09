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
		width:490px;
		position:fixed;
		overflow-y: auto;
		overflow-x:hidden;
		margin-bottom:200px;
		height: calc(100vh - 58px);
		background:#444444;
		z-index:1000;
	}
	.hidden #editor {
		left:-500px;
	}
	#editor-modifiers {
		overflow-x:unset;
		overflow-y:unset;
	}
	#preview {
		margin-bottom:200px;
		margin-left:500px;
		padding-top:45px;
		min-height: calc(100vh - 270px);
		outline:none !important;
	}
	.hidden #preview {
		margin-left:0;
	}
	#stable_diffusion_model {
		width:90%;
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
	#preview-tools {
		position:fixed;
		top:62px;
		padding:8px 0;
		background:var(--background-color1);
		right:25px;
		left:503px;
		z-index:100;
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

	@media screen and (max-width: 1349px) {
		.minimalUI #tab-content-wrapper {
			margin-top: 45px;
		}
		.minimalUI #tab-container {
			margin-top:5px;
		}
		#top-nav {
			flex-direction: column;
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

var preview = document.getElementById('preview');
var imageTaskContainer = document.getElementsByClassName('imageTaskContainer');
let UIButton = document.createElement("button");
let ActionButtonGallery = document.createElement("button");
let ActionButton = document.createElement("button");
let menuButton = document.createElement("button");
let I2ICount = 5;
var settings = {
	galleryActions: 'hidden',
	actions: 'hover',
	zoom: 3,
	maxImagesToGenerate: 2,
	useSeeds: 0,
	scaleCount: 0,
	scaleStep: 0,
	scaleMid: 0,
	ISCount: 0,
	ISStep: 0,
	ISMid: 0,
	useSamplers: 0,
	useArtists: 0,
	useCGIRendering: 0,
	useCGISoftware: 0,
	useCamera: 0,
	useCarvingAndEtching: 0,
	useColor: 0,
	useDrawingStyle: 0,
	useEmotions: 0,
	usePen: 0,
	useVisualStyle: 0,
	rh_full_random:false,
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
	rabbitHoleOpen: false
	
};

function save(){
	localStorage.setItem('settings', JSON.stringify(settings));
}
function load() {
	tempSettings = JSON.parse(localStorage.getItem('settings'));
	for(var key in tempSettings){
		settings[key] = tempSettings[key];
	}
}
function setup() {
	//If local storage doesn't exist, save a copy, else load existing.
	if(localStorage.getItem('settings') === null){
		save();
	}else{
		load();
	}
	updateZoom();
	addRabbitHoleSettings();
	addSettingsTabInfo();
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
	if(settings.rh_full_random){
		document.getElementById('rh_full_random_input').checked = true;
	}
	
}







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

for(let i = 0; i < imageTaskContainer.length; i++){
	if(imageTaskContainer[i].querySelector('.img-batch').length>1){
		imageTaskContainer[i].classList.add('condensed');
	}
}


var observer = new MutationObserver(function (mutations) {
	mutations.forEach(function (mutation) {
		updateZoom();
		if(mutation.target.className == 'preview-prompt collapsible active'){
			var imageTaskContainer = mutation.target.parentNode.parentNode;
			imageTaskContainer.querySelector('button.stopTask').addEventListener('click' , (event) => {
				preview.classList.remove('focused');
			});
		}
		if(mutation.target.className == 'img-batch'){
			var imageTaskContainer = mutation.target.parentNode.parentNode.parentNode;
			if(imageTaskContainer.querySelectorAll('.img-batch').length == 2){
				imageTaskContainer.classList.add('condensed');
			}
			cleanup(mutation.target);
		}
	})
})

observer.observe((preview), {
	 childList: true,
	 subtree: true
})

function scrollVisible(target){
	const yOffset = -175; 
	const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
	window.scrollTo({top: y, behavior: 'smooth'});
}

function cleanup(target) {
	var imageTaskContainer = target.parentNode.parentNode.parentNode;
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


let GridUP = document.createElement("button");
GridUP.innerHTML = "Zoom <i class='fa fa-minus'></i>";
GridUP.classList.add('ZoomButton');
GridUP.addEventListener("click", function () {
	settings.zoom++;
	updateZoom();
});
previewTools.append(GridUP);
let GridDown = document.createElement("button");
GridDown.innerHTML = "Zoom <i class='fa fa-plus'></i>";
GridDown.classList.add('ZoomButton');
GridDown.addEventListener("click", function () {
	if(settings.zoom > 1){
		settings.zoom--;
	}
	updateZoom();
});
previewTools.append(GridDown);

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

let PrevBut = document.createElement("button");
PrevBut.innerHTML = "<i class='fa fa-chevron-left'></i> Prev";
PrevBut.classList.add('PrevNextBtn');
PrevBut.addEventListener("click", function () {
	prevTask();
});
previewTools.append(PrevBut);

let NextBut = document.createElement("button");
NextBut.innerHTML = "Next <i class='fa fa-chevron-right'></i>";
NextBut.classList.add('PrevNextBtn');
NextBut.addEventListener("click", function () {
	nextTask();
});
previewTools.append(NextBut);
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
		//Inference Steps, works the same as Guidance Scale
		settings.ISCount = parseInt(ISCount_input.value);
		settings.ISStep = parseInt(ISStep_input.value);
		settings.ISMid = parseInt(ISMid_input.value);
		settings.useSamplers = parseInt(useSamplers_input.value);
		settings.useArtists = parseInt(useArtists_input.value);
		settings.useCGIRendering = parseInt(useCGIRendering_input.value);
		settings.useCGISoftware = parseInt(useCGISoftware_input.value);
		settings.useCamera = parseInt(useCamera_input.value);
		settings.useCarvingAndEtching = parseInt(useCarvingAndEtching_input.value);
		settings.useColor = parseInt(useColor_input.value);
		settings.useDrawingStyle = parseInt(useDrawingStyle_input.value);
		settings.useEmotions = parseInt(useEmotions_input.value);
		settings.usePen = parseInt(usePen_input.value);
		settings.useVisualStyle = parseInt(useVisualStyle_input.value);
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
		settings.rh_full_random = rh_full_random_input.checked;
		settings.rabbitHoleOpen = document.getElementById('rabbit-settings').getElementsByTagName('h4')[0].classList.contains('active');
		
		if(settings.disable_hover_on_group){document.getElementById('container').classList.add('noGroupHover');}
		else{document.getElementById('container').classList.remove('noGroupHover');}
		
		samplers = ["plms","ddim","heun","euler","euler_a","dpm2","dpm2_a","lms"];
		artists = ["Artstation", "by Agnes Lawrence Pelton", "by Akihito Yoshida", "by Alex Grey", "by Alexander Jansson", "by Alphonse Mucha", "by Andy Warhol", "by Artgerm", "by Asaf Hanuka", "by Aubrey Beardsley", "by Banksy", "by Beeple", "by Ben Enwonwu", "by Bob Eggleton", "by Caravaggio Michelangelo Merisi", "by Caspar David Friedrich", "by Chris Foss", "by Claude Monet", "by Dan Mumford", "by David Mann", "by Diego Velázquez", "by Disney Animation Studios", "by Édouard Manet", "by Esao Andrews", "by Frida Kahlo", "by Gediminas Pranckevicius", "by Georgia O'Keeffe", "by Greg Rutkowski", "by Gustave Doré", "by Gustave Klimt", "by H.R. Giger", "by Hayao Miyazaki", "by Henri Matisse", "by HP Lovecraft", "by Ivan Shishkin", "by Jack Kirby", "by Jackson Pollock", "by James Jean", "by Jim Burns", "by Johannes Vermeer", "by John William Waterhouse", "by Katsushika Hokusai", "by Kim Tschang Yeul", "by Ko Young Hoon", "by Leonardo da Vinci", "by Lisa Frank", "by M.C Escher", "by Mahmoud Saïd", "by Makoto Shinkai", "by Marc Simonetti", "by Mark Brooks", "by Michelangelo", "by Pablo Picasso", "by Paul Klee", "by Peter Mohrbacher", "by Pierre-Auguste Renoir", "by Pixar Animation Studios", "by Rembrandt", "by Richard Dadd", "by Rossdraws", "by Salvador Dalí", "by Sam does Arts", "by Sandro Botticelli", "by Ted Nasmith", "by Ten Hundred", "by Thomas Kinkade", "by Tivadar Csontváry Kosztka", "by Victo Ngai", "by Vincent di Fate", "by Vincent van Gogh", "by Wes Anderson", "by wlop", "by Yoshitaka Amano"];
		cgi_renderings = ["3D Render", "Corona Render", "Creature Design", "Cycles Render", "Detailed Render", "Environment Design", "Intricate Environment", "LSD Render", "Octane Render", "PBR", "Glass Caustics", "Global Illumination", "Subsurface Scattering"];
		cgi_softwares = ["3D Model", "3D Sculpt", "3Ds Max Model", "Blender Model", "Cinema4d Model", "Maya Model", "Unreal Engine", "Zbrush Sculpt"];
		cameras = ["Aerial View", "Canon50", "Cinematic", "Close-up", "Color Grading", "Dramatic", "Film Grain", "Fisheye Lens", "Glamor Shot", "Golden Hour", "HD", "Landscape", "Lens Flare", "Macro", "Polaroid", "Photoshoot", "Portrait", "Studio Lighting", "Vintage", "War Photography", "White Balance", "Wildlife Photography"];
		carving_and_etchings = ["etching", "Linocut", "Paper Model", "Paper-Mache", "Papercutting", "Pyrography", "Wood-Carving"];
		colors = ["Beautiful Lighting", "Cold Color Palette", "Colorful", "Dynamic Lighting", "Electric Colors", "Infrared", "Pastel", "Neon", "Synthwave", "Warm Color Palette"];
		drawing_styles = ["Cel Shading", "Children's Drawing", "Crosshatch", "Detailed and Intricate", "Doodle", "Dot Art", "Line Art", "Sketch"];
		emotions = ["Angry", "Bitter", "Disgusted", "Embarrassed", "Evil", "Excited", "Fear", "Funny", "Happy", "Horrifying", "Lonely", "Sad", "Serene", "Surprised", "Melancholic"];
		pens = ["Chalk", "Colored Pencil", "Graphite", "Ink", "Oil Paint", "Pastel Art"];
		visual_styles = ["2D", "8-Bit", "16-Bit", "Anaglyph", "Anime", "Art Nouveau", "Bauhaus", "Baroque", "CGI", "Cartoon", "Comic Book", "Concept Art", "Constructivist", "Cubist", "Digital Art", "Dadaist", "Expressionist", "Fantasy", "Fauvist", "Figurative", "Graphic Novel", "Geometric", "Hard Edge Painting", "Hydrodipped", "Impressionistic", "Lithography", "Manga", "Minimalist", "Modern Art", "Mosaic", "Mural", "Naive", "Neoclassical", "Photo", "Realistic", "Rococo", "Romantic", "Street Art", "Symbolist", "Stuckist", "Surrealist", "Visual Novel", "Watercolor"];
		
		//Check Max Settings
		if(settings.useSamplers > samplers.length){settings.useSamplers = samplers.length; useSamplers_input.value = samplers.length;}
		if(settings.useArtists > artists.length){settings.useArtists = artists.length; useArtists_input.value = artists.length;}
		if(settings.useCGIRendering > cgi_renderings.length){settings.useCGIRendering = cgi_renderings.length; useCGIRendering_input.value = cgi_renderings.length;}
		if(settings.useCGISoftware > cgi_softwares.length){settings.useCGISoftware = cgi_softwares.length; useCGISoftware_input.value = cgi_softwares.length;}
		if(settings.useCamera > cameras.length){settings.useCamera = cameras.length; useCamera_input.value = cameras.length;}
		if(settings.useCarvingAndEtching > carving_and_etchings.length){settings.useCarvingAndEtching = carving_and_etchings.length; useCarvingAndEtching_input.value = carving_and_etchings.length;}
		if(settings.useColor > colors.length){settings.useColor = colors.length; useColor_input.value = colors.length;}
		if(settings.useDrawingStyle > drawing_styles.length){settings.useDrawingStyle = drawing_styles.length; useDrawingStyle_input.value = drawing_styles.length;}
		if(settings.useEmotions > emotions.length){settings.useEmotions = emotions.length; useEmotions_input.value = emotions.length;}
		if(settings.usePen > pens.length){settings.usePen = pens.length; usePen_input.value = pens.length;}
		if(settings.useVisualStyle > visual_styles.length){settings.useVisualStyle = visual_styles.length; useVisualStyle_input.value = visual_styles.length;}
		
		save();
		
		
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
	
	/* For future use once I create a popup to configure the settings, loads modifiers in so the list is up to date */
	var modifierList = [];
	async function loadModifiers() {
		try {
			let res = await fetch("/get/modifiers")
			if (res.status === 200) {
				let mods = await res.json()
				setModifiers(mods);
			}
		} catch (e) {
			console.log("error fetching modifiers", e)
		}
	};
	function setModifiers(mods){
		mods.forEach(function(category){
			//console.log(category);
		});
		//console.log(modifierList);
	}

	
	/* End of Modifier load */
	
	
	//Matrix 2 arrays then combine to a single array
	function combineArrays(array1, array2, max){
		var tempArray = [];
		for(let i = 0; i < max; i++){
			if(array1.length>0){
				array1.forEach(function(item){
					tempArray.push(item+", "+array2[i]);
				});
			}else{
				tempArray[i] = array2[i];
			}
		}
		return tempArray;
	}
	
	
	
	//Generate Modifier Array
	function getModifiers(){
		var outputModifiers = [""];
		if(settings.useArtists>0){
			shuffle(artists);
			outputModifiers = combineArrays(outputModifiers, artists, settings.useArtists);
		}
		if(settings.useCGIRendering>0){
			shuffle(cgi_renderings);
			outputModifiers = combineArrays(outputModifiers, cgi_renderings, settings.useCGIRendering);
		}
		if(settings.useCGISoftware>0){
			shuffle(cgi_softwares);
			outputModifiers = combineArrays(outputModifiers, cgi_softwares, settings.useCGISoftware);
		}
		if(settings.useCamera>0){
			shuffle(cameras);
			outputModifiers = combineArrays(outputModifiers, cameras, settings.useCamera);
		}
		if(settings.useCarvingAndEtching>0){
			shuffle(carving_and_etchings);
			outputModifiers = combineArrays(outputModifiers, carving_and_etchings, settings.useCarvingAndEtching);
		}
		if(settings.useColor>0){
			shuffle(colors);
			outputModifiers = combineArrays(outputModifiers, colors, settings.useColor);
		}
		if(settings.useDrawingStyle>0){
			shuffle(drawing_styles);
			outputModifiers = combineArrays(outputModifiers, drawing_styles, settings.useDrawingStyle);
		}
		if(settings.useEmotions>0){
			shuffle(emotions);
			outputModifiers = combineArrays(outputModifiers, emotions, settings.useEmotions);
		}
		if(settings.usePen>0){
			shuffle(pens);
			outputModifiers = combineArrays(outputModifiers, pens, settings.usePen);
		}
		if(settings.useVisualStyle>0){
			shuffle(visual_styles);
			outputModifiers = combineArrays(outputModifiers, visual_styles, settings.useVisualStyle);
		}
		return outputModifiers;
	}
	
	function startRequest(reqBody, img){
		setSettings();
		loopRequests(reqBody, img);
	}
	
	function loopRequests(reqBody, img){
		if(settings.scaleStep<1){settings.scaleStep=1;}
		if(settings.ISStep<1){settings.ISStep=1;}
		var newTaskList = [];
		var seeds = [reqBody.seed];
		var tempScaleMid, tempISMid;
		var tempSamplers = samplers;
		var scales = [];
		var ISs = [];
		for (let i = 1; i <= settings.useSeeds; i++) {
			seeds.push(Math.floor(Math.random() * 2000000000));
		}
		if(settings.scaleMid<1){tempScaleMid = parseFloat(reqBody.guidance_scale);}
		else{tempScaleMid = settings.scaleMid;}
		for (let i = (Math.floor(settings.scaleCount/2)*settings.scaleStep*-1); i <= (Math.floor(settings.scaleCount/2)*settings.scaleStep); i+=settings.scaleStep) {
			scales.push(tempScaleMid + i);
		}
		if(settings.ISMid<1){tempISMid = parseInt(reqBody.num_inference_steps);}
		else{tempISMid = settings.ISMid;}
		for (let i = (Math.floor(settings.ISCount/2)*settings.ISStep*-1); i <= (Math.floor(settings.ISCount/2)*settings.ISStep); i+=settings.ISStep) {
			if((tempISMid + i)==0){ISs.push(1);}
			else{ISs.push(tempISMid + i);}
		}
		var finalModifiers = getModifiers();
		if(settings.useSamplers==0){tempSamplers = [reqBody.sampler];settings.useSamplers++;}
		shuffle(tempSamplers);
		seeds.forEach(function(setSeed){
			tempSamplers.forEach(function(sampler){
				finalModifiers.forEach(function(setMods){
					scales.forEach(function(setScale){
						ISs.forEach(function(setIS){
							const newTaskRequest = modifyCurrentRequest(reqBody, {
								num_outputs: 1,
								seed: setSeed,
								guidance_scale: setScale,
								num_inference_steps: setIS,
								prompt: reqBody.prompt + setMods
							});
							newTaskRequest.numOutputsTotal = 1;
							newTaskRequest.batchCount = 1;
							newTaskRequest.reqBody.sampler = sampler;

							delete newTaskRequest.reqBody.mask
							newTaskList.push(newTaskRequest);
						});
					});
				});
			});
		});
		
		if(settings.rh_full_random){shuffle(newTaskList)};
		newTaskList = newTaskList.slice(0,settings.maxImagesToGenerate);
		newTaskList.forEach(function(newTask) {
			createTask(newTask);
		});
	}	
	
	PLUGINS["IMAGE_INFO_BUTTONS"].push({ text: "Draw RH Variants", on_click: startRequest });
	
function addRabbitHoleSettings(){
	var openCheck = '';
	if(settings.rabbitHoleOpen){openCheck = ' active';}
	var rabbitHoleSettings = document.createElement('div');
	rabbitHoleSettings.id = 'rabbit-settings';
	rabbitHoleSettings.classList.add('panel-box');
	rabbitHoleSettings.innerHTML = 
			`<h4 class="collapsible `+openCheck+`">Rabbit Hole Settings</h4>
			<div id="rabbit-settings-entries" class="collapsible-content" style="display: block;margin-top:15px;">
				<table><tbody>
					<tr><td><b class="settings-subheader">Image Settings</b></td></tr>
					<tr class="pl-5"><td><label for="maxImagesToGenerate_input">Max Image to Generate:</label></td><td> <input id="maxImagesToGenerate_input" name="maxImagesToGenerate_input" size="10" value="`+settings.maxImagesToGenerate+`" onkeypress="preventNonNumericalInput(event)" onchange="setSettings()"><button id="calcMaxButton"><i class="fa fa-calculator"></i></button></td></tr>
					<tr class="pl-5"><td><label for="useSeeds_input">Seeds to Generate:</label></td><td> <input id="useSeeds_input" name="useSeeds_input" size="10" value="`+settings.useSeeds+`" onkeypress="preventNonNumericalInput(event)" onchange="setSettings()"></td></tr>
					<tr class="pl-5"><td><label for="useSamplers_input">Random Samplers:</label></td><td> <input id="useSamplers_input" name="useSamplers_input" size="10" value="`+settings.useSamplers+`" onkeypress="preventNonNumericalInput(event)" onchange="setSettings()"></td></tr>
					<tr class="pl-5"><td><label for="scaleCount_input">Guidance Scale Count:</label></td><td> <input id="scaleCount_input" name="scaleCount_input" size="10" value="`+settings.scaleCount+`" onkeypress="preventNonNumericalInput(event)" onchange="setSettings()"></td></tr>
					<tr class="pl-5"><td><label for="scaleStep_input">Guidance Scale Step Size:</label></td><td> <input id="scaleStep_input" name="scaleStep_input" size="10" value="`+settings.scaleStep+`" pattern="^[0-9\\.]+$" onkeypress="preventNonNumericalInput(event)" onchange="setSettings()"></td></tr>
					<tr class="pl-5"><td><label for="scaleMid_input">Guidance Scale Midpoint:</label></td><td> <input id="scaleMid_input" name="scaleMid_input" size="10" value="`+settings.scaleMid+`" pattern="^[0-9\\.]+$" onkeypress="preventNonNumericalInput(event)" onchange="setSettings()"></td></tr>
					<tr class="pl-5"><td><label for="ISCount_input">Inference Steps Count:</label></td><td> <input id="ISCount_input" name="ISCount_input" size="10" value="`+settings.ISCount+`" onkeypress="preventNonNumericalInput(event)" onchange="setSettings()"></td></tr>
					<tr class="pl-5"><td><label for="ISStep_input">Inference Steps Step Size:</label></td><td> <input id="ISStep_input" name="ISStep_input" size="10" value="`+settings.ISStep+`" onkeypress="preventNonNumericalInput(event)" onchange="setSettings()"></td></tr>
					<tr class="pl-5"><td><label for="ISMid_input">Inference Steps Midpoint:</label></td><td> <input id="ISMid_input" name="ISMid_input" size="10" value="`+settings.ISMid+`" onkeypress="preventNonNumericalInput(event)" onchange="setSettings()"></td></tr>
					<tr><td>&nbsp;</td></tr>
					
					<tr><td colspan="2"><b class="settings-subheader">Image Modifier Settings</b></td></tr>
					<tr><td colspan="2"><small><b>Warning:</b> keep numbers low here or your computer will hang.</small></td></tr>
					<tr class="pl-5"><td><label for="useArtists_input">Random Artists:</label></td><td> <input id="useArtists_input" name="useArtists_input" size="10" value="`+settings.useArtists+`" onkeypress="preventNonNumericalInput(event)" onchange="setSettings()"></td></tr>
					<tr class="pl-5"><td><label for="useCGIRendering_input">Random CGI Renderings:</label></td><td> <input id="useCGIRendering_input" name="useCGIRendering_input" size="10" value="`+settings.useCGIRendering+`" onkeypress="preventNonNumericalInput(event)" onchange="setSettings()"></td></tr>
					<tr class="pl-5"><td><label for="useCGISoftware_input">Random CGI Softwares:</label></td><td> <input id="useCGISoftware_input" name="useCGISoftware_input" size="10" value="`+settings.useCGISoftware+`" onkeypress="preventNonNumericalInput(event)" onchange="setSettings()"></td></tr>
					<tr class="pl-5"><td><label for="useCamera_input">Random Cameras:</label></td><td> <input id="useCamera_input" name="useCamera_input" size="10" value="`+settings.useCamera+`" onkeypress="preventNonNumericalInput(event)" onchange="setSettings()"></td></tr>
					<tr class="pl-5"><td><label for="useCarvingAndEtching_input">Random Carging & Etchings:</label></td><td> <input id="useCarvingAndEtching_input" name="useCarvingAndEtching_input" size="10" value="`+settings.useCarvingAndEtching+`" onkeypress="preventNonNumericalInput(event)" onchange="setSettings()"></td></tr>
					<tr class="pl-5"><td><label for="useColor_input">Random Colors:</label></td><td> <input id="useColor_input" name="useColor_input" size="10" value="`+settings.useColor+`" onkeypress="preventNonNumericalInput(event)" onchange="setSettings()"></td></tr>
					<tr class="pl-5"><td><label for="useDrawingStyle_input">Random Drawing Styles:</label></td><td> <input id="useDrawingStyle_input" name="useDrawingStyle_input" size="10" value="`+settings.useDrawingStyle+`" onkeypress="preventNonNumericalInput(event)" onchange="setSettings()"></td></tr>
					<tr class="pl-5"><td><label for="useEmotions_input">Random Emotions:</label></td><td> <input id="useEmotions_input" name="useEmotions_input" size="10" value="`+settings.useEmotions+`" onkeypress="preventNonNumericalInput(event)" onchange="setSettings()"></td></tr>
					<tr class="pl-5"><td><label for="usePen_input">Random Pens:</label></td><td> <input id="usePen_input" name="usePen_input" size="10" value="`+settings.usePen+`" onkeypress="preventNonNumericalInput(event)" onchange="setSettings()"></td></tr>
					<tr class="pl-5"><td><label for="useVisualStyle_input">Random Visual Styles:</label></td><td> <input id="useVisualStyle_input" name="useVisualStyle_input" size="10" value="`+settings.useVisualStyle+`" onkeypress="preventNonNumericalInput(event)" onchange="setSettings()"></td></tr>
					<tr><td>&nbsp;</td></tr>
					
					<tr><td><b class="settings-subheader">Other Settings</b></td></tr>
					<tr class="pl-5"><td><div class="input-toggle"><input id="rh_full_random_input" name="rh_full_random_input" type="checkbox"><label for="rh_full_random_input"></label></div> <label for="rh_full_random_input">Full Random Mode</label></td></tr>
				</tbody></table>
				<button id="newRabbitHoleBtn" class="primaryButton">Start New Rabbit Hole</button></div>
			</div>`;
	var editorSettings = document.getElementById('editor-settings');
	editorSettings.parentNode.insertBefore(rabbitHoleSettings, editorSettings.nextSibling);
	document.getElementById('newRabbitHoleBtn').addEventListener("click", function () {
		const taskTemplate = getCurrentUserRequest()
		const newTaskRequests = []
		getPrompts().forEach((prompt) => newTaskRequests.push(Object.assign({}, taskTemplate, {
			reqBody: Object.assign({ prompt: prompt }, taskTemplate.reqBody)
		})))
		newTaskRequests.forEach((task) => startRequest(task.reqBody, task.img));
		initialText.style.display = 'none'
	});
	document.getElementById('calcMaxButton').addEventListener("click", function () {
		document.getElementById('maxImagesToGenerate_input').value = Math.max(settings.useSeeds,1)*Math.max(settings.scaleCount,1)*Math.max(settings.ISCount,1)*Math.max(settings.useSamplers,1)*Math.max(settings.useArtists,1)*Math.max(settings.useCGIRendering,1)*Math.max(settings.useCGISoftware,1)*Math.max(settings.useCamera,1)*Math.max(settings.useCarvingAndEtching,1)*Math.max(settings.useColor,1)*Math.max(settings.useDrawingStyle,1)*Math.max(settings.useEmotions,1)*Math.max(settings.usePen,1)*Math.max(settings.useVisualStyle,1);
		setSettings();
	});
	createCollapsibles(rabbitHoleSettings);
}

var stepList = [settings.ISButton1,settings.ISButton2,settings.ISButton3,settings.ISButton4,settings.ISButton5];
stepList.forEach((count) => {
	if(count > 0){
		PLUGINS['IMAGE_INFO_BUTTONS'].push({ text: "Draw "+count+" Steps", on_click: getStartNewTaskHandler(count, 'IS') });
	}
});
var stepList = [settings.GSButton1,settings.GSButton2,settings.GSButton3,settings.GSButton4,settings.GSButton5];
stepList.forEach((count) => {
	if(count > 0){
		PLUGINS['IMAGE_INFO_BUTTONS'].push({ text: "Guidance Scale "+count, on_click: getStartNewTaskHandler(count, 'GS') });
	}
});
var stepList = [2];
stepList.forEach((count) => {
	if(count > 0){
		PLUGINS['IMAGE_INFO_BUTTONS'].push({ text: "I2I Render "+count+"x", on_click: getStartNewTaskHandler(count, 'I2I') });
	}
});
function buildRequest(steps, mode, reqBody, img) {
	let imageSeed = img.getAttribute('data-seed');
	imageSeed++;
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
        maskSetting.checked = false;
        samplerSelectionContainer.style.display = 'none';
		newTaskRequest.reqBody.sampler = 'ddim';
		newTaskRequest.reqBody.prompt_strength = 0.8;
		newTaskRequest.reqBody.init_image = imageElem.src;
		delete newTaskRequest.reqBody.mask;
		I2ICount--;
	}
	return newTaskRequest;
}
function getStartNewTaskHandler(steps, mode) {
	return async function(reqBody, img) {
		const newTaskRequest = buildRequest(steps, mode, reqBody, img);
		createTask(newTaskRequest);
		console.log(test);
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
					<input id="ISButton1_input" name="ISButton1_input" size="4" value="`+settings.ISButton1+`" pattern="^[0-9\-]+$" onkeypress="preventNonNumericalInput(event)" onchange="setSettings();">&nbsp;
					<input id="ISButton2_input" name="ISButton1_input" size="4" value="`+settings.ISButton2+`" pattern="^[0-9\-]+$" onkeypress="preventNonNumericalInput(event)" onchange="setSettings();">&nbsp;
					<input id="ISButton3_input" name="ISButton1_input" size="4" value="`+settings.ISButton3+`" pattern="^[0-9\-]+$" onkeypress="preventNonNumericalInput(event)" onchange="setSettings();">&nbsp;
					<input id="ISButton4_input" name="ISButton1_input" size="4" value="`+settings.ISButton4+`" pattern="^[0-9\-]+$" onkeypress="preventNonNumericalInput(event)" onchange="setSettings();">&nbsp;
					<input id="ISButton5_input" name="ISButton1_input" size="4" value="`+settings.ISButton5+`" pattern="^[0-9\-]+$" onkeypress="preventNonNumericalInput(event)" onchange="setSettings();">
				</div>
			</div>
			<div>
				<div><i class="fa fa-gear"></i></div>
				<div><label for="">Guidance Scale Buttons</label><small>set values for 4 action buttons, a value of 0 removes a button</small></div>
				<div>
					<input id="GSButton1_input" name="GSButton1_input" size="4" value="`+settings.GSButton1+`" pattern="^[0-9\.\-]+$" onkeypress="preventNonNumericalInput(event)" onchange="setSettings();">&nbsp;
					<input id="GSButton2_input" name="GSButton1_input" size="4" value="`+settings.GSButton2+`" pattern="^[0-9\.\-]+$" onkeypress="preventNonNumericalInput(event)" onchange="setSettings();">&nbsp;
					<input id="GSButton3_input" name="GSButton1_input" size="4" value="`+settings.GSButton3+`" pattern="^[0-9\.\-]+$" onkeypress="preventNonNumericalInput(event)" onchange="setSettings();">&nbsp;
					<input id="GSButton4_input" name="GSButton1_input" size="4" value="`+settings.GSButton4+`" pattern="^[0-9\.\-]+$" onkeypress="preventNonNumericalInput(event)" onchange="setSettings();">&nbsp;
					<input id="GSButton5_input" name="GSButton1_input" size="4" value="`+settings.GSButton5+`" pattern="^[0-9\.\-]+$" onkeypress="preventNonNumericalInput(event)" onchange="setSettings();">
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
		<p>These settings auto-save, reload browser after changing.</p>
			

	`;
	var settingsPage = document.getElementById('tab-content-settings');
	settingsPage.appendChild(settingsPageContent);
}
	
	
setup();