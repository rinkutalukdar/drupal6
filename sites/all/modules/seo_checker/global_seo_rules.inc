<?php

/**
 * Implementation of global_seo_rules().
 * @return (array) rules
 */
function global_seo_rules() {
  $rules['alt_attributes'] = array(
    'name' => t('Alt attributes in &lt;img&gt; - tags'),
    'description' => t('Checks if all the &lt;img&gt; tags in the body have an alt attribute.'),
    'threshold type' => 'at_least',
    'default threshold' => 100,
    'callback' => 'basic_seo_rules_alt_attribute',
    'passed feedback' => t('Test passed.'),
    'failed feedback' => t('Test failed, please make sure your images contain an alternative text.'),
  );
  $rules['title_attributes'] = array(
    'name' => t('Title attributes in &lt;a href&gt; - tags'),
    'description' => t('Checks if all the &lt;a href&gt; tags have a title attribute.'),
    'threshold type' => 'at_least',
    'default threshold' => 100,
    'callback' => 'basic_seo_rules_title_attribute',
    'passed feedback' => t('Test passed.'),
    'failed feedback' => t('Test failed, please make sure your links contain a title attribute.'),
  ); 
  $rules['keyword_density'] = array(
    'name' => t('Keyword density in the body'),
    'description' => t('Checks the density of keywords over the the body of a page. Remark: too high density is not a good SEO.'),
    'threshold type' => 'range',
    'default threshold' => array(5, 30),
    'callback' => 'keyword_rules_density',
    'passed feedback' => t('Test passed.'),
    'failed feedback' => t('Test failed, please make sure you use your keywords in the body but not too often.'),
  );
  $rules['keyword_in_title'] = array(
    'name' => t('Usage of keywords in node titles'),
    'description' => t('Checks if at least one of the keywords is used in the node title. If a keyword is used in the title, the result of this test indicates how early in the title the keyword appears. A threshold of 100% means that a keyword must be the first word in a node title while a threshold of 50% requires keywords to be in the first half of the node title.'),
    'threshold type' => 'at_least',
    'default threshold' => 50,
    'callback' => 'keyword_rules_title',
    'passed feedback' => t('Test passed.'),
    'failed feedback' => t('Test failed, place your keywords early in your node title.'),
  );
  if (module_exists('page_title')) {
    $rules['keyword_in_page_title'] = array(
      'name' => t('Usage of keywords in page titles (Page Title Module)'),
      'description' => t('Checks if at least one of the keywords is used in the page title. If a keyword is used in the title, the result of this test indicates how early in the title the keyword appears. A threshold of 100% means that a keyword must be the first word in a page title while a threshold of 50% requires keywords to be in the first half of the page title.'),
      'threshold type' => 'at_least',
      'default threshold' => 50,
      'callback' => 'keyword_rules_title',
      'callback arguments' => array('page_title'),
      'passed feedback' => t('Test passed.'),
      'failed feedback' => t('Test failed, place your keywords early in your page title.'),
    );
  }
  $rules['keyword_in_headings'] = array(
    'name' => t('Usage of HTML page title'),
    'description' => t('Calculates the percentage of the heading-tags (e.g. &lt;h1&gt;,&lt;h2&gt;,...) in the node body that contain keywords.'),
    'threshold type' => 'at_least',
    'default threshold' => 50,
    'callback' => 'keyword_rules_headings',
    'passed feedback' => t('Test passed.'),
    'failed feedback' => t('Test failed, use keywords in your heading-tags (e.g. &lt;h1&gt;,&lt;h2&gt;,... - Tags with lower numbers weigh more.)'),
  );
  
  //check for video elements  
  $rules['flash_alternative'] = array(
    'name' => t('Flash Alternate Images / HTML5 utilization'),
    'description' => t('The alternate images should be tagged appropriately as well so that search engines are able to "read" the image.'),
    'threshold type' => 'at_least',
    'default threshold' => 100,
    'callback' => 'flash_alternative_check',
    'passed feedback' => t('Test passed.'),
    'failed feedback' => t('Test failed, please make sure you use alternate images appropriately set to the video/object elements.'),
  );

  $rules['check_SEO_friendly_URL'] = array(
    'name' => t('Check SEO friendliness of url'),
    'description' => t('Check whether the current node/page have a SEO friendly url or not. Also please make sure that the URL have a keyword for better results.'),
    'threshold type' => 'at_least',
    'default threshold' => 100,
    'callback' => 'check_seo_friendly_url',
    'passed feedback' => t('Test passed.'),
    'failed feedback' => t('Test failed, please make sure you have some valid url for this node.'),
  );

/*  $rules['check_SEO_GA_compliance'] = array(
    'name' => t('Check the presents of Google analytic script'), 
    'description' => t('Check whether the current node/page have Google analytic script.'),
    'threshold type' => 'at_least',
    'default threshold' => 100,
    'callback' => 'check_GA_compliance',
    'passed feedback' => t('Test passed.'),
    'failed feedback' => t('Test failed, please make sure you have added Google analytic script.'),
  );  

   $rules['check_SEO_xmlsitemap_compliance'] = array(
    'name' => t('Check the XMLsitemap index'), 
    'description' => t('Check whether the current node/page has added to XML sitemap .'),
    'threshold type' => 'at_least',
    'default threshold' => 100,
    'callback' => 'check_xmlsitemap_compliance',
    'passed feedback' => t('Test passed.'),
    'failed feedback' => t('Test failed, please add current page to XML sitemap.'),
  );   */ 
  
  return $rules;
}


