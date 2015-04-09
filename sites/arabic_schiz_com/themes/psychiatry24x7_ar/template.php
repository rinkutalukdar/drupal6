<?php


/**
 * Override or insert variables into the page templates.
 *
 * @param $vars
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("page" in this case.)
 */
function psychiatry24x7_ar_preprocess_page(&$vars, $hook) {
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
  $half = ceil($links_iterate/2);
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
function psychiatry24x7_ar_links($links, $attributes = array('class' => 'links'), $i = 1) {
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


function psychiatry24x7_ar_theme(){
	$theme = array(
    'webform_form' => array(
      'arguments' => array('form' => NULL),
      'template' => 'user-survey',
       ),
     );
     return $theme;
}


function psychiatry24x7_ar_menu_block_split_menu_item_link($link) {
  if (empty($link['localized_options'])) {
    $link['localized_options'] = array();
  }
	$link['localized_options']['attributes']['title'] = t($link['localized_options']['attributes']['title']);
  return l($link['title'], $link['href'], $link['localized_options']);
}

function psychiatry24x7_ar_menu_item_link($link) {
	if (empty($link['localized_options'])) {
    	$link['localized_options'] = array();
  	}
  	else {
  		$link['localized_options']['attributes']['title'] = t($link['localized_options']['attributes']['title']);
  	}
  	return l($link['title'], $link['href'], $link['localized_options']);

}

function psychiatry24x7_ar_breadcrumb($breadcrumb) {
  if (!empty($breadcrumb)) {
  	$breadcrumb[] = t(menu_get_active_title()); // get current menu title and append to current breadcrumb array
    return '<div class="breadcrumb">' . implode(' >> ', $breadcrumb) . '</div>';
  }
}
function psychiatry24x7_ar_art_of_the_day($items){
	//echo "<PRE>"; print_r($items); exit;
	//global $theme_path;
	//echo $theme_path;//
	drupal_set_title('');
	$theme_default = variable_get('theme_default', '');
	$images_path = url().drupal_get_path('theme', $theme_default).'/images/';

	foreach ($items as $key => $item){
        /* $image = theme('imagecache', 'patienartgallery', patient_art_gallery_get_image($item->link), '', '',array('attributes' => array('id' => 'artoftheday'))); */
         $image = theme('imagecache', 'patienartgallery', patient_art_gallery_get_image($item->link), '', '',array());

        $image_output .= '<div id="art">'.$image.'</div>';
        //extracting the description field.
        $artist_name  = explode('&lt;Description&gt;', $item->description);
        $artist_name  = explode('&lt;/Description&gt;', t($artist_name[1]));
        $artist_details = '<div id="artist_name"><h4>'.t($artist_name[0]).'</h4></div>';
        $image_title	= '<div id="image_title"><h4>'.t($item->title).'</h4></div>';

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
          <div class="details_right"><a title='.t('Print art').' href="print/artoftheday/print" target="_blank" class="printart"><img title="" alt="" src="'.$images_path.'btn_printart.gif"></a></div>
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
	/*case 'search_block_form':
		    //echo "<PRE>";
			//print_r($form);
			//print_r($_REQUEST);
			if(drupal_is_front_page()){
			  $form['#action'] = '/about-schizopheria';
			}
		    break;*/

return $output;
}