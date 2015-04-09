<?php

/**
 * @file
 * The functions used to configure the module over the admin interface.
 *
 */

/**
 * Implementation of hook_perm().
 *
 * @return (array) permissions
 */
function seo_checker_perm() {
    return array(
      'administer seo_checker configuration',
      'skip seo checks',
      'allow seo check failures'
    );
}


/**
 * Builds the settings form for the SEO checker using system_settings_form()
 * @return (array) settings form
 */
function seo_checker_settings() {
  /* load the required js and css files */
  //_seo_checker_load_slider();

  /* get the rules and create the fieldset with the sliders */
  //include_once('global_seo_rules.php');
  $rules = include_seo_rules();
  //$rules .= basic_seo_rules_register_seo_rules();
  //$rules = module_invoke_all('register_seo_rules');
//echo "<PRE>";print_r($rules);exit;
  $form = array();
/*
  $form['general'] = array(
    '#type' => 'fieldset',
    '#title' => t('General settings.'),
    '#collapsible' => TRUE,
    '#collapsed' => TRUE,
  );

  $form['general']['seo_checker_allow_failures'] = array(
    '#type' => 'radios',
    '#title' => t('Check result display settings'),
    '#default_value' => variable_get('seo_checker_allow_failures', 'show-preview-only'),
    '#options' => array(
      'show-preview-only' => t("Only show the check results on node previews."),
      'show-always' => t("Show the results on node previews AND when nodes are saved."),
    ),
  );

  $form['general']['seo_checker_admin_skip_checks'] = array(
    '#type' => 'checkbox',
    '#title' => t('Should the admin user skip SEO checks?'),
    '#default_value' => variable_get('seo_checker_admin_skip_checks', 0),
  );

  $form['general']['seo_checker_admin_allow_failurs'] = array(
    '#type' => 'checkbox',
    '#title' => t('Should the admin user be allowed to fail SEO checks?'),
    '#default_value' => variable_get('seo_checker_admin_allow_failurs', 0),
  );
*/

  $form['thresholds'] = array(
    '#type' => 'fieldset',
    '#title' => t('Thresholds for the SEO rules.'),
    '#collapsible' => TRUE,
    '#description' => t('For the following rules, set the threshold in % where the test should be considered as passed. Depending on the type of the rule, you can either choose 0 or 100 sometimes a value in between. <b>A threshold of 0% disables a test.</b> Results of disabled tests will not be displayed.'),
  );

  foreach ($rules as $rid => $rule) {
  //print_r($rule);
    $form['thresholds']['seo_threshold_'. $rid] = array(
      '#type' => 'seo_slider',
      '#slider_type' => $rule['threshold type'],
      '#title' => strip_tags(check_markup($rule['name'])),
      '#default_value' => seo_checker_get_rule_threshold($rule, $rid, 'yes'),
      '#description' => strip_tags(check_markup($rule['description'])),
    );
    if ($rule['threshold type'] == 'bool') {
      $form['thresholds']['seo_threshold_'. $rid]['#steps'] = 1;
    }
  }

  /* content types */
  $form['content_types'] = array(
    '#type' => 'fieldset',
    '#title' => t('SEO Checker per Content Type'),
    '#collapsible' => TRUE,
    '#description' => t('Enable the SEO Checker for at least one content type. Otherwise you will not see any effect.'),
  );
  foreach (node_get_types('names') as $type => $name) {
    $form['content_types']['seo_checker_' . $type] = array(
      '#type' => 'checkbox',
      '#title' => t($name),
      '#default_value' => variable_get('seo_checker_'. $type, 0),
    );
  }

  return system_settings_form($form);
}


/**
 * The slider requires some java scripts and css to be loaded
 */
function _seo_checker_load_slider() {
  if (module_exists('jquery_ui')) {
    jquery_ui_add('ui.slider', 'none');
    drupal_add_js(drupal_get_path('module', 'seo_checker') ."/js/slider.js");
  }
  drupal_add_css(drupal_get_path('module', 'seo_checker') ."/css/slider.css");
  drupal_add_css(drupal_get_path('module', 'jquery_ui') ."/jquery.ui/themes/base/ui.all.css");
}

//Set visibility of SEO node report based on user roles
function seo_checker_rolebased_settings() {
  $form = array();
  $form['rolebased_settings'] = array(
    '#type' => 'fieldset',
    '#title' => t('Set SEO report visibility based on user roles'),
    '#description' => t('Choose the roles which require SEO report visibility per node.'), 		
  );
  $userrolearray = user_roles(1);
  foreach ($userrolearray as $key => $value) {
      $form['rolebased_settings']['PRIV_VIEWSEO_RPT_' . $key] = array(
        '#type' => 'checkbox', 
        '#title' => ucfirst(t($value)), 
        '#default_value' => variable_get('PRIV_VIEWSEO_RPT_' . $key, 0), 
    );
  }
      $form['rolebased_settings']['PRIV_VIEWSEO_RPT_ADMIN'] = array(
        '#type' => 'checkbox', 
        '#title' => t('Administrator'), 
        '#default_value' => variable_get('PRIV_VIEWSEO_RPT_ADMIN', 1),     
        );
  return system_settings_form($form);
}

//Set visibility of SEO node report based on user roles
function seo_checker_proxy_settings() {
  $form = array();
  $form['proxy_settings'] = array(
    '#type' => 'fieldset',
    '#title' => t('Set HTTP proxy'),
    '#description' => t('please enter the proxy details'), 		
  );
  $form['proxy_settings']['proxy_user'] = array(
    '#type' => 'textfield',
    '#size' => '25',
    '#title' => 'Proxy Username', 
    '#description' => t('please enter the proxy username'), 		
    '#default_value' => variable_get('proxy_user', 0), 
  );
  $form['proxy_settings']['proxy_pass'] = array(
    '#type' => 'textfield',
    '#size' => '25',
    '#title' => 'Proxy Password', 
    '#description' => t('please enter the proxy password'), 		
    '#default_value' => variable_get('proxy_pass', 0), 
  );
  
  return system_settings_form($form);
}

//Set the path for seo rules
function seo_checker_rules_inclusion_settings() {
  $form = array();
  $form['rules_settings'] = array(
    '#type' => 'fieldset',
    '#title' => t('Set the paths for Global and Sector/Region specific'),
    '#description' => t('please enter the path details'), 		
  );
  $form['rules_settings']['global_rules_path'] = array(
    '#type' => 'textfield',
    '#size' => '60',
    '#title' => 'Global Rules', 
    '#description' => t('please enter the path'), 		
    '#default_value' => variable_get('global_rules_path', ''), 
  );
  $form['rules_settings']['sector_rules_path'] = array(
    '#type' => 'textfield',
    '#size' => '60',
    '#title' => 'Sector Rules', 
    '#description' => t('please enter the path'), 		
    '#default_value' => variable_get('sector_rules_path', ''), 
  );
  
  return system_settings_form($form);
}
