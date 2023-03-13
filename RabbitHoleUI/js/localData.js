var RabbitHoleUI = {
	currentPrompt : {
        prompt : document.getElementById('prompt').value,
        negative_prompt : document.getElementById('negative_prompt').value,
        width : document.getElementById('width').value,
        height : document.getElementById('height').value,
        num_inference_steps : document.getElementById('num_inference_steps').value,
        show_only_filtered_image : document.getElementById('show_only_filtered_image').value,
        use_face_correction : document.getElementById('use_face_correction').value,
        use_upscale : document.getElementById('use_upscale').value,
        use_hypernetwork_model : document.getElementById('use_hypernetwork_model').value,
        use_vae_model : document.getElementById('use_vae_model').value,
        session_id : document.getElementById('session_id').value,
        seed : document.getElementById('seed').value,
        sampler_name : document.getElementById('sampler_name').value,
        use_stable_diffusion_model : document.getElementById('use_stable_diffusion_model').value,
        guidance_scale : document.getElementById('guidance_scale').value,
        output_quality : document.getElementById('output_quality').value,
        save_to_disk_path : document.getElementById('save_to_disk_path').value,
        metadata_output_format : document.getElementById('metadata_output_format').value,
        image_count : document.getElementById('image_count').value
    }
};

function save(){
	RabbitHoleUI = {
        currentPrompt : {
            prompt : document.getElementById('prompt').value,
            negative_prompt : document.getElementById('negative_prompt').value,
            width : document.getElementById('width').value,
            height : document.getElementById('height').value,
            num_inference_steps : document.getElementById('num_inference_steps').value,
            show_only_filtered_image : document.getElementById('show_only_filtered_image').value,
            use_face_correction : document.getElementById('use_face_correction').value,
            use_upscale : document.getElementById('use_upscale').value,
            use_hypernetwork_model : document.getElementById('use_hypernetwork_model').value,
            use_vae_model : document.getElementById('use_vae_model').value,
            session_id : document.getElementById('session_id').value,
            seed : document.getElementById('seed').value,
            sampler_name : document.getElementById('sampler_name').value,
            use_stable_diffusion_model : document.getElementById('use_stable_diffusion_model').value,
            guidance_scale : document.getElementById('guidance_scale').value,
            output_quality : document.getElementById('output_quality').value,
            save_to_disk_path : document.getElementById('save_to_disk_path').value,
            metadata_output_format : document.getElementById('metadata_output_format').value,
            image_count : document.getElementById('image_count').value
        }
    };
    localStorage.setItem('RabbitHoleUI', JSON.stringify(RabbitHoleUI));
}
function load() {
	var tempSettings = JSON.parse(localStorage.getItem('RabbitHoleUI'));
	for(var key in tempSettings){
		RabbitHoleUI[key] = tempSettings[key];
	}
    document.getElementById('prompt').value = RabbitHoleUI.currentPrompt.prompt
    document.getElementById('negative_prompt').value = RabbitHoleUI.currentPrompt.negative_prompt
    document.getElementById('width').value = RabbitHoleUI.currentPrompt.width
    document.getElementById('height').value = RabbitHoleUI.currentPrompt.height
    document.getElementById('num_inference_steps').value = RabbitHoleUI.currentPrompt.num_inference_steps
    document.getElementById('show_only_filtered_image').value = RabbitHoleUI.currentPrompt.show_only_filtered_image
    document.getElementById('use_face_correction').value = RabbitHoleUI.currentPrompt.use_face_correction
    document.getElementById('use_upscale').value = RabbitHoleUI.currentPrompt.use_upscale
    document.getElementById('use_hypernetwork_model').value = RabbitHoleUI.currentPrompt.use_hypernetwork_model
    document.getElementById('use_vae_model').value = RabbitHoleUI.currentPrompt.use_vae_model
    document.getElementById('session_id').value = RabbitHoleUI.currentPrompt.session_id
    document.getElementById('seed').value = RabbitHoleUI.currentPrompt.seed
    document.getElementById('sampler_name').value = RabbitHoleUI.currentPrompt.sampler_name
    document.getElementById('use_stable_diffusion_model').value = RabbitHoleUI.currentPrompt.use_stable_diffusion_model
    document.getElementById('guidance_scale').value = RabbitHoleUI.currentPrompt.guidance_scale
    document.getElementById('output_quality').value = RabbitHoleUI.currentPrompt.output_quality
    document.getElementById('save_to_disk_path').value = RabbitHoleUI.currentPrompt.save_to_disk_path
    document.getElementById('metadata_output_format').value = RabbitHoleUI.currentPrompt.metadata_output_format
    document.getElementById('image_count').value = RabbitHoleUI.currentPrompt.image_count
}
function setup() {
	//If local storage doesn't exist, save a copy, else load existing.
	if(localStorage.getItem('RabbitHoleUI') === null){
		save();
	}else{
		load();
	}
}