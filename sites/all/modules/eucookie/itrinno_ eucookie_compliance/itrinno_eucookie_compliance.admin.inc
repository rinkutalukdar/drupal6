<?php

function eu_cookie_tweaks_form() {
  // global $language; // Commented by dibyendu on 21st may 2013 to manage the language from language dropdown
  // $lang = $language->language; // Commented by dibyendu on 21st may 2013 to manage the language from language dropdown
  
  // Added by Dibyendu on 21st May 2013 for integrating language //
	$varLang = array();
	$languageList = language_list();
	foreach($languageList as $key=>$val) {
		$varLang[$key] = $languageList[$key]->name;
	}
	 $reqUrl = $_SERVER['REQUEST_URI'];
	 $reqUrlExp = explode('/',$reqUrl);
	 $reqUrlExpCount = count($reqUrlExp);
	 $selectedVal = $reqUrlExp[$reqUrlExpCount-1];
	 if($selectedVal=='eu-cookie-compliance') {
		$lang = 'en';
	 } else {
		$lang = $selectedVal;
	 }
	$varLangChk = array();
	foreach($languageList as $key=>$val) {
		$varLangChk[] = $key;
	}
	if(!@in_array($lang,$varLangChk)) {
	 drupal_goto('/admin/settings/eu-cookie-compliance');
	}	 
	$form['select_contact_language'] = array(
	  '#type' => 'select', 
	 '#title' => t('Choose language'), 
	 '#default_value' => $lang,
	  '#options' => $varLang,
	  '#attributes' => array('id'=>'cnt_lng1','onChange'=>'changeLangForCookieConfigurationSettings(document.getElementById("cnt_lng1").value);'),
	);

  // Added by Dibyendu on 21st May 2013 for integrating language End //  
  $get_values = get_variable_value('eu_cookie_settings_' . $lang);
  if(empty($get_values)) {
    $get_values = get_variable_value('eu_cookie_settings_en');
	drupal_add_js('alert("Please Click on save configuration to set the values otherwise settings will not be effective for the current language.");','inline');
  }
  # the options to display in our form radio buttons
  $options = array(
	'0' => t('None'), 	
	'1' => t('Implied'),
	'2' => t('Explicit'), 	
  );
  
  $form['eu_cookie_settings_' . $lang] = array (
    '#type'  => 'item',
    '#tree'   => TRUE,
  );
 
  // set impact level for the site 
  $form['eu_cookie_settings_' . $lang]['site_impact_level'] = array(
    '#type' => 'radios',
    '#title' => t('Site impact level'),
    '#options' => $options,
	'#weight' => 1,
    '#description' => t('What is the impact level of the site?'),
    '#default_value' => isset($get_values['site_impact_level']) ? $get_values['site_impact_level'] : 0,
  );
  
  $form['eu_cookie_settings_' . $lang]['set_page_impact_level'] = array(
    '#type' => 'fieldset',
    '#title' => t('Set page impact page level'),
    '#weight' => 2,
    '#collapsible' => TRUE,
    '#collapsed' => TRUE,
  );
 
  /*$form['eu_cookie_settings_' . $lang]['set_page_impact_level']['implied_pages'] = array(
    '#type' => 'textarea',
    '#title' => t('Implied impact pages'),    
    '#description' => t('Enter the paths to the textarea fields for which you want to enforce implied impact level.'),
    '#default_value' => $get_values['set_page_impact_level']['implied_pages'],
  );*/
  
  $form['eu_cookie_settings_' . $lang]['set_page_impact_level']['explicit_pages'] = array(
    '#type' => 'textarea',
    '#title' => t('Explicit impact pages'),    
    '#description' => t('Enter the paths to the textarea fields for which you want to enforce explicit impact level.'),
    '#default_value' => $get_values['set_page_impact_level']['explicit_pages'],
  );
  
  $form['eu_cookie_settings_' . $lang]['explicit_consent_country_codes'] = array(
    '#type' => 'textarea',
    '#title' => t('Country specific consent'), 
    '#weight' => 3,	
    '#description' => t('Enter one country code per each line where explicit consent is required. Eg UK for United Kingdom. For country code, check this <a href="http://userpage.chemie.fu-berlin.de/diverse/doc/ISO_3166.html" >http://userpage.chemie.fu-berlin.de/diverse/doc/ISO_3166.html.</a>. Leave blank if cookie policy is applied to all countries.'),
    '#default_value' => isset($get_values['explicit_consent_country_codes']) ? $get_values['explicit_consent_country_codes'] : 'IN',
  );
  $form['eu_cookie_settings_' . $lang]['country_banner'] = array(
    '#type' => 'textarea',
    '#title' => t('Country Consent Pop-up Filter'), 
    '#weight' => 4,	
    '#description' => t('Enter the countries for country consent banner to appear as a pop-up. '),
    '#default_value' => isset($get_values['country_banner']) ? $get_values['country_banner'] : 'NL',
  );
  $form ['#submit'][] = 'ui_settings_submit';
  return system_settings_form($form);
}

