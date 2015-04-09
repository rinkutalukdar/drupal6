<?php
function eu_cookie_compliance(){
	
	global $language;
    $lang = $language->language;   
    $get_values = get_variable_value('eu_cookie_tp_analytic_settings_' . $lang);
	if(empty($get_values)) {
		$get_values = get_variable_value('eu_cookie_tp_analytic_settings_en');
    }
	$desc_values = get_variable_value('eu_cookie_tp_text_settings_' . $lang);
	if(empty($get_values)) {
		$desc_values = get_variable_value('eu_cookie_tp_text_settings_en');
    }
	$tp_denied_str = $_COOKIE['tp_denied_str'];
    $tp_denied_arr = explode (',', $tp_denied_str);
   
	$output ='';
    $output .= '<div id="eu-cookie-compliance-container">';	
	$output .= '<form name="eu-cookie-compliance" id="eu-cookie-compliance" class="cookiePop" onsubmit ="return false;">';
	
	$header = array();	
	$tp_titles = $get_values['tp_titles'];
	//echo "<pre>";print_r($get_values);exit;
	$i =0;
	$j=0;
	$array_exc = array('analytical_additional_cookies','adv_additional_cookies','content_sharing_additional_cookies','website_additional_cookies','security_additional_cookies');
	$rows = array();
	foreach ($get_values as $tp_cat => $tp_options){		
		// display the category
		$i++;
		
		if(isset($tp_titles[$tp_cat])) {
			$content_flag = FALSE;
			$rows[] = array(
						array('data' =>  $tp_titles[$tp_cat] , width => '20%', 'align' =>'left',  'class' => "eu-cookie-compliance-cat-txt" ),
                        array('data' =>  t('Purpose') , width => '30%','align' =>'left',  'class' => "eu-cookie-compliance-purpose-txt" ),	
						array('data' =>  t('Expiry') ,width => '25%', 'align' =>'left',  'class' => "eu-cookie-compliance-expire-txt" ),	
                        array('data' =>  t('How to Block') , width => '25%','align' =>'left',  'class' => "eu-cookie-compliance-block-txt" ),												
					);					
		}
		if ($tp_cat != 'tp_titles' && !in_array($tp_cat,$array_exc)) { // excluding the TP name titles
			foreach ($tp_options as $tp_key => $tp_option) {
				if($tp_option != '0'){
					$content_flag = TRUE;
					$i++;
					$checked_str = in_array('denied_' . $tp_key , $tp_denied_arr) ? 'checked ="checked"' : '';
					$purpose_html = $desc_values[$tp_cat][$tp_key]['purpose'];
					$expiry_html = $desc_values[$tp_cat][$tp_key]['expire'];
					$block_html = get_text_link($desc_values[$tp_cat][$tp_key]['block']);					
					
					$rows[] = array(
								array('data' => $tp_titles[$tp_option], 'align' =>'left', 'valign' =>'top', 'class' => "eu-cookie-compliance-cat-txt1"),
								array('data' => $purpose_html, 'align' =>'left', 'class' => "eu-cookie-compliance-purpose-txt1"),
								array('data' => $expiry_html, 'align' =>'left', 'class' => "eu-cookie-compliance-expire-txt1"),
								array('data' => $block_html, 'align' =>'left', 'class' => "eu-cookie-compliance-block-txt1"),
								//array('data' => $button_html, 'align' =>'center', 'class' => "eu-cookie-compliance-cat-txt1"),    
					);
				}
				/**/
			}
			
		}
		else if($tp_cat != 'tp_titles' && in_array($tp_cat,$array_exc)){
				//echo "<pre>";print_r($get_values[$tp_cat]);exit;
				//$j=$i+1;
				foreach($get_values[$tp_cat]['options'] as $add_tp_key=>$add_tp_options){
					if(in_array($add_tp_key,$get_values[$tp_cat]['default_value'])){
						$content_flag = TRUE;
						$purpose_html = $desc_values[$tp_cat][$get_values[$tp_cat]['options'][$add_tp_key]]['purpose'];
						$expiry_html = $desc_values[$tp_cat][$get_values[$tp_cat]['options'][$add_tp_key]]['expire'];
						$block_html = get_text_link($desc_values[$tp_cat][$get_values[$tp_cat]['options'][$add_tp_key]]['block']);
						$rows[] = array(
										array('data' => $get_values[$tp_cat]['options'][$add_tp_key], 'align' =>'left', 'valign' =>'top', 'class' => "eu-cookie-compliance-cat-txt1"),
										array('data' => $purpose_html, 'align' =>'left', 'class' => "eu-cookie-compliance-purpose-txt1"),
										array('data' => $expiry_html, 'align' =>'left', 'class' => "eu-cookie-compliance-expire-txt1"),
										array('data' => $block_html, 'align' =>'left', 'class' => "eu-cookie-compliance-block-txt1"),
										//array('data' => $button_html, 'align' =>'center', 'class' => "eu-cookie-compliance-cat-txt1"),    
							);
							//$j++;
					}
				}
		}
		if($content_flag == FALSE){
		   //unset($rows[$i]);
		   //unset($rows[$j]);
		}
	}  	
	//echo "<pre>";print_r($rows);exit;
	$table_attributes = array('id' => 'eu_cookie_compliance_table', 'align' => 'center', 'class' => 'eu-cookie-compliance-table' );
	$output .= theme('table', $header, $rows, $table_attributes);
	
	$output .= '</form>';	
    $output .= '</div>';  
	return $output;
}

function get_text_link($text) {
// The Regular Expression filter
  $reg_exUrl = "/(http|https|ftp|ftps)\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(\/\S*)?/";
  $i=0;
  $str ='';
  if(preg_match($reg_exUrl, $text, $url)) {
	// make the urls hyper links
	$str .= preg_replace($reg_exUrl, "<a target="._blank." href=" .$url[$i].">".  wordwrap($url[$i], 30, "<br />\n", TRUE)."</a> ", $text);
	$i++;
  } else {
    // if no urls in the text just return the text
    $str .=  $text;
  }
  
  return $str;
}

