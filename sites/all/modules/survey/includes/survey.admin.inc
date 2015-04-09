<?php
/*
*	Page callback function for Survey Popover settings
*/

function survey_popover_settings_form(){
    drupal_add_js(drupal_get_path('module', 'survey') .'/js/survey_admin.js');
    $form['survey_configuration']['survey_modalpopup_display'] = array(
        '#type' => 'checkbox',
        '#title' => '<b>'.t('Show survey in modal popup window').'</b>',
        '#description' => t('Show survey in modal popup window.'),
    '#default_value' => variable_get('survey_modalpopup_display', 0),
    );


    $trigger = array('0' => 'Based on a specific UI event.', '1'=>'Upon page load', '2'=>'After a certain amount of time');

    $form['survey_configuration']['survey_trigger_popup'] = array(
        '#type' => 'radios',
        '#prefix' => '<div style="display:none" id = "survey_trigger_popup_divid">',
        '#suffix' => '</div>',
        '#title' => t('Popup load method'),
        '#description' => t('How to load the popup.'),
        '#default_value' => variable_get('survey_trigger_popup', 0),
        '#options' => $trigger,
    );

    $form['survey_configuration']['survey_popup_uievent'] = array(
        '#type' => 'select',
        '#prefix' => '<div style="display:none" id="survey_popup_uievent_divid">',
        '#suffix' => '</div><div style="display:none" id="survey_popup_which_class_divid">'.theme('survey_class').'</div>',
        '#title' => t('Select an UI event'),
        '#description' => t('Select an UI event to display in the Popup.'),
        '#default_value' => variable_get('survey_popup_uievent', 'hover'),
        '#options' => array('hover' => t('Hover'), 'click' => t('On click')),
    );

  $form['survey_configuration']['survey_popup_amount_of_time'] = array(
    '#type' => 'textfield',
   '#prefix' => '<div style="display:none" id="survey_popup_amount_of_time_divid">',
   '#suffix' => '</div>',
    '#title' => t('Enter a time period'),
    '#default_value' => variable_get('survey_popup_amount_of_time', ''),
    '#description' => t('Enter a time period after which the Popup should load on page load (in seconds).'),
  );
  
  $form['survey_configuration']['survey_modalpopup_height'] = array(
    '#type' => 'select',
    '#title' => '<b>'.t('Height modal popup window').'</b>',
    '#description' => 'Enter height of  survey  modal popup window.',
    '#default_value' => variable_get('survey_modalpopup_height', 350),
    '#options' => array('150'=>'150','175'=>'175','200'=>'200','225'=>'225','250'=>'250','275'=>'275','300'=>'300','350'=>'350','400'=>'400','450'=>'450','500'=>'500','550'=>'550','600'=>'600','650'=>'650','700'=>'700'),
  );

  $form['survey_configuration']['survey_modalpopup_width'] = array(
    '#type' => 'select',
    '#title' => '<b>'.t('Width of modal popup window').'</b>',
    '#description' => 'Enter width  of  survey  modal popup window.',
    '#default_value' => variable_get('survey_modalpopup_width', 400),
    '#options' => array('150'=>'150','175'=>'175','200'=>'200','225'=>'225','250'=>'250','275'=>'275','300'=>'300','350'=>'350','400'=>'400','450'=>'450','500'=>'500','550'=>'550','600'=>'600','650'=>'650','700'=>'700'),
  );
  
  return system_settings_form($form);
  
}
/*
*
*/
function survey_popover_settings_form_validate($form, &$form_state){
	drupal_add_js(drupal_get_path('module', 'survey') .'/js/survey_admin.js');
	_validate_modal_popover_settings($form_state);
}

/*
*	Page callback function for Survey Page Settings
*/

function survey_page_settings_form(){
    drupal_add_js(drupal_get_path('module', 'survey') .'/js/survey_admin.js');
    if(isset($_POST['page'])){
        survey_page_save($_POST);
        exit;
    }
	global $options;
	$surveyTitles = get_survey_titles();	
	drupal_add_js('var option = new Array();', 'inline');
	$options['0'] = t('Please select one survey');
	
	if($surveyTitles->TotalCount > 0){
		foreach($surveyTitles->Evaluation as $value){
			$options[$value->EvaluationId] = $value->DisplayName;
			drupal_add_js('option['.$value->EvaluationId.'] = "'.$value->DisplayName.'";', 'inline');		
		}
	}
    if(arg(4) =="edit"){
        $btnText = t('Update');
        $form['survey_page_setting']['survey_spid'] = array(
        '#type' => 'hidden',
        '#default_value'=> arg(5),
    );
    $surveyPageValue = survey_page_load(arg(5));
 } else if(arg(4) =="delete") {
 	survey_page_delete(arg(5));
	drupal_goto('admin/settings/survey/survey-page-settings');
	exit;
 } else {
    $form['survey_page_setting']['survey_spid'] = array(
    '#type' => 'hidden',
    '#default_value'=> 0,
    );
 	$btnText = t('Add');
 }

  $form['survey_page_setting']['survey_page'] = array(
	'#type' => 'textfield',
    '#default_value'=> $surveyPageValue->page,
    '#title' => t('Page'),
    '#description' => t('Enter your page URL to display the survey. Example node/1.'),
  );

  $form['survey_page_setting']['survey_titles'] = array(
    '#type' => 'select',
    '#default_value'=> $surveyPageValue->survey_id,
	'#options'=>$options,
    '#title' => t('Select a Survey Title'),
  );

    $form['survey_page_setting']['render_type'] = array(
        '#type' => 'checkbox',
        '#title' => t('Show the survey in inline'),
        '#description' => t('Please check this to display the survey inline and add the particular page in the block configuration of survey form.'),
        '#default_value'=> $surveyPageValue->render_type,
    );

    $form['survey_page_setting']['survey_page_add'] = array(
        '#type' => 'button',
        '#value' => $btnText,
    );
    $form['#suffix'] = '    <div style="width:100%;float:left;" id="survey_score_add">
                            <div id = "surveyStatusMessage"></div>'.survey_page_load_list().'</div>';
  
  return $form;
}

function survey_page_save($post){
		drupal_add_js(drupal_get_path('module', 'survey') .'/js/survey_admin.js');

	global $user;
	
	$post['uid'] = $user->uid;
	$post['changed'] = time();
	
	$param['page'] = $post['page'];
	//$param['survey_id'] = $post['survey_id'];
	
	$alreadyExist = survey_page_load($param);
	
	if($alreadyExist && ($post['op'] == 'POST')){
		echo 0;
	} else {
        switch($post['op']) {
            case 'POST':
                $post['status']     =   '1';
                $post['created']    =   time();
                drupal_write_record('survey_page', $post);

                if($post['spid'])
                    update_survey_block_page($post['page'], $post['render_type']);

                echo $post['spid'];
            break;

            case 'UPDATE':
                drupal_write_record('survey_page', $post, array('spid'));
                if($post['spid']){
                    update_survey_block_page($post['page'], $post['render_type']);
                }
                echo $post['spid'];
            break;
        }
    }
	//echo 'success';
}