function eu_cookie_tweaks_ui_settings() {
  //global $language; // Commented by dibyendu on 21st may 2013 to manage the language from language dropdown
  //$lang = $language->language; // Commented by dibyendu on 21st may 2013 to manage the language from language dropdown

  // Added by Dibyendu on 21st May 2013 for integrating language //
	$varLang = array();
	$languageList = language_list();
	foreach($languageList as $key=>$val) {
		$varLang[$key] = $languageList[$key]->name;
	}
	 $reqUrl = $_SERVER['REQUEST_URI'];
	 $reqUrlExp = explode('/',$reqUrl);
	 $reqUrlExpCount = count($reqUrlExp);
	 $selectedVal = $reqUrlExp[$reqUrlExpCount-1];
	 if($selectedVal=='ui-configuration') {
		$lang = 'en';
	 } else {
		$lang = $selectedVal;
	 }
	$varLangChk = array();
	foreach($languageList as $key=>$val) {
		$varLangChk[] = $key;
	}
	if(!@in_array($lang,$varLangChk)) {
	 drupal_goto('/admin/settings/eu-cookie-compliance/ui-configuration');
	}	 
	$form['select_contact_language'] = array(
	  '#type' => 'select', 
	 '#title' => t('Choose language'), 
	 '#default_value' => $lang,
	  '#options' => $varLang,
	  '#attributes' => array('id'=>'cnt_lng2','onChange'=>'changeLangForUiSettings(document.getElementById("cnt_lng2").value);'),
	);
  // Added by Dibyendu on 21st May 2013 for integrating language End //
  
  
  $form['eu_cookie_ui_settings_' . $lang] = array (
    '#type'  => 'item',
    '#tree'   => TRUE,
  );
  $get_values = get_variable_value('eu_cookie_ui_settings_' . $lang);
  
  if(empty($get_values)) {
    $get_values = get_variable_value('eu_cookie_ui_settings_en');
	
	drupal_add_js('alert("Please Click on save configuration to set the values otherwise settings will not be effective for the current language.");','inline');
  }
  
  $form['eu_cookie_ui_settings_' . $lang]['cookie_banner'] = array(
    '#type' => 'fieldset',
    //'#suffix' => 'px',
    '#title' => t('Cookie banner settings'),
	'#collapsible'=>TRUE,
	'#collapsed'=>FALSE
  );
  $form['eu_cookie_ui_settings_' . $lang]['cookie_banner']['position'] = array(
    '#type' => 'checkbox',
    '#title' => t('Check to show bar in footer'),   
	'#weight' => 1,
    '#description' => t('Check to set cookie message bar in footer. By default, it is set to header. This will be overridden if "Enable pop up" is enabled.'),
    '#default_value' => isset($get_values['cookie_banner']['position']) ? $get_values['cookie_banner']['position'] : 0,
  );
  
  $form['eu_cookie_ui_settings_' . $lang]['cookie_banner']['popup'] = array(
    '#type' => 'checkbox',
    '#title' => t('Enable pop up'),   
	'#weight' => 2,
    '#description' => t('Check to set cookie compliance information as pop up.'),
    '#default_value' => isset($get_values['cookie_banner']['popup']) ? $get_values['cookie_banner']['popup'] : 0,
  );
  
  $form['eu_cookie_ui_settings_' . $lang]['cookie_banner']['height'] = array(
    '#type' => 'textfield',
    //'#suffix' => 'px',
    '#title' => t('Bar or popup height in pixels'),   
	'#weight' => 3,
	'#size' => 6,
    '#description' => t('Height of the bar column. Eg. 100 and not 100px'),
    '#default_value' => isset($get_values['cookie_banner']['height']) ? $get_values['cookie_banner']['height'] : '100',
  );
  
  $form['eu_cookie_ui_settings_' . $lang]['cookie_banner']['bgcolor'] = array(
    '#type' => 'colorpicker',
    //'#suffix' => 'px',
    '#title' => t('Background color'),   
	'#weight' => 4,
	'#size' => 6,
    '#description' => t('Enter HTML color code. eg #000000'),
    '#default_value' => isset($get_values['cookie_banner']['bgcolor']) ? $get_values['cookie_banner']['bgcolor'] : '000000',
  );
  
  $form['eu_cookie_ui_settings_' . $lang]['cookie_banner']['fontcolor'] = array(
    '#type' => 'colorpicker',
    //'#suffix' => 'px',
    '#title' => t('Text Color'),   
	'#weight' => 5,
	'#size' => 6,
    '#description' => t('Enter HTML color code for text. Eg. #ffffff '),
    '#default_value' => isset($get_values['cookie_banner']['fontcolor']) ? $get_values['cookie_banner']['fontcolor'] : 'ffffff',
  );
  $font_styles = itrinno_eucookie_compliance_get_font_styles();
  $font_size = itrinno_eucookie_compliance_get_font_size();
  $font_weight = itrinno_eucookie_compliance_get_font_weight();
  //echo "<pre>";print_r($get_values['cookie_popup']);print_r($get_values['cookie_panel_popup']);exit;
  $form['eu_cookie_ui_settings_' . $lang]['cookie_banner']['cookie_banner_fontstyles'] = array(
    '#type' => 'select',
    '#title' => t('Select font style'),
	'#options' => $font_styles,
	'#weight' => 6,
    '#description' => t('Select the font style'),
    '#default_value' => isset($get_values['cookie_banner']['cookie_banner_fontstyles']) ? $get_values['cookie_banner']['cookie_banner_fontstyles'] : '',
  );
  
  $form['eu_cookie_ui_settings_' . $lang]['cookie_banner']['cookie_banner_fontsize'] = array(
    '#type' => 'select',
    '#title' => t('Select font size'),
	'#options' => $font_size,
	'#weight' => 7,
    '#description' => t('Select the font size'),
    '#default_value' => isset($get_values['cookie_banner']['cookie_banner_fontsize']) ? $get_values['cookie_banner']['cookie_banner_fontsize'] : '',
  );
  
  $form['eu_cookie_ui_settings_' . $lang]['cookie_banner']['cookie_banner_fontweight'] = array(
    '#type' => 'select',
    '#title' => t('Select font weight'),
	'#options' => $font_weight,
	'#weight' => 8,
    '#description' => t('Select the font weight'),
    '#default_value' => isset($get_values['cookie_banner']['cookie_banner_fontweight']) ? $get_values['cookie_banner']['cookie_banner_fontweight'] : '',
  );

  $form['eu_cookie_ui_settings_' . $lang]['cookie_banner']['transparency'] = array(
    '#type' => 'textfield',
    //'#suffix' => 'px',
    '#title' => t('Transparency'),   
	'#weight' => 9,
	'#size' => 6,
    '#description' => t('Enter Transparency level Eg:0.5'),
    '#default_value' => isset($get_values['cookie_banner']['transparency']) ? $get_values['cookie_banner']['transparency'] : '0.5',
  );
  $form['eu_cookie_ui_settings_' . $lang]['cookie_banner']['overlay'] = array(
   '#type' => 'checkbox',
    '#title' => t('Show Cookie banner as an overlay'),   
	'#weight' => 10,
    '#description' => t('Check to view the cookie banner as an overlay.'),
    '#default_value' => isset($get_values['cookie_banner']['overlay']) ? $get_values['cookie_banner']['overlay'] : 0,
  );
  $form['eu_cookie_ui_settings_' . $lang]['cookie_panel'] = array(
    '#type' => 'fieldset',
    //'#suffix' => 'px',
    '#title' => t('Cookie panel settings'),
	'#collapsible'=>TRUE,
	'#collapsed'=>FALSE
  );
  $form['eu_cookie_ui_settings_' . $lang]['cookie_panel']['show_as_page'] = array(
    '#type' => 'checkbox',
    '#title' => t('Show Cookie panel in a separate page'),   
	'#weight' => 11,
    '#description' => t('Check to view the cookie panel in a separate page.'),
    '#default_value' => isset($get_values['cookie_panel']['show_as_page']) ? $get_values['cookie_panel']['show_as_page'] : 0,
  );
  $form['eu_cookie_ui_settings_' . $lang]['cookie_panel']['cookie_panel_link'] = array(
    '#type' => 'textfield',
    '#title' => t('Cookie panel link'),   
	'#weight' => 12,
    '#description' => t('Provide the cookie panel link.'),
    '#default_value' => isset($get_values['cookie_panel']['cookie_panel_link']) ? $get_values['cookie_panel']['cookie_panel_link'] : '',
  );
  $form['eu_cookie_ui_settings_' . $lang]['cookie_panel']['show_in_footer'] = array(
    '#type' => 'checkbox',
    '#title' => t('Show Cookie panel link as a footer link'),   
	'#weight' => 13,
    '#description' => t('Check to view the cookie panel link as a footer link.'),
    '#default_value' => isset($get_values['cookie_panel']['show_in_footer']) ? $get_values['cookie_panel']['show_in_footer'] : 0,
  );
   $form['eu_cookie_ui_settings_' . $lang]['cookie_panel']['cookie_panel_region'] = array(
    '#type' => 'select',
    '#title' => t('Cookie panel region'),   
	'#weight' => 14,
	'#options'=>array(''=>'','topLeft'=>t('Top left'),'topRight'=>t('Top right'),'bottomLeft'=>t('Bottom left'),'bottomRight'=>t('Bottom right')),
    '#description' => t('Select one of the regions where the cookie panel should be shown'),
    '#default_value' => isset($get_values['cookie_panel']['cookie_panel_region']) ? $get_values['cookie_panel']['cookie_panel_region'] : '',
  );
  $menus = menu_get_menus();
  $arr_menu[]='';
  foreach($menus as $key=>$menu){
	$arr_menu[$key] = $menu;
  }
  $form['eu_cookie_ui_settings_' . $lang]['cookie_panel']['cookie_panel_menu'] = array(
    '#type' => 'select',
    '#title' => t('Cookie panel footer region'),   
	'#weight' => 15,
	'#options'=>$arr_menu,
    '#description' => t('Select the footer menu where the cookie panel link should be shown'),
    '#default_value' => isset($get_values['cookie_panel']['cookie_panel_menu']) ? $get_values['cookie_panel']['cookie_panel_menu'] : '',
  );
  $form['eu_cookie_ui_settings_' . $lang]['cookie_panel']['cookie_panel_bgcolor'] = array(
    '#type' => 'colorpicker',
    '#title' => t('Cookie panel Background color'),   
	'#weight' => 16,
	'#description' => t('Cookie panel Background color'),
    '#default_value' => isset($get_values['cookie_panel']['cookie_panel_bgcolor']) ? $get_values['cookie_panel']['cookie_panel_bgcolor'] : '',
  );
  $form['eu_cookie_ui_settings_' . $lang]['cookie_panel']['cookie_panel_fontcolor'] = array(
    '#type' => 'colorpicker',
    '#title' => t('Cookie panel Font color'),   
	'#weight' => 17,
	'#description' => t('Cookie panel Font color'),
    '#default_value' => isset($get_values['cookie_panel']['cookie_panel_fontcolor']) ? $get_values['cookie_panel']['cookie_panel_fontcolor'] : '',
  );
  $form['eu_cookie_ui_settings_' . $lang]['cookie_panel']['cookie_panel_fontstyles'] = array(
    '#type' => 'select',
    '#title' => t('Select font style'),
	'#options' => $font_styles,
	'#weight' => 18,
    '#description' => t('Select the font style'),
    '#default_value' => isset($get_values['cookie_panel']['cookie_panel_fontstyles']) ? $get_values['cookie_panel']['cookie_panel_fontstyles'] : '',
  );
  $form['eu_cookie_ui_settings_' . $lang]['cookie_panel']['cookie_panel_fontsize'] = array(
    '#type' => 'select',
    '#title' => t('Select font size'),
	'#options' => $font_size,
	'#weight' => 19,
    '#description' => t('Select the font size'),
    '#default_value' => isset($get_values['cookie_panel']['cookie_panel_fontsize']) ? $get_values['cookie_panel']['cookie_panel_fontsize'] : '',
  );
  $form['eu_cookie_ui_settings_' . $lang]['cookie_panel']['cookie_panel_fontweight'] = array(
    '#type' => 'select',
    '#title' => t('Select font weight'),
	'#options' => $font_weight,
	'#weight' => 20,
    '#description' => t('Select the font weight'),
    '#default_value' => isset($get_values['cookie_panel']['cookie_panel_fontweight']) ? $get_values['cookie_panel']['cookie_panel_fontweight'] : '',
  );
  $form['eu_cookie_ui_settings_' . $lang]['cookie_panel_popup'] = array(
    '#type' => 'fieldset',
    //'#suffix' => 'px',
    '#title' => t('Cookie panel popup settings'),
	'#collapsible'=>TRUE,
	'#collapsed'=>FALSE
  );
  $form['eu_cookie_ui_settings_' . $lang]['cookie_panel_popup']['cookie_panel_popup_bgcolor'] = array(
    '#type' => 'colorpicker',
    '#title' => t('Cookie panel popup Background color'),   
	'#weight' => 21,
	'#description' => t('Cookie panel popup Background color'),
    '#default_value' => isset($get_values['cookie_panel_popup']['cookie_panel_popup_bgcolor']) ? $get_values['cookie_panel_popup']['cookie_panel_popup_bgcolor'] : '',
  );
  $form['eu_cookie_ui_settings_' . $lang]['cookie_panel_popup']['cookie_panel_popup_fontcolor'] = array(
    '#type' => 'colorpicker',
    '#title' => t('Cookie panel popup Font color'),   
	'#weight' => 22,
	'#description' => t('Cookie panel popup Font color'),
    '#default_value' => isset($get_values['cookie_panel_popup']['cookie_panel_popup_fontcolor']) ? $get_values['cookie_panel_popup']['cookie_panel_popup_fontcolor'] : '',
  );
  $form['eu_cookie_ui_settings_' . $lang]['cookie_panel_popup']['cookie_panel_popup_fontstyles'] = array(
    '#type' => 'select',
    '#title' => t('Select font style'),
	'#options' => $font_styles,
	'#weight' => 23,
    '#description' => t('Select the font style'),
    '#default_value' => isset($get_values['cookie_panel_popup']['cookie_panel_popup_fontstyles']) ? $get_values['cookie_panel_popup']['cookie_panel_popup_fontstyles'] : '',
  );
  $form['eu_cookie_ui_settings_' . $lang]['cookie_panel_popup']['cookie_panel_popup_fontsize'] = array(
    '#type' => 'select',
    '#title' => t('Select font size'),
	'#options' => $font_size,
	'#weight' => 24,
    '#description' => t('Select the font size'),
    '#default_value' => isset($get_values['cookie_panel_popup']['cookie_panel_popup_fontsize']) ? $get_values['cookie_panel_popup']['cookie_panel_popup_fontsize'] : '',
  );
  $form['eu_cookie_ui_settings_' . $lang]['cookie_panel_popup']['cookie_panel_popup_fontweight'] = array(
    '#type' => 'select',
    '#title' => t('Select font weight'),
	'#options' => $font_weight,
	'#weight' => 25,
    '#description' => t('Select the font weight'),
    '#default_value' => isset($get_values['cookie_panel_popup']['cookie_panel_popup_fontweight']) ? $get_values['cookie_panel_popup']['cookie_panel_popup_fontweight'] : '',
  );
  $form['eu_cookie_ui_settings_' . $lang]['cookie_popup'] = array(
    '#type' => 'fieldset',
    //'#suffix' => 'px',
    '#title' => t('Cookie popup settings'),
	'#collapsible'=>TRUE,
	'#collapsed'=>FALSE
  );
  $form['eu_cookie_ui_settings_' . $lang]['cookie_popup']['cookie_popup_bgcolor'] = array(
    '#type' => 'colorpicker',
    '#title' => t('Cookie popup Background color'),   
	'#weight' => 26,
	'#description' => t('Cookie popup Background color'),
    '#default_value' => isset($get_values['cookie_popup']['cookie_popup_bgcolor']) ? $get_values['cookie_popup']['cookie_popup_bgcolor'] : '',
  );
  $form['eu_cookie_ui_settings_' . $lang]['cookie_popup']['cookie_popup_fontcolor'] = array(
    '#type' => 'colorpicker',
    '#title' => t('Cookie popup Font color'),   
	'#weight' => 27,
	'#description' => t('Cookie popup Font color'),
    '#default_value' => isset($get_values['cookie_popup']['cookie_popup_fontcolor']) ? $get_values['cookie_popup']['cookie_popup_fontcolor'] : '',
  );
  $form['eu_cookie_ui_settings_' . $lang]['cookie_popup']['cookie_popup_fontstyles'] = array(
    '#type' => 'select',
    '#title' => t('Select font style'),
	'#options' => $font_styles,
	'#weight' => 28,
    '#description' => t('Select the font style'),
    '#default_value' => isset($get_values['cookie_popup']['cookie_popup_fontstyles']) ? $get_values['cookie_popup']['cookie_popup_fontstyles'] : '',
  );
  $form['eu_cookie_ui_settings_' . $lang]['cookie_popup']['cookie_popup_fontsize'] = array(
    '#type' => 'select',
    '#title' => t('Select font size'),
	'#options' => $font_size,
	'#weight' => 29,
    '#description' => t('Select the font size'),
    '#default_value' => isset($get_values['cookie_popup']['cookie_popup_fontsize']) ? $get_values['cookie_popup']['cookie_popup_fontsize'] : '',
  );
  $form['eu_cookie_ui_settings_' . $lang]['cookie_popup']['cookie_popup_fontweight'] = array(
    '#type' => 'select',
    '#title' => t('Select font weight'),
	'#options' => $font_weight,
	'#weight' => 30,
    '#description' => t('Select the font weight'),
    '#default_value' => isset($get_values['cookie_popup']['cookie_popup_fontweight']) ? $get_values['cookie_popup']['cookie_popup_fontweight'] : '',
  );
  $form['eu_cookie_ui_settings_' . $lang]['third_party_cookies'] = array(
    '#type' => 'fieldset',
    //'#suffix' => 'px',
    '#title' => t('Third party cookie page settings'),
	'#collapsible'=>TRUE,
	'#collapsed'=>FALSE
  );
  $form['eu_cookie_ui_settings_' . $lang]['third_party_cookies']['third_party_bgcolor'] = array(
    '#type' => 'colorpicker',
    '#title' => t('Third party cookie page Background color'),   
	'#weight' => 31,
	'#description' => t('Third party cookie page Background color'),
    '#default_value' => isset($get_values['third_party_cookies']['third_party_bgcolor']) ? $get_values['third_party_cookies']['third_party_bgcolor'] : '',
  );
  $form['eu_cookie_ui_settings_' . $lang]['third_party_cookies']['third_party_fontcolor'] = array(
    '#type' => 'colorpicker',
    '#title' => t('Third party cookie page Font color'),   
	'#weight' => 32,
	'#description' => t('Third party cookie page Font color'),
    '#default_value' => isset($get_values['third_party_cookies']['third_party_fontcolor']) ? $get_values['third_party_cookies']['third_party_fontcolor'] : '',
  );
  $form['eu_cookie_ui_settings_' . $lang]['third_party_cookies']['third_party_fontstyles'] = array(
    '#type' => 'select',
    '#title' => t('Select font style'),
	'#options' => $font_styles,
	'#weight' => 33,
    '#description' => t('Select the font style'),
    '#default_value' => isset($get_values['third_party_cookies']['third_party_fontstyles']) ? $get_values['third_party_cookies']['third_party_fontstyles'] : '',
  );
  $form['eu_cookie_ui_settings_' . $lang]['third_party_cookies']['third_party_fontsize'] = array(
    '#type' => 'select',
    '#title' => t('Select font size'),
	'#options' => $font_size,
	'#weight' => 34,
    '#description' => t('Select the font size'),
    '#default_value' => isset($get_values['third_party_cookies']['third_party_fontsize']) ? $get_values['third_party_cookies']['third_party_fontsize'] : '',
  );
  $form['eu_cookie_ui_settings_' . $lang]['third_party_cookies']['third_party_fontweight'] = array(
    '#type' => 'select',
    '#title' => t('Select font weight'),
	'#options' => $font_weight,
	'#weight' => 35,
    '#description' => t('Select the font weight'),
    '#default_value' => isset($get_values['third_party_cookies']['third_party_fontweight']) ? $get_values['third_party_cookies']['third_party_fontweight'] : '',
  );
  $form['eu_cookie_ui_settings_' . $lang]['implied_consent'] = array(
    '#type' => 'textarea',
    '#title' => t('Implied consent'),   
	'#weight' => 36,
    '#description' => t('Enter implied consent information.'),
    '#default_value' => isset($get_values['implied_consent']) ? $get_values['implied_consent'] : '',
  );
  
  $form['eu_cookie_ui_settings_' . $lang]['explicit_consent'] = array(
    '#type' => 'textarea',
    '#title' => t('Explicit consent'),   
	'#weight' => 37,
    '#description' => t('Enter explicit consent information.'),
    '#default_value' => isset($get_values['explicit_consent']) ? $get_values['explicit_consent'] : '',
  );
  /**
  $form['eu_cookie_ui_settings_' . $lang]['cookie_panel'] = array(
    '#type' => 'textarea',
    '#title' => t('Cookie panel settings content'),   
	'#weight' => 7,
    '#description' => t('Enter cookie panel settings information.'),
    '#default_value' => isset($get_values['cookie_panel']) ? $get_values['cookie_panel'] : '',
  );
  **/
  $form['eu_cookie_ui_settings_' . $lang]['explicit_functional_warning'] = array(
    '#type' => 'textarea',
    '#title' => t('Explicit functional warning message'),   
	'#weight' => 38,
    '#description' => t('Enter Explicit functional non functional warning.'),
    '#default_value' => isset($get_values['explicit_functional_warning']) ? $get_values['explicit_functional_warning'] : '',
  );
  
  $form['eu_cookie_ui_settings_' . $lang]['country_explicit_consent_info'] = array(
    '#type' => 'textarea',
    '#title' => t('Country explicit consent message'),   
	'#weight' => 39,
    '#description' => t('Enter Country explicit consent message.'),
    '#default_value' => isset($get_values['country_explicit_consent_info']) ? $get_values['country_explicit_consent_info'] : '',
  );
  $form ['#submit'][] = 'ui_settings_submit';
  return system_settings_form($form);
}

