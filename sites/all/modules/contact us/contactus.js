$(document).ready(function(){
	// For hiding the FCKEditor for textarea.
	if (Drupal.settings.contactus.argCustom == '')
	{
		$("div.textarea-identifier").hide();
	}

	/* Page redirection settings on page load */
	if($("input[@name='contactus_page_redirect']:checked").val() == 0){
		$("#edit-contactus-thanksmessage-wrapper").show();
		$("#contactus_redirect_custom_url").hide();
		$("#contactus_redirect_thankyouMessage").hide();
	}else if($("input[@name='contactus_page_redirect']:checked").val() == 2){
		$("#edit-contactus-thanksmessage-wrapper").hide();
		$("#contactus_redirect_custom_url").show();
	}else{
		$("#contactus_redirect_custom_url").hide();
		$("#edit-contactus-thanksmessage-wrapper").hide();
		$("#contactus_redirect_thankyouMessage").show();
	}
	/* End */

	if($("input:checkbox[name='contactus_register_link']").attr("checked") == true){
		$("#contactus_registration_page_url").show();
	} else {
		$("#contactus_registration_page_url").hide();
	}


	//disabled radio buttons according to register link
	if ($("#edit-contactus-register-link").attr("checked") == true) {
		$('input[@name=contactus_page_redirect]').each(function(){
			if ($(this).val() == 2) {
				$(this).attr("disabled", "disabled");
			}
		});
	}



});

Drupal.behaviors.contactus = function() {
	if (Drupal.settings.contactus.argCustom == '')
	{
		$("div.textarea-identifier").hide();
	}

	$("select#edit-contactus-entity").change(function() {
		var entity = $("select#edit-contactus-entity").val();
		$.post("?q=contactus/get_form/"+ entity,{},
			function(data){ $("input[name='contactus_subject_form']").removeAttr("checked");
				if (data && data != 'default') {
					$("input[name='contactus_subject_form'][value=" + data + "]").attr("checked", "checked");
				}
				else
					$("input[name='contactus_subject_form']").removeAttr("checked");
		});
	});

	$("select#edit-subject").change(function() {
		var cUrl = Drupal.settings.contactus.cleanUrl;
		var url = location.protocol +"//"+ location.host + Drupal.settings.basePath + cUrl + "contactus/";
		window.location = url + $("select#edit-subject").val();
  });


	// To display the form fields of the current form using tooltip
	/*$("span.contactus-form-objects").mouseover(function() {
		formData = $(this).html(); formData = formData.replace('&amp;',"*");
		formText = '';
		$.post("?q=contactus/get_layer/" + formData,{},
		function(formText){
			if (formText && formText != '') {
				tooltip.show(formText, 0, 0);
			}
			else
				tooltip.show('No fields available', 0, 0);
		});
	});*/

	// To hide the tooltip
	/*$("span.contactus-form-objects").mouseout(function() {
		tooltip.hide();
	});*/

	/*$("span").mouseover(function() {
		if ($(this).attr("class") != 'contactus-form-objects')
		{
			tooltip.show('', 0, 1);
		}
	});*/

	/*$("div").mouseover(function() {
		tooltip.show('', 0, 1);
	});*/

	$("#edit-contactus-create-form").click(function() {
		var url = location.protocol +"//"+ location.host + Drupal.settings.basePath + "admin/settings/formbuilder/contactus";
		window.open(url);
		return false;
	});
}


function test(t){
	ajaxurl = $("#edit-url").val();
    var modalOptions = {
      url: ajaxurl+'/admin/settings/contactus/pre/'+ t,
      autoResize: true
    };

    // Try to obtain the dialog size from the className of the element.
      modalOptions.width = 450;
      modalOptions.height = 450;

    // Open the modal frame dialog.
    Drupal.modalFrame.open(modalOptions);
}


//this is for redirect the custom contact us page url
$(function() {

			/*	For Result page Redirection	*/
			/*	--Result Page Code Start--	*/
			$("input[@name='contactus_page_redirect']").click(function(){show_contactus_redirection_settings(this.value);});
			/*	--Result Page Code Ends--	*/

			$("input[@name='contactus_register_link']").click(function(){show_enforced_contactus_page(this.checked);});


});

/*
*	Start of Page redirect settings call back function
*/

function show_contactus_redirection_settings(contactusRedirectSettingsValue){

	switch(contactusRedirectSettingsValue){

		case '0':
			$("#edit-contactus-thanksmessage-wrapper").show();
			$("#contactus_redirect_custom_url").hide();
		break;

		case '1':
			$("#contactus_redirect_custom_url").hide();
			$("#edit-contactus-thanksmessage-wrapper").hide();
			$("#contactus_redirect_thankyouMessage").show();
		break;

		case '2':
			$("#edit-contactus-thanksmessage-wrapper").hide();
			$("#contactus_redirect_custom_url").show();
			$("#contactus_redirect_thankyouMessage").hide();
		break;
	}
}


/*
*	Start of Page redirect settings call back function
*/

function show_enforced_contactus_page(RedirectSettingsValue){
	//alert(RedirectSettingsValue+'--');
	if(RedirectSettingsValue == true) {
		$("#contactus_registration_page_url").show();
		//enable/disabled the radio buttons according to register link
		$('input[@name=contactus_page_redirect]').each(function(){
			$("#contactus_redirect_custom_url").hide();
			$("#contactus_redirect_thankyouMessage").show();
			if($(this).val() == 1) {
				$(this).attr("checked", "checked");
			}
			if ($(this).val() == 2) {
				$(this).attr("disabled", "disabled");
				$(this).removeAttr("enabled");
			}
		});

	} else {
		$("#contactus_registration_page_url").hide();
		//enable/disabled the radio buttons according to register link
		$('input[@name=contactus_page_redirect]').each(function(){
			if ($(this).val() == 2) {
				$(this).attr("enabled", "enabled");
				$(this).removeAttr("disabled");
			}
		});

	}
}