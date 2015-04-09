<?php

function psychiatry24x7_es_preprocess_block(&$vars)
{
	
if ($vars[block]->delta == 49 )
{
	$vars[block]->content = str_replace('[LUD]', get_last_update_date(), $vars[block]->content);	
}	
	
}



/**
 * Override or insert variables into the page templates.
 *
 * @param $vars
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("page" in this case.)
 */
function psychiatry24x7_es_preprocess_page(&$vars, $hook) {
	
  //print_r($vars['template_files']);
  /*
   * Fetch the left and right Navigation menus
   * Modify the title from "text" to "image"
   * Assign as template variable to be able to access in page.tpl.php
   */

  $header_left_links = menu_navigation_links("menu-header-left-links");
  //echo "<PRE>"; print_r($header_left_links);
  $links_iterate = count($header_left_links);
  $left = 1;
  $half = floor($links_iterate/2);
  $vars['header_left_links_count'] = $half +1 ;
  foreach ($header_left_links as $key => $link) {
	if($left <= $half){
		$header_left_links_1[$key] = $link;
	}
	else{
		$header_left_links_2[$key] = $link;
	}
	$left++;
  }

  //echo "<PRE>"; print_r($header_left_links_1);  exit;
  $header_left_links = $header_left_links_1;
  if(is_array($header_left_links)){
	  foreach ($header_left_links as $key => $link) {
	    $header_left_links[$key]['html'] = TRUE;

	    $image_title_name = 'menu_'.str_replace(' ','_',strtolower($header_left_links[$key]['title']));
	    if($link['href'] == $_GET['q'] || ($link['href'] == '<front>' && drupal_is_front_page()) ){
		 	$image_name = url().path_to_theme().'/images/'.$image_title_name.'_slctd.png'; //for selected path; show the selected image.
		}
		else{
		 	$image_name = url().path_to_theme().'/images/'.$image_title_name.'.png';
		}
		//echo $image_name;

	    //$header_left_links[$key]['title'] = '<img alt="'. $link['description'] .'" title="'. $header_left_links[$key]['title'] .'" src="'.$image_name.'" />';
	    $header_left_links[$key]['attributes']['title'] = t($header_left_links[$key]['attributes']['title']);
	  }
  }
  $vars['header_left_links']     =  $header_left_links;
  $vars['brought_text']     =  t('This site is brought to you byyyyyyyyyyy');

  /*
   * Right Links
   */
  //$header_right_links = menu_navigation_links("menu-header-right-links");
  //print_r($header_right_links);
  $header_right_links = $header_left_links_2;
  if(is_array($header_right_links)){
	  foreach ($header_right_links as $key => $link) {
	    $header_right_links[$key]['html'] = TRUE;

	    $image_title_name = 'menu_'.str_replace(' ','_',strtolower($header_right_links[$key]['title']));

	    if($link['href'] == $_GET['q']){
		 	$image_name = url().path_to_theme().'/images/'.$image_title_name.'_slctd.png'; //for selected path; show the selected image.
		}
		else{
		 	$image_name = url().path_to_theme().'/images/'.$image_title_name.'.png';
		}
		//$header_right_links[$key]['title'] = '<img alt="'. $link['description'] .'" title="'. $header_right_links[$key]['title'] .'" src="'.$image_name.'" />';
		$header_right_links[$key]['attributes']['title'] = t($header_right_links[$key]['attributes']['title']);
	  }
  }
  $vars['header_right_links']     =  $header_right_links;



  /*
   * Footer Links
   */
  $footer_links = menu_navigation_links("menu-footer-links");
  $separator = '';
  $footer_count = count($footer_links);
  if($footer_count > 1){
	$separator = " &nbsp;\\";
  }
  $i = 1;
  foreach ($footer_links as $key => $link) {
    $footer_links[$key]['html'] = TRUE;
    if($footer_count == $i)
      $separator = '';
    $footer_links[$key]['title'] = $footer_links[$key]['title'] .$separator;
    $i++;
  }
  $vars['footer_links']     =  $footer_links;

 //echo "<PRE>";print_r($vars['node']);echo "</PRE>";
  // Add per content type pages
  if (isset($vars['node']) && $vars['node']->type == 'footer_pages') {
    // Add template naming suggestion. It should alway use hyphens.
    // If node type is "custom_news", it will pickup "page-custom-news.tpl.php".
    $vars['template_files'][] = 'page-'. str_replace('_', '-', $vars['node']->type);
  }

  $navcolor_class = navigation_color($_GET['q']);
  // Add unique classes for each page and website section to have different colors on navigation.
  $vars['navigation_body_color'] = phptemplate_id_safe('nav'. $navcolor_class);
  
  if (!empty($vars['scripts'])) {
  	  drupal_add_js(drupal_get_path('theme', 'psychiatry24x7_es') . '/js/script.js','theme');
  	  $scripts = drupal_add_js();
	  
  	  $scriptpath = drupal_get_path('theme', 'psychiatry24x7');
      unset($scripts['theme'][$scriptpath . '/js/script.js']);
	  $vars['scripts'] = drupal_get_js('header', $scripts);
  }

}


