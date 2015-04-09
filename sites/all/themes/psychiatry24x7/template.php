<?php
// $Id: template.php,v 1.0 2010/10/12 15:55:00 narendra.b Exp $

/*
 * TO LOAD IE BROWSER SPECIFIC SCRIPTS.
 */
function phptemplate_get_ie_scripts() {
global $language;
  //$iescript = '<script src="'. base_path() . path_to_theme() .'/js/iepngfix.js" type="text/javascript"></script>';
  $iescript='';
  return $iescript;
}

/*
 * TO LOAD Baclground image for IE BROWSER SPECIFIC SCRIPTS.
 */
function phptemplate_get_bg_image_scripts() {
$iescript="";
$current_theme = variable_get('theme_default','none');
$iescript .= '<script type="text/javascript">
function setCookie(c_name,value,exdays)
{
var exdate=new Date();
exdate.setDate(exdate.getDate() + exdays);
var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
document.cookie=c_name + "=" + c_value;
}
function getCookie(c_name)
{
var c_value = document.cookie;
var c_start = c_value.indexOf(" " + c_name + "=");
if (c_start == -1)
  {
  c_start = c_value.indexOf(c_name + "=");
  }
if (c_start == -1)
  {
  c_value = null;
  }
else
  {
  c_start = c_value.indexOf("=", c_start) + 1;
  var c_end = c_value.indexOf(";", c_start);
  if (c_end == -1)
  {
c_end = c_value.length;
}
c_value = unescape(c_value.substring(c_start,c_end));
}
return c_value;
}
</script>';
if($_GET['q'] != 'tell-a-friend' &&  $_GET['q'] != 'cookie-settings-panel'){
//$(\'<img src="'.url().path_to_theme().'/images/bg_main.jpg" class="bg" style="position:absolute; z-index:-1;" />\').appendTo(document.body);
$path = drupal_get_path_alias($_GET['q']);
     if($current_theme!="psychiatry24x7" || substr_count($path,'walking_log')>0){
		  $iescript .= '<script type="text/javascript" src="'.url().path_to_theme().'/js/jquery.backstretch.min.js"></script>
		<script type="text/javascript">
		
		$.backstretch("'.url().path_to_theme().'/images/bg_main.jpg", {speed: 150});
		</script>
		  ';
	}else{
		$iescript .= '<script type="text/javascript" src="'.url().path_to_theme().'/js/jquery.backstretch.js"></script>
<script type="text/javascript">
//for IE
	jQuery.backstretch("'.url().path_to_theme().'/images/bg_main.jpg", {speed: 150});

</script>
  ';
	}
  }
  return $iescript;
}
/**
 * Override or insert variables into the page templates.
 *
 * @param $vars
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("page" in this case.)
 */