/* 		
- Usage of meta tag keywords  
When creating content you should always use meta tag keywords, so at least one keyword should be used for each node. Check if all nodes have at least one keyword.


- Usage of meta tag description field
When creating content you should always use the meta tag description field. The description field should containt at least one of the keywords 
Check if all nodes have a meta tag description, in which at least one the keywords should be present
*/


function flash_alternative_check($data){
//print_r($data); exit;
	$reasons = array();
	$status = 100;
	//search for video tags
	$output = _search_video_fallbacks($data['body'], 'video');
	$status = (int) $output[1];
	$reasons = array_merge($reasons, $output[0]);
	
	//search for object tag
	$output = _search_video_fallbacks($data['body'], 'object');
	$status = (int) $output[1];
	$reasons = array_merge($reasons, $output[0]);
	//return array($status, $reasons);
	return $status;
}

function _search_video_fallbacks($data, $tag){
	$reasons = array();
	$status = 100;
	if($tag == 'video')
		preg_match_all("/<video[^>]*>(.*?)<\/video>/si", $data, $videos);
	else 
		preg_match_all("/<object[^>]*>(.*?)<\/object>/si", $data, $videos);	
	
	$regex_pattern = '/<img[^>]+>/i';
	if(count($videos[1]) > 0){
			foreach($videos[1] as $video){
			//search for fallback image inside the <video> tags				
				preg_match_all($regex_pattern,$video,$imgdata);
				if(count($imgdata[0]) == 0){
					$status = 0;		
					$reasons[] = htmlspecialchars("Fallback Image Not Available For <$tag> tag");
				}
		}	
	}
	return array($reasons,$status);
}


/**
  * Check for SEO friendly url
  * You should use clean urls, to score even better a keyword should also be present in the url
  * Check if a url is a clean url, and if it contains some keywords.
  */
function check_seo_friendly_url($form_values, $customurl = 'no') {
   if($customurl == 'yes') {
		$system_path = nicifyUrl($form_values);	 
		// show result
		if($system_path == "Invalid URL"){
			return 0;
		}
		else{
			return 100;
		}
   }
   else{
	$system_path = 'node/'.$form_values['nid'];
	//print_r($form_values);exit;
    $current_path = drupal_get_path_alias($system_path);
	if($system_path<>$current_path){
		$percentage = 50;
		/* Check if a url is a clean url, and if it contains some keywords. */
		if (module_exists('nodewords')) {
			$node = node_load($form_values['nid']);
			//print_r($node);exit;
			$keywords = explode(',', $node->nodewords['keywords']);
			foreach($keywords as $keyword){
				$keyword = strtolower(trim($keyword));
				$pos = stripos($current_path, $keyword);
				if($pos !== false){
					$percentage += 50;
					break;
				}
			}
		}
		return $percentage;
	}else {
		return 0;
	}
   }
}

/**
  * Check for XML sitemap for node
  * @param object $form_values
  */
