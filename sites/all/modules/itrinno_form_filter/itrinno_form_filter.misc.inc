<?php

/**
 * @file
 * ITrInno Form Filter miscelaneous helper functions.
 */


/**
 * Gets the current page path alias.
 * @author erickj@ciandt.com
 * @since 21-Feb-2013
 * 
 * @return string Current page path alias (or system path if no alias present).
 */
function _itrinno_form_filter_get_current_page() {
  return (isset($_GET['q']) ? drupal_get_path_alias($_GET['q']) : '');
}

/**
 * Tells if user is super admin.
 * @author erickj@ciandt.com
 * @since 21-Feb-2013
 * 
 * @global stdClass $user Global $user object.
 * @return boolean TRUE if $user is super user, FALSE othwerwise.
 */
function _itrinno_form_filter_is_super_admin() {
  global $user;
  return isset($user->uid) && ($user->uid == 1);
}

/**
 * Tells if we're on an adminstrative section of the site.
 * @author erickj@ciandt.com
 * @since 21-Feb-2013
 * 
 * @param string $path Current page path (may be system path or alias).
 * @return boolean TRUE if path matches admin* or node*, FALSE otherwise.
 */
function _itrinno_form_filter_is_admin_page($path = NULL) {
  // set $path as the current path if none has been passed
  $path = (is_null($path)) ? _itrinno_form_filter_get_current_page() : drupal_get_path_alias($path);
  
  // set a list of patterns ready to be evaluated by drupal_match_path()

   $admin_path_patterns = variable_get('itrinno_form_filter_exclude_path', '');
    
	if(!empty($admin_path_patterns)) {
	  if (drupal_match_path($path, $admin_path_patterns)) {
	      
		return TRUE;
	  }
    }

	return FALSE;
}

/**
 * Checks a URI
 * @author erickj@ciandt.com
 * @since 27-feb-2013
 * 
 * @param type $uri
 *   The URI to check. If not informed, the current requested URI will be used.
 * @return boolean
 *   True if no threats have been identified, FALSE otherwise.
 */
function _itrinno_form_filter_check_uri($uri = NULL) {
  // set $uri default value as the current requested URI
  $uri = (is_null($uri)) ? request_uri() : $uri;
  
  $url_protection_check_list = array_filter(explode('#', variable_get('url_protection_conditions', '')));
  
  foreach ($url_protection_check_list as $pattern) {
    $pos = substr_count($uri, $pattern);
    if ($pos > 0) {
      return FALSE;
    }
  }
  
  
  return TRUE;
}

/**
 * Returns the filtered and trimmed list of excluded form IDs.
 * @author erickj@ciandt.com
 * @since 01-mar-2013
 * 
 * @return array A list of form IDs that should bypass form filter verification.
 */

function _itrinno_form_filter_get_excluded_form_ids() {
  // get the comma-separated list of values, turn it into an array, remove empty
  // values and trim the remaining ones
   
  return array_map('trim', array_filter(explode(',' , variable_get('excluded_form_ids', ''))));
}

/**
 * Returns a themed list of changes applied by content filters.
 * @author erickj@ciandt.com
 * @since 02-mar-2013
 * 
 * @param mixed $original_value Value before filtering.
 * @param mixed $filtered_value Value after filtering.
 * @return string A themed list of changes (as and ouptut of theme('item_list')).
 */
function _itrinno_form_filter_themed_changes_list($original_value, $filtered_value) {
  return theme(
      'item_list',
      array(
        t('Original:') . ' ' . htmlspecialchars(print_r($original_value, TRUE)),
        t('Filtered:') . ' ' . htmlspecialchars(print_r($filtered_value, TRUE)),
      ));
}