function eu_cookie_tweaks_thirdparty_settings() {
   // global $language; // Commented by dibyendu on 21st may 2013 to manage the language from language dropdown
   // $lang = $language->language; // Commented by dibyendu on 21st may 2013 to manage the language from language dropdown

  // Added by Dibyendu on 21st May 2013 for integrating language //
	$varLang = array();
	$languageList = language_list();
	foreach($languageList as $key=>$val) {
		$varLang[$key] = $languageList[$key]->name;
	}
	 $reqUrl = $_SERVER['REQUEST_URI'];
	 $reqUrlExp = explode('/',$reqUrl);
	 $reqUrlExpCount = count($reqUrlExp);
	 $selectedVal = $reqUrlExp[$reqUrlExpCount-1];
	 if($selectedVal=='third-party') {
		$lang = 'en';
	 } else {
		$lang = $selectedVal;
	 }
	$varLangChk = array();
	foreach($languageList as $key=>$val) {
		$varLangChk[] = $key;
	}
	if(!@in_array($lang,$varLangChk)) {
	 drupal_goto('/admin/settings/eu-cookie-compliance/third-party');
	}	 
	$form['select_contact_language'] = array(
	  '#type' => 'select', 
	 '#title' => t('Choose language'), 
	 '#default_value' => $lang,
	  '#options' => $varLang,
	  '#attributes' => array('id'=>'cnt_lng3','onChange'=>'changeLangForThirdpartySettings(document.getElementById("cnt_lng3").value);'),
	);

  // Added by Dibyendu on 21st May 2013 for integrating language End //    

   $form['eu_cookie_tp_analytic_settings_' . $lang] = array (
    '#type'  => 'item',
    '#tree'   => TRUE,
   );
   
   $get_values = get_variable_value('eu_cookie_tp_analytic_settings_' . $lang);
	if(empty($get_values)) {
     $get_values = get_variable_value('eu_cookie_tp_analytic_settings_en');
	 drupal_add_js('alert("Please Click on save configuration to set the values otherwise settings will not be effective for the current language.");','inline');
	}
   //echo "<pre>";print_r($get_values);exit;
   $tp_analytical_titles = array('GA' =>'Google Analytics', 'CB' =>'ChartBeat', 'WT' =>'Webtrends', 'CE' =>'Crazy Egg', 'OM' =>'Omniture (Adobe Web Analytics)', 'IC' =>'InSites Consulting', 'PG' =>'Performance Horizon Group');
   $tp_titles =$tp_analytical_titles ;
   $tp_cat_titles['analytical'] = 'Analytics cookies and technologies';
   $form['eu_cookie_tp_analytic_settings_' . $lang]['analytical'] = array(
    '#type' => 'checkboxes',
    '#title' => t($tp_cat_titles['analytical']),   
	'#weight' => 1,
    '#description' => t(''),
    '#default_value' => isset($get_values['analytical']) ? $get_values['analytical'] : array(),
	'#options' => $tp_analytical_titles,
  );
  $arr_analytics_default = get_options_values($get_values,'analytical_additional_cookies');
  if(!empty($arr_analytics_default)){
	$tp_analytics_addtional_titles = array_combine($arr_analytics_default,$arr_analytics_default);
	//echo "<pre>";print_r($tp_analytics_addtional_titles);exit;
	$tp_cat_titles['analytical_additional_cookies'] = 'Analytical additional cookies';
	$tp_titles +=$tp_analytics_addtional_titles;
   }
  $form['eu_cookie_tp_analytic_settings_' . $lang]['analytical_additional_cookies'] = array(
  '#type' => 'options',
  '#limit' => 20,
  '#optgroups' => FALSE,
  '#multiple' => TRUE,
  '#options' => !empty($get_values['analytical_additional_cookies']['options'])?$get_values['analytical_additional_cookies']['options']:array(),
  '#default_value' => $arr_analytics_default,
  '#key_type' => 'associative',
  '#weight' => 2,
  );
  
  $tp_adv_titles = array( 'AN' =>'AppNexus', 'IM' =>'Invite Media', 'PM' =>'Pubmatic', 'DC' =>'DoubleClick','GD' =>'Google Adwords', 'MM' =>'Media Math', 'MA' =>'MicroSoft Advertising', 'SL' =>'Skimlinks', 'SM' =>'Specific Media', 'VN' =>'VoiceFive Networks', 'IVD' =>'Imagini (Visual DNA)', 'RM' =>'Right Media', 'GNS' =>'GENIUS');
   $tp_titles +=$tp_adv_titles ;
   $tp_cat_titles['adv'] = 'Advertising cookies and technologies';
   $form['eu_cookie_tp_analytic_settings_' . $lang]['adv'] = array(
    '#type' => 'checkboxes',
    '#title' => t($tp_cat_titles['adv']),   
	'#weight' => 3,
    '#description' => t(''),
    '#default_value' => isset($get_values['adv']) ? $get_values['adv'] : array(),
	'#options' => $tp_adv_titles,
  );
  $arr_adv_default = get_options_values($get_values,'adv_additional_cookies');
  if(!empty($arr_adv_default)){
	$tp_adv_addtional_titles = array_combine($arr_adv_default,$arr_adv_default);
	$tp_cat_titles['adv_additional_cookies'] = 'Advertising additional cookies';
	$tp_titles +=$tp_adv_addtional_titles;
   }
  $form['eu_cookie_tp_analytic_settings_' . $lang]['adv_additional_cookies'] = array(
  '#type' => 'options',
  '#limit' => 20,
  '#optgroups' => FALSE,
  '#multiple' => TRUE,
  '#options' => !empty($get_values['adv_additional_cookies']['options'])?$get_values['adv_additional_cookies']['options']:array(),
  '#default_value' => $arr_adv_default,
  '#key_type' => 'associative',
  '#weight' => 4,
  );
  $tp_content_sharing_titles = array('AT' =>'AddThis', 'FB' =>'Facebook', 'TW' =>'Twitter');
  $tp_titles +=$tp_content_sharing_titles;
  $tp_cat_titles['content_sharing'] = 'Content sharing cookies and technologies';
  $form['eu_cookie_tp_analytic_settings_' . $lang]['content_sharing'] = array(
    '#type' => 'checkboxes',
    '#title' => t($tp_cat_titles['content_sharing']),   
	'#weight' => 5,
    '#description' => t(''),
    '#default_value' => isset($get_values['content_sharing']) ? $get_values['content_sharing'] : array(),
	'#options' => $tp_content_sharing_titles,
  );
  $arr_content_default = get_options_values($get_values,'content_sharing_additional_cookies');
  if(!empty($arr_content_default)){
	$tp_content_addtional_titles = array_combine($arr_content_default,$arr_content_default);
	$tp_cat_titles['content_sharing_additional_cookies'] = 'Content sharing additional cookies';
	$tp_titles +=$tp_content_addtional_titles;
  }
  
  $form['eu_cookie_tp_analytic_settings_' . $lang]['content_sharing_additional_cookies'] = array(
  '#type' => 'options',
  '#limit' => 20,
  '#optgroups' => FALSE,
  '#multiple' => TRUE,
  '#options' => !empty($get_values['content_sharing_additional_cookies']['options'])?$get_values['content_sharing_additional_cookies']['options']:array(),
  '#default_value' => $arr_content_default,
  '#key_type' => 'associative',
  '#weight' => 6,
  );
  $tp_website_sharing_titles = array('YT' =>'YouTube', 'SS' =>'Slide Share');
  $tp_titles +=$tp_website_sharing_titles;
  $tp_cat_titles['website'] = 'Website functionality cookies and technologies';
  $form['eu_cookie_tp_analytic_settings_' . $lang]['website'] = array(
    '#type' => 'checkboxes',
    '#title' => t($tp_cat_titles['website']),  
	'#weight' => 7,
    '#description' => t(''),
    '#default_value' => isset($get_values['website']) ? $get_values['website'] : array(),
	'#options' => $tp_website_sharing_titles,
  );
  $arr_website_default = get_options_values($get_values,'website_additional_cookies');
  if(!empty($arr_website_default)){
	$tp_website_addtional_titles = array_combine($arr_website_default,$arr_website_default);
	$tp_cat_titles['website_additional_cookies'] = 'Website functionality additional cookies';
	$tp_titles +=$tp_website_addtional_titles;
  }
  $form['eu_cookie_tp_analytic_settings_' . $lang]['website_additional_cookies'] = array(
  '#type' => 'options',
  '#limit' => 20,
  '#optgroups' => FALSE,
  '#multiple' => TRUE,
  '#options' => !empty($get_values['website_additional_cookies']['options'])?$get_values['website_additional_cookies']['options']:array(),
  '#default_value' => $arr_website_default,
  '#key_type' => 'associative',
  '#weight' => 8,
  );
  $tp_security_sharing_titles = array('MF' =>'McAfee');
  $tp_titles +=$tp_security_sharing_titles;
  $tp_cat_titles['security'] = 'Security cookies';
  $form['eu_cookie_tp_analytic_settings_' . $lang]['security'] = array(
    '#type' => 'checkboxes',
    '#title' => t($tp_cat_titles['security']),   
	'#weight' => 9,
    '#description' => t(''),
    '#default_value' => isset($get_values['security']) ? $get_values['security'] : array(),
	'#options' => $tp_security_sharing_titles,
  );
  $arr_security_default = get_options_values($get_values,'security_additional_cookies');
  if(!empty($arr_security_default)){
	$tp_security_addtional_titles = array_combine($arr_security_default,$arr_security_default);
	$tp_cat_titles['security_additional_cookies'] = 'Security additional cookies';
	$tp_titles +=$tp_security_addtional_titles;
  }
  $form['eu_cookie_tp_analytic_settings_' . $lang]['security_additional_cookies'] = array(
  '#type' => 'options',
  '#limit' => 20,
  '#optgroups' => FALSE,
  '#multiple' => TRUE,
  '#options' => !empty($get_values['security_additional_cookies']['options'])?$get_values['security_additional_cookies']['options']:array(),
  '#default_value' => $arr_security_default,
  '#key_type' => 'associative',
  '#weight' => 10,
  );
  //echo "<pre>";print_r($tp_titles);exit;
  $tp_titles +=$tp_cat_titles;
  $form['eu_cookie_tp_analytic_settings_' . $lang]['tp_titles'] = array(
    '#type' => 'checkboxes',   
	'#weight' => 20,    
    '#default_value' => $tp_titles,
	'#value' => $tp_titles,
  );
  //$form ['#submit'][] = 'ui_settings_submit';
  return system_settings_form($form);
}

