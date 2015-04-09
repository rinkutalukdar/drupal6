<?php
function custommod_tell_a_friend_admin_settings(){
	$form['custommod_taf_email_subject'] = array(
		'#title' => t('Email subject'),
		'#type' => 'textfield',
		'#default_value' => variable_get('custommod_taf_email_subject', ''),
		'#description' => t('Enter the email subject'),
		'#required' => TRUE
	);
	$form['custommod_taf_email_template'] = array(
		'#title' => t('Email template that is used to send to the recepient'),
		'#type' => 'textarea',
		'#default_value' => variable_get('custommod_taf_email_template',''),
		'#required' => TRUE
	);
	return system_settings_form($form);
}

function custommod_admin_settings(){

	$form['custommod_languages'] = array(
		'#title' => t('Languages to be displayed on top-right corner of the site'),
		'#type' => 'textarea',
		'#default_value' => variable_get('custommod_languages',
		'www.schizophrenia24x7.com|English'."\n".'www.schizophrenia24x7.es|Spanish'."\n".'www.schizophrenia24x7.be|Belarusian'."\n".'www.schizophrenia24x7.fr|French'),
		'#description' => t('Enter the list of languages and its corresponding sites which will be displayed to the user to select a language. Enter one language in each line as URL|Language. Example: www.schizophrenia24x7.com|English .'),
		'#required' => TRUE
	);
	$form['custommod_main_site'] = array(
		'#title' => t('Main site URL'),
		'#type' => 'textfield',
		'#default_value' => variable_get('custommod_main_site', 'http://www.schizophrenia24x7.com'),
		'#description' => t('Enter the main sites url .'),
		'#required' => TRUE
	);

	$form['custommod_popup_text'] = array(
		'#title' => t('Popup introduction text'),
		'#type' => 'textarea',
		'#default_value' => variable_get('custommod_popup_text', "
<div class='popup_title'><img src='/sites/all/themes/psychiatry24x7/images/select-your-language.jpg' alt='select-language'/></div>
<br/>
<p>You are currently viewing this site in English.
<br/>
Please select a language from the drop down menu.
</p>
<br/>"),
		'#description' => t('Enter the content to be displayed to the user when country popup is shown.'),
		'#required' => TRUE
	);

	$form['custommod_additional_languages'] = array(
		'#title' => t('Popup language selection drop down'),
		'#type' => 'textarea',
		'#default_value' => variable_get('custommod_additional_languages',''),
		'#description' => t('Enter the list of languages that should appear in the popup when the user loads this site. If this site does not have any additional languages, then leave it blank. Enter one language in each line as URL|Language. Example: www.schizophrenia24x7.com|English .'),
		'#required' => FALSE
	);
	return system_settings_form($form);
}