function check_node_xmlsitemap_compliance($form_values){
		$system_path = 'node/'.$form_values['nid'];			
		$current_path = drupal_get_path_alias($system_path);
		//echo $current_path; exit;
		$url = get_site_base_url();
		$xmlSiteMappath = $url."/sitemap.xml";
		$siteMapContent = file_get_contents($xmlSiteMappath);		
		$pos = strpos($siteMapContent, $current_path); 
			if ($pos !== false) return "Available"; else return "Not Available"; 
}

/**
 * Dervies the densitiy of keywords within the body of the node.
 * @param object $form_values
 * @param object $type
 */
function keyword_rules_density($form_values, $type = 'page') {
  $url = get_site_base_url();
  if($type == 'customurl') {
	$tags1 = get_meta_tags($url.'/'.$form_values['body']);
	$tags = drupal_explode_tags(strtolower($tags1['keywords']));
  }
  else {
	$tags = _keyword_rules_extract_tags($form_values);
  }

  if (count($tags) == 0) {
    return 0;
  }
  $body = strip_tags($form_values['body']);
  $words = preg_split('/\W+/', $body);
  $total = count($words);
  $nr_of_tags = 0;
  foreach ($tags as $tag) {
    $pos=-1;
    while (($pos = seo_checker_wordipos($body, $tag, $pos+1)) !== FALSE) {
      $nr_of_tags++;
    }
  }
  return 100*$nr_of_tags/$total;
}

/**
 * Checks if keywords are used in the node title. If they are used, the
 * resulting score depends on how early the keywords occur in the title.
 * If a keyword is used as the first word in the title, the score will be 100%.
 * @param object $form_values
 */
function keyword_rules_title($form_values, $title_field = 'title') {
  if (!isset($form_values[$title_field])) {
    return FALSE;
  }
  $tags = _keyword_rules_extract_tags($form_values);
  $title = strtolower($form_values[$title_field]);
  $best_score = 1000; /* sentinel */
  $best_tag = null;
  foreach ($tags as $tag) {
    if (($score = seo_checker_wordipos($title, $tag)) !== FALSE && $score < $best_score) {
      $best_score = $score;
      $best_tag = $tag;
    }
  }

  /* no tags or tags not in title */
  if (is_null($best_tag)) {
    return 0;
  }

  /* calculate percentage score */
  list($before, $after) = explode($best_tag, $title, 2);
  preg_match_all  ('/\W+/', $before, $matches);
  $words_before = count($matches[0]);
  if ($words_before == 0) {
    return 100;
  } else {
    preg_match_all  ('/\W+/', $after, $matches);
    /* count the keyword itself as one of the "words_after" */
    $words_after = count($matches[0])+1;
    return 100*$words_after/($words_before+$words_after);
  }
}

function keyword_rules_page_title($form_values) {
  //$tags = _keyword_rules_extract_tags($form_values);
  $tags = array();
  $body = $form_values['body'];
  //preg_match('/<title>([^<]+)<\/title>/i', $body, $title);
  //print_r($title);
  $page_title = trim($title[1]);
  if (!($nr_matches = preg_match_all('/<h(\d)>(.*?)<\/h\d>/i', $body, $matches, PREG_SET_ORDER))) {
    return 100;
  }

  $good_weight = 0;
  $bad_weight = 0;
  foreach ($matches as $match) {
    $weight = $match[1];
    $heading = $match[2];
    $found = 0;
    foreach ($tags as $tag) {
      $found += intval(seo_checker_wordipos($heading, $tag) !== FALSE);
    }
    if ($found > 0) {
      $good_weight += $found/$weight;
    } else {
      $bad_weight += 1/$weight;
    }
  }
  return 100*($good_weight / ($good_weight+$bad_weight));
}

/**
  * Keyword check with custom title
  */
function keyword_rules_customtitle($form_values, $title_field = 'title') {
  if (!($nr_matches = preg_match('/<title>([^<]+)<\/title>/i', $form_values, $matches))) {
      return 100;
  }
 else {
      return 0;
 }
}