function eu_cookie_tweaks_thirdparty_text() {  
    //global $language; // Commented by dibyendu on 21st may 2013 to manage the language from language dropdown
    //$lang = $language->language;  // Commented by dibyendu on 21st may 2013 to manage the language from language dropdown
  // Added by Dibyendu on 21st May 2013 for integrating language //
	$varLang = array();
	$languageList = language_list();
	foreach($languageList as $key=>$val) {
		$varLang[$key] = $languageList[$key]->name;
	}
	 $reqUrl = $_SERVER['REQUEST_URI'];
	 $reqUrlExp = explode('/',$reqUrl);
	 $reqUrlExpCount = count($reqUrlExp);
	 $selectedVal = $reqUrlExp[$reqUrlExpCount-1];
	 if($selectedVal=='third-party-text') {
		$lang = 'en';
	 } else {
		$lang = $selectedVal;
	 }
	$varLangChk = array();
	foreach($languageList as $key=>$val) {
		$varLangChk[] = $key;
	}
	if(!@in_array($lang,$varLangChk)) {
	 drupal_goto('/admin/settings/eu-cookie-compliance/third-party-text');
	}	 
	$form['select_contact_language'] = array(
	  '#type' => 'select', 
	 '#title' => t('Choose language'), 
	 '#default_value' => $lang,
	  '#options' => $varLang,
	  '#attributes' => array('id'=>'cnt_lng4','onChange'=>'changeLangForThirdpartyText(document.getElementById("cnt_lng4").value);'),
	);

  // Added by Dibyendu on 21st May 2013 for integrating language End // 
  
    $form['eu_cookie_tp_text_settings_' . $lang] = array (
		'#type'  => 'item',
		'#tree'   => TRUE,
    );	
    $form_get_values = get_variable_value('eu_cookie_tp_text_settings_' . $lang);
	if(empty($form_get_values)) {
     $form_get_values = get_variable_value('eu_cookie_tp_text_settings_en');
	 drupal_add_js('alert("Please Click on save configuration to set the values otherwise settings will not be effective for the current language.");','inline');
	}
	$get_values = get_variable_value('eu_cookie_tp_analytic_settings_' . $lang);
	if(empty($get_values)) {
     $get_values = get_variable_value('eu_cookie_tp_analytic_settings_en');
	}
	$tp_titles = $get_values['tp_titles'];
	$array_exc = array('analytical_additional_cookies','adv_additional_cookies','content_sharing_additional_cookies','website_additional_cookies','security_additional_cookies');
	foreach ($get_values as $tp_cat => $tp_options){
		if ($tp_cat != 'tp_titles'  && !in_array($tp_cat,$array_exc)) { // excluding the TP name titles
		    $i =0;
			foreach ($tp_options as $tp_key => $tp_option) {
				if($tp_option != '0'){
					//print '<br>tp--'. $tp_titles[$tp_option] ; print_r($form_get_values[$tp_cat]['$tp_key']); $tp_cat . '_' . $tp_key. '_purpose'
					$form['eu_cookie_tp_text_settings_' . $lang][$tp_cat][$tp_key]['purpose'] = array(
						'#type' => 'textarea',
						'#title' => t($tp_titles[$tp_option] . ' purpose'),   
						'#weight' => $i + 1,	
						'#rows' => '2',					
						'#default_value' => isset($form_get_values[$tp_cat][$tp_key]['purpose']) ? $form_get_values[$tp_cat][$tp_key]['purpose'] : '',					
				    );	
					$form['eu_cookie_tp_text_settings_' . $lang][$tp_cat][$tp_key]['expire'] = array(
						'#type' => 'textarea',
						'#title' => t($tp_titles[$tp_option] . ' expire'),   
						'#weight' => $i + 2,	
						'#rows' => '2',					
						'#default_value' => isset($form_get_values[$tp_cat][$tp_key]['expire']) ? $form_get_values[$tp_cat][$tp_key]['expire'] : '',					
				    );
				   $form['eu_cookie_tp_text_settings_' . $lang][$tp_cat][$tp_key]['block'] = array(
						'#type' => 'textarea',
						'#title' => t($tp_titles[$tp_option] . ' block'),   
						'#weight' => $i + 3,	
						'#rows' => '2',					
						'#default_value' => isset($form_get_values[$tp_cat][$tp_key]['block']) ? $form_get_values[$tp_cat][$tp_key]['block'] : '',					
				    );
				  
				  $i = $i + 4;
				}	
			}
		}
		else if($tp_cat != 'tp_titles' && in_array($tp_cat,$array_exc)){
				//echo "<pre>";print_r($get_values[$tp_cat]);exit;
				//$j=$i+1;
				foreach($get_values[$tp_cat]['options'] as $add_tp_key=>$add_tp_options){
					if(in_array($add_tp_key,$get_values[$tp_cat]['default_value'])){
						$form['eu_cookie_tp_text_settings_' . $lang][$tp_cat][$get_values[$tp_cat]['options'][$add_tp_key]]['purpose'] = array(
							'#type' => 'textarea',
							'#title' => t($get_values[$tp_cat]['options'][$add_tp_key] . ' purpose'),   
							'#weight' => $i + 1,	
							'#rows' => '2',					
							'#default_value' => isset($form_get_values[$tp_cat][$get_values[$tp_cat]['options'][$add_tp_key]]['purpose']) ? $form_get_values[$tp_cat][$get_values[$tp_cat]['options'][$add_tp_key]]['purpose'] : '',					
						);	
						$form['eu_cookie_tp_text_settings_' . $lang][$tp_cat][$get_values[$tp_cat]['options'][$add_tp_key]]['expire'] = array(
							'#type' => 'textarea',
							'#title' => t($get_values[$tp_cat]['options'][$add_tp_key] . ' expire'),   
							'#weight' => $i + 2,	
							'#rows' => '2',					
							'#default_value' => isset($form_get_values[$tp_cat][$get_values[$tp_cat]['options'][$add_tp_key]]['expire']) ? $form_get_values[$tp_cat][$get_values[$tp_cat]['options'][$add_tp_key]]['expire'] : '',					
						);
					   $form['eu_cookie_tp_text_settings_' . $lang][$tp_cat][$get_values[$tp_cat]['options'][$add_tp_key]]['block'] = array(
							'#type' => 'textarea',
							'#title' => t($get_values[$tp_cat]['options'][$add_tp_key] . ' block'),   
							'#weight' => $i + 3,	
							'#rows' => '2',					
							'#default_value' => isset($form_get_values[$tp_cat][$get_values[$tp_cat]['options'][$add_tp_key]]['block']) ? $form_get_values[$tp_cat][$get_values[$tp_cat]['options'][$add_tp_key]]['block'] : '',					
						);
					}
				}
		}
	} 
  //$form ['#submit'][] = 'ui_settings_submit';
  return system_settings_form($form);
}

