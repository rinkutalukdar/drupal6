<?php

/**
 * @file
 * Administratives features for the ITrInno Form Filter module.
 */

/**
 * Implementation of hook_form().
 * 
 * Administrative form for ITrInno Form Filter.
 */
function itrinno_form_filter_configuration() {
  $form = array();
  
  $form['form_protection'] = array(
    '#type' => 'fieldset',
    '#title' => 'Form Protection settings',
    '#collapsible' => TRUE,
    '#collapsed' => FALSE,
  );
	/*** Capgemini :: Modified the below code */
	// Removed , and “ and “ from variable: field_protection_conditions as it was badly affecting the normal test cases
	// Updated variable: field_protection_conditions with more terms
	// Disabled rich text editor for field-protection-conditions field as the value contains tags and it breaks in the middle while loading
  $form['form_protection']['field_protection_conditions'] = array(
    '#type' => 'textarea',
    '#size' => 80,
    '#title' => t('Form Protection Patterns'),
    '#description' => t('ITrInno Form Filter default list of patterns for checking form submitted values.'),
    '#default_value' => variable_get('field_protection_conditions', 'X3CSCRIPT,%27 OR ,%22 OR ,FUNCTION%28%29,FUNCTION(),X3CIFRAME,%3CIFRAME,%3CSCRIPT,<SCRIPT,<IFRAME,<?PHP,<%,<?,EXEC SP_ (or EXEC XP_),AND USER_NAME(),; DESC,ASCII,UNI/*,\' OR ,\' AND ," OR  ," AND ,%3C?,%3C%3F,%253C%3F,%3C?PHP,%253CSCRIPT,%2527 OR ,%2522 OR,%27 AND ,%22 AND,%2527 AND ,%2522 AND,WAITFOR DELAY,WAITFOR%20DELAY,BENCHMARK,USER(),VERSION(), WAITFOR+DELAY, OR 1=1,+OR+1%3D1,OR 2,OR+2," AND ,%22+AND+,AND 1,AND+1,AND 2,AND+2,DROP TABLE,DROP+TABLE,SELECT *,SELECT+%2A,UNION ,UNION+,random(,random%28,BENCHMARK,FUNCTION (,FUNCTION+%28,ONCLICK,ONDBLCLICK,onmousedown,onmousemove,onmouseover,onmouseout,onmouseup,onkeydown,onkeypress,onkeyup,onabort,onerror,onload,onresize,onscroll,onunload,onblur,onchange,onfocus,onreset,onselect,onsubmit,onevent'),
    '#required' => TRUE,
	"#wysiwyg" => FALSE,
    
  );
  
  
  $form['form_protection']['form_error_message'] = array(
    '#type' => 'textfield',
    '#size' => 100,
    '#title' => t('Unsafe Form Error Message'),
    '#description' => t('The message shown to the user when a form validator detects a hacking attempt. <strong>If left empty, form submitted values will be filtered and submitted WITHOUT USER WARNING</strong>.'),
    '#default_value' => t(variable_get('form_error_message', 'An unsafe submitted value has been detected. Please review the input values for this form.')),
    '#required' => FALSE,
  );

  $form['form_protection']['display_link_on_forms'] = array(
    '#type' => 'checkbox',
    '#title' => t('Display Include/Exclude Link'),
    '#description' => t('If checked a "Include/Exclude" link will be displayed in every form.')
      . '<br /><em>'
      . t('Warning: this link will only be visible for users with the "toggle form filtering" permission. If that user wants to disable/enable filtering for any form then enable this, browse to the corresponding form and perform the appropriate action through the available link. Checking/Unchecking this will only show/hide the link in forms and makes no changes to the module\'s functionalty.')
      . '</em>',
    '#default_value' => variable_get('display_link_on_forms', TRUE),
  );

  $excluded_form_ids = array_filter(explode(',', variable_get('excluded_form_ids', '')));
  $excluded_form_ids = (empty($excluded_form_ids)) ? array(t('No forms have been excluded from the checklist yet.')) : array_map('trim', $excluded_form_ids);
  
  $form['form_protection']['excluded_form_ids'] = array(
    '#type' => 'item',
    '#title' => t('Excluded Form Ids'),
    '#description' => t('List of form ids that will bypass the checklist while being submitted. To exclude/include any form from/to this list please browse to the form and click the link provided below it.'),
    '#value' => theme('item_list', $excluded_form_ids),
  );
  
  $form['url_protection'] = array(
    '#type' => 'fieldset',
    '#title' => 'URL Protection settings',
    '#collapsible' => TRUE,
    '#collapsed' => FALSE,
  );
 
	/*** Capgemini :: Modified the below code */
	// Removed , and “ and “ from variable: url_protection_conditions as it was badly affecting the normal test cases
	// Updated variable: url-protection-conditions with more terms
	// Disabled rich text editor for field-protection-conditions field as the value contains tags and it breaks in the middle while loading 
  $form['url_protection']['url_protection_conditions'] = array(
    '#type' => 'textarea',
    '#size' => 80,
    '#title' => t('URL Protection Patterns'),
    '#description' => t('ITrInno Form Filter default list of patterns for checking URL\'s.'),
    '#default_value' => variable_get('url_protection_conditions', 'X3CSCRIPT#\'#%3C#%3E#%2527#>#<#%3CSCRIPT%3E#%22#XSS#%2C#%27#%253C#%253E#%2522#X3CSTYLE#QSS#X3C#X3E#"#JAVASCRIPT#&LT#&GT#%26GT%3B#%26LT%3B#FUNCTION%28%29#FUNCTION()#X3CIFRAME#%3CIFRAME#WAITFOR DELAY#WAITFOR%20DELAY#BENCHMARK#USER()#VERSION()# OR 1=1#+OR+1%3D1#OR 2#OR+2#" AND #%22+AND+#AND 1#AND+1#AND 2#AND+2#DROP TABLE#DROP+TABLE#SELECT *#SELECT+%2A#UNION #UNION+#random(#random%28#BENCHMARK#FUNCTION (#FUNCTION+%28#ONCLICK#ONDBLCLICK#onmousedown#onmousemove#onmouseover#onmouseout#onmouseup#onkeydown#onkeypress#onkeyup#onabort#onerror#onload#onresize#onscroll#onunload#onblur#onchange#onfocus#onreset#onselect#onsubmit#onevent'),
    '#required' => TRUE,
	"#wysiwyg" => FALSE,
  
  );
    
  $form['url_protection']['found_hack_redirection'] = array(
    '#type' => 'textfield',
    '#size' => 40,
    '#title' => t('Redirect-to Page'),
    '#description' => t('Page to which the user will be redirected in case a hacking attempt is detected in the requested URL. Defaults to @frontpage.', array('@frontpage' => '<front>')),
    '#default_value' => variable_get('found_hack_redirection', '<front>'),
    '#required' => TRUE,
	"#wysiwyg" => FALSE,
  );

  $form['url_protection']['url_error_message'] = array(
    '#type' => 'textfield',
    '#size' => 100,
    '#title' => t('Unsafe URL Error Message'),
    '#description' => t('The message shown to the user when an unsafe URL is requested by it.'),
    '#default_value' => t(variable_get('url_error_message', 'An unsafe value has been detected in the requested URL.')),
    '#required' => TRUE,
  );
  
  $form['include_exclude_links'] = array(
    '#type' => 'fieldset',
    '#title' => 'Form Verfication Include/Exclude Links',
    '#collapsible' => TRUE,
    '#collapsed' => FALSE,
  );
  
  $form['include_exclude_links']['excluding_form_message'] = array(
    '#type' => 'textfield',
    '#size' => 100,
    '#title' => t('"Exclude" Link Text'),
    '#description' => t('The "exclude from checklist" link caption. Defaults to "Disable form filtering".'),
    '#default_value' => variable_get('excluding_form_message', t('Disable form filtering')),
    '#required' => TRUE,
  );
  
  $form['include_exclude_links']['including_form_message'] = array(
    '#type' => 'textfield',
    '#size' => 100,
    '#title' => t('"Include" Link Text'),
    '#description' => t('The "include in checklist" link caption. Defaults to "Enable form filtering".'),
    '#default_value' => variable_get('including_form_message', t('Enable form filtering')),
    '#required' => TRUE,
  );
  
  $form['itrinno_form_filter_enable_debug_info'] = array(
    '#type' => 'checkbox',
    '#title' => t('Enable Debug Info'),
    '#description' => t('Determines if debug info about filtered data should be logged in Drupal\'s watchdog.')
      . '<br /><strong>'
      . t('WARNING: user submitted sensitive data may be stored in Drupal\'s watchdog when this feature is enabled, so don\'t leave this enabled in production environments.')
      . '</strong>',
    '#default_value' => variable_get('itrinno_form_filter_enable_debug_info', FALSE),
  );
  /*** Capgemini :: Added the below code to include X-Frame-Options related settings fields */
	// Added setting: enable-iframe-header checkbox to control the usage of the header
	// Added setting: iframe-header-options to load the value for X-Frame-Options.
	// Added setting: iframe-header-url to specify url in case ALLOW-FROM is selected for iframe-header-options setting
	
	$form["enable-iframe-header"] = array(
    "#type" => "checkbox",
    "#title" => t("Use X-Frame-Options header with http response"),
    "#description" => t('If checked X-Frame-Options header will be added to http response to prevent CSRF attacks. <br /><em>Warning: Using this header may affect loading contents in iframes.</em>'),
    "#default_value" => variable_get('enable-iframe-header', 0),
  );
	$form["iframe-header-options"] = array(
    "#type" => "select",
    "#title" => t("Options"),
    "#description" => t('DENY: Do not allow contents to be loaded in iframe, SAMEORIGIN: Allow contents in iframe if the URL has the same domain as that of parent URL, ALLOW-FROM: Allow the specified URLs to be loaded in iframe'),
		"#options" => array('DENY' => 'DENY', 'SAMEORIGIN' => 'SAMEORIGIN', 'ALLOW-FROM' => 'ALLOW-FROM'),
    "#default_value" => variable_get('iframe-header-options', ''),
		"#prefix" => "<div id='iframe-header-options-wrapper' style='display:" . (variable_get('enable-iframe-header', 0) ? "inline" : "none") . ";'>",
		"#suffix" => "</div>",
  );
	$form["iframe-header-url"] = array(
    "#type" => "textfield",
    "#title" => t("URL"),
    "#description" => t('URLs to be used with ALLOW-FROM option'),		
    "#default_value" => variable_get('iframe-header-url', ''),
		"#wysiwyg" => FALSE,
		"#prefix" => "<div id='iframe-header-url-wrapper' style='display:" . (variable_get('iframe-header-options', '') == 'ALLOW-FROM' ? 'inline' : 'none') . ";'>",
		"#suffix" => "</div>",
  );
	// X-Frame-Options changes end

	$form["all-data-sanitize-options"] = array(
    "#type" => "select",
	'#required' => TRUE,
    "#title" => t("Select how the data to be sanitized"),
    "#description" => t('FILTER_XSS: Data will be passed through filter_xss, CHECK_PLAIN: Data will be proceed using check_plain'),
		"#options" => array('' => 'Select',  'FILTER_XSS' => 'FILTER_XSS', 'CHECK_PLAIN' => 'CHECK_PLAIN' ),
    "#default_value" => variable_get('all-data-sanitize-options', ''),
		
  );
  
  $form['itrinno_form_filter_exclude_path'] = array(
    '#type' => 'textarea',
    '#size' => 100,
    '#title' => t('Execlude paths'),
    '#description' => t('add the URL paths to be excluded from Itrinno form filter checks'),
    '#default_value' => variable_get('itrinno_form_filter_exclude_path', "admin*\nnode/add*\nnode/*/edit*"),
    '#required' => TRUE,
	"#wysiwyg" => FALSE,
  );
  
  $form["itrinno_form_filter_data_process_option"] = array(
    "#type" => "select",
	'#required' => TRUE,
    "#title" => t("Select data processing option"),
    "#description" => t('REDIRECT: user will be redirected to error page, ERROR:Show the same page with errors, CONTINUE: Data will be cleaned and allows form submission '),
		"#options" => array('' => 'Select',  'REDIRECT' => 'REDIRECT', 'ERROR'=>'ERROR', 'CONTINUE' => 'CONTINUE' ),
    "#default_value" => variable_get('itrinno_form_filter_data_process_option', ''),
		
  );

  
  	
  return system_settings_form($form);
}

