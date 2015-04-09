<?php

/**
 * @file
 * Helper functions for ITrInno Form Filter module.
 */

/**
 * Filters values to be displayed in a form in order to prevent XSS attacks.
 * @author erickj@ciandt.com
 * @since 21-feb-2013
 * 
 * @param array $element
 *   A FAPI element.
 * @param array $callbacks
 *   A list of functions that should be run against the values to filter them.
 *   'filter_xss_admin' is the default value. Those functions should accept the value
 *   to be filtered as their first parameter.
 * @param array $callbacks_parameters
 *   An associative array keyed by callback function name with function parameters.
 *   Example (calling filter_xss() only allowing '&lt;p&gt;' and '&lt;strong&gt;' tags):
 *   <code>
 *     _itrinno_form_filter_filter_form_contents($form, array('filter_xss'), array('filter_xss' => array(array('p', 'strong'))));
 *   </code>
 */
function _itrinno_form_filter_filter_form_contents(&$form_element, $callbacks = array('filter_xss_admin'), $callbacks_parameters = array()) {
  $types_to_inspect = array('fieldset');
  $types_to_filter = array('fieldset', 'markup', 'checkboxes', 'radios', 'select', 'textfield', 'textarea');
  
  // we should have callbacks to filter content
  // if we don't, bail out
  if (!(is_array($callbacks)) || (empty($callbacks))) {
    return;
  }
  // $element should be a FAPI item, so has to be an array
  if (!is_array($form_element)) {
    return;
  }
  
  $elements = _itrinno_form_filter_get_form_elements($form_element, $types_to_inspect, $types_to_filter);
  foreach ($elements as &$element) {
    foreach ($callbacks as $callback) {
      if (!function_exists($callback)) {
        continue;
      }
      $callback_parameters = (isset($callbacks_parameters[$callback])) ? $callbacks_parameters[$callback] : array();
      // get the key names that should be filtered for this form element
      $value_idxs = _itrinno_form_filter_get_filterable_properties_names($element);
      foreach ($value_idxs as $value_idx) {
        if (!isset($element[$value_idx])) {
          continue;
        }
        $original_value = $element[$value_idx];
        $filtered_value = $element[$value_idx] = _itrinno_form_filter_filter_nested_values($element[$value_idx], $callback, $callback_parameters);
        if (($original_value !== $filtered_value) && (variable_get('itrinno_form_filter_enable_debug_info', FALSE))) {
          watchdog(
              'ITrInno Form Filter',
              'Form element of type @element_type property @property value has been changed: !themed_changes_list',
              array(
                '@element_type' => $element['#type'],
                '@property' => $value_idx,
                '!themed_changes_list' => _itrinno_form_filter_themed_changes_list($original_value, $filtered_value),
              ),
              WATCHDOG_NOTICE);
        }
      }
    }
  }
}

/**
 * Filters values that have been submitted through a form in order to prevent XSS attacks.
 * @author erickj@ciandt.com
 * @since 21-feb-2013
 * 
 * @param array $form_element
 *   A FAPI element.
 * @param array $callbacks
 *   A list of functions that should be run against the values to filter them.
 *   'filter_xss' is the default callback. Those functions should accept the value
 *   to be filtered as their first parameter.
 * @param array $callbacks_parameters
 *   An associative array keyed by callback function name with function parameters.
 *   Example (calling filter_xss() only allowing '&lt;p&gt;' and '&lt;strong&gt;' tags):
 *   <code>
 *     _itrinno_form_filter_filter_form_contents($form, $form_state, array('filter_xss'), array('filter_xss' => array(array('p', 'strong'))));
 *   </code>
 * @return array
 *   A list of form elements names that have been filtered.
 */