function ui_settings_submit(){
   //drupal_set_message('This is test message');
   drupal_flush_all_caches();
}

// Added by Dibyendu on 21st May 2013 for language addition //
function eu_cookie_tweaks_add_language() {
    
	$form['add_languages'] = array(
		  '#type' => 'textfield', 
		  '#title' => t('Add language'), 
		  '#default_value' => variable_get('add_languages', 'english'), 
		  '#size' => 60, 
		  '#maxlength' => 128, 
		  '#required' => TRUE,
	 '#description' => t('Add languages with comma seperator(,). Example: english,french'),
		);
	 $form['add_languages_code'] = array(
		  '#type' => 'textfield', 
		  '#title' => t('Add language code'), 
		  '#default_value' => variable_get('add_languages_code', 'en'),
		  '#size' => 60, 
		  '#maxlength' => 128, 
		  '#required' => TRUE,
	 '#description' => t('Add language codes with comma seperator(,). Example: en,fr'),
		);
	$form ['#submit'][] = 'ui_settings_submit';	
	$currentLanguage = variable_get('add_languages_code', 'en');
	$currentLanguageExp = explode(",",$currentLanguage);
	$currentLanguageExpCount = count($currentLanguageExp);
	$var1 = '';
	$var2 = '';
	$var3 = '';

	if($currentLanguageExpCount != 1) {
		for($lng = 0; $lng <= $currentLanguageExpCount-1; $lng++) {
				$var1.= "'"."eu_cookie_settings_".$currentLanguageExp[$lng]."',";
				$var2.= "'"."eu_cookie_ui_settings_".$currentLanguageExp[$lng]."',";
				$var3.= "'"."eu_cookie_text_settings_".$currentLanguageExp[$lng]."',";
		}
		$var1 = substr($var1,0,strlen($var1)-1);
		$var2 = substr($var2,0,strlen($var2)-1);
		$var3 = substr($var3,0,strlen($var3)-1);
		if(isset($_REQUEST['op']) && $_REQUEST['op'] == 'Save configuration') {
			//db_query("DELETE FROM {variable} WHERE name NOT IN ($var1) AND name LIKE '%eu_cookie_settings_%'");
			//db_query("DELETE FROM {variable} WHERE name NOT IN ($var2) AND name LIKE '%eu_cookie_ui_settings_%'");
			//db_query("DELETE FROM {variable} WHERE name NOT IN ($var3) AND name LIKE '%eu_cookie_text_settings_%'");
		}			
		
	} 
	cache_clear_all('variables', 'cache');
	
	return system_settings_form($form);
}
// Added by Dibyendu on 21st May 2013 for language addition End //