/**
 * Implementation of hook_form().
 * 
 * Provides a form to set the list of excluded form IDs manually.
 * @author erickj@ciandt.com
 * @since 01-mar-2013
 */
function itrinno_form_filter_excluded_forms_settings() {
  $form = array();
  
  $form['excluded_form_ids'] = array(
    '#type' => 'textarea',
    '#title' => t('Excluded Form IDs'),
    '#description' => t('A comma-separated list of form IDs that should bypass form submitted values verification.')
      . '<br /><strong>'
      . t('WARNING: including form id\'s in this list REMOVES ALL PROTECTION against cross-site scripting and SQL injection attacks offered by this module for form submitted values.')
      . '</strong>',
    '#default_value' => variable_get('excluded_form_ids', ''),
  );
  
  return system_settings_form($form);
}

/**
 * Implementation of hook_form().
 * @author erickj@ciandt.com
 * @since 27-feb-2013
 * 
 * Returns a confirmation form for the Enable/Disable form filtering feature.
 */
function itrinno_form_filter_include_exclude_form($form, $action, $formid) {
  // keep the parameters as form values
  $form = array(
    'formid' => array(
      '#type' => 'value',
      '#value' => $formid,
    ),
    'action' => array(
      '#type' => 'value',
      '#value' => $action,
    ),
  );
  
  $yes_caption = ($action == 'include') ? t('Enable') : t('Disable');
  $no_caption = t('Cancel');
  
  $confirmation_message = t('Are you sure you want to !action %form_id form in ITrInno Form Filter checklist?', array('!action' => $action, '%form_id' => $formid));
  $description = ($action == 'include')
    ? t('If enabled, this form will be automatically protected against attacks.')
    : t('If disabled, this form will NOT be automatically protected against attacks.');
  
  return confirm_form($form, $confirmation_message, 'admin/settings/itrinno_form_filter', $description, $yes_caption, $no_caption);
}

/**
 * Implementation of hook_form_submit().
 * @author erickj@ciandt.com
 * @since 27-feb-2013
 * 
 * Sets the form to be include/excluded from ITrInno Form Filter validation.
 */
function itrinno_form_filter_include_exclude_form_submit($form, &$form_state) {  


  $formid = filter_xss_admin($form['formid']['#value']);
  $action = filter_xss_admin($form['action']['#value']);
  
  $excluded_form_ids = _itrinno_form_filter_get_excluded_form_ids();

  
  switch ($action) {
     case 'include':
      if (in_array($formid, $excluded_form_ids)) {
        $key = array_search($formid, $excluded_form_ids);
        unset($excluded_form_ids[$key]);
        

      }
      break;
    case 'exclude':
      if (!in_array($formid, $excluded_form_ids)) {
        $excluded_form_ids[] = $formid;
      }
      break;
  }
  
    variable_set('excluded_form_ids', implode(',', $excluded_form_ids));
  drupal_set_message(t('The changes are saved successfully.'));
 
 
}