/**
 * Override or insert PHPTemplate variables into the node templates.
 *
 * @param $vars
 *   A sequential array of variables to pass to the theme template.
 * @param $hook
 *   The name of the theme function being called ("node" in this case.)
 */


/**
 * Return a themed set of links.
 *
 * @param $links
 *   A keyed array of links to be themed.
 * @param $attributes
 *   A keyed array of attributes
 * @return
 *   A string containing an unordered list of links.
 */
function psychiatry24x7_es_links($links, $attributes = array('class' => 'links'), $i = 1) {
  $output = '';
//echo "<PRE>"; print_r($links);echo "</PRE>";

  if (count($links) > 0) {
    $num_links = count($links);

	 /*get details from menu table for the given url*/

    $arrMenu = _getMenuDetailsForNode($_GET['q']);

   /*if the menu parent id is not a  primary link i.e. 2*/
        if($arrMenu["plid"] != 0){
        	/*get the root parent of a give menu id*/
            $parentID = _getRootParent($arrMenu["plid"]);
        }else
        {
        	$parentID = $arrMenu["plid"];
        }
	//echo "<PRE>"; print_r($arrMenu);echo "</PRE>";
	$parent_link_path = _getLinkPathForMenu($parentID);
	$output = '<ul>';
    foreach ($links as $key => $link) {
      $class = $key;
      // Add first, last and active classes to the list of links to help out themers.
      if ($i == 1) {
        $class .= ' first';
      }
      if ($i == $num_links) {
        $class .= ' last';
      }
      $custom_class = ' menu'.$i;
      if (isset($link['href']) && ($link['href'] == $_GET['q'] || $parent_link_path == $link['href'] || ($link['href'] == '<front>' && drupal_is_front_page()))) {
        $class .= ' active';
        $custom_class = ' '.$key.'_slctd';
        unset($link['href']);
      }

      $class .= $custom_class;
      $output .= '<li'. drupal_attributes(array('class' => $class)) .'>';

      if (isset($link['href'])) {
        // Pass in $link as $options, they share the same keys.
        $output .= l($link['title'], $link['href'], $link);
      }
      else if (!empty($link['title'])) {
        // Some links are actually not links, but we wrap these in <span> for adding title and class attributes
        if (empty($link['html'])) {
          $link['title'] = check_plain($link['title']);
        }
        $span_attributes = '';
        if (isset($link['attributes'])) {
          $span_attributes = drupal_attributes($link['attributes']);
        }
        $output .= '<span'. $span_attributes .'>'. $link['title'] .'</span>';
      }

      $i++;
      $output .= "</li>\n";
      $class = "";
    }

    $output .= '</ul>';
  }

  return $output;
}


function psychiatry24x7_es_theme(){
	$theme = array(
    'webform_form' => array(
      'arguments' => array('form' => NULL),
      'template' => 'user-survey',
       ),
     );
     return $theme;
}


function psychiatry24x7_es_menu_block_split_menu_item_link($link) {
  if (empty($link['localized_options'])) {
    $link['localized_options'] = array();
  }
	$link['localized_options']['attributes']['title'] = t($link['localized_options']['attributes']['title']);
  return l($link['title'], $link['href'], $link['localized_options']);
}

function psychiatry24x7_es_menu_item_link($link) {
	if (empty($link['localized_options'])) {
    	$link['localized_options'] = array();
  	}
  	else {
  		$link['localized_options']['attributes']['title'] = t($link['localized_options']['attributes']['title']);
  	}
  	return l($link['title'], $link['href'], $link['localized_options']);

}

/**
 * Overriding printer theme function
 * Format the Printer-friendly link
 *
 * @return
 *   array of formatted attributes
 * @ingroup themeable
 */