function get_options_values($get_values,$option){
	$arr_default = array();
	if(!empty($option)){
	  
	
	  if(!empty($get_values[$option]['default_value'])){
		$arr_values = array_values($get_values[$option]['default_value']);
		foreach($arr_values as $val){
			$arr_default[] = $get_values[$option]['options'][$val];
		}
	  }
	  
	}
	return $arr_default;
}

function itrinno_eucookie_compliance_custom_cookie_setting(){

$form = drupal_get_form('itrinno_eucookie_compliance_custom_cookie_form');
return '<div id="custom_cookie_template_form_wrapper">'.$form.'</div>';

}

function itrinno_eucookie_compliance_custom_cookie_form(){	
	$form = array();
	$form = array(
		'#cache' => TRUE,
	  );
	  
	  global $language;
     $lang = $language->language;
    //$get_values = get_variable_value('eu_cookie_tp_analytic_settings_' . $lang);
	$get_values = get_variable_value('eu_cookie_tp_analytic_settings_en');
	$arr_additional_cookies = array('analytical_additional_cookies','adv_additional_cookies','content_sharing_additional_cookies','website_additional_cookies','security_additional_cookies');
	$opt_cookies['']=t('Please select custom cookies');
	foreach($arr_additional_cookies as $cookie){
		foreach($get_values[$cookie]['options'] as $add_tp_key=>$add_tp_options){
						if(in_array($add_tp_key,$get_values[$cookie]['default_value'])){
							$opt_cookies[$get_values[$cookie]['options'][$add_tp_key]] = $get_values[$cookie]['options'][$add_tp_key];
						}
		}
	}
	
	  $form_name = $opt_cookies;
	  $master_selection = !empty($form_state['values']['custom_cookie_form']) ? $form_state['values']['custom_cookie_form'] : t('');	
	  if(arg('0') == 'admin' && arg('1') == 'settings' && arg('2') == 'eu-cookie-compliance' && arg('3') == 'custom_cookie_settings'){

		 if (isset($form_name) || $_POST['custom_cookie_form']) {
				
			$form['custom_cookie_form'] = array(
			'#type' => 'select',
			'#title' => t('Contact us Forms'),
			'#options' => $form_name,
			'#default_value' => $master_selection,
			'#weight' => '-5',
			'#ahah' => array(
				  'path' => 'custom-cookie-setting/js',
				  'wrapper' => 'custom_cookie_template_form_wrapper',
				  'method'=>'replace',
				  'effect' => 'fade',
			),
		  );
		   
		  $form['holder'] =array(
		  '#type'=>'fieldset',
		  '#attributes' => array('style'=>'display:none;'),
		  );
		  $form['holder']['test'] = array(
		  '#type' => 'textarea',
		  '#cols'=>'2',
		  '#rows' =>'2',
		 // '#attributes' => array('style'=>'display:none;'),
		  );
			
			$form['save_cookie_setting'] = array(
				'#type' => 'submit',
				'#value' => t('Save '),
				'#weight' => '1',
			);
			return $form;
			
				}
		}
}
function custom_cookie_form_setting(){

   $form_name = $_POST['custom_cookie_form'];
 
   $form_state = array('submitted' => FALSE);
   $form_build_id = $_POST['form_build_id'];
   $cookie_purpose = variable_get($form_name.'_cookie_purpose','');
   $cookie_expiry = variable_get($form_name.'_cookie_expiry', '');
   $cookie_how_to_block = variable_get($form_name.'_cookie_how_to_block','');
   
   $form = form_get_cache($form_build_id, $form_state);
   form_set_cache($form_build_id, $form, $form_state);
  $form += array(
    '#post' => $_POST,
    '#programmed' => FALSE,
  );
  if($form_name != 'Select'){
    $form[$form_name.'_cookie_purpose'] = array(
    '#type' => 'textarea',
    '#title' => t('Cookie purpose'),
	'#value' => variable_get($form_name.'_cookie_purpose',''),
    '#default_value' => variable_get($form_name.'_cookie_purpose',''),
    '#required' => TRUE,
     
  );
   $form[$form_name.'_cookie_expiry'] = array(
    '#type' => 'textarea',
    '#title' => t('Cookie expiry'),
    '#default_value' => variable_get($form_name.'_cookie_expiry',''),
     '#value' => variable_get($form_name.'_cookie_expiry',''),
    '#required' => TRUE, 
    
  );
  $form[$form_name.'_cookie_how_to_block'] = array(
    '#type' => 'textarea',
    '#title' => t('How to block'),
    '#value' => variable_get($form_name.'_cookie_how_to_block',''),
    '#default_value' => variable_get($form_name.'_cookie_how_to_block',''),
    '#required' => TRUE,
    

  );


  }else{
    $form['help'] = array(
     '#type' => 'item',
     '#value' => t('Please select any contact us form'),
     '#weight' => '-1',
    );
  }
  $form = form_builder('itrinno_eucookie_compliance_custom_cookie_form', $form, $form_state);
  $output = drupal_render($form);
  $javascript = drupal_add_js(NULL, NULL);  
  
  if(isset($javascript['setting'])) {
      $output .= '<script type="text/javascript">jQuery.extend(Drupal.settings, '. drupal_to_js(call_user_func_array('array_merge_recursive', $javascript['setting'])) .');</script>';	  
  }
  return drupal_json(array('status' => TRUE, 'data' => $output));
}

