<?php
// ; $Id: iapp_rules.admin.inc,v 1.0 2009/05/20 19:47:55 Exp $

/**
 * @file iapp_rules.admin.inc
 * IAPP Rules admin callbacks.
 */

/**
 * Menu callback
 * 
 * Password enforcement settings
 * 
 * @return The form structure
 */
function iapp_rules_admin_settings() {
  drupal_add_js(drupal_get_path('module', 'iapp_rules') .'/iapp_rules.js', 'module','header');
  $form['password_enforcement'] = array(
    '#type' => 'fieldset',
    '#title' => t('Enforcement settings'),
    '#collapsible' => FALSE,
  );
  $form['password_enforcement']['password_level'] = array(
    '#type' => 'select',
    '#title' => t('Enforcement level'),
    '#options' => array(
      IAPP_BASIC => t('Basic'),
      IAPP_STANDARD1 => t('Standard I'),
      IAPP_STANDARD2 => t('Standard II'),
    ),
        '#default_value' => variable_get('password_level', ''),
    '#description' => t('
      <ul>
        <li><em>Basic:</em> 6 characters, No complexity conditions, No ageing, No reuse restrictions.</li>
        <li><em>Standard I:</em> 6 characters, 3 complexity classes, 90 days expiry.</li>
        <li><em>Standard II:</em> 8 characters, 2 complexity classes, 90 days expiry.</li>
      </ul>
    '),
  );

  $form['password_enforcement']['password_ageing'] = array(
    '#type' => 'radios',
    '#title' => t('Password age handling'),
    '#options' => array(
      IAPP_METHOD1 => t('Method I'),
      IAPP_METHOD2 => t('Method II'),
    ),
        '#default_value' => variable_get('password_ageing', ''),
    '#description' => t('
      <ul>
        <li><em>Method I:</em>No reuse for <b>'.variable_get('method1_iterations') .'</b> iterations, Maximum 1 password change/day.</li>
        <li><em>Method II:</em>No reuse for 365 days</li>
      </ul>
    '),
  );
  return system_settings_form($form);
}

/**
 * Validate function for admin settings
 */
function iapp_rules_admin_settings_validate($form, &$form_state) {

	drupal_set_message(t('Note: some of these changes will only be affected for new users.'), 'warning');
}

/**
 * Menu callback
 * 
 * Handle the password policy
 * 
 * @return The form structure
 */
function iapp_rules_password_policy() {
  if(variable_get('password_level', IAPP_BASIC) == IAPP_BASIC){
    $form['basic_enforcement'] = array(
    '#value' => '<h4 align="center">There is no password policy for Basic enforcement level.</h4>',
    );  
    return $form;
  }
  else {
    $form['password_policy'] = array(
      '#type' => 'fieldset',
      '#title' => t('Password policy settings'),
      '#weight' => -1,
    );
    if (variable_get('password_ageing', IAPP_METHOD1) == IAPP_METHOD1) {
      $form['password_policy']['method1_iterations'] = array(
        '#type' => 'textfield',
        '#title' => t('Iterations allowed'),
        '#default_value' => variable_get('method1_iterations', IAPP_M1_ITERATIONS_ALLOWED),
        '#description' => t('The number iterations for which the user cannot use the same password.'),
      );
      $form['#validate'][] = 'not_an_empty_methodI_field';
    }
    else {
      $form['password_policy']['method2_day_span'] = array(
        '#type' => 'textfield',
        '#title' => t('Password no reuse span'),
        '#description' => t('The password no reuse span for method II (in days).'),
        '#default_value' => variable_get('method2_day_span', IAPP_M2_DAY_SPAN),
        '#required' => 0,
      );
      $form['#validate'][] = 'not_an_empty_field';
    }

    return system_settings_form($form);
  }
}
function not_an_empty_methodI_field($form, &$form_state){
    if($form_state['values']['op'] == t('Save configuration')){
    if($form['password_policy']['method1_iterations']['#value'] == '' || !is_numeric($form['password_policy']['method1_iterations']['#value'])){
                    if(arg(3) == 'password_policy'){
                    form_set_error('method1_iterations', t('Iteration allowed field should be a numeric value.'));
                    }
                }
    }
}
function not_an_empty_field($form, &$form_state){
    if($form_state['values']['op'] == t('Save configuration')){
        switch(arg(3)){
            case 'password_policy':
                if($form['password_policy']['method2_day_span']['#value'] == '' || !is_numeric($form['password_policy']['method2_day_span']['#value'])){
                    if(arg(3) == 'password_policy'){
                    form_set_error('method2_day_span', t('Password no reuse span field should be a numeric value.'));
                    }
                }
            case 'password_expire':
                if(!is_numeric($form['password_expire']['password_expire_warning']['#value'])){
                    if(arg(3) == 'password_expire'){
                    form_set_error('password_expire_warning', t('Password expiry warning value should be a numeric value.'));
                    }
                }
            case 'activity_log':
                if(!is_numeric($form['config_activity']['activity_log_span']['#value'])){
                    if(arg(3) == 'activity_log'){
                        form_set_error('activity_log_span', t('Activity log span field should be a numeric value.'));
                    }
                }
        }
    }
}

/**
 * Menu callback
 * 
 * Password expiration settings form
 *
 * @return The form structure
 */
function iapp_rules_password_expire() {
  if(variable_get('password_level', IAPP_BASIC) == IAPP_BASIC){
    $form['basic_enforcement'] = array(
    '#value' => '<h4 align="center">There is no password expiry for Basic enforcement level.</h4>',
    );  
    return $form;
  }
  else {
    $form['password_expire'] = array(
      '#type' => 'fieldset',
      '#title' => t('Password expiry settings'),
      '#weight' => -1,
    );
    $form['password_expire']['password_expire_warning'] = array(
      '#type' => 'textfield',
      '#title' => t('Warning period'),
      '#default_value' => variable_get('password_expire_warning', PASSWORD_EXPIRE_WARNING),
      '#description' => t('The period of time a user is warned before their password expires(In days).'),
      '#required' => 1,
    );
    $form['password_expire']['password_expire_warning_message'] = array(
      '#type' => 'textarea',
      '#title' => t('Warning message'),
      '#description' => t('The message that will be displayed upon login to the user if their password is in the warning period. Leave blank for no message.'),
      '#default_value' => variable_get('password_expire_warning_message', t(PASSWORD_EXPIRE_WARNING_MESSAGE)),
      '#rows' => 2,
      '#required' => 1,
    );
    $form['password_expire']['mail'] = array(
      '#type' => 'fieldset',
      '#title' => t('Warning Mail'),
      '#weight' => 2,
    );
    $form['password_expire']['mail']['pass_warning_mail_subject'] = array(
      '#type' => 'textfield',
      '#title' => t('Warning mail subject'),
      '#default_value' => variable_get('pass_warning_mail_subject', t(PASS_WARNING_MAIL_SUBJECT)),
      '#description' => t('Subject for the password expiry warning mail (!site for sitename).'),
      '#required' => 1,
    );
    $form['password_expire']['mail']['pass_warning_mail_message'] = array(
      '#type' => 'textarea',
      '#title' => t('Mail content'),
      '#description' => t('The message to be sent to the user (use !site for sitename, !username for user name).'),
      '#default_value' => variable_get('pass_warning_mail_message', t(PASS_WARNING_MAIL_MESSAGE)),
      '#rows' => 2,
      '#required' => 1,
    );
    $form['#validate'][] = 'not_an_empty_field';
    return system_settings_form($form);
  }
}
function not_an_number($form, &$form_state){
    if(!is_numeric($form['password_expire']['password_expire_warning']['#value'])){
        form_set_error('password_expire_warning', t('Password expiry warning value should be a numeric value.'));
    }
}

/**
 * Menu callback
 * 
 * Handle the login attempt failures
 *
 * @return The form structure
 */
function iapp_rules_unsuccessful_login() {
  $form['unsuccessful_login'] = array(
    '#type' => 'fieldset',
    '#title' => t('Login attempt failure settings'),
    '#weight' => -1,
    '#required' => 1,
  );
  $form['unsuccessful_login']['login_attempts_allowed'] = array(
    '#type' => 'textfield',
    '#title' => t('Number of unsuccessful login attempts'),
    '#default_value' => variable_get('login_attempts_allowed', IAPP_UNLOGIN_ATTEMPTS),
    '#description' => t('The number of consecutive unsuccessful login attempts allowed for a user.'),
    '#required' => 1,
  );
  $form['unsuccessful_login']['try_time_span'] = array(
    '#type' => 'textfield',
    '#title' => t('Account login try time span'),
    '#description' => t('The amount of time for which the user can allowed to try login (in minutes).'),
    '#default_value' => variable_get('try_time_span', IAPP_UNLOGIN_TRY_TIME),
    '#required' => 1,
  );
  $form['unsuccessful_login']['lock_time_span'] = array(
    '#type' => 'textfield',
    '#title' => t('Account lock time span'),
    '#description' => t('The amount of time for which the user should be locked (in minutes).'),
    '#default_value' => variable_get('lock_time_span', IAPP_UNLOGIN_LOCK_TIME),
    '#required' => 1,
  );
  $form['#validate'][] = iapp_rules_unsuccessful_login_validate;
  return system_settings_form($form);
}

/********** FUNCTION FOR VALIDATING UNSUCCESSFUL LOGIN CONFIGURATION SETTINGS --- ADDED BY GIRI SHANKAR R dated 06/09/2010******/
function iapp_rules_unsuccessful_login_validate(&$form,$form_state) {
    if(isset($form_state['values']['login_attempts_allowed'])) {
        if(!(is_numeric($form_state['values']['login_attempts_allowed'])) )
            form_set_error('submitted','Number of unsuccessful login attempts should be numeric.');
    }

    if(isset($form_state['values']['try_time_span'])) {
        if(!(is_numeric($form_state['values']['try_time_span'])) )
            form_set_error('submitted','Account login try time span should be numeric.');
    }

    if(isset($form_state['values']['lock_time_span'])) {
        if(!(is_numeric($form_state['values']['lock_time_span'])) )
            form_set_error('submitted','Account lock time span should be numeric.');
    }
}
/********** FUNCTION FOR VALIDATING UNSUCCESSFUL LOGIN CONFIGURATION SETTINGS --- ADDED BY GIRI SHANKAR R dated 06/09/2010******/

/**
 * Menu callback
 * 
 * Handle the forgot password action
 *
 * @return The form structure
 */

function iapp_rules_forgot_password() {
    $form['forgot_password'] = array(
    '#type' => 'fieldset',
    '#title' => t('Forgot password settings'),
    '#weight' => -1,
    );

    // As validity of the resetted password should not be blank -- #required is included  -- Added by GIRI SHANKAR R dated 06/09/2010
    $form['forgot_password']['forgot_password_span'] = array(
    '#type' => 'textfield',
    '#title' => t('Validity of the resetted password'),
    '#default_value' => variable_get('forgot_password_span', FORGOT_PASSWORD_VALIDITY),
    '#description' => t('Number of days for which the resetted password will be valid.'),
    '#required' => 1,
    );

    // As forgot password restricted gap should not be blank -- #required is included  -- Added by GIRI SHANKAR R dated 06/09/2010
    $form['forgot_password']['forgot_password_restricted_gap'] = array(
    '#type' => 'textfield',
    '#title' => t('Forgot password request gap'),
    '#default_value' => variable_get('forgot_password_restricted_gap', IAPP_FORGOT_PASSWORD_GAP),
    '#description' => t('The restricted gap between two forgot password requests (in days).'),
    '#required' => 1,
    );

    //Forgot password and reset password e-mail template configuration settings.
    $form['forgot_password']['mail'] = array(
      '#type' => 'fieldset',
      '#title' => t('Forgot Password Mail'),
      '#weight' => 2,
    );

    $form['forgot_password']['mail']['forgot_password_mail_subject'] = array(
      '#type' => 'textfield',
      '#title' => t('Forgot password mail subject'),
      '#default_value' => variable_get('forgot_password_mail_subject', t(PASS_WARNING_MAIL_SUBJECT)),
      '#description' => t('Subject for the password forgot mail (!site for sitename).'),
    );

    $form['forgot_password']['mail']['forgot_password_mail_message'] = array(
      '#type' => 'textarea',
      '#title' => t('Mail content'),
      '#description' => t('The message to be sent to the user (use !site for sitename, !username for user name, !days for days).'),
      '#default_value' => variable_get('forgot_password_mail_message', t(PASS_WARNING_MAIL_MESSAGE)),
      '#rows' => 2,
    );

    $form['reset_password']['mail'] = array(
      '#type' => 'fieldset',
      '#title' => t('Reset Password Mail'),
      '#weight' => 3,
    );

    $form['reset_password']['mail']['reset_password_mail_subject'] = array(
      '#type' => 'textfield',
      '#title' => t('Reset password mail subject'),
      '#default_value' => variable_get('reset_password_mail_subject', t(PASS_WARNING_MAIL_SUBJECT)),
      '#description' => t('Subject for the password reset mail (!site for sitename).'),
    );

    $form['reset_password']['mail']['reset_password_mail_message'] = array(
      '#type' => 'textarea',
      '#title' => t('Mail content'),
      '#description' => t('The message to be sent to the user (use !site for sitename, !username for user name, !days for days).'),
      '#default_value' => variable_get('reset_password_mail_message', t(PASS_WARNING_MAIL_MESSAGE)),
      '#rows' => 2,
    );

    $form['buttons']['submit'] = array('#type' => 'submit', '#value' => t('Save configuration') );
    $form['buttons']['reset'] = array('#type' => 'submit', '#value' => t('Reset to defaults') );

    if (!empty($_POST) && form_get_errors()) {
        drupal_set_message(t('The settings have not been saved because of the errors.'), 'error');
    }
    $form['#validate'][] = 'iapp_rules_forgot_password_validate';
    return system_settings_form($form);
}

/********** FUNCTION FOR VALIDATING FORGOT PASSWORD CONFIGURATION SETTINGS --- ADDED BY GIRI SHANKAR R dated 06/09/2010******/
function iapp_rules_forgot_password_validate(&$form,$form_state) {
    if(isset($form_state['values']['forgot_password_span'])) {
        if(!(is_numeric($form_state['values']['forgot_password_span'])) )
            form_set_error('submitted','Validity of the resetted password should be numeric.');
    }

    if(isset($form_state['values']['forgot_password_restricted_gap'])) {
        if(!(is_numeric($form_state['values']['forgot_password_restricted_gap'])) )
            form_set_error('submitted','Forgot password request gap should be numeric.');
    }
}
/********** FUNCTION FOR VALIDATING FORGOT PASSWORD CONFIGURATION SETTINGS --- ADDED BY GIRI SHANKAR R dated 06/09/2010******/
/**
 * Menu callback
 * 
 * Handle the miscellaneous IAPP settings
 *
 * @return The form structure
 */
function iapp_rules_misc_settings() {
  $form['redirect_settings'] = array(
    '#type' => 'fieldset',
    '#title' => t('Redirect URL'),
    '#weight' => -1,
  );
  $form['redirect_settings']['password_redirect_url'] = array(
    '#type' => 'textfield',
    '#title' => t('Redirect URL'),
    '#description' => t('The URL to which user should be redirected for password change. Leave blank for the default user edit page.'),
    '#default_value' => variable_get('password_redirect_url', ''),
  );
  $form['add_user_settings'] = array(
    '#type' => 'fieldset',
    '#title' => t('New user password mail'),
    '#weight' => -1,
  );
  $form['add_user_settings']['add_user_password_subject'] = array(
    '#type' => 'textfield',
    '#title' => t('Password mail subject'),
    '#default_value' => variable_get('add_user_password_subject', t(ADD_USER_PASSWORD_SUBJECT)),
    '#description' => t('Subject for add user password mail (!site for sitename).'),
  );
  $form['add_user_settings']['add_user_password_message'] = array(
    '#type' => 'textarea',
    '#title' => t('Mail content'),
    '#description' => t('The message to be sent to the user (use !site for sitename, !username for user name, !password for password).'),
    '#default_value' => variable_get('add_user_password_message', t(ADD_USER_PASSWORD_MESSAGE)),
    '#rows' => 2,
  );
  return system_settings_form($form);
}

/**
 * Menu callback
 * 
 * Handle the activity log configuration
 *
 * @return The form structure
 */
function iapp_rules_config_activity() {
  $form['config_activity'] = array(
    '#type' => 'fieldset',
    '#title' => t('Configure activity log'),
    '#weight' => -1,
  );
  $form['config_activity']['activity_log_span'] = array(
    '#type' => 'textfield',
    '#title' => t('Activity log span'),
    '#default_value' => variable_get('activity_log_span', IAPP_ACTIVITY_LOG_SPAN),
    '#description' => t('The number of days for which activity log should be maintained.'),
  );
  $form['#validate'][] = 'not_an_empty_field';
  return system_settings_form($form);
}

/**
 * Displays the user activity log
 *
 * @return Themed activity log page
 */
function iapp_activity_log() {
  $header = array(
    array('data' => t('Date'), 'field' => 'timestamp', 'sort' => 'desc'),
    array('data' => t('Category'), 'field' => 'category'),
    array('data' => t('Source'), 'field' => 'source'),
    array('data' => t('User'), 'field' => 'user'),
    array('data' => t('Description'), 'field' => 'description'),
    );
  
  $log_limit = time() - variable_get('activity_log_span', IAPP_ACTIVITY_LOG_SPAN) * 24 * 60 * 60;
    
  $query = "SELECT timestamp, category, source, user, description FROM iapp_activity_log WHERE timestamp>$log_limit ". tablesort_sql($header);
  $count_query = "SELECT COUNT(id) FROM iapp_activity_log WHERE timestamp>$log_limit";
  $result = pager_query($query, 30, 0, $count_query);

  $rows = array();
  while ($log = db_fetch_object($result)) {
    $rows[] = array(format_date($log->timestamp, 'custom', 'd M y, g:i:s a'), $log->category, $log->source, $log->user, $log->description);
  }

  if (empty($rows)) {
    $rows[] = array(array('data' => t('No results are available.'), 'colspan' => 5));
  }

  $output  = theme('table', $header, $rows);
  $output .= theme('pager', NULL, 30, 0);

  return $output;
}