function psychiatry24x7_es_print_format_link() {
  $print_html_link_class = variable_get('print_html_link_class', PRINT_HTML_LINK_CLASS_DEFAULT);
  $print_html_new_window = variable_get('print_html_new_window', PRINT_HTML_NEW_WINDOW_DEFAULT);
  $print_html_show_link = variable_get('print_html_show_link', PRINT_HTML_SHOW_LINK_DEFAULT);
  $print_html_link_text = variable_get('print_html_link_text', t('Printer-friendly version'));

  $img = drupal_get_path('module', 'print') .'/icons/print_icon.gif';
  $title = t('Display a printer-friendly version of this page.');
  $class = strip_tags($print_html_link_class);
  $new_window = $print_html_new_window;
  $format = _print_format_link_aux($print_html_show_link, $print_html_link_text, $img);

  return array('text' => t($format['text']),
               'html' => $format['html'],
               'attributes' => print_fill_attributes($title, $class, $new_window),
              );
}

/*
 * Implementation of theme function
 */
function psychiatry24x7_es_art_of_the_day($items){
	//echo "<PRE>"; print_r($items); exit;
	//global $theme_path;
	//echo $theme_path;//	
	drupal_set_title('');
	$theme_default = variable_get('theme_default', '');
	$images_path = url().drupal_get_path('theme', $theme_default).'/images/';
	
	foreach ($items as $key => $item){
        /* $image = theme('imagecache', 'patienartgallery', patient_art_gallery_get_image($item->link), '', '',array('attributes' => array('id' => 'artoftheday'))); */
		$image = theme('imagecache', 'patienartgallery', patient_art_gallery_get_image($item->link), '', '', array('id' => 'artoftheday'));
        $image_output .= '<div id="art">'.$image.'</div>';
        //extracting the description field.
        $artist_name  = explode('&lt;Description&gt;', $item->description);
        $artist_name  = explode('&lt;/Description&gt;', $artist_name[1]);
        $artist_details = '<div id="artist_name"><h4>'.$artist_name[0].'</h4></div>';
        $image_title	= '<div id="image_title"><h4>'.$item->title.'</h4></div>';
        
	}
	
	$output = '<div id="newsstories_container">
        <h1>'.t("Patient art gallery").'</h1>';
   		$block = module_invoke('block', 'block', 'view', 75);
	    $output .= $block['content'];
        
	    $output .= '<div class="print_details">
          <div class="details_left">
            <h2>'.t("Latest patient art").'</h2>
            '.$artist_details.'
            '.$image_title.'
          </div>
          <div class="details_right"><a title="Print art" href="print/artoftheday/print" target="_blank" class="printart"><img title="" alt="" src="'.$images_path.'btn_printart.gif"></a></div>
        </div>';
	$output .= $image_output.'</div>';
	
	/*
	 * Loading the gallery full images on the page load to reduce the load time when the user clicks on the thumbnail.
	 */
	$gallery_items = getGalleryimages();
	foreach ($gallery_items as $key => $g_item){
		$image_arr 		= explode('pictureId=', $g_item->link);
	    $image 			= theme('imagecache', 'patienartgallery', patient_art_gallery_get_image($g_item->link));
	    $artist_name  = explode('&lt;Artist&gt;', $g_item->description);
        $artist_name  = explode('&lt;/Artist&gt;', $artist_name[1]);
	    $artist_details = '<div id="'.$image_arr[1].'_artist_name" style="display:none"><h4>'.$artist_name[0].'</h4></div>';
        $image_title	= '<div id="'.$image_arr[1].'_image_title" style="display:none"><h4>'.$g_item->title.'</h4></div>';
        $output .= '<div class="gallery_images '.$image_arr[1].'" style="display:none">'.$image.$artist_details.$image_title.'</div>';
	}	

return $output;
}

