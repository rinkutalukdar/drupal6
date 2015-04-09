<?php
	// $Id: user_profile.admin.inc, 06/10/2010

	/**
	* @file
	* Admin page callback file for the ITrInno User Profile module.
	*/

	/**
	*  User profile variable settings form.
	*/
	function admin_use_profile_settings_form($form_state) {
		$form['user_profile_serviceUrl'] = array(
			'#type' => 'textfield',
			'#title' => t('User Profile Service URL'),
			'#maxlength' => 255,
			'#required' => FALSE,
			'#description' => t("Service Url setting to bypass the framework service registry settings."),
			'#default_value' => variable_get('user_profile_serviceUrl', null),
		);

		$form['user_profile_SiteId'] = array(
			'#type' => 'textfield',
			'#title' => t('User Profile Site Id'),
			'#maxlength' => 255,
			'#required' => FALSE,
			'#description' => t("Site Id setting to override the framework Site Id settings."),    
			'#default_value' => variable_get('user_profile_SiteId', null),
		);

		$form['user_profile_SiteAuthKey'] = array(
			'#type' => 'textfield',
			'#title' => t('User Profile Site Authkey'),
			'#maxlength' => 255,
			'#required' => FALSE,
			'#description' => t("Site AuthKey setting here will override the framework Site Authkey settings."),    
			'#default_value' => variable_get('user_profile_SiteAuthKey', null),
		);

		return system_settings_form($form);
	}
	
	
	
	
?>