function _itrinno_form_filter_filter_form_state_values($form_element, &$form_state, $callbacks = array('filter_xss'), $callbacks_parameters = array()) {
  $changed_elements = array();

  // $types_to_inspect = array('fieldset');
  // $types_to_filter = array('textfield', 'textarea', 'hidden', 'item');
  
  // we should have callbacks to filter values
  // if we don't, bail out
  if (!(is_array($callbacks)) || (empty($callbacks))) {
    return $changed_elements;
  }
  // $element should be a FAPI item, so has to be an array
  if (!is_array($form_element)) {
    return $changed_elements;
  }
  
  // get the references for all form elements that should be checked agains
  // our validators
  $elements = _itrinno_form_filter_get_form_elements($form_element);
  foreach ($elements as $element) {
    foreach ($callbacks as $callback) {
      // skip invalid callback functions
      if (!function_exists($callback)) {
        continue;
      }
      $callback_parameters = (isset($callbacks_parameters[$callback])) ? $callbacks_parameters[$callback] : array();
      // get the key name of the item that should be filtered
      $value_idx = _itrinno_form_filter_get_identifier_property_name($element);

      // get the filtered value and set if in $form_state
      // also list form elements that have been changed
      // this can be used to set form errors outside the scope of this function
      $original_value = $form_state['values'][$element[$value_idx]];
      $filtered_value = _itrinno_form_filter_filter_nested_values($original_value, $callback, $callback_parameters);
      if ($original_value !== $filtered_value) {
        $changed_elements[] = $element[$value_idx];
        if (variable_get('itrinno_form_filter_enable_debug_info', FALSE)) {
          watchdog(
              'ITrInno Form Filter',
              'Form submitted value for @element_name has been changed: !themed_changes_list',
              array(
                '@element_name' => $element[$value_idx],
                '!themed_changes_list' => _itrinno_form_filter_themed_changes_list($original_value, $filtered_value),
              ),
              WATCHDOG_NOTICE);
        }
      }
      form_set_value($element, $filtered_value, $form_state);
    }
  }
  
  return $changed_elements;
}

/**
 * Recursively inspects form API elements and returns references to items that
 * match the specified form API types.
 * @author erickj@ciandt.com
 * @since 28-feb-2013
 * 
 * @staticvar array $elements
 *   An array of references to form API elements of the specified type.
 * @param array $element
 *   Form API element to inspect.
 * @param array $types_to_inspect
 *   List of form API element types that should be recursed into. By default
 *   only fieldsets are looked into.
 * @param array $types_to_get
 *   List of suitable form API types that should be returned. By default they
 *   are 'textfield', 'textarea', 'hidden', 'item'.
 * @param bool $reset
 *   Whether to reset the internal static variable $elements or not. TRUE by
 *   default. Should probably only be used in internal recursive call.
 * @return array
 */
function _itrinno_form_filter_get_form_elements(&$element, $types_to_inspect = array('fieldset'), $types_to_get = array('textfield', 'textarea', 'hidden', 'item'), $reset = TRUE) {
  static $elements = array();

  if (!is_array($element)) {
    return $elements;
  }
  
  if ($reset) {
    $elements = array();
  }
  
  foreach ($element as &$child_element) {
    // skip items that are not form elements but rather form elements' properties
    if (!(is_array($child_element)) || !(isset($child_element['#type']))) {
      continue;
    }
    // recurse only into form elements that might contain other form elements nested,
    // such as fieldsets
    if (in_array($child_element['#type'], $types_to_inspect)) {
      _itrinno_form_filter_get_form_elements($child_element, $types_to_inspect, $types_to_get, FALSE);
    }
    // build a list of elements references to be returned
    if (in_array($child_element['#type'], $types_to_get)) {
      $elements[] = &$child_element;
    }
  }
  
  return $elements;
}

/**
 * Filter form elements values recursively in a way that nested arrays will
 * get fully filtered.
 * @author erickj@ciandt.com
 * @since 21-feb-2013
 * 
 * @param string|array $value
 *   The value to be filtered.
 * @param string $callback
 *   A callback function to do the actual filtering. This function must accept
 *   the valued to be filtered as its first parameter.
 * @param array $extra_callback_parameters
 *   An associative array keyed by callback function name with function parameters.
 * @return string|array
 *   The filtered form element values.
 * 
 * @see _itrinno_form_filter_filter_value().
 */
function _itrinno_form_filter_filter_nested_values($value, $callback, $extra_callback_parameters = array()) {
  if (is_array($value)) {
    foreach ($value as &$sub_value) {
      $sub_value = _itrinno_form_filter_filter_nested_values($sub_value, $callback, $extra_callback_parameters);
    }
    return $value;
  }
  else {
    return _itrinno_form_filter_filter_value($value, $callback, $extra_callback_parameters);
  }
}

/**
 * Filters a single form element value.
 * @author erickj@ciandt.com
 * @since 21-feb-2013
 * 
 * @param string $value
 *   The value to be filtered.
 * @param string $callback
 *   A callback function to do the actual filtering. This function must accept
 *   the valued to be filtered as its first parameter.
 * @param array $extra_callback_parameters
 *   An array with parameters to be passed onto the filtering function.
 * @return string
 *   The filtered value as returned by the filtering callback function.
 */
