<?php

/**
 * Implementation of sector_seo_rules().
 * @return (array) rules
 */
function sector_seo_rules() {
/*  $rules['keyword_density'] = array(
    'name' => t('Keyword density in the body'),
    'description' => t('Checks the density of keywords over the the body of a page. Remark: too high density is not a good SEO.'),
    'threshold type' => 'range',
    'default threshold' => array(5, 30),
    'callback' => 's_keyword_rules_density',
    'passed feedback' => t('Test passed.'),
    'failed feedback' => t('Test failed, please make sure you use your keywords in the body but not too often.'),
  );
*/  
  return $rules;
}

function s_test(){
  return '';
}

/**
 * Dervies the densitiy of keywords within the body of the node.
 * @param object $form_values
 */
function s_keyword_rules_density($form_values, $type = 'page') {
  //Implementation for the new functionality in the sector.
}
?>