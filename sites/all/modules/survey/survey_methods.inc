<?php
        ///  function survey_get_item()
        function survey_get_item($title, $path, $size = NULL) {
            $options = array('attributes' => array('class' => 'survey-popover-style modalframe-exclude'. (!empty($size) ? ' survey-size['. $size .']' : '')));
            return l($title, $path, $options);
        }

        /*
        *	Function to get the latest Survey id
        */
        function _get_latest_survey_id($fromWhere = '') {
            global $itrinno_site_id;
            $blockSurveyEvaluationData  =   new SurveyData();
            $blockSurveyEvaluationData->SetServiceName('evaluation');
            $blockSurveyEvaluationData->SetServiceIdentity('loadall');
            $blockSurveyEvaluationData->SetSiteId($itrinno_site_id);

            $blockSurveyEvaluationData->SetMethod('get');
            $blockSurveyEvaluationData->set_current_page_no(1);
            $blockSurveyEvaluationData->set_no_of_questions_per_page(1);
            $blockSurveyEvaluationData->set_evaluation_type_name('Survey');

            $blockSurvey                =   new survey();
            $processedData              =   $blockSurvey->get_evaluations($blockSurveyEvaluationData);
            $decodedData                =   json_decode($processedData);

            foreach($decodedData->Evaluation as $element){
                return $element->EvaluationId;
            }
        }

        /*
        *	Delete the record from survey page records
        */
        function survey_page_delete($spid = ''){
            db_query("DELETE FROM {survey_page} WHERE spid = %d", $spid);
            return true;
        }

        /*
        *	Retrieve the survey titles from the service
        */

        function get_survey_titles($page = 1, $noOfQuestionsPerPage = 0) {

            global $itrinno_site_id;
            $blockSurveyEvaluationData  =   new SurveyData();
            $blockSurveyEvaluationData->SetServiceName('evaluation');
            $blockSurveyEvaluationData->SetServiceIdentity('loadall');
            $blockSurveyEvaluationData->SetSiteId($itrinno_site_id);

            $blockSurveyEvaluationData->SetMethod('get');
            $blockSurveyEvaluationData->set_current_page_no($page);
            $blockSurveyEvaluationData->set_no_of_questions_per_page($noOfQuestionsPerPage);
            $blockSurveyEvaluationData->set_evaluation_type_name('Survey');
            $dataObject                 =   $blockSurveyEvaluationData;

            if($noOfQuestionsPerPage == 0) {
                $blockSurveyEvaluationData->set_no_of_questions_per_page(1);
                $blockSurveyEvaluationData->set_evaluation_type_name('Survey');
                $blockNewSurvey = new survey();
                $processedData = $blockNewSurvey->get_evaluations($blockSurveyEvaluationData);
                $updatedCountDataObj = new SurveyData();
                $decodedData = json_decode($processedData);
                $noOfQuestionsPerPage = $decodedData->TotalCount;

    //			$updatedCountDataObj->SetServiceName('evaluation');
    //			$updatedCountDataObj->SetServiceIdentity('loadall');
    //			$updatedCountDataObj->SetSiteId($itrinno_site_id);
    //			$updatedCountDataObj->SetMethod('get');
    //			$updatedCountDataObj->set_current_page_no($page);
    //			$updatedCountDataObj->set_no_of_questions_per_page($noOfQuestionsPerPage);
    //			$updatedCountDataObj->set_evaluation_type_name('Survey');

    //			$dataObject = $updatedCountDataObj;
            }

            $blockSurvey    =   new survey();
            $processedData  =   $blockSurvey->get_evaluations($dataObject);
            $decodedData = json_decode($processedData);
            return $decodedData;
        }

        /*
        *	Function to load the survey
        */

        function get_survey($surveyId, $page, $pageSize){
            global $session_value;
            global $itrinno_site_id;
            $session                            =   $session_value;
            $question_per_page                  =   $pageSize;
            //echo '$current_page'.$current_page.'<br />';

            $objSurveyData                      =   new SurveyData();
            $objSurveyData->SetServiceName('evaluation');
            $objSurveyData->SetServiceIdentity('load');
            $objSurveyData->SetSiteId($itrinno_site_id);
            $objSurveyData->SetMethod('get');

            $objSurveyData->set_evaluation_id($surveyId);
            $objSurveyData->set_current_page_no($page);
            $objSurveyData->set_no_of_questions_per_page($question_per_page);
            $objSurvey                          =   new survey();
            $processedData                      =   $objSurvey->get_evaluation_details($objSurveyData);

            $survey->header                     =   'This is my header';
            $survey->titleDescriptionContent    =   survey_display_textual_data('survey_textual_data_abovedesc', 'survey_flag_show_textual_data_abovedesc');
            $survey->descriptionFormContent     =   survey_display_textual_data('survey_textual_data_belowdesc', 'survey_flag_show_textual_data_belowdesc');
            $survey->bottomAboveButtonContent   =   survey_display_textual_data('survey_textual_data_abovesubmit', 'survey_flag_show_textual_data_abovesubmit');
            $survey->bottomBelowButtonContent   =   survey_display_textual_data('survey_textual_data_bottom', 'survey_flag_show_textual_data_bottom');

            $survey->data                       =   $processedData;
            $survey->answers                    =   $objSurveyData->get_answers();
            $survey->questions                  =   $objSurveyData->get_questions();
            $survey->footer                     =   'This is my footer';
            $output                             =   json_encode($survey);

            return $output;
        }

        /*
        *	Function to load the survey specific to the particular survey
        */
        function load_survey($surveyId, $page=1, $pageSize = 0){//print_r($_POST);exit;
            //echo 'asd'; exit;
            global $session_value, $itrinno_site_id;
            $session = $session_value;

            if(isset($_POST['op'])) {
                if($_POST['difference_flag'] && $_POST['difference_flag']=='multipath_form') {
                    $form_id    =   'multipath_survey_form';
                } else {
                    $form_id    =   'survey_form';
                }

                $form_state     =   array('storage' => NULL, 'submitted' => FALSE);
                if (isset($_POST['form_id']) && $_POST['form_id'] == $form_id && !empty($_POST['form_build_id'])) {
                  $form         =   form_get_cache($_POST['form_build_id'], $form_state);
                }

                $form['#post']  =   $_POST;
                if(empty($surveyId))
                    $surveyId   =   $_POST['survey_id'];

                drupal_process_form($form_id, $form, $form_state);
                $formError      =   form_get_errors();
            }

            if(arg(1)!='multipath-questions') {
                if($page == 1 && isset($_POST['currentPageNo']) && strtolower($_POST['op']) == 'next'){
                    $page       =   is_array($formError)?$_POST['currentPageNo']:$_POST['currentPageNo']+1;
                } else if($page == 1 && isset($_POST['currentPageNo']) && strtolower($_POST['op']) == 'previous') {
                    $page       =   is_array($formError)?$_POST['currentPageNo']:$_POST['currentPageNo']-1;
                } else if(strtolower($_POST['op']) == 'submit') {
                    $page       =   is_array($formError)?$_POST['currentPageNo']:'';
                    $page       =   1;

                    if($_POST['difference_flag'] && $_POST['difference_flag']=='multipath_form') {
                        $question_per_page  =   1;
                    } else {
                        $question_per_page  =   5;
                    }
                }

                //End of Removeing Code
                if($pageSize == 0){
                    if($_POST['difference_flag'] && $_POST['difference_flag']=='multipath_form') {
                        $pageSize   =   1;
                    } else {
                        $pageSize   =   variable_get('survey_questions_per_page','5');
                    }
                }

                $question_per_page  =   $pageSize;
                $HasTaken           =   survey_has_taken($surveyId);
                if(arg(2) == '') {
                    if($HasTaken){
                        $survey->status         =   1;
                        $survey->statusMessage  =   t('Already Taken');
                    } else {
                        //$question_per_page = 100;
                        //echo '$current_page'.$current_page.'<br />';
                        $objSurveyData          =   new SurveyData();
                        $objSurveyData->SetServiceName('evaluation');
                        $objSurveyData->SetServiceIdentity('load');

                        $objSurveyData->SetSiteId($itrinno_site_id);
                        $objSurveyData->SetMethod('get');
                        $objSurveyData->set_evaluation_id($surveyId);
                        $objSurveyData->set_current_page_no($page);
                        $objSurveyData->set_no_of_questions_per_page($question_per_page);

                        $objSurvey              =   new survey();
                        $processedData          =   $objSurvey->get_evaluation_details($objSurveyData);

                        if($objSurveyData->get_error_message()){
                            $survey->statusMessage  =   $objSurveyData->get_error_message();
                            $survey->status         =   4;
                        } else {
                            $survey->data           =   $processedData;
                            $survey->answers        =   $objSurveyData->get_answers();
                            $survey->questions      =   $objSurveyData->get_questions();
                            $survey->status         =   0;
                            $survey->statusMessage  =   t('Has not taken');
                        }
                    }
                } else {
                        $objSurveyData  =   new SurveyData();
                        $objSurveyData->SetServiceName('evaluation');
                        $objSurveyData->SetServiceIdentity('load');
                        $objSurveyData->SetSiteId($itrinno_site_id);
                        $objSurveyData->SetMethod('get');
                        $objSurveyData->set_evaluation_id($surveyId);
                        $objSurveyData->set_current_page_no($page);
                        $objSurveyData->set_no_of_questions_per_page($question_per_page);

                        $objSurvey      =   new survey();
                        $processedData  =   $objSurvey->get_evaluation_details($objSurveyData);
                        if($objSurveyData->get_error_message()){
                            $survey->statusMessage  =   $objSurveyData->get_error_message();
                            $survey->status         =   4;
                        } else {
                            $survey->data           =   $processedData;
                            $survey->answers        =   $objSurveyData->get_answers();
                            $survey->questions      =   $objSurveyData->get_questions();
                            $survey->status         =   0;
                            $survey->statusMessage  =   t('Has not taken');
                        }
                }

                $survey->header                     =   'This is my header';
                $survey->titleDescriptionContent    =   survey_display_textual_data('survey_textual_data_abovedesc', 'survey_flag_show_textual_data_abovedesc');
                $survey->descriptionFormContent     =   survey_display_textual_data('survey_textual_data_belowdesc', 'survey_flag_show_textual_data_belowdesc');
                $survey->bottomAboveButtonContent   =   survey_display_textual_data('survey_textual_data_abovesubmit', 'survey_flag_show_textual_data_abovesubmit');
                $survey->bottomBelowButtonContent   =   survey_display_textual_data('survey_textual_data_bottom', 'survey_flag_show_textual_data_bottom');

                $survey->footer                     =   'This is my footer';
                $survey->surveyId                   =   $surveyId;
                $survey->page                       =   $page;
                $output                             =   json_encode($survey);
                //	$output = json_decode($output);
                //	echo "<pre>";
                //	print_r($output);
                //	exit;
                return $output;
            }
            ////	return $surveyId;
        }

        /*
        *	Function to get the survey ID associate with this page
        */
        function get_survey_id($surveyRenderType = ''){
            switch($surveyRenderType) {
                case 'Popover':
                    $params['render_type'] = 0;
                break;

                case 'inline':
                    $params['render_type'] = 1;
                break;
            }
            $params['page'] =   $_GET['q'];
            $suveyIds       =   survey_page_load($params);

            if($suveyIds) {
                foreach($suveyIds as $key){
                    $surveyId = $key['survey_id'];
                }
            }
            return $surveyId;
        }

        function get_survey_details($surveyId) {
            //echo arg(2);
            //echo $surveyId;
            $surveyId = arg(2);

            global $session_value, $itrinno_site_id;
            $objSurveyData  =   new SurveyData();
            $objSurveyData->SetServiceName('evaluation');
            $objSurveyData->SetServiceIdentity('multipathforevaluation');
            $objSurveyData->SetSiteId($itrinno_site_id);

            $objSurveyData->SetMethod('get');
            $objSurveyData->set_evaluation_id($surveyId);
            $objSurveyData->set_operation_for_multipath('multipath');
            $objSurvey      =   new survey();
            $processedData  =   $objSurvey->get_evaluation_details($objSurveyData);

            $question_array =   array();

            for($counter=0;$counter<count($processedData->Question);$counter++) {
                $question_array[$processedData->Question[$counter]->QuestionId]['Qlbl']             =   $processedData->Question[$counter]->DisplayText;
                $question_array[$processedData->Question[$counter]->QuestionId]['Qtype']            =   $processedData->Question[$counter]->RenderType;
                $question_array[$processedData->Question[$counter]->QuestionId]['QId']              =   $processedData->Question[$counter]->QuestionId;
                $question_array[$processedData->Question[$counter]->QuestionId]['associatedText']   =   $processedData->Question[$counter]->AssociatedText;
                $question_array[$processedData->Question[$counter]->QuestionId]['isMandatory']      =   $processedData->Question[$counter]->isMandatory;

                for($i=0;$i<count($processedData->Question[$counter]->Answer);$i++) {
                    $question_array[$processedData->Question[$counter]->QuestionId]['Answer'][$i]   =   array('test'=>$processedData->Question[$counter]->Answer[$i]->DisplayText,'AnswerId'=>$processedData->Question[$counter]->Answer[$i]->AnswerId,'relatedQuestionId'=>$processedData->Question[$counter]->Answer[$i]->relatedQuestionId,'explanation'=>$processedData->Question[$counter]->Answer[$i]->explanation);
                }
            }

            $question_array['Total_record']     =   count($processedData->Question);
            $question_array['evaluation_name']  =   $processedData->EvaluationText;
            //p($question_array);
            return $question_array;
        }

        function update_survey_block_page($page, $renderType = 0){
            $module     =   'survey';
            $delta      =   '1';
            $edit       =   db_fetch_array(db_query("SELECT pages, region FROM {blocks} WHERE module = '%s' AND delta = '%s'", $module, $delta));
            $region     =   empty($edit['region'])?'content':$edit['region'];
            $pathFound  =   drupal_match_path($page, $edit['pages']);

            if(!$pathFound && $renderType == 1) {
                $pagesArray[]   =   $edit['pages'];
                $pagesArray[]   =   $page;
                $pages          =   implode("\n", $pagesArray);
                db_query("UPDATE {blocks} SET pages = '%s', region = '%s' WHERE module = '%s' AND delta = '%s'", $pages, $region, $module, $delta);
            } else if($pathFound && $renderType == 0) {
                $pages          =   str_replace($page, '', $edit['pages']);
                db_query("UPDATE {blocks} SET pages = '%s', region = '%s' WHERE module = '%s' AND delta = '%s'", $pages, $region, $module, $delta);
            }
        }

        function survey_result_value($survey_id){
            switch(variable_get('survey_page_redirect', 0)) {
                case 0:
                    /*	Redirect to thank you page where we display the thank you
                    *	Message Display by the admin
                    */
                    $message    =   survey_thank_you(FALSE);
                break;

                case 1:
                    /*	Redirect to Survey result page
                    */
                    $message    =   survey_result(FALSE);
                break;

                case 2:
                    /*	Redirect to relative url or custome url
                    */
                    $variable   =   variable_get('survey_redirect_custom_url', '');
                    if(!empty($variable)){
                        drupal_goto($variable);exit;
                    }else{
                        drupal_set_message(t('You will be redirecting a page which is not set by admin'), 'error',FALSE);
                        drupal_goto('survey/result/' . $survey_id);exit;
                    }
                break;
            }
            return $message;
        }

        function get_answer_option_type(&$form,$answer_option, $inc, $answerAttributeArray,$explanation_array,$question_id){
            //print_r($answerAttributeArray);
            //echo $question_id;
            $div_for_explanation = '';
            //$div_for_explanation = '<input type="hidden" id="edit-explanation-configure-val-1" value='.variable_get('explanation_configure',0).'>';
            if(is_array($answerAttributeArray) and count($answerAttributeArray) > 0){
                foreach($answerAttributeArray as $key=>$values) {
                    if(is_array($values) and count($values) > 0){
                        foreach($values as $index=>$val) {
                            if($explanation_array[$index]) {
                                $div_for_explanation .='<div id="div_id_'.$index.'" style="display:none"><strong>'.$explanation_array[$index].'</strong></div>';
                            } else {
                                $div_for_explanation .='<div id="div_id_'.$index.'" style="display:none"><strong>No Explanation For This Answer</strong></div>';
                            }
                        }
                    }
                }
            }
            //p($answerAttributeArray);exit;
            if($answerAttributeArray['required'] == 1)
                $required = true;
            else
                $required = false;

            if(strtolower($answer_option) == 'radiobutton' || strtolower($answer_option) == 'singleselectlistbox' || strtolower($answer_option) == 'dropdown' || strtolower($answer_option) == 'textbox') {
                if (empty($answerAttributeArray['default_value'][0])) {
                  $answerAttributeArray['default_value'][0] = '';
                }
            } else if(strtolower($answer_option) == 'textarea'){
                if(empty($answerAttributeArray['default_value'])) {
                    $answerAttributeArray['default_value'] = '';
                }
            } else {
                if (!is_array($answerAttributeArray['default_value'])) {
                    $answerAttributeArray['default_value'] = array(1 => '');
                }
            }

            $def_value      =   array();
            if($answerAttributeArray['default_value'][0] != ''){
                $def_value  =   $answerAttributeArray['default_value'];
            } else {
                $def_value  =   $answerAttributeArray['default_value'][1];
            }

            $explanation_settings = variable_get('explanation_configure',0);
            switch ( strtolower($answer_option) ) {
                case 'radiobutton':
                    $answer_option_type     =   'radios';
                    $answer_option_display  =   'survey-form-'.$answer_option_type.'-'.variable_get('survey_answer_display_type', 'ver');
                    $form['survey']['answer_'.$inc] = array(
                        '#type' => $answer_option_type,
                        '#attributes' => array('class'=> $answer_option_display,'onclick'=>'display_explanation_for_survey(this,1,'.$explanation_settings.','.$question_id.')'),
                        '#title' => $answerAttributeArray['question_title'],
                        '#options' => $answerAttributeArray['answers'],
                        '#description' => $answerAttributeArray['option_description'],
                        '#required' => $required,
                        '#default_value' => $answerAttributeArray['default_value'][0],
                        '#prefix'=>$div_for_explanation,
                        '#suffix'=>t('<div id="explanation_of_answer_id_1_'.$question_id.'"></div>'),
                    );
                    break;
                case 'checkbox':
                    $answer_option_type     =   'checkboxes';
                    $answer_option_display  =   'survey-form-radios-'.variable_get('survey_answer_display_type', 'ver');
                    $form['survey']['answer_'.$inc] = array(
                        '#type' => $answer_option_type,
                        '#attributes' => array('class'=> $answer_option_display,'onclick'=>'display_explanation_for_survey_for_checkbox(this,2,'.$explanation_settings.','.$question_id.','.count($answerAttributeArray['answers']).')'),
                        '#title' => $answerAttributeArray['question_title'],
                        '#options' => $answerAttributeArray['answers'],
                        '#description' => $answerAttributeArray['option_description'],
                        '#required' => $answerAttributeArray['required'],
                        '#default_value' => $answerAttributeArray['default_value'],
                        '#prefix'=>$div_for_explanation,
                        '#suffix'=>t('<div id="explanation_of_answer_id_2_'.$question_id.'"></div>'),
                    );
                    break;
                case 'singleselectlistbox':
                case 'dropdown':
                    $answer_option_type     =   'select';
                    $answer_option_display  =   'survey-form-'.$answer_option_type;
                    foreach($answerAttributeArray['answers'] as $key=>$value){
                        $answerAttributeArray['answers'][$key]  =   html_entity_decode($value);
                    }
                    if(is_array($answerAttributeArray['answers'])){
                        $arr_select         =   array(''=>t('--Select--'));
                        $selectBoxOptions   =   $arr_select+$answerAttributeArray['answers'];
                    } else {
                        $selectBoxOptions = array();
                    }

                    $multiple   =   FALSE;
                    $form['survey']['answer_'.$inc] = array(
                        '#type' => $answer_option_type,
                        '#attributes' => array('class'=> $answer_option_display,'onchange'=>'display_explanation_for_survey(this,3,'.$explanation_settings.','.$question_id.')'),
                        '#title' => $answerAttributeArray['question_title'],
                        '#options' => $selectBoxOptions,
                        '#multiple' => $multiple,
                        '#description' => $answerAttributeArray['option_description'],
                        '#required' => $answerAttributeArray['required'],
                        '#default_value' => $answerAttributeArray['default_value'][0],
                        '#prefix'=>$div_for_explanation,
                        '#suffix'=>t('<div id="explanation_of_answer_id_3_'.$question_id.'"></div>'),
                    );
                    break;
                case 'filtered list':
                    //print_r( $answerAttributeArray);
                    foreach($answerAttributeArray['answers'] as $key=>$value){
                        $answerAttributeArray['answers'][$key] = html_entity_decode($value);
                    }

                    $ans_str = implode("'],['", $answerAttributeArray['answers']);
                    $ele['filter_'.$inc] = array(
                        '#type' => 'textfield',
                        '#required' => $answerAttributeArray['required'],
                        '#title' => $answerAttributeArray['question_title'],
                        '#attributes' => array('class'=> $answer_option_display, 'onkeyup'=>'survey_filteredList("'.$inc.'", [[\''.$ans_str.'\']])'),
                        '#id' => 'filter_inp_'.$inc
                    );
                    $answer_option_type     =   'select';
                    $answer_option_display  =   'survey-form-'.$answer_option_type;
                    $multiple               =   FALSE;
                    $option_description     =   t('Use ctrl to Select/Unselect multiple answers.');
                    $form['survey']['answer_'.$inc] = array(
                        '#type' => $answer_option_type,
                        '#attributes' => array('class'=> $answer_option_display, 'size'=>5,'onchange'=>'display_explanation_for_survey(this,4,'.$explanation_settings.','.$question_id.')'),
                        '#options' => $answerAttributeArray['answers'],
                        '#multiple' => $multiple,
                        '#title' => $answerAttributeArray['question_title'],
                        '#prefix' => $div_for_explanation . drupal_render($ele),
                        '#id' => 'filter_sel_'.$inc,
                        '#description' => $answerAttributeArray['option_description'],
                        '#required' => $answerAttributeArray['required'],
                        '#default_value' => $def_value,
                        '#suffix'=>t('<div id="explanation_of_answer_id_4_'.$question_id.'"></div>'),
                    );
                    break;
                case 'multiselect filtered list':
                    //echo $answerAttributeArray['question_title']; exit;
                    foreach($answerAttributeArray['answers'] as $key=>$value){
                      $answerAttributeArray['answers'][$key] = html_entity_decode($value);
                    }
                    $ans_str = implode("'],['", $answerAttributeArray['answers']);
                    $ele = array(
                        '#type' => 'textfield',
                        '#title' => $answerAttributeArray['question_title'],
                        '#required' => $answerAttributeArray['required'],
                        '#attributes' => array('class'=> $answer_option_display, 'onkeyup'=>'survey_filteredList("'.$inc.'", [[\''.$ans_str.'\']])','onchange'=>'display_explanation_for_survey(this,5,'.$explanation_settings.','.$question_id.')'),
                        '#id' => 'filter_inp_'.$inc
                     );

                    $answer_option_type     =   'select';
                    $answer_option_display  =   'survey-form-'.$answer_option_type;
                    $multiple               =   TRUE;
                    $option_description     =   t('Use ctrl to Select/Unselect multiple answers.');
                    $form['survey']['answer_'.$inc] = array(
                        '#type' => $answer_option_type,
                        '#title' => $answerAttributeArray['question_title'],
                        '#attributes' => array('class'=> $answer_option_display, 'size'=>5,'onclick'=>'display_explanation_for_survey_for_multiple_box(this,5,'.$explanation_settings.','.$question_id.')'),
                        '#options' => $answerAttributeArray['answers'],
                        '#multiple' => $multiple,
                        '#prefix' => $div_for_explanation . drupal_render($ele),
                        '#id' => 'filter_sel_'.$inc,
                        '#description' => $answerAttributeArray['option_description'],
                        '#required' => $answerAttributeArray['required'],
                        '#default_value' => $def_value,
                        '#suffix'=>t('<div id="explanation_of_answer_id_5_'.$question_id.'"></div>'),
                    );
                    break;
                case 'source-target list':
                    foreach($answerAttributeArray['answers'] as $key=>$value){
                      $answerAttributeArray['answers'][$key]    =   html_entity_decode($value);
                    }

                    if($answerAttributeArray['required'] == 1)
                        $req    =   "<span style='color:#E87830;'><small>&nbsp;*</small></span>";

                    $form['survey']['answer_'.$inc] = array(
                        '#type' => 'sourceTargetList',
                        '#attributes' => array('class'=> $answer_option_display, 'size'=>5),
                        '#options' => $answerAttributeArray['answers'],
                        '#multiple' => $multiple,
                        '#prefix' => '<span style="font-weight:bold">'.$answerAttributeArray['question_title'].":</span>".$req,
                        '#title' => $answerAttributeArray['question_title'],
                        '#id' => 'filter_sel_'.$inc,
                        '#description' => $answerAttributeArray['option_description'],
                        '#required' => $answerAttributeArray['required'],
                        '#default_value' => $def_value,
                        //'#prefix'=>$div_for_explanation,
                        '#suffix'=>t('<div id="explanation_of_answer_id_6_'.$question_id.'"></div>'),
                    );
                    break;
                case 'multiselectfilteredlist':
                    $answer_option_type     =   'select';
                    $answer_option_display  =   'survey-form-'.$answer_option_type;
                    $multiple               =   TRUE;
                    $option_description     =   t('Use ctrl to Select/Unselect multiple answers.');
                    $form['survey']['answer_'.$inc] = array(
                        '#type' => $answer_option_type,
                        '#attributes' => array('class'=> $answer_option_display),
                        '#title' => $answerAttributeArray['question_title'],
                        '#options' => $answerAttributeArray['answers'],
                        '#multiple' => $multiple,
                        '#description' => $answerAttributeArray['option_description'],
                        '#required' => $answerAttributeArray['required'],
                        '#default_value' => $answerAttributeArray['default_value'],
                        '#prefix'=>$div_for_explanation,
                        '#suffix'=>t('<div id="explanation_of_answer_id_7_'.$question_id.'"></div>'),
                    );
                    break;
                case 'multiselectlistbox':
                case 'multiselect':
                case 'multiselect list':
                    $answer_option_type     =   'select';
                    $answer_option_display  =   'survey-form-'.$answer_option_type;
                    $multiple               =   TRUE;
                    $option_description     =   t('Use ctrl to Select/Unselect multiple answers.');
                    $form['survey']['answer_'.$inc] = array(
                        '#type' => $answer_option_type,
                        '#attributes' => array('class'=> $answer_option_display,'onclick'=>'display_explanation_for_survey_for_multiple_box(this,8,'.$explanation_settings.','.$question_id.')'),
                        '#title' => $answerAttributeArray['question_title'],
                        '#options' => $answerAttributeArray['answers'],
                        '#multiple' => $multiple,
                        '#description' => $answerAttributeArray['option_description'],
                        '#required' => $answerAttributeArray['required'],
                        '#default_value' => $answerAttributeArray['default_value'],
                        '#prefix'=>$div_for_explanation,
                        '#suffix'=>t('<div id="explanation_of_answer_id_8_'.$question_id.'"></div>'),
                    );
                    break;
                case 'textbox':
                        $answer_option_type     =   'textfield';
                        $answer_option_display  =   'survey-form-'.$answer_option_type;
                        $form['survey']['answer_'.$inc] = array(
                            '#type' => $answer_option_type,
                            '#attributes' => array('class'=> $answer_option_display),
                            '#title' => $answerAttributeArray['question_title'],
                            '#default_value' => $answerAttributeArray['default_value'][0],
                            '#description' => $answerAttributeArray['option_description'],
                            '#required' => $answerAttributeArray['required'],
                        );
                        break;
                case 'textarea':
                        $answer_option_type     =   'textarea';
                        $answer_option_display  =   'survey-form-'.$answer_option_type;
                        $form['survey']['answer_'.$inc] = array(
                          '#type' => $answer_option_type,
                          '#attributes' => array('class'=> $answer_option_display),
                          '#title' => $answerAttributeArray['question_title'],
                          '#default_value' => $answerAttributeArray['default_value'][0],
                          '#description' => $answerAttributeArray['option_description'],
                          '#required' => $answerAttributeArray['required'],
                        );
                        break;
                default:
                        $answer_option_type     =   'radios';
                        $answer_option_display  =   'survey-form-'.$answer_option_type.'-'.variable_get('survey_answer_display_type', 'ver');
                        $form['survey']['answer_'.$inc] = array(
                            '#type' => $answer_option_type,
                            '#attributes' => array('class'=> $answer_option_display),
                            '#title' => $answerAttributeArray['question_title'],
                            '#options' => $answerAttributeArray['answers'],
                            '#description' => $answerAttributeArray['option_description'],
                            '#required' =>$answerAttributeArray['required'],
                            '#default_value' => $answerAttributeArray['default_value'][0],
                            '#prefix'=>$div_for_explanation,
                            '#suffix'=>t('<div id="explanation_of_answer_id_9_'.$question_id.'"></div>'),
                        );
                        break;
            }
        }

        /**** MULTI PATH SURVEY RELATED CODE -- ADDED BY GIRI SHANKAR R DATED 16/09/2010
         *
         *
         */

         function get_multipath_survey_titles($page = 1, $noOfQuestionsPerPage = 0) {
                global $itrinno_site_id;
                $blockSurveyEvaluationData  =   new SurveyData();
                $blockSurveyEvaluationData->SetServiceName('evaluation');
                $blockSurveyEvaluationData->SetServiceIdentity('multipath');
                $blockSurveyEvaluationData->SetSiteId($itrinno_site_id);

                $blockSurveyEvaluationData->SetMethod('get');
                $blockSurveyEvaluationData->set_current_page_no($page);
                $blockSurveyEvaluationData->set_no_of_questions_per_page($noOfQuestionsPerPage);
                $blockSurveyEvaluationData->set_evaluation_type_name('Survey');
                $blockSurveyEvaluationData->set_multipath_evaluation_operation('Multipath');

                $dataObject                 =   $blockSurveyEvaluationData;

                if($noOfQuestionsPerPage == 0) {
                    $blockSurveyEvaluationData->set_no_of_questions_per_page(1);
                    $blockSurveyEvaluationData->set_evaluation_type_name('Survey');
                    $blockNewSurvey         =   new survey();
                    $processedData = $blockNewSurvey->get_evaluations($blockSurveyEvaluationData);
                    $updatedCountDataObj    =   new SurveyData();
                    $decodedData            =   json_decode($processedData);
                    $noOfQuestionsPerPage   =   $decodedData->TotalCount;
                }

                $blockSurvey                =   new survey();
                $processedData              =   $blockSurvey->get_evaluations($dataObject);
                $decodedData                =   json_decode($processedData);
                return $decodedData;
        }

        function multipath_question_form($form_state) {
            global $base_url,$user;
            drupal_set_title('Multipath Questions');
            $get_configure_variable =   variable_get('user_first_last_configure',0);

            if(variable_get('annonymus_user_session_id',0) != session_id())  {
                //variable_del('user_first_last_configure');
                variable_del('annonymus_user_first_name',0);
                $get_user_first_name    =   variable_get('annonymus_user_first_name',0);
            } else  {
                $get_user_first_name    =   variable_get('annonymus_user_first_name',0);
            }

            if($user->uid ==0 && $get_configure_variable && empty($get_user_first_name)) {
                drupal_goto('survey/annoynomus_user/'.arg(2).'/2');
                exit;
            }

            // Replced into init function.
            //drupal_add_js(drupal_get_path('module', 'survey') .'/js/survey_admin.js');
            if (empty($form_state['storage']['step'])) {
                $step = 1;
                $form_state['storage']['step'] = $step;
            } else {
                $step = $form_state['storage']['step'];
            }
            //echo "step".$step," <br />";
            $flag = false;
            if($step == 1) {
                $survey_id                  =   arg(2);
                $get_survey_details_array   =   get_survey_details($survey_id);
                $total_page                 =   $get_survey_details_array['Total_record'];
                if($total_page == 0) {
                    drupal_goto('no/question');
                }

                $evaluation_name            =   $get_survey_details_array['evaluation_name'];
                $question_array             =   $get_survey_details_array;
                $count                      =   0;
                $mappedarray                =   array();
                $questionkeys               =   array();

                foreach($question_array as $key1 => $value1){
                    if(is_numeric($key1)) {
                       $questionkeys[$count] = $key1;
                       $count++;
                    }

                   foreach($question_array as $key2 => $value2) {
                     if(is_array($value2['Answer'])){
                          for($i=0;$i < count($value2['Answer'][$i]);$i++){
                             if($key1 == $value2['Answer'][$i]['relatedQuestionId']){
                               $mappedarray[$key1]=array('Qlbl'=>$value2['Qlbl'], 'Qtype'=>$value2['Qtype'],'QId'=>$value2['QId'],'associatedText'=>$value2['associatedText']);
                             }
                          }
                      }
                   }
                }

            } else {
                    $survey_id                  =   (int)$form_state['clicked_button']['#post']['surveyId'];
                    $get_survey_details_array   =   get_survey_details($survey_id);
                    $total_page                 =   $get_survey_details_array['Total_record'];
                    $evaluation_name            =   $get_survey_details_array['evaluation_name'];
                    $question_id                =   $form_state['values']['question_id'];

                    $formvalues_array           =   $form_state['values'];
                    $related_ques_arr           =   $form_state['values']['related_question_id'];
                    $related_ques_arr1          =   $form_state['values']['related_question_id'];
                    $related_ques_arr2          =   $form_state['values']['related_question_id'];
                    $answer                     =   $form_state['values']['answer'.$question_id];

                    $answer1                    =   $form_state['values']['answer'];

                    // This will get the id of related questions of selected question. Not selected answer
                    if(array_key_exists($answer,$related_ques_arr1)) {
                        foreach($related_ques_arr1 as $related_keys1 => $related_values1) {
                            if($related_values1 != '' && $related_values1 != $answer) {
                                    $skip_arr[] = $related_values1;
                            }
                        }
                    }
                    // This will get the id of related questions of selected question. Not selected answer
                    if(array_key_exists($answer1,$related_ques_arr2)) {
                        foreach($related_ques_arr2 as $keys_avd => $values_avd) {
                            if($values_avd != '' && $values_avd != $answer1) {
                                    $skip_arr[] = $values_avd;
                            }
                        }
                    }
                    //print_r($skip_arr);
                    //print_r($get_survey_details_array);
                    // This will get the related question id of related questions id of selected question. Not selected answer.
                    foreach($skip_arr as $skip_arr_key => $skip_arr_val) {
                        foreach($get_survey_details_array as $child_key2 => $child_value2){
                            if($skip_arr_val == $child_key2) {
                                 if(is_array($child_value2['Answer'])){
                                      for($i=0;$i<count($child_value2['Answer']);$i++){
                                         if($child_value2['Answer'][$i]['relatedQuestionId'] != ''){
                                            $skip_child_arr[] = $child_value2['Answer'][$i]['relatedQuestionId'];
                                         }
                                      }
                                  }
                             }
                        }
                    }
                    //print_r($skip_child_arr);
                    // Merge$ the all the arrays to skip from list the quesstions.
                    if(count($skip_arr) && count($skip_child_arr)) {
                        $final_skip_arr = array_merge($skip_arr, $skip_child_arr);
                    } elseif (count($skip_arr)) {
                        $final_skip_arr = $skip_arr;
                    } elseif (count($skip_child_arr)) {
                        $final_skip_arr = $skip_child_arr;
                    }
                    //print_r($final_skip_arr);
                    // To get the exact related question id
                    $last_answer_id =   '';

                    foreach ($related_ques_arr as $keys => $values)  {
                        foreach ($formvalues_array as $keys1 => $values1)  {
                            if($keys == $values1) {
                                $last_answer_id = $keys;
                            }
                        }
                    }

                    $next_question_id = $form_state['values']['related_question_id'][$last_answer_id];
                    //$question_array[$next_question_id] = $get_survey_details_array[$next_question_id];
                    $total_page = $get_survey_details_array['Total_record'];
                    $get_survey_details_array = get_survey_details($survey_id);
                    $question_array1 = $get_survey_details_array;

                    $count  =   0;
                    $mappedarray    =   array();
                    $questionkeys   =   array();
                    $qflag          =   0;
                    //echo "<pre>";
                    //print_r($question_array1);

                    foreach($question_array1 as $key1 => $value1){
                       if($next_question_id == $key1){
                         $qflag =   1;
                       }  else if(in_array($key1,$final_skip_arr)) {
                         $qflag =   1;
                         continue;
                       }

                       if($qflag == 0) continue;

                        if(is_numeric($key1)){
                            $questionkeys[$count] = $key1;
                            $count++;
                        }

                        foreach($question_array1 as $key2 => $value2) {
                            if(is_array($value2['Answer'])){
                                for($i=0;$i<count($value2['Answer'][$i]);$i++){
                                    if($key1 == $value2['Answer'][$i]['relatedQuestionId']){
                                        $mappedarray[$key1]=array('Qlbl'=>$value2['Qlbl'], 'Qtype'=>$value2['Qtype'],'QId'=>$value2['QId'],'associatedText'=>$value2['associatedText']);
                                    }
                                }
                            }
                        }
                    }

                    $mappedkeys = array_keys($mappedarray);
                    foreach($question_array1 as $qaKey => $qaVal) {
                        if(is_numeric($qaKey)) {
                            $questionArr[] = $qaKey;
                        }
                    }

                    sort($questionArr);
                    $finalQuestion_survey = $questionArr[count($questionArr)-1];
                    //echo $next_question_id, "<br />";
                    for($i=0;$i<count($questionkeys);$i++){
                        // Its enough to check the next question id with current form elements.
                        if(($questionkeys[$i] == $next_question_id)) {
                          $question_array[$questionkeys[$i]] = $question_array1[$questionkeys[$i]];
                          $brk_flg = 0;

                          for($s = 0; $s < count($question_array[$questionkeys[$i]]['Answer']); $s++) {
                            if(is_numeric($question_array[$questionkeys[$i]]['Answer'][$s]['relatedQuestionId'])) {
                             $brk_flg = 1;
                            }
                          }
                          if($brk_flg == 1) { break; }
                        } else{
                              $question_array[$questionkeys[$i]] = $question_array1[$questionkeys[$i]];
                              $flag = true;
                        }
                        // This will give the submit button if question is last one.
                       if($finalQuestion_survey == $next_question_id) {
                            $flag = true;
                       }
                    }
            }

            $form['evalutaion_title'] = array(
                '#value' => '<strong>'.$evaluation_name.'</strong>'
            );

            $get_old_answers = survey_retake_answers($survey_id);
            //$get_old_answers = array();
            $form   =   display_form_elements($question_array,$step,$form,$get_old_answers);

            $form['explanation_configure_val'] = array(
                '#type' => 'hidden',
                '#value' => variable_get('explanation_configure',0),
            );

            $form['surveyId'] = array(
                '#type' => 'hidden',
                '#value' => $survey_id,
            );

            $form['storage']['Page'] = array(
                '#type' => 'hidden',
                '#value' => $step,
            );

            // The button will say Next until the last step, when it will say Submit.
            $button_name    =   t('Submit');
            if($flag) {
                $form['submit'] = array(
                    '#type' => 'submit',
                    '#value' => t('Submit'),
                );
            } else {
                $form['submit'] = array(
                    '#type' => 'submit',
                    '#value' => t('Next'),
                    //'#attributes'=>array('disabled'=>true),
                );
            }

            $form['Cancel'] = array(
                '#type' => 'submit',
                '#value' => 'Cancel',
                '#attributes' => array('onclick'=>'back_to_list("'.$base_url.'",2);return false;'),
            );

            switch($step) {
                case 2:
                // Save ingredient in storage bin.
                $form_state['storage']['ingredient_1'] =		$form_state['values']['ingredient_1'];
                break;
                case 3:
                // Add ingredient to storage bin.
                $form_state['storage']['ingredient_2'] =		$form_state['values']['ingredient_2'];
            }
            //echo "<pre>";
            //print_r($form);
            return $form;
        }

        function multipath_question_form_submit($form, &$form_state) {
            //p($form_state); exit;
            //	if($form_state['values']['op'] == 'Submit') {
            if($form_state['clicked_button']['#post']['op'] == 'Submit') {
                global $user,$itrinno_site_id;
                session_start();
                $_SESSION['values'][$step]['Question_id']   =   $form_state['values']['question_id'];
                $_SESSION['values'][$step]['Answer_id']     =   $form_state['values']['answer'];
                if($form_state['values']['explanation_answer']) {
                    $_SESSION['values'][$step]['explanation_answer']    =   $form_state['values']['explanation_answer'];
                } else {
                    $_SESSION['values'][$step]['explanation_answer']    =   '';
                }

                if($user->uid>0) {
                    $annonymus_user_first_name  =   '';
                    $annonymus_user_last_name   =   '';
                } else {
                    $annonymus_user_first_name  =   variable_get('annonymus_user_first_name',0);
                    $annonymus_user_last_name   =   variable_get('annonymus_user_last_name',0);
                }

                $session_id             =   session_id();
                $array['ResultInfo']    =   $_SESSION['values'];

                foreach ($_SESSION['values'] as $akey => $aval) {
                    if(empty($json_str))
                        $json_str = '{EvaluationResult:{"ResultInfo":[{"Question_id":'.$aval["Question_id"].',"Answer_id":'.$aval["Answer_id"].',"Score":0,"type":"multipath","ResponseText":"'.$aval["explanation_answer"].'"}';
                    else
                        $json_str .= ",".'{"Question_id":'.$aval["Question_id"].',"Answer_id":'.$aval["Answer_id"].',"Score":0,"type":"multipath","ResponseText":"'.$aval["explanation_answer"].'"}';
                }

                $json_str   .=  '],"Evaluation_id":"'.$form_state['values']['surveyId'].'","firstName":"'.$annonymus_user_first_name.'","lastName":"'.$annonymus_user_last_name.'","UserSession_id":"'.$session_id.'","User_id":"'.$user->uid.'","Status":true,"page":"1"}}}';
                $obj_survey             =   new survey();
                $createEvaluationData   =   new SurveyData();
                $createEvaluationData->SetServiceName('evaluation');
                $createEvaluationData->SetServiceIdentity('create');

                $createEvaluationData->SetSiteId($itrinno_site_id);
                $createEvaluationData->SetMethod('post');
                $createEvaluationData->SetPostedData($json_str);
                $result = $obj_survey->create_evaluation($createEvaluationData);

                if(variable_get('annonymus_user_session_id',0) != session_id())  {
                    variable_del('annonymus_user_first_name');
                    variable_del('annonymus_user_last_name');
                }

                if($result->Message == 'Success') {
                    drupal_set_message('Thanks for the Survey');
                    drupal_goto('thank-you/survey/multipath/'.$form_state['values']['surveyId']);
                } else {
                    form_set_error('','Some Service Problem , try agian ');
                    drupal_goto('thank-you/survey/multipath/'.$form_state['values']['surveyId']);
                }
            } else {
                    session_start();
                    $step                                                   =   $form_state['storage']['step'];
                    $_SESSION['values'][$step]['Question_id']               =   $form_state['values']['question_id'];
                    $_SESSION['values'][$step]['Answer_id']                 =   $form_state['values']['answer'];
                    if($form_state['values']['explanation_answer']) {
                        $_SESSION['values'][$step]['explanation_answer']    =   $form_state['values']['explanation_answer'];
                    } else {
                        $_SESSION['values'][$step]['explanation_answer']    =   '';
                    }
                    $form_state['storage']['step']++;
                    $form_state['rebuild'] = TRUE;
                    //return;
            }
        }

?>