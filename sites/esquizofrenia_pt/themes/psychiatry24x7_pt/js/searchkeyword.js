$(document).ready(function() {
	$("#edit-search-block-form-1").val(Drupal.t('Keyword'));
	$("#edit-search-block-form-1").focus( function() {
		if (Drupal.t("Keyword") == this.value){
			this.value = ''
		}
	});
	$("#edit-search-block-form-1").blur( function() {
		if (this.value == '') {
			this.value = Drupal.t("Keyword")
		}
	});
// search submit button not working in home page, so write a click hack
	$(".front_page .search_button #edit-submit").click(
		function(){
			location.href="/search/node/"+$(".search_box #edit-search-block-form-1").val();
			return false;
		}
	);
});

function user_login_validate(){
	if($('#edit-name').val()=='' || $('#edit-pass').val()==''){
		$("#error_msg").html('');
		$('<span class="err-msg-ctr"><span class="msg-spans">'+Drupal.t("Please enter email address and password")+"</span></span>").appendTo("#error_msg");
		return false;
	}else{
		$("#error_msg").html('');
	}
	return true;
}
function user_pass_validate(){
	if($('#edit-name').val()==''){
		$("#error_msg").html('');
		$('<span class="err-msg-ctr"><span class="msg-spans">'+Drupal.t("Please enter email address")+"</span></span>").appendTo("#error_msg");
		return false;
	}else{
		$("#error_msg").html('');
	}
	return true;
}
function user_change_pass_validate(){
	if($('#edit-name').val()==''){
		$("#error_msg").html('');
		$("#error_msg").css('padding-top','80px');
		$('<span class="err-msg-ctr"><span class="msg-spans">'+Drupal.t("Please enter email address")+"</span></span>").appendTo("#error_msg");
		return false;
	}
	else if($('#edit-pass').val()==''){
		$("#error_msg").html('');
		$("#error_msg").css('padding-top','120px');
		$('<span class="err-msg-ctr"><span class="msg-spans">'+Drupal.t("Please enter current password")+"</span></span>").appendTo("#error_msg");
		return false;
	}
	else if($('#edit-new-pass').val()==''){
		$("#error_msg").html('');
		$("#error_msg").css('padding-top','160px');
		$('<span class="err-msg-ctr"><span class="msg-spans">'+Drupal.t("Please enter new password")+"</span></span>").appendTo("#error_msg");
		return false;
	}
	else if($('#edit-confirm-pass').val()==''){
		$("#error_msg").html('');
		$("#error_msg").css('padding-top','200px');
		$('<span class="err-msg-ctr"><span class="msg-spans">'+Drupal.t("Please confirm the password")+"</span></span>").appendTo("#error_msg");
		return false;
	}
	else if($('#edit-confirm-pass').val()!=$('#edit-new-pass').val()){
		$("#error_msg").html('');
		$("#error_msg").css('padding-top','180px');
		$('<span class="err-msg-ctr"><span class="msg-spans">'+Drupal.t("Passwords do not match")+"</span></span>").appendTo("#error_msg");
		return false;
	}else{
		$("#error_msg").html('');
	}
	return true;
}
function user_register_validate(){
	$("#body_container #body_middle").css("overflow","visible");
	if($('#edit-mail').val()==''){
		$("#error_msg").html('');
		$("#error_msg").css('padding-top','76px');
		$('<span class="err-msg-ctr"><span class="msg-spans">'+Drupal.t("Please enter email address")+"</span></span>").appendTo("#error_msg");
		return false;
	}
	else if($('#edit-pass-pass1').val()==''){
		$("#error_msg").html('');
		$("#error_msg").css('padding-top','164px');
		$('<span class="err-msg-ctr"><span class="msg-spans">'+Drupal.t("Please enter your password")+"</span></span>").appendTo("#error_msg");
		return false;
	}
	else if($('#edit-pass-pass2').val()==''){
		$("#error_msg").html('');
		$("#error_msg").css('padding-top','212px');
		$('<span class="err-msg-ctr"><span class="msg-spans">'+Drupal.t("Please confirm your password")+"</span></span>").appendTo("#error_msg");
		return false;
	}
	else if($('#edit-pass-pass1').val()!=$('#edit-pass-pass2').val()){
		$("#error_msg").html('');
		$("#error_msg").css('padding-top','212px');
		$('<span class="err-msg-ctr"><span class="msg-spans">'+Drupal.t("Passwords do not match")+"</span></span>").appendTo("#error_msg");
		return false;
	}
	else if($('#edit-timezone-name').val()==""){
		$("#error_msg").html('');
		$("#error_msg").css('padding-top','76px');
		$('<span class="err-msg-ctr"><span class="msg-spans">'+Drupal.t("Please enter your timezone")+"</span></span>").appendTo("#error_msg");
		return false;
	}
	else if($('#edit-aboutme').val()==""){
		$("#error_msg").html('');
		$("#error_msg").css('padding-top','164px');
		$('<span class="err-msg-ctr"><span class="msg-spans">'+Drupal.t("Please enter your profession")+"</span></span>").appendTo("#error_msg");
		return false;
	}
	else if($('#edit-privacy-policy').attr("checked")==false){
		$("#error_msg").html('');
		$("#error_msg").css('padding-top','245px');
		$('<span class="err-msg-ctr"><span class="msg-spans">'+Drupal.t("Please confirm that you have read the privacy policy")+"</span></span>").appendTo("#error_msg");
		return false;
	}
	else{
		$("#error_msg").html('');
	}
	return true;
}
//endif

/*$(document).ready(function() {
	$("#gtb").val(Drupal.t('Keyword'));
	$("#gtb").focus( function() {
		if (Drupal.t("Keyword") == this.value){
			this.value = ''
		}
	});
	$("#gtb").blur( function() {
		if (this.value == '') {
			this.value = Drupal.t("Keyword")
		}
	});
	});*/
// search submit button not working in home page, so write a click hack
/*	$(".front_page .search_button #edit-submit").click(
		function(){
			location.href="/search/node/"+$(".search_box #edit-search-block-form-1").val();
			return false;
		}
	);
}); */
//endif