function _itrinno_form_filter_filter_value($value, $callback, $extra_callback_parameters = array()) {
  // set the form item current value as the first callback parameter
  $callback_parameters = array($value);
  if (!(is_null($extra_callback_parameters)) && (is_array($extra_callback_parameters))) {
    $callback_parameters = array_merge($callback_parameters, $extra_callback_parameters);
  }

  // return the new form item value (filtered by callback)
  return call_user_func_array($callback, $callback_parameters);
}

/**
 * Returns a list of properties that should be filtered given a FAPI element.
 * @author erickj@ciandt.com
 * @since 21-Feb-2013
 * 
 * @param array $element A FAPI element.
 * @return mixed
 *   A list of FAPI properties to be filtered. Returns FALSE if element is invalid.
 */
function _itrinno_form_filter_get_filterable_properties_names($element) {
  if (!isset($element['#type'])) {
    return FALSE;
  }
  
  $filterable_properties = array('#title', '#description');
  
  switch ($element['#type']) {
    case 'markup':
      $filterable_properties[] = '#value'; // @TODO: this should be '#markup' for Drupal 7
      break;
    case 'checkboxes':
    case 'radios':
      $filterable_properties[] = '#title';
      $filterable_properties[] = '#options';
      break;
    case 'textfield':
    case 'textarea':
      // 
      break;
    default:
      $filterable_properties[] = '#default_value';
  }
  
  return $filterable_properties;
}

/**
 * Returns the identifier property to use in conjuntion with form_set_value.
 * @author erickj@ciandt.com
 * @since 21-Feb-2013
 * 
 * @param array $element A FAPI element.
 * @return mixed
 *   The identifier FAPI property for a given element. Returns FALSE if element is invalid.
 */
function _itrinno_form_filter_get_identifier_property_name($element) {
  if (!isset($element['#type'])) {
    return FALSE;
  }
  
  // @TODO: is it always just #name the identifier for a field?
  return '#name';
}

/**
 * Filters form submitted values by stripping out patterns considered dangerous.

 * @param mixed $value The value to be filtered.
 * @return mixed The filtered value.
 */
function _itrinno_form_filter_prevent_hacking($value) {
  $field_protection_patterns = array_filter(explode(',', drupal_strtolower(variable_get('field_protection_conditions', ''))));
  
  foreach ($field_protection_patterns as $pattern) {
    $value = str_ireplace($pattern, '', $value);
  }
  
  return $value;
}

/**
 * Filters form submitted values by stripping out patterns considered dangerous.

 * @param mixed $value The value to be filtered.
 * @return mixed The filtered value.
 */
function _itrinno_form_filter_prevent_hacking_url($value) {
  $field_protection_patterns = array_filter(explode('#', drupal_strtolower(variable_get('url_protection_conditions', ''))));
  $custom_field_protection_patterns = array_filter(explode('#', drupal_strtolower(variable_get('custom_url_protection_conditions', ''))));
  
  // join both lists
  $field_protection_patterns = array_unique(array_merge($field_protection_patterns, $custom_field_protection_patterns));
  
  foreach ($field_protection_patterns as $pattern) {
    $value = str_ireplace($pattern, '', $value);
  }
  
  return $value;
}
/**
*Function for making a multi dimentional array to one dimentional array
*/
  function array_flatten_recursive($array) { 
     if (!$array) return false;
     $flat = array();
     $RII = new RecursiveIteratorIterator(new RecursiveArrayIterator($array));
     foreach ($RII as $value) $flat[] = $value;
     return $flat;
  }

/**
*Function for checking input array is a multidimentional array or not
*/   
  function isMultiArray($a){
     foreach($a as $v) if(is_array($v)) return TRUE;
     return FALSE;
  }
/**
 ** THIS FUNCTION HAS BEEN WRITTEN TO CHECK MULTI DIMENTIONAL ARRAY
 **/
function in_object(&$obj, $field = '' ,$field_protection_checks_arr) {
  
  foreach($obj as $key=>$val) {
    
    if ($val) {
      foreach($field_protection_checks_arr as $check_key => $checks) {
        if (!is_array($val) && !is_object($val)){
          $pos = substr_count(strtolower($val), strtolower($checks));

          if ($pos > 0) { 
            $error_field = ($field == '') ? $key : $field.']['.$key;
            form_set_error($error_field, t(variable_get('form-error-message', 'The system encountered vulnerable character in one of the form fields, please check and provide proper value or character.')));
          }
        }
          //added -to check the array value
          $checks = check_plain(filter_xss_admin($checks));
      }
     if (is_array($val)) { 
         in_object($val);
    }
    else {
       // Filter value and assign to the same array
       //added -to check the array value
     $val = check_plain(filter_xss_admin($val));
     }
    }
   }
 }