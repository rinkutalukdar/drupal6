/*** Capgemini :: Added the below code to show/hide X-Frame-Options related settings fields */
$(document).ready(function() {
	// Show/Hide X-Frame-Options header option fields
	$("#edit-enable-iframe-header").bind("click", function(){
		if (this.checked) {
			$('#iframe-header-options-wrapper').css('display','inline'); 
			$('#iframe-header-url-wrapper').css('display','inline');
		}
		else {
			$('#iframe-header-options-wrapper').css('display','none'); 
			$('#iframe-header-url-wrapper').css('display','none');
			// Clear URL value if ALLOW-FROM is not selected
			$('#edit-iframe-header-url').val('');
		}
	});
	
	$("#edit-iframe-header-options").bind("change", function(){
		if (this.value == 'ALLOW-FROM') {
			$('#iframe-header-url-wrapper').css('display','inline'); 
		}
		else {
			$('#iframe-header-url-wrapper').css('display','none');
			// Clear URL value if ALLOW-FROM is not selected
			$('#edit-iframe-header-url').val('');
		}
	});	
});