function keyword_rules_headings($form_values) {
  $tags = _keyword_rules_extract_tags($form_values);
  $body = $form_values['body'];
  if (!($nr_matches = preg_match_all('/<h(\d)>(.*?)<\/h\d>/i', $body, $matches, PREG_SET_ORDER))) {
	return 100;
  }

  $good_weight = 0;
  $bad_weight = 0;
  foreach ($matches as $match) {
    $weight = $match[1];
    $heading = $match[2];
    $found = 0;
    foreach ($tags as $tag) {
      $found += intval(seo_checker_wordipos($heading, $tag) !== FALSE);
    }
    if ($found > 0) {
      $good_weight += $found/$weight;
    } else {
      $bad_weight += 1/$weight;
    }
  }
  return 100*($good_weight / ($good_weight+$bad_weight));
}

/**
 * Helper function to extract keywords from the submitted form values.
 * @return
 *   An array of keyword tags.
 * @param object $form_values
 *   The array of form values.
 */
function _keyword_rules_extract_tags($form_values) {
  switch (variable_get('keyword_rules_keywords_driver', 'cck')) {
    case 'nodewords':
      if (function_exists('_nodewords_tag_value')) {
        # Using nodewords >= 6.x-1.12, let nodewords module do its magic...
        $keywords = _nodewords_tag_value(
          'keywords',
          isset($form_values['nodewords']['metatags']) ? $form_values['nodewords']['metatags']['keywords'] : array(),
          array('type' => NODEWORDS_TYPE_NODE, 'id' => $form_values['nid'])
        );
        $keywords = $keywords['value'];
      } else {
        //$keywords = $form_values['nodewords']['keywords']['value'];
		$keywords = $form_values['nodewords']['keywords'];
      }
      break;
    default:
      $keywords = $form_values[variable_get('keyword_rules_keywords_field', 'field_seo_keywords')][0]['value'];
      break;
  }
  return drupal_explode_tags(strtolower($keywords));
}

/**
 * Implements the alt attribute in <img>-tags check.
 * @return (int) result
 * @param array $form_values
 */
function basic_seo_rules_alt_attribute($form_values) {
  $total = 0;
  $successful = 0;

  if (module_exists('content')) {
    /* Fetch image CCK fields for this node type */
    $content_info = content_types($form_values['type']);
    $fields = $content_info['fields'];
    $image_fields = array();
    /* iterate through all the fields */
    foreach ($fields as $field) {
      if ($field['type'] == 'filefield' && $field['widget']['module'] == 'imagefield' && $field['widget']['custom_alt'] == TRUE && is_array($form_values[$field['field_name']])) {
        /* iterate through all the submitted image fields */
        foreach ($form_values[$field['field_name']] as $image) {
          /* only check if an image was submitted */
          if ($image['fid'] != 0) {
            $total++;
            if (!empty($image['data']['alt'])) {
              $successful++;
            }
          }
        }
      }
    }
  }

  /* Check for image_attattach images */
  if (variable_get('image_attach_'. $form_values['type'], FALSE)) {
    $total++;
    if (!empty($form_values['image_title'])) {
      $successful++;
    }
  }

  if (!preg_match_all('/<img[^>]+>/i', $form_values['body'], $matches) && $total == 0) {
    return 100;
  }

  /* check content */
  if (!empty($matches)) {
    foreach ($matches[0] as $image_tag) {
      if (preg_match('/alt=(\S{3,})/i', $image_tag)) {
        $successful++;
      }
      $total++;
    }
  }
  return 100*$successful/$total;
}

/**
 * Implements the title attribute in <a href>-tags check.
 * @return (int) result
 * @param array $form_values
 */
function basic_seo_rules_title_attribute($form_values) {
  if (!preg_match_all('/<a[^>]+href[^>]*>/i', $form_values['body'], $matches)) {
    return 100;
  }

  $total = 0;
  $successful = 0;
  foreach ($matches[0] as $ahref_tag) {
    if (preg_match('/title=(\S{3,})/i', $ahref_tag)) {
      $successful++;
    }
    $total++;
  }
  return 100*$successful/$total;
}

/********************************* CALLBACKS *********************************/

function get_nice_name($url){
	return preg_replace("/[^a-zA-Z0-9-@.!#$%&'*\/+=?^`{\|}~]/",'-',$url);
}

// functions
function nicifyUrl($url) {
    $urlRet=get_nice_name($url);
	// valid?
    if($urlRet === $url){
     return $urlRet;
    }
    else{
          return "Invalid URL";
    }
}
?>