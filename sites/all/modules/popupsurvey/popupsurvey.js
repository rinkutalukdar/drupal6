function popupsurvey() {
  var val = 0;
	if ($("#checksurvey").attr("checked")){
	val=1;
	}
	else {
	val=0;
	}
	location.href=Drupal.settings.basePath+"set-survey-cookie/"+val+"?redirect="+location.href;
}
$(document).ready(function(){
	/* Page redirection settings on page load */
	if($("input[name='contactus_page_redirect']:checked").val() == 0){
	$("#contactus_redirect_custom_url_thankyou_message").hide();
	}else if($("input[name='contactus_page_redirect']:checked").val() == 2){
	$("#contactus_redirect_custom_url_thankyou_message").show();
	}else{
	$("#contactus_redirect_custom_url_thankyou_message").hide();
	}
	/* End */
$("input[name='contactus_page_redirect']").click(function(){show_contactus_redirection_settings_extra(this.value);});
});
/*
*	Start of Page redirect settings call back function
*/
function show_contactus_redirection_settings_extra(contactusRedirectSettingsValue) {
	switch(contactusRedirectSettingsValue){
		case '0':
		$("#contactus_redirect_custom_url_thankyou_message").hide();
		break;
		case '1':
		$("#contactus_redirect_custom_url_thankyou_message").hide();
		break;
		case '2':
		$("#contactus_redirect_custom_url_thankyou_message").show();
		break;
	}
}