function phptemplate_preprocess_page(&$vars, $hook) {
  //print_r($vars['template_files']);
  /*
   * Fetch the left and right Navigation menus
   * Modify the title from "text" to "image"
   * Assign as template variable to be able to access in page.tpl.php
   */
   $current_theme = variable_get('theme_default','none');
     if($current_theme=="psychiatry24x7"){
      if (!empty($vars['styles'])){
	  if(($_COOKIE['disable_menu']) !=1){
	    drupal_add_css(drupal_get_path('theme', 'psychiatry24x7') . '/css/header-container.css');
	 }
	 
     drupal_add_css(drupal_get_path('theme', 'psychiatry24x7') . '/css/header.css');
	 drupal_add_css(drupal_get_path('theme', 'psychiatry24x7') . '/css/mobile.css','theme','screen');
	 $css = drupal_add_css();
     $vars['styles'] = drupal_get_css($css);
  }
 }
  $header_left_links = menu_navigation_links("menu-header-left-links");
  $mob_header_links = $header_left_links;
  
  //echo "<PRE>"; print_r($header_left_links);
  
  $links_iterate = count($header_left_links)+1;
  //echo count($header_left_links).'=='.$links_iterate;exit;
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
	  }
  }
  $vars['header_left_links']     =  $header_left_links;
  //Adding theme css files to $styles array
  $css = drupal_add_css();
  // include ie7 and ie8 css
  $u_agent = $_SERVER['HTTP_USER_AGENT'];
  if($ie = preg_match('/MSIE/i',$u_agent)) {
	 if($_GET['q'] != 'tell-a-friend' && $_GET['q'] != 'patient-carer-video-gallery'){
		 //drupal_add_js($path_to_theme."/js/iepngfix.js");
	 }
    $temp = explode(";", $u_agent);
    $css['screen']['theme'][$path_to_theme.'/css/ie.css'] = 1;
  }
  $vars['styles'] = drupal_get_css($css);
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
	  }
  }
  $vars['header_right_links']     =  $header_right_links;
  /*$rev_mob_header_links  = array_reverse($mob_header_links, true);
  array_pop($rev_mob_header_links);
  $mob_header_links = array_reverse($mob_header_links, true);*/
  //echo "<pre>";print_r($mob_header_links);exit;
  $vars['mob_header_links'] = $mob_header_links;

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
 
  if(arg(0)=='walking_log' && is_numeric(arg(1))){
                  $vars['title'] = t('Edit Walking log');
  }
	if($_GET['d']==1){
		$vars['template_files'][] = 'page-home';
	}
	$home_tree = get_submenu_tree_all_data('menu-header-left-links','Home'); 
	$segmentation_tabs = get_child_menus_menu_navigation($home_tree);
	$vars['segmentation_tabs'] = $segmentation_tabs;
	$path = drupal_get_path_alias($_GET['q']);
	
	if($path == 'meet-mark' && $current_theme=="psychiatry24x7"){
		$vars['template_files'][] = 'page-meet-mark';
	}
	
	if($path == 'into-employment' && $current_theme=="psychiatry24x7"){
		drupal_add_css(path_to_theme().'/css/into-employment.css');
		$vars['styles'] = drupal_get_css();
		drupal_add_js(path_to_theme().'/js/intro-employment.js');
		$vars['scripts'] = drupal_get_js();		
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
function phptemplate_preprocess_node(&$vars, $hook) {
	global $user;

	// Grab the node object.
	$node = $vars['node'];

	// Make individual variables for the parts of the date.
	$vars['date_day'] = format_date($node->created, 'custom', 'j');
	$vars['date_month'] = format_date($node->created, 'custom', 'M');
	$vars['date_year'] = format_date($node->created, 'custom', 'Y');

	// Special classes for nodes
	$node_classes = array();
    if ($vars['sticky']) {
      $node_classes[] = 'sticky';
    }
    if (!$vars['node']->status) {
      $node_classes[] = 'node-unpublished';
      $vars['unpublished'] = TRUE;
    }
    else {
      $vars['unpublished'] = FALSE;
    }
    if ($vars['node']->uid && $vars['node']->uid == $user->uid) {
      // Node is authored by current user
      $node_classes[] = 'node-mine';
    }
    if ($vars['teaser']) {
      // Node is displayed as teaser
      $node_classes[] = 'node-teaser';
    }
    if ($vars['$is_front']) {
      // Node is displayed on the front page
      $node_classes[] = 'front-node';
    }
	// Class for node type: "node-type-page", "node-type-story", "node-type-my-custom-type", etc.
	$node_classes[] = 'node-type-'. $vars['node']->type;
	$node_classes[] = 'node-custom';
    $node_classes[] = phptemplate_id_safe('node-nav'. navigation_color($_GET['q']));
	$vars['node_classes'] = implode(' ', $node_classes); // Concatenate with spaces
}


/*
 * Function to return dynamic class for navigation menu per page.
 * @param $q
 * @return navigation color dynamic class.
 */
function navigation_color($q){
	  /*get details from menu table for the given url*/
  $arrnode_menu = _getMenuDetailsForNode($q);
  /*if the menu parent id is not a  primary link i.e. 2*/
  if($arrnode_menu["plid"] != 0){
      	/*get the root parent of a give menu id*/
        $parentID = _getRootParent($arrnode_menu["plid"]);
  }else{
       	$parentID = $arrnode_menu["plid"];
  }
  //print_R($arrnode_menu);
  //echo $parentID;
  $navcolor_class = '';
  if($parentID == 550 || $arrnode_menu['mlid'] == 550){
  	 $navcolor_class = ' aboutsch';
  }
  elseif($parentID == 551 || $arrnode_menu['mlid'] == 551){
  	 $navcolor_class = ' relpase';
  }
  elseif($parentID == 552 || $arrnode_menu['mlid'] == 552){
  	 $navcolor_class = ' talkingtodoctor';
  }
  elseif($parentID == 553 || $arrnode_menu['mlid'] == 553){
  	 $navcolor_class = ' differenttreatments';
  }
  elseif($parentID == 554 || $arrnode_menu['mlid'] == 554){
  	 $navcolor_class = ' gettingbetter';
  }
  elseif($parentID == 555 || $arrnode_menu['mlid'] == 555){
  	 $navcolor_class = ' friendsfamily';
  }
  elseif($parentID == 556 || $arrnode_menu['mlid'] == 556){
  	 $navcolor_class = ' news';
  }
  elseif($parentID == 557 || $arrnode_menu['mlid'] == 557){
  	 $navcolor_class = ' patientart';
  }
  elseif($parentID == 558 || $arrnode_menu['mlid'] == 558){
  	 $navcolor_class = ' resources';
  }
  elseif($parentID == 896 || $arrnode_menu['mlid'] == 896){
  	 $navcolor_class = ' advise';
  }

  return $navcolor_class ;
}

/**
 * Converts a string to a suitable html ID attribute.
 *
 * - Preceeds initial numeric with 'n' character.
 * - Replaces space and underscore with dash.
 * - Converts entire string to lowercase.
 * - Works for classes too!
 *
 * @param string $string
 *   The string
 * @return
 *   The converted string
 */
function phptemplate_id_safe($string) {
  if (is_numeric($string{0})) {
    // If the first character is numeric, add 'n' in front
    $string = 'n'. $string;
  }
  return strtolower(preg_replace('/[^a-zA-Z0-9-]+/', '-', $string));
}

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
function psychiatry24x7_links($links, $attributes = array('class' => 'links'), $i = 1) {
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
	if($attributes['rel']==''){
		foreach ($links as $key => $link) {
			$key_arr = explode(" ", $key);
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
			$custom_class = ' '.$key_arr[0].'_slctd';
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
	}
	else if($attributes['rel']=='segmentation'){
	
		$cnt=1;
		foreach ($links as $key => $link) {
			$key_arr = explode(" ", $key);
		  $class = 'tab-'.$cnt;
		 
		  $custom_class = ' menu'.$i;
		  if (isset($link['href']) && ($link['href'] == $_GET['q'] || $parent_link_path == $link['href'] || ($link['href'] == '<front>' && drupal_is_front_page()))) {
			$class .= ' active';
			$custom_class = 'select_tab';
			//unset($link['href']);
		  }

		  //$class .= $custom_class;
		  $output .= '<li'. drupal_attributes(array('class' => $class)) .'>';
		
		  if (isset($link['href'])) {
			// Pass in $link as $options, they share the same keys.
			$output .= l($link['title'], $link['href'], array('attributes'=>array('class'=>$custom_class)));
		  }
		  $i++;
		  $cnt++;
		  $output .= "</li>\n";
		  $class = "";
		}
	}

    $output .= '</ul>';
  }

  return $output;
}

/**
 * Returns link_path when menu id is given
 *
 * @Param $node
 *      pass the menu id
 * @Return
 *      link_path of menu from menu_links table
 */
function _getLinkPathForMenu($mlid){
	//echo $node;
   $getLinkPath_query = db_query("SELECT link_path FROM {menu_links} WHERE mlid = '%d'",$mlid);
   $getLinkPath_arr = db_fetch_array($getLinkPath_query);
   return $getLinkPath_arr['link_path'];
}

/**
 * Returns menuid and parent id of a node url
 *
 * @Param $node
 *      pass the node url
 * @Return
 *      menuid and parentid of a node url from menu table
 */
function _getMenuDetailsForNode($node){
	//echo $node;
   $getMenuID_query = db_query("SELECT mlid, plid FROM {menu_links} WHERE link_path = '%s'",$node);
   $getMenuID_arr = db_fetch_array($getMenuID_query);
   return $getMenuID_arr;
}

/**
 * Returns RootParent of a given parentID
 *
 * @Param $pID
 *      pass the parent id of a  menu
 * @Return
 *      Root Parent id of a menu
 */
function _getRootParent($pID){

	$getRoot_query = db_query("select plid, mlid from {menu_links} where mlid = %d",$pID);
	$getRoot_arr = db_fetch_array($getRoot_query);
	if ($getRoot_arr["plid"] != 0 ){
		return _getRootParent($getRoot_arr["plid"]);
	}
	else{
		return $getRoot_arr["mlid"];
	}
}

/**
 * OVERRIDDEN TO DO CUSTOM IMPLEMENTATION OF PAGINATION AS PER REQUIREMENTS.
 * Format a query pager.
 *
 * Menu callbacks that display paged query results should call theme('pager') to
 * retrieve a pager control so that users can view other results.
 * Format a list of nearby pages with additional query results.
 *
 * @param $tags
 *   An array of labels for the controls in the pager.
 * @param $limit
 *   The number of query results to display per page.
 * @param $element
 *   An optional integer to distinguish between multiple pagers on one page.
 * @param $parameters
 *   An associative array of query string parameters to append to the pager links.
 * @param $quantity
 *   The number of pages in the list.
 * @return
 *   An HTML string that generates the query pager.
 *
 * @ingroup themeable
 */
function phptemplate_pager($tags = array(), $limit = 10, $element = 0, $parameters = array(), $quantity = 9) {
 global $pager_page_array, $pager_total;

  // Calculate various markers within this pager piece:
  // Middle is used to "center" pages around the current page.
  $pager_middle = ceil($quantity / 2);
  // current is the page we are currently paged to
  $pager_current = $pager_page_array[$element] + 1;
  // first is the first page listed by this pager piece (re quantity)
  $pager_first = $pager_current - $pager_middle + 1;
  // last is the last page listed by this pager piece (re quantity)
  $pager_last = $pager_current + $quantity - $pager_middle;
  // max is the maximum page number
  $pager_max = $pager_total[$element];
  // End of marker calculations.

  // Prepare for generation loop.
  $i = $pager_first;
  if ($pager_last > $pager_max) {
    // Adjust "center" if at end of query.
    $i = $i + ($pager_max - $pager_last);
    $pager_last = $pager_max;
  }
  if ($i <= 0) {
    // Adjust "center" if at start of query.
    $pager_last = $pager_last + (1 - $i);
    $i = 1;
  }
  // End of generation loop preparation.

  $li_previous = theme('pager_previous', (isset($tags[1]) ? $tags[1] : t('PREV')), $limit, $element, 1, $parameters);
  $li_next = theme('pager_next', (isset($tags[3]) ? $tags[3] : t('NEXT')), $limit, $element, 1, $parameters);

  if ($pager_total[$element] > 1) {
    if ($li_previous) {
      $previous_items[] = array(
        'id' => 'pagination_left',
        'data' => $li_previous,
      );
    }
    else{
      $previous_items[] = array(
        'id' => 'pagination_left',
        'data' => t('<div class="not_selected">PREV</div>'),
      );
    }


    // When there is more than one page, create the pager list.
    if ($i != $pager_max) {
      // Now generate the actual pager piece.
      for (; $i <= $pager_last && $i <= $pager_max; $i++) {
      	if ($i < $pager_current) {
          $pager_piece_items[] = array(
            'data' => theme('pager_previous', $i, $limit, $element, ($pager_current - $i), $parameters),
          );
        }
        if ($i == $pager_current) {
          $pager_piece_items[]= array(
          	'class' => 'selected',
            'data' => $i,
          );
        }
        if ($i > $pager_current) {
          $pager_piece_items[]= array(
            'data' => theme('pager_next', $i, $limit, $element, ($i - $pager_current), $parameters),
          );
        }
      }
    }
    // End generation.
    if ($li_next) {
      $next_items[] = array(
        'id' => 'pagination_right',
        'data' => $li_next,
      );
    }
  else{
      $next_items[] = array(
        'id' => 'pagination_right',
        'data' => t('<div class="not_selected">NEXT</div>'),
      );
    }
	$output = '<div id="pagination">';
    $output .= theme('item_list', $previous_items, NULL, 'div', $pager_items);
    $output .= '<div id="pagination_mcontainer">
            <div id="pagination_middle">'.pager_pieces_item_list($pager_piece_items, NULL, 'ul').'</div>
          </div>';
    $output .= theme('item_list', $next_items, NULL, 'div', $pager_items);
    $output .= '</div>';
    return $output;
  }
}

/*
 * NEW FUNCTION TO DO CUSTOM IMPLEMENTATION OF PAGINATION AS PER REQUIREMENTS.
 */
function pager_pieces_item_list($items = array(), $title = NULL, $type = 'ul', $attributes = NULL) {
  if (isset($title)) {
    $output .= '<h3>'. $title .'</h3>';
  }

  if (!empty($items)) {
    $output .= "<$type>";
    $num_items = count($items);
    foreach ($items as $i => $item) {
      $attributes = array();
      $children = array();
      if (is_array($item)) {
        foreach ($item as $key => $value) {
          if ($key == 'data') {
            $data = $value;
          }
          elseif ($key == 'children') {
            $children = $value;
          }
          else {
            $attributes[$key] = $value;
          }
        }
      }
      else {
        $data = $item;
      }
      if (count($children) > 0) {
        $data .= pager_pieces_item_list($children, NULL, $type, $attributes); // Render nested list
      }
      $output .= '<li'. drupal_attributes($attributes) .'>'. $data ."</li>";
    }
    $output .= "</$type>";
  }
 return $output;
}

/**
 *
 * OVERRIDDEN TO DO CUSTOM IMPLEMENTATION OF PAGINATION AS PER REQUIREMENTS.
 * Return a themed list of items.
 *
 * @param $items
 *   An array of items to be displayed in the list. If an item is a string,
 *   then it is used as is. If an item is an array, then the "data" element of
 *   the array is used as the contents of the list item. If an item is an array
 *   with a "children" element, those children are displayed in a nested list.
 *   All other elements are treated as attributes of the list item element.
 * @param $title
 *   The title of the list.
 * @param $type
 *   The type of list to return (e.g. "ul", "ol")
 * @param $attributes
 *   The attributes applied to the list element.
 * @return
 *   A string containing the list output.
 */
function phptemplate_item_list($items = array(), $title = NULL, $type = 'ul', $attributes = NULL) {
  $output = '';
  if (isset($title)) {
    $output .= '<h3>'. $title .'</h3>';
  }

  if (!empty($items)) {
    //$output .= "<$type". drupal_attributes($attributes) .'>';
    $num_items = count($items);
    foreach ($items as $i => $item) {
      $attributes = array();
      $children = array();
      if (is_array($item)) {
        foreach ($item as $key => $value) {
          if ($key == 'data') {
            $data = $value;
          }
          elseif ($key == 'children') {
            $children = $value;
          }
          else {
            $attributes[$key] = $value;
          }
        }
      }
      else {
        $data = $item;
      }
      if (count($children) > 0) {
        $data .= theme_item_list($children, NULL, $type, $attributes); // Render nested list
      }
      $output .= '<div'. drupal_attributes($attributes) .'>'. $data ."</div>\n";
    }
  }
  return $output;
}
function psychiatry24x7_theme(){
	$theme = array(
    'webform_form' => array(
      'arguments' => array('form' => NULL),
      'template' => 'user-survey',
       ),
     );
     return $theme;
}


/*
 * Themeing form element for Walking Log form.
 */
function psychiatry24x7_form_element($element, $value) {
  // This is also used in the installer, pre-database setup.
  $t = get_t();

  //echo "<PRE>"; print_r($element); echo "</PRE>";

  if( arg(0) == 'walkinglog' && arg(1) == 'create' ){
	$title = $element['#title'];
        $output = '<dl>
          <dt>';
        $required = !empty($element['#required']) ? '<span class="form-required" title="' . $t('This field is required.') . '">*</span>' : '';
        $output .= $title.$t(': !required', array('!required' => $required));
        $output .= '</dt>';

          $output .= '<dd>'.$value.'</dd>
        </dl>';
  }else if( arg(0) == 'user-survey' ){
	$title = $element['#title'];
               $output = '<div class="question"><span>Q.</span>'.$title;
        $output .= '</dIV>';
          $output .= $value;

  }else if($element['#name']!='wl_walk_hours' && $element['#name']!='wl_walk_minutes' && $element['#id']!='edit-field-week-hours-value' && $element['#id']!='edit-field-week-minutes-value' && $element['#name']!='field_distance_unit[value]'){
	
	  $output = '<div class="form-item"';
	  if (!empty($element['#id'])) {
	    $output .= ' id="' . $element['#id'] . '-wrapper"';
	  }
	  $output .= ">\n";
	  $required = !empty($element['#required']) ? '<span class="form-required" title="' . $t('This field is required.') . '">*</span>' : '';

	  if (!empty($element['#title'])) {
	    $title = $element['#title'];
	    if (!empty($element['#id'])) {
	      $output .= ' <label for="' . $element['#id'] . '">' . $t('!title: !required', array('!title' => filter_xss_admin($title), '!required' => $required)) . "</label>\n";
	    }
	    else {
	      $output .= ' <label>' . $t('!title: !required', array('!title' => filter_xss_admin($title), '!required' => $required)) . "</label>\n";
	    }
	  }

	 if(is_numeric(arg(1)) && $element['#id']=='edit-field-month-start-value'){
    $output .= "<em class='field_readonly'>".$element['#default_value']."</em>";
  }
  else if($element['#name']=='name' || $element['#name']=='pass' || $element['#name']=='new_pass' || $element['#name']=='confirm_pass' || $element['#name']=='mail'
 /*|| $element['#name']=='pass[pass1]' || $element['#name']=='pass[pass2]'*/){
	/*if($element['#name']=='pass[pass1]'){
		$name = 'pass-pass1';
	}
	else if($element['#name']=='pass[pass2]'){
		$name = 'pass-pass2';
	}
	else{
		$name = $element['#name'];
	}*/
  $output .= "<div class='user-login-".$element['#name']."'>".$value."</div>";
  }
  else{ 
  $output .= " $value\n";
  }
	  

	  if (!empty($element['#description'])) {
	    $output .= ' <div class="description">' . $element['#description'] . "</div>\n";
	  }

	  $output .= "</div>\n";
  }else{
	  $output .= " $value";
  }//end of else
  return $output;
}

function phptemplate_breadcrumb($breadcrumb) {
  if (!empty($breadcrumb)) {
  	$breadcrumb[] = menu_get_active_title(); // get current menu title and append to current breadcrumb array
    return '<div class="breadcrumb">' . implode(' ›› ', $breadcrumb) . '</div>';
  }
}
function psychiatry24x7_art_of_the_day($items){
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
        $artist_name  = explode('&lt;/Description&gt;', $artist_name[1]);
        $artist_details = '';
        $image_title	= '<div id="image_title"><h4>'.t('Picture of the Month').'</h4></div>';

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

function psychiatry24x7_button($element){
  // Make sure not to overwrite classes.
  $element['#attributes']['class'] .= ' form-'. $element['#button_type'];

  return '<input type="'.(isset($element['#button_type']) ? $element['#button_type'] : "submit").'" '. (empty($element['#name']) ? '' : 'name="'. $element['#name'] .'" ')  .'id="'. $element['#id'].'" value="'. check_plain($element['#value']) .'" '. drupal_attributes($element['#attributes']) ." />\n";
}

function psychiatry24x7_menu_item_link($link){
if(empty($link['localized_options'])){
  $link['localized_options']=array();
}
if($link['title']==t('Walking log') || $link['title']==t('View logs created') || $link['title']==t('Log out')){

                                $link['localized_options']['attributes']['title'] = t($link['title']);

                }
                return l($link['title'], $link['href'], $link['localized_options']);
}

function psychiatry24x7_be_nl_preprocess_user_login(&$vars){
	$vars['messages'] = $_SESSION['messages'];
	$messages = strip_tags($vars['messages']['error'][count($vars['messages']['error'])-1]);
	if(substr_count($messages,t('Sorry, unrecognized username or password'))>0){
		$vars['messages'] = t('Incorrent details - please check email address or password');
	}
}
function psychiatry24x7_be_nl_preprocess_user_pass(&$vars){
	$vars['messages'] = $_SESSION['messages'];
	$vars['messages'] = strip_tags($vars['messages']['error'][count($vars['messages']['error'])-1]);
}
function psychiatry24x7_be_nl_preprocess_change_pass_form(&$vars){
	$vars['messages'] = $_SESSION['messages'];
	$vars['messages'] = strip_tags($vars['messages']['error'][count($vars['messages']['error'])-1]);
}

function get_child_menus_menu_navigation($tree=""){
    
	global $language;
    $links=array();
    // Leave only current language menus and language neutral menus
	$path = drupal_get_path_alias($_GET['q']);
	
    $current_language = $language->language;
    if ( ! empty($tree) ) {
	  $i=1;
      foreach ( $tree as $menu_key => $menu_link ) {
				$selected = ($menu_link['link']['href']==$path)?"select_tab":"";
                $links[] = array('title' => $menu_link['link']['link_title'],'href' => $menu_link['link']['href'],
				'attributes'=>array('title'=>$menu_link['link']['link_title'],'class'=>"$selected"));
				$i++;
      }
    }   
    return $links; 
}

function get_submenu_tree_all_data($menu = 'menu-header-left-links', $title) {
    $tree = menu_tree_all_data($menu);
    foreach ($tree as $branch){
      if ($branch['link']['title'] == $title){
        $childtree = $branch['below'];
        break;
      }
    }
    return $childtree;
}
function phptemplate_get_doctors_net_uk_scripts(){
	$doc_script = "";
	/*if(!module_exists('doctors_net_uk')){
		$doc_script.='<script type="text/javascript" src="'.drupal_get_path('module', 'doctors_net_uk').'/js/jQuery.min.js"></script>';
		$doc_script.='<script type="text/javascript" src="'.drupal_get_path('module', 'doctors_net_uk').'/js/jQuery.migrate.js"></script>';
		$doc_script.='<script type="text/javascript">$.noConflict();</script>';
	}*/
	$path = drupal_get_path_alias($_GET['q']);
	if(module_exists('doctors_net_uk')){
		$doc_script .= (substr_count($path,'walking_log')>0)?'':'<script type="text/javascript">$.noConflict();</script>';
		$doc_script .= '<script type="text/javascript" src="http://www.doctors.net.uk/jsapi/latest/_resources/js/dnuk.syndication.js"></script>
		<script type="text/javascript" src="http://www.doctors.net.uk/_resources/js/jsapi/3rd-party/dnuk.3rd-party.utilities.js"></script>
		<script type="text/javascript">
			var CAMPAIGN_ID = 1148;
			var SYNDICATION_ID = "Janssen.Janssen";
			jQuery(document).ready(function() {
				DNUKScriptLoader.loadAPIModule("login", "edetail","navigation", function () {
					syndicationSetupAndLogin(SYNDICATION_ID, function(syndication, user) {
						//Login the site user
						//login_dnuk_user();
						window.dnukLogInteraction(
							location.href, function(){}
						);
						jQuery("#dnukHeader").addDNUKHeader();
						jQuery("#dnukFooter").addDNUKFooter();
					});
				});
				
			});
			</script>';
			
			$doc_script .='<script>';
			if(variable_get('dnkuk_user_logged_in' , '')==0){
			$doc_script .= 'function login_dnuk_user(){
				 $.ajax({
							url: "/dnuk_user_login",
							beforeSend: function(){
		
								jQuery.blockUI({message: "<p><img src=\"/sites/all/themes/psychiatry24x7/images/ajax_loading.gif\"></img></p>"});
							},
							success: function(data) {
								
							  var json = eval("("+data+")");
							  setTimeout(jQuery.unblockUI,2000);
							  if(json.status==1){
								window.location.href="/";
							  }
							}
						  });
			}';
			}else{
				$doc_script .= 'function login_dnuk_user(){}';
			}
			$doc_script .= '(function load_home_branding() {
						  /*$.ajax({
							url: "/dnuk_sess_check",
							success: function(data) {
							  var json = eval("("+data+")");
							complete: function() {
							  
							 
							}
						  }
						  });*/
						  
					})();
				</script>
			';
	}
	return $doc_script;
}