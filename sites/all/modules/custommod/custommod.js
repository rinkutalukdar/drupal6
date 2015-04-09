function custommod_choose_language(context){
	var value = "";
  var validation_message = Drupal.t('Please select a language.')
	if(context == 1){
		if(document.getElementById("language_selector_top").value == ""){
			alert(validation_message);
			return false;
		}
		else {
			value = document.getElementById("language_selector_top").value;
		}
	}
	else {
		if(document.getElementById("language_selector_popup").value == ""){
			alert(validation_message);
			return false;
		}
		else {
			value = document.getElementById("language_selector_popup").value;
		}
	}
	//location.href=$("#base_site").val()+"/setcookie?v="+value;
	location.href="/setcookie?v="+value;
}

$(document).ready(function(){
	var c_name = "schizophernia-language";
	/*if(!$.cookie(c_name)) {
		setTimeout(function() {
			//$('#choose_language').triggerHandler("click");
			}
		, 5000);
	}*/
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
});
function custommod_tell_friend_validate(){
	var flag = 0;
	if ($.trim($("#edit-your-name").val()) == "") {
		if($("#edit-your-name-wrapper .error").length){
			$("#edit-your-name-wrapper .error").text(Drupal.t("Please enter your name"));
		}
		else {
			$("#edit-your-name-wrapper").append("<span class='error'>"+Drupal.t("Please enter your name")+"</span>");
		}
		flag = 1;
	}
	else {
		$("#edit-your-name-wrapper .error").text("");
	}

	if ($.trim($("#edit-your-email").val()) == "") {
		if($("#edit-your-email-wrapper .error").length){
			$("#edit-your-email-wrapper .error").text(Drupal.t("Please enter your email"));
		}
		else {
			$("#edit-your-email-wrapper").append("<span class='error'>"+Drupal.t("Please enter your email")+"</span>");
		}
		flag = 1;
	}
	else {
		$("#edit-your-email-wrapper .error").text("");
		if(!validateEmail($.trim($("#edit-your-email").val()))) {
			if($("#edit-your-email-wrapper .error").length){
				$("#edit-your-email-wrapper .error").text(Drupal.t("Please enter a valid email address"));
			}
			else {
				$("#edit-your-email-wrapper").append("<span class='error'>"+Drupal.t("Please enter a valid email address")+"</span>");
			}
			flag = 1;
		}
		else {
			$("#edit-your-email-wrapper .error").text("");
		}
	}

	if ($.trim($("#edit-friend-name").val()) == "") {
		if($("#edit-friend-name-wrapper .error").length){
			$("#edit-friend-name-wrapper .error").text(Drupal.t("Please enter your friend's name"));
		}
		else {
			$("#edit-friend-name-wrapper").append("<span class='error'>"+Drupal.t("Please enter your friend's name")+"</span>");
		}
		flag = 1;
	}
	else {
		$("#edit-friend-name-wrapper .error").text("");
	}
	if ($.trim($("#edit-friend-email").val()) == "") {
		if($("#edit-friend-email-wrapper .error").length){
			$("#edit-friend-email-wrapper .error").text(Drupal.t("Please enter your friend's email"));
		}
		else {
			$("#edit-friend-email-wrapper").append("<span class='error'>"+Drupal.t("Please enter your friend's email")+"</span>");
		}
		flag = 1;
	}
	else {
		$("#edit-friend-email-wrapper .error").text("");
		if(!validateEmail($.trim($("#edit-friend-email").val()))) {
			if($("#edit-friend-email-wrapper .error").length){
				$("#edit-friend-email-wrapper .error").text(Drupal.t("Please enter a valid email address"));
			}
			else {
				$("#edit-friend-email-wrapper").append("<span class='error'>"+Drupal.t("Please enter a valid email address")+"</span>");
			}
			flag = 1;
		}
		else {
			$("#edit-friend-email-wrapper .error").text("");
		}
	}

	/*if ($.trim($("#edit-message").val()) == "") {
		if($("#edit-message-wrapper .error").length){
			$("#edit-message-wrapper .error").text(Drupal.t("Please enter your personal message"));
		}
		else {
			$("#edit-message-wrapper").append("<span class='error'>"+Drupal.t("Please enter your personal message")+"</span>");
		}
		flag = 1;
	}
	else {
		$("#edit-message-wrapper .error").text("");
	}*/
	if (flag == 1)
		return false;
	return true;
}