function get_last_update_date() {
  
  /*$output = '';
  setlocale(LC_ALL, 'Spanish_Spain.28605');
  $result = db_query("SELECT title, changed FROM {node} WHERE status = 1 ORDER BY changed DESC");
  if ($node = db_fetch_object($result)) {
	$output = iconv('ISO-8859-2', 'UTF-8',strftime("%d %e %B %Y", $node->changed));
  }
    return $output;&*/
$months = array('January'=>'enero','February'=>'febrero','March'=>'marzo ','April'=>'abril ','May'=>'mayo ','June'=>'junio','July'=>'julio ','August'=>'agosto','September'=>'septiembre','October'=>'octubre ','November'=>'noviembre ','December'=>'diciembre ' );
$result = db_query("SELECT title, changed FROM {node} WHERE status = 1 ORDER BY changed DESC");
if ($node = db_fetch_object($result)) {
	$output = strftime("%B", $node->changed);
	$output = strftime("%d ", $node->changed). $months[$output] .strftime(" %Y", $node->changed);
  }
return $output;	
}
function psychiatry24x7_es_form($element) {
  // Anonymous div to satisfy XHTML compliance.
  $action = $element['#action'] ? 'action="'. check_url($element['#action']) .'" ' : '';
  return ($element['#attributes']['class']!='questionaries-form')?'<form '. $action .' accept-charset="UTF-8" method="'. $element['#method'] .'" id="'. $element['#id'] .'"'. drupal_attributes($element['#attributes']) .">\n<div>". $element['#children'] ."\n</div></form>\n":
  '<form '. $action .' accept-charset="UTF-8" method="'. $element['#method'] .'" id="'. $element['#id'] .'"'. drupal_attributes($element['#attributes']) .">\n<div class='form-wrapper'>". $element['#children'] ."\n</div></form>\n";
}
/**
 * Return a themed form element.
 *
 * @param element
 *   An associative array containing the properties of the element.
 *   Properties used: title, description, id, required
 * @param $value
 *   The form element's data.
 * @return
 *   A string representing the form element.
 *
 * @ingroup themeable
 */
function psychiatry24x7_es_form_element($element, $value) {
  $theme_path = drupal_get_path('theme','psychiatry24x7_es');
  // This is also used in the installer, pre-database setup.
  $t = get_t();
  $arr_question_fields = array('edit-field-question-1-value','edit-field-question-2-value','edit-field-question-3-value','edit-field-question-4-value','edit-field-question-5-value',
  'edit-field-question-6-value','edit-field-question-7-value','edit-field-question-8-value','edit-field-question-9-value','edit-field-question-10-value',
  'edit-field-question-11-value','edit-field-question-12-value','edit-field-question-13-value','edit-field-question-14-value','edit-field-question-15-value',
  'edit-field-question-16-value','edit-field-question-17-value');
  if(in_array($element['#id'],$arr_question_fields)){
	$question_id = str_replace('-value','',$element['#id']);
	$question_id = str_replace('edit-field-question-','q',$question_id);
  }
  
  $output = '<div class="form-item"';
  if (!empty($element['#id'])) {
    $output .= ' id="'. $element['#id'] .'-wrapper"';
  }
  $output .= ">\n";
  $required = !empty($element['#required']) ? '<span class="form-required" title="'. $t('This field is required.') .'">*</span>' : '';

  if (!empty($element['#title'])) {
    $title = $element['#title'];
    if (!empty($element['#id'])) {
      $output .= !in_array($element['#id'],$arr_question_fields)?' <label for="'. $element['#id'] .'">'. $t('!title: !required', array('!title' => filter_xss_admin($title), '!required' => $required)) ."</label>\n"
	  :' <span class="question" id="'. $question_id .'">'. $t('!title !required', array('!title' => filter_xss_admin($title), '!required' => $required)) ."</span>";
    }
    else {
      $output .= ' <label>'. $t('!title: !required', array('!title' => filter_xss_admin($title), '!required' => $required)) ."</label>\n";
    }
  }
  if(!in_array($element['#id'],$arr_question_fields)){
	$output .= " $value\n";
  }else{
	if(!empty($element['#options'])){
		foreach($element['#options'] as $key=>$val){
			if(is_numeric($key)){
				//$selected = ($_SESSION['questionaire'][$question_id.'_'.$key]=='selected')?'selected':"";
				$tlabel = '<label class="radio" for="'.$question_id.'_'.$key.'"><input type="radio" id="'.$question_id.'_'.$key.'" name="'.$question_id.'_'.$key.'" class="radio">'.$val.'</label>';
				if(!empty($_SESSION['questionaire'])){
					$selected = ($_SESSION['questionaire'][$question_id.'_'.$key]=='selected')?'check_enb.png':"check_dis.png";
					$tlabel = '<label class="print-radio" for="'.$question_id.'_'.$key.'"><img src="/'.$theme_path.'/images/'.$selected.'" /><span class="print-span">'.$val.'</span></label>';
				}
				$output.=$tlabel;
			}
		}
	}
	$output .= " $value\n";
  }

  if (!empty($element['#description'])) {
    $output .= ' <div class="description">'. $element['#description'] ."</div>\n";
  }

  $output .= "</div>\n";

  return $output;
}