function itrinno_eucookie_compliance_custom_cookie_form_submit($form, &$form_state){
  $form_name = $form_state['clicked_button']['#post']['custom_cookie_form'];
  if($form_name != 'Select'){
  // Exclude unnecessary elements.
    unset($form_state['clicked_button']['#post']['form_build_id'], $form_state['clicked_button']['#post']['form_token'], $form_state['clicked_button']['#post']['form_id'], $form_state['clicked_button']['#post']['op']);
    foreach ($form_state['clicked_button']['#post'] as $key => $value) {
      if (is_array($value) && isset($form_state['values']['array_filter'])) {
        $value = array_keys(array_filter($value));
        }
     variable_set($key, $value);
    }
   drupal_set_message(t('The configuration options have been saved.'));
   cache_clear_all();
   drupal_rebuild_theme_registry();
  
  }else{
  form_set_error('custom_cookie_form','Please select any contactus form.');
  }
}

function custom_cookie_form_validate_callback() {

$form = custom_cookie_form_validate_callback_helper();

  $changed_elements = $form['custom_cookie_template_form_wrapper'];

  // Prevent duplicate wrappers.
  //unset($changed_elements['#prefix'], $changed_elements['#suffix']);

  $output = theme('status_messages') . drupal_render($changed_elements);

  drupal_json(array(
    'status'   => TRUE,
    'data'     => $form,
  ));
}
function custom_cookie_form_validate_callback_helper() {
  $form_state = array('storage' => NULL, 'submitted' => FALSE);
  $form_build_id = $_POST['form_build_id'];
  $form = form_get_cache($form_build_id, $form_state);
  $args = $form['#parameters'];
  $form_id = array_shift($args);
  $form_state['post'] = $form['#post'] = $_POST;
  // Enable the submit/validate handlers to determine whether AHAH-submittted.
  $form_state['ahah_submission'] = TRUE;
  $form['#programmed'] = $form['#redirect'] = FALSE;
  drupal_process_form($form_id, $form, $form_state);
  $form = drupal_rebuild_form($form_id, $form_state, $args, $form_build_id);
  return $form;
}