function validateEmail(email) {
	var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
	if( !emailReg.test( email ) ) {
		return false;
	} else {
		return true;
	}
}

function open_preview_letter(){
	if(markinspace_validate()){
		preview_letter_window=dhtmlmodal.open('preview_letter_window', 'div', 'modalalertdiv', 'Age Check', '','width=350px,height=555px,left=430px,top=40px,resize=0,scrolling=0');
	}
}
function close_preview_letter(){
	preview_letter_window.hide();
}

function markinspace_validate(){
	var valid=1;
	$(".write-to-frnd-container #your_name").removeClass('error');
	$(".write-to-frnd-container #friend_name").removeClass('error');
	$(".write-to-frnd-container #friend_email").removeClass('error');
	$(".write-to-frnd-container #your_message").removeClass('error');
	if ($(".write-to-frnd-container #your_name").val()=='' || $(".write-to-frnd-container #your_name").val()==Drupal.t("Please enter your name")){
		$(".write-to-frnd-container #your_name").addClass('error');
		valid=0;
	}
	if ($(".write-to-frnd-container #friend_name").val()=='' || $(".write-to-frnd-container #friend_name").val()==Drupal.t("Please enter your friend's name")){
		$(".write-to-frnd-container #friend_name").addClass('error');
		valid=0;
	}
	if ($(".write-to-frnd-container #friend_email").val()=='' || $(".write-to-frnd-container #friend_email").val()==Drupal.t("Please enter your friend's email")){
		$(".write-to-frnd-container #friend_email").addClass('error');
		valid=0;
	}
	if ($(".write-to-frnd-container #your_message").val()=='' || $(".write-to-frnd-container #your_message").val()==Drupal.t("Please enter a suitable message (no swear words or drug names please)")){
		$(".write-to-frnd-container #your_message").addClass('error');
		valid=0;
	}
	return valid;
}

function markinspace_add_friends(){
	var num_friends = $('.markinspace_friend_name').length;
	var content = "";
	for(var i=0;i<6;i++){
		content += '<div class="item-row"><label>Your friend\'s name</label><input type="text" id="friend_name_'+i+'" class="markinspace_friend_name"></div><div class="item-row"><label>Your friend\'s email address</label><input type="text" class="markinspace_friend_email" id="friend_email_'+i+'"></div>';
	}
	$(".write-to-frnd-container #friend_email").parent().after(content);
}

function markinspace_email_friends(){
	if(markinspace_validate()){
		markinspace_send_email('email');
	}
}
function markinspace_email_print(){
	if(markinspace_validate()){
		markinspace_send_email('print');
	}
}
function markinspace_send_email(action){
	var json_data = "{";
    json_data+= '"your_name":'+'"'+$(".write-to-frnd-container #your_name").val()+'",';
	$(".write-to-frnd-container .markinspace_friend_name").each(function(){
		json_data+='"'+$(this).attr('id')+'":"'+$(this).val()+'",';
	});
	$(".write-to-frnd-container .markinspace_friend_email").each(function(){
		json_data+='"'+$(this).attr('id')+'":"'+$(this).val()+'",';
	});
	$('.write-to-frnd-container input:radio').each(function(){
		var label_radio = $(this).parent();
		if($(label_radio).hasClass('selected')){
			json_data+='"radio_option":"'+$(label_radio).text()+'",';
		}
	});
	var pos = json_data.lastIndexOf(',');
	json_data = json_data.substring(0,pos);
	
	json_data += "}";
	$.ajax({
        url: '/markinspace/send_email',
        method: 'POST',
        data: "action="+action+"&json="+json_data,
        success: function(data){
			if(action=='email'){
				email_window=dhtmlmodal.open('email_window', 'div', 'emailalertdiv', 'Email alert','', 'width=330px,height=166px,left=490px,top=40px,resize=0,scrolling=0');
			}
			else if(action=='print'){
				var json = eval("("+data+")");
				var myWindow=window.open('','','width=500,height=555');
				myWindow.document.write(json.data);
				
				myWindow.document.close();
				myWindow.focus();
				myWindow.print();
				myWindow.close();
			}
		}
      });
}
function openWin()
  {
    var myWindow=window.open('','','width=200,height=100');
    myWindow.document.write("<p>This is 'myWindow'</p>");
    
    myWindow.document.close();
myWindow.focus();
myWindow.print();
myWindow.close();
    
  }