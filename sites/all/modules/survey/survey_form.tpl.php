<?php
        /**
         * Implementation of hook_menu().
         */

        function display_form_elements($array,$curentPage,$form,$retake_answers) {
            $qno = 1;
            if($curentPage == 1) {
                foreach($array as $key=>$values) {
                    $type = strtolower($values['Qtype']);
                    if($type == 'radiobutton') {
                        $type = 'radios';
                    } else if($type == 'dropdown') {
                        $type = 'dropdown';
                    } else if($type == 'textbox'){
                        $type = 'textfield';
                    } else if($type == 'textarea'){
                        $type = 'textarea';
                    } else if($type == 'multiselect filtered list'){
                        $type = 'multiselectfilteredlist';
                    } else if($type == 'checkbox'){
                        $type = 'checkboxes';
                    } else if($type == 'source-target list'){
                        $type = 'sourceTargetList';
                    } else if($type == 'multiselect list'){
                        $type = 'multiselectfilteredlist';
                    }  else {
                         //echo $type."<br>";
                         //sourceTargetList
                    }

                    $label                  =   "<strong>".$values['Qlbl']."</strong>";
                    $default_answer_array   =   explode("==",$retake_answers[$values['QId']]);
                    $default_answer         =   $default_answer_array[0];
                    $default_response       =   $default_answer_array[1];

                    /*$form[]['label'] = array(
                        '#prefix' => "<br><br><br><strong> $qno : </strong>",
                        '#value' => "$values['Qlbl']",
                    );*/

                    $temp_array_for_related_question    =   array();
                    //p($values);
                    $input                              =   '';

                    for($c=0;$c < count($values['Answer']);$c++) {
                        if($type == 'checkboxes') {
                            $strcheck[$c] = t($values['Answer'][$c]['test']);
                        }

                        if($type == 'multiselectfilteredlist') {
                            $strselect[$c] = t($values['Answer'][$c]['test']);
                        }

                        if(($type == 'sourceTargetList') or ($type == 'filteredlist')) {
                            $strsource[$c] = t($values['Answer'][$c]['test']);
                        }

                        if($type == 'radios') {
                            $str[$values['Answer'][$c]['AnswerId']] = t(html_entity_decode($values['Answer'][$c]['test']));
                        }

                        if($type == 'dropdown'){
                            $strdropdown[$values['Answer'][$c]['AnswerId']] = t(html_entity_decode($values['Answer'][$c]['test']));
                        }

                        if(($type == 'radios') or ($type == 'dropdown')) {
                            $temp_array_for_related_question[$values['Answer'][$c]['AnswerId']] = $values['Answer'][$c]['relatedQuestionId'];

                            if(!empty($values['Answer'][$c]['explanation']))
                                $div_storage .= '<div id="div_id_'.$values['Answer'][$c]['AnswerId'].'" style="display:none"><strong>'.$values['Answer'][$c]['explanation'].'</strong></div>';
                            else
                                $div_storage .= '<div id="div_id_'.$values['Answer'][$c]['AnswerId'].'" style="display:none"><strong>No Explanation of this Answer</strong></div>';

                            $input .= '<input type="text" name ="answer_name_'.$values['Answer'][$c]['AnswerId'].'" id="answer_id_'.$values['Answer'][$c]['AnswerId'].'" value="'.$values['Answer'][$c]['relatedQuestionId'].'" style="display:none">';
                        }
                    }

                    $isRequired =   ($values['isMandatory']) ? TRUE : FALSE;
                    $fieldTitle =   $qno.".".$values['Qlbl'];
                    $qno++;

                    if($type == 'radios') {
                        $form[]['answer'.$key] = array(
                            '#type' => $type,
                            '#options' => $str,
                            '#title' => $fieldTitle,
                            '#default_value'=> $default_answer,
                            //'#attributes'=>array('onclick'=>'enabled_button(),display_explanation(this),change_button_lavel(this);'),
                            '#suffix' => $div_storage,
                            '#prefix'=> $input,
                            '#required' => $isRequired,
                        );

                    } else if($type == 'dropdown')  {
                        $form[]['answer'] = array(
                            '#type' => 'select',
                            '#title' => $fieldTitle,
                            '#options' => $strdropdown,
                            //'#prefix'=> '<span>&nbsp;<font color="red">*</font><span>',
                            '#default_value'=> $default_answer,
                            //'#attributes'=>array('onchange'=>'enabled_button(),display_explanation(this),change_button_lavel(this);'),
                            '#suffix' => $div_storage,
                            '#prefix'=> $input,
                            '#required' => $isRequired,
                        );

                    } else if($type == 'textfield')  {
                            $form[]['answer'.$key] = array(
                                    '#type' => $type,
                                    '#title' => $fieldTitle,
                                    //'#prefix'=> '<span>&nbsp;<font color="red">*</font><span>',
                                    //'#options' => $str,
                                    //'#required'=>'true',
                                    '#default_value'=> $default_answer,
                                    '#suffix' => $div_storage,
                                    '#prefix'=> $input,
                                    '#required' => $isRequired,
                            );

                    } else if($type == 'textarea')  {
                            $form[]['answer'.$key] = array(
                                    '#type' => $type,
                                    '#title' => $fieldTitle,
                                    //'#prefix'=> '<span>&nbsp;<font color="red">*</font><span>',
                                    //'#options' => $str,
                                    //'#required'=>'true',
                                    '#default_value'=> $default_answer,
                                    '#suffix' => $div_storage,
                                    '#prefix'=> $input,
                                    '#required' => $isRequired,
                            );

                    } else if($type == 'checkboxes')  {
                            $form[]['answer'.$key] = array(
                                    '#type' => $type,
                                    '#title' => $fieldTitle,
                                    //'#prefix'=> '<span>&nbsp;<font color="red">*</font><span>',
                                    '#options' => $strcheck,
                                    //'#required'=>'true',
                                    '#default_value'=> $default_answer,
                                    '#suffix' => $div_storage,
                                    '#prefix'=> $input,
                                    '#required' => $isRequired,
                            );

                    } else if($type == 'multiselectfilteredlist')  {
                            $form[]['answer'.$key] = array(
                                    '#type' => 'select',
                                    '#title' => $fieldTitle,
                                    //'#prefix'=> '<span>&nbsp;<font color="red">*</font><span>',
                                    '#options' => $strselect,
                                    '#multiple' => 'true',
                                    //'#required'=>'true',
                                    '#default_value'=> $default_answer,
                                    '#suffix' => $div_storage,
                                    '#prefix'=> $input,
                                    '#required' => $isRequired,
                            );

                    } else if($type == 'sourceTargetList')  {
                            $form[]['answer'.$key] = array(
                                    '#type' => $type,
                                    '#title' => $fieldTitle,
                                    //'#prefix'=> '<span>&nbsp;<font color="red">*</font><span>',
                                    '#options' => $strsource,
                                    '#multiple' => 'true',
                                    //'#required'=>'true',
                                    '#default_value'=> $default_answer,
                                    '#suffix' => $div_storage,
                                    '#prefix'=> $input,
                                    '#required' => $isRequired,
                            );
                    }

                    if(variable_get('explanation_configure',0))  {
                        $form[]['explanation_of_answer'] = array(
                            '#value' => t('<div id="explanation_of_answer_id"></div>'),
                        );
                    }
                    // if(!empty($values['associatedText'])) {
                    $form[]['explanation_answer'] = array(
                        '#title' => t('Explanation of Answer'),
                        '#type' => 'textfield',
                        //'#id' => 'explanation_answer',
                        //'#required' => true,
                        '#attributes'=>array('onkeyup'=>'check_values(this)','id'=>'explanation_answer'),
                        '#default_value'=> $default_response,
                    );
                    //}
                    $form[]['question_id'] = array(
                            '#value' => $values['QId'],
                            '#type' => 'hidden',
                    );

                    $form[]['related_question_id'] = array(
                            '#value' => $temp_array_for_related_question,
                            '#type' => 'hidden',
                    );

                    $flag   =   0;
                    foreach ($values['Answer']	as $keys => $answers){
                        if($answers[relatedQuestionId]!=0){
                            $flag = 1;
                            break;
                        }
                    }

                    if($flag == 1) break;
                }
                return $form;

            }  else {
                 $serial_number =   1;
                 foreach($array as $key=>$values) {
                    $type = strtolower($values['Qtype']);
                    //$type = strtolower($array['Qtype']);
                    if($type == 'radiobutton') {
                        $type = 'radios';
                    } else if($type == 'dropdown') {
                        $type = 'dropdown';
                    } else if($type == 'textbox'){
                        $type = 'textfield';
                    } else if($type == 'textarea'){
                        $type = 'textarea';
                    } else if($type == 'multiselect filtered list'){
                        $type = 'multiselectfilteredlist';
                    } else if($type == 'checkbox'){
                        $type = 'checkboxes';
                    } else if($type == 'source-target list'){
                        $type = 'sourceTargetList';
                    } else if($type == 'filtered list'){
                        $type = 'filteredlist';
                    } else if($type == 'multiselect list'){
                        $type = 'multiselectfilteredlist';
                    } else{
                        //echo $type."<br>";
                        $type;
                        //sourceTargetList
                    }

                    $label                  =   "<strong>".$values['Qlbl']."</strong>";
                    $default_answer_array   =   explode("==",$retake_answers[$values['QId']]);
                    $default_answer         =   $default_answer_array[0];
                    $default_response       =   $default_answer_array[1];

                    /*$form[]['label'] = array(
                        '#prefix' => "<br><br><br> <strong> ".$serial_number." :</strong>",
                        '#value' => " ",
                    );*/
                    $input                  =   '';

                    for($c=0;$c < count($values['Answer']);$c++){
                        if($type == 'checkboxes') {
                           $strcheck[$c] = t($values['Answer'][$c]['test']);
                        }

                        if($type == 'multiselectfilteredlist') {
                           $strselect[$c] = t($values['Answer'][$c]['test']);
                        }

                        if(($type == 'sourceTargetList') or ($type == 'filteredlist')) {
                           $strsource[$c] = t($values['Answer'][$c]['test']);
                        }

                        if($type == 'radios') {
                          $str[$values['Answer'][$c]['AnswerId']] = t(html_entity_decode($values['Answer'][$c]['test']));
                        }

                        if($type == 'dropdown') {
                          $strdropdown[$values['Answer'][$c]['AnswerId']] = t(html_entity_decode($values['Answer'][$c]['test']));
                        }

                        if(($type == 'radios') or ($type == 'dropdown')) {
                            $temp_array_for_related_question[$values['Answer'][$c]['AnswerId']] = $values['Answer'][$c]['relatedQuestionId'];
                            if(!empty($values['Answer'][$c]['explanation']))
                                $div_storage    .=  '<div id="div_id_'.$values['Answer'][$c]['AnswerId'].'" style="display:none"><strong>'.$values['Answer'][$c]['explanation'].'</strong></div>';
                            else
                                $div_storage    .=  '<div id="div_id_'.$values['Answer'][$c]['AnswerId'].'" style="display:none"><strong>No Explanation of this Answer</strong></div>';

                            $input .= '<input type="text" name ="answer_name_'.$values['Answer'][$c]['AnswerId'].'" id="answer_id_'.$values['Answer'][$c]['AnswerId'].'" value="'.$values['Answer'][$c]['relatedQuestionId'].'" style="display:none">';
                        }
                    }

                    $isRequired =   ($values['isMandatory']) ? TRUE : FALSE;
                    $fieldTitle =   $serial_number.".".$values['Qlbl'];
                    $serial_number ++;

                    if($type == 'radios') {
                        $form[]['answer'.$key] = array(
                            '#type' => $type,
                            '#options' => $str,
                            //'#prefix'=> '<span>&nbsp;<font color="red">*</font><span>',
                            '#default_value'=> $default_answer,
                            //'#attributes'=>array('onclick'=>'enabled_button(),display_explanation(this),change_button_lavel(this);'),
                            '#suffix' => $div_storage,
                            '#prefix'=> $input,
                            '#required' => $isRequired,
                            '#title' => $fieldTitle,
                        );

                    } else if($type == 'dropdown')  {
                        $form[]['answer'] = array(
                            '#type' => 'select',
                            '#options' => $strdropdown,
                            //'#prefix'=> '<span>&nbsp;<font color="red">*</font><span>',
                            '#default_value'=> $default_answer,
                            //'#attributes'=>array('onchange'=>'enabled_button(),display_explanation(this),change_button_lavel(this);'),
                            '#suffix' => $div_storage,
                            '#prefix'=> $input,
                            '#required' => $isRequired,
                            '#title' => $fieldTitle,

                        );

                    } else if($type == 'textfield')  {
                            $form[]['answer'.$key] = array(
                                    '#type' => $type,
                                    //'#prefix'=> '<span>&nbsp;<font color="red">*</font><span>',
                                    //'#options' => $str,
                                    //'#required'=>'true',
                                    //'#default_value'=> $default_answer,
                                    '#suffix' => $div_storage,
                                    '#prefix'=> $input,
                                    '#required' => $isRequired,
                                    '#title' => $fieldTitle,
                            );

                    } else if($type == 'textarea')  {
                            $form[]['answer'.$key] = array(
                                    '#type' => $type,
                                    //'#prefix'=> '<span>&nbsp;<font color="red">*</font><span>',
                                    //'#options' => $str,
                                    //'#required'=>'true',
                                    //'#default_value'=> $default_answer,
                                    '#suffix' => $div_storage,
                                    '#prefix'=> $input,
                                    '#required' => $isRequired,
                                    '#title' => $fieldTitle,
                            );

                    } else if($type == 'checkboxes')  {
                            $form[]['answer'.$key] = array(
                                    '#type' => $type,
                                    //'#prefix'=> '<span>&nbsp;<font color="red">*</font><span>',
                                    '#options' => $strcheck,
                                    //'#required'=>'true',
                                    '#default_value'=> $default_answer,
                                    '#suffix' => $div_storage,
                                    '#prefix'=> $input,
                                    '#required' => $isRequired,
                                    '#title' => $fieldTitle,
                            );

                    } else if($type == 'multiselectfilteredlist')  {
                            $form[]['answer'.$key] = array(
                                    '#type' => 'select',
                                    //'#prefix'=> '<span>&nbsp;<font color="red">*</font><span>',
                                    '#options' => $strselect,
                                    '#multiple' => 'true',
                                    //'#required'=>'true',
                                    '#default_value'=> $default_answer,
                                    '#suffix' => $div_storage,
                                    '#prefix'=> $input,
                                    '#required' => $isRequired,
                                    '#title' => $fieldTitle,
                            );

                    } else if($type == 'sourceTargetList')  {
                            $form[]['answer'.$key] = array(
                                    '#type' => $type,
                                    //'#prefix'=> '<span>&nbsp;<font color="red">*</font><span>',
                                    '#options' => $strsource,
                                    '#multiple' => 'true',
                                    //'#required'=>'true',
                                    '#default_value'=> $default_answer,
                                    '#suffix' => $div_storage,
                                    '#prefix'=> $input,
                                    '#required' => $isRequired,
                                    '#title' => $fieldTitle,
                            );

                    } else if($type == 'filteredlist')  {
                            $form[]['answer'.$key] = array(
                                    '#type' => 'sourceTargetList',
                                    //'#prefix'=> '<span>&nbsp;<font color="red">*</font><span>',
                                    '#options' => $strsource,
                                    '#multiple' => 'false',
                                    //'#required'=>'true',
                                    '#default_value'=> $default_answer,
                                    '#suffix' => $div_storage,
                                    '#prefix'=> $input,
                                    '#required' => $isRequired,
                                    '#title' => $fieldTitle,
                            );
                    }

                    if(variable_get('explanation_configure',0))  {
                        $form[]['explanation_of_answer'] = array(
                            '#value' => t('<div id="explanation_of_answer_id"></div>'),
                        );
                    }

                    // if(!empty($array['associatedText'])) {
                    $form[]['explanation_answer'] = array(
                        '#title' => t('Explanation of Answer'),
                        '#type' => 'textfield',
                        //'#id' => 'explanation_answer',
                        //'#required' => true,
                        '#attributes'=>array('onkeyup'=>'check_values(this)','id'=>'explanation_answer'),
                        '#default_value'=> $default_response,
                    );
                    //}

                    $form[]['question_id'] = array(
                    '#value' => $values['QId'],
                    '#type' => 'hidden',
                    );

                    $form[]['related_question_id'] = array (
                        '#value' => $temp_array_for_related_question,
                        '#type' => 'hidden',
                    );
                }
                //print_r($form);
                return $form;
            }
        }

        function example_form(&$form_state) {
            global $session_value;
            global $itrinno_site_id;

            $survey_id              =   1;//arg(1);
            $session                =   $session_value;
            $survey_title           =   "";
            $total_result           =   0;
            $survey_questions       =   array();

            $survey_answers         =   array();
            $can_retake             =   0;
            $err_msg                =   '';
            $question_per_page      =   variable_get('survey_questions_per_page','5');
            $totalQuestCountPerPage =   variable_get('survey_questions_per_page','5');

            $start_question         =   0;
            $t_submit               =   t('Submit');
            $t_next                 =   t('Next');

            // Rdirect to result page if the survey has taken
            //survey_has_taken($survey_id);
			//$HasTaken = survey_has_taken($survey_id);
			if($flag==1){
				Print '<div class="survey">
						<h2>Your opinion</h2>
						<div>
						<div class="survey_success"> Thank you for completing our poll </div>
						</div></form>
						</div>';
						$flag=0;
						exit;
				//$survey->status = 1;
				//$survey->statusMessage = t('Already Taken');
			}else {
				$flag=1;
				$page                           =   1;
                $form_state['storage']['page']  =   1;
                $start_question                 =   0;
                $itration                       =   0;

            $objSurveyData      =   new SurveyData();
            $objSurveyData->SetServiceName('evaluation');
            $objSurveyData->SetServiceIdentity('load');
            $objSurveyData->SetSiteId($itrinno_site_id);
            $objSurveyData->SetMethod('get');

            $objSurveyData->set_evaluation_id($survey_id);
            $objSurveyData->set_current_page_no($page);
            $objSurveyData->set_no_of_questions_per_page($question_per_page);
            $objSurvey          =   new survey();
            $processedData      =   $objSurvey->get_evaluation_details($objSurveyData);

            $total_question     =   $processedData->TotalCount;
            //$objEvaluationData->SetServiceURL('http://172.16.5.217:8080/evaluationService/evaluation/'.$evaluationId.'/1/5');
            //echo "total". $total_question."<br>";
            $survey_questions   =   $objSurveyData->get_questions();
            $survey_answers     =   $objSurveyData->get_answers();
            $question_per_page  =   count($survey_questions);

            if( $total_question <= $question_per_page ) {
                $question_per_page = $total_question;
            }  else {
                //echo "($start_question + $question_per_page) > $total_question ? ($start_question + $question_per_page + 1) - $total_question:$question_per_page <br />";
                $question_per_page = ($start_question + $question_per_page) > $total_question ? ($start_question + $question_per_page + 1) - $total_question : $question_per_page;
            }

            if (!$total_question ) {
                return;
            }

            $submit_value   =   t('Submit');
            if ( $total_question <= $question_per_page )
                $submit_value   =   t('Submit');
            else {
                if ( $start_question + $question_per_page >= $total_question ) {
                    $submit_value   =   t('Submit');
                }
                else {
                    $submit_value   =   t('Next');
                }
            }

            if(strlen($objSurveyData->get_error_message()) < 1) {
                // $survey_content = $obj_survey->getEvaluationTitle($evaluation_id, $err_msg);
                if( strlen($err_msg) < 1 ) {
                    $pub_date_display = variable_get('survey_addeddate_display', 0);
                    if ( $pub_date_display && $survey_content['published_date'] ) {
                        //$pub_date = '&nbsp;<div class=\'survey-form-published_on\'><span class=\'survey-form-published_on-text\'>'.t('Published on ').'</span><span class=\'survey-form-published_on-date\'>'.date('m-d-Y',strtotime($survey_content['published_date'])).'</span></div>';
                        $pub_date = '&nbsp;<div class=\'survey-form-published_on\'><span class=\'survey-form-published_on-text\'>&nbsp;|&nbsp;</span><span class=\'survey-form-published_on-date\'>'.date('Y-m-d',strtotime($survey_content['published_date'])).'</span></div>';
                    }
                    drupal_set_title($objSurveyData->get_evaluation_title().$pub_date);
                }

                $PageTotal  =   ceil($total_question/$totalQuestCountPerPage);

                $form = array(
                    '#id' => 'mysurveyform',
                    '#attributes' => array('name' => 'survey_name'),
                    '#prefix' => '<div style="float:left;width:100%"><div class=\'survey-form-required\' style="float:left;width:49%">*<span class=\'survey-required_text\'> = Required Field</span></div>
                    <div style="float:left;width:49%" align="right">'.($processedData->location=='header'?(!empty($processedData->CustomContent)?$processedData->CustomContent:"Page {$page} of {$PageTotal}"):"Page {$page} of {$PageTotal}").'</div></div>',
                    '#suffix' => '<div>'.$processedData->location=='footer'?$processedData->CustomContent:'If location is footer the content will display here. No i am the test message for footer '.'</div>',
                );

                $form['style'] = array(
                    '#type' => 'markup',
                    /*'#value' => "<style>.survey-questioncolor { color: ".variable_get('survey_question_color','#000000')." } </style>",*/
										'#value' => "",
                );

                $form['questions_count'] = array(
                    '#type' => 'hidden',
                    '#value' => count($survey_questions),
                );
                //echo "\$question_per_page : $question_per_page<br />";
                //echo "<pre>";print_r($survey_questions);echo "</pre>";

                for ( $inc = 0; $inc < $question_per_page; $inc++ ) {
                    $question = $survey_questions[$inc]['title'];
                    $question_id = $survey_questions[$inc]['id'];
                    $multiple = FALSE;
                    $answer_option = $survey_questions[$inc]['questionTypeName'];

                    foreach ( $survey_answers as $element ) {
                        if( $element['questionid']==$question_id ) {
                            $answer_id              =   $element['id'];
                            //echo "\$answer_id :$answer_id ,\$question_id: $question_id<br />";
                            $answer_title           =   htmlentities($element['title']);
                            $answers[$answer_id]    =   htmlentities($answer_title);
                        }
                    }

                    $form_req = $survey_questions[$inc]['required'] == 1 ? "&nbsp;<span class='survey-form-required'>*</span>":'';
                    //echo "{$start_question}+{$inc}<br />";
                    $question_title         =   '<span class=\'survey-questioncolor\'>'.($start_question+$inc+1) . '. '. t($question).' ::-> </span>'.$form_req;
                    $option_description     =   '';

                    $answerAttributeArray   =   array(
                        'answers' => $answers,
                        'question_title' => $question_title,
                        'option_description' => $option_description,
                        'required' => $survey_questions[$inc]['required'] == 1?TRUE:FALSE,
                    );

                    get_answer_option_type($form, $answer_option, $inc, $answerAttributeArray);
                    //echo "\$answer_option_type: $answer_option_type<br />";
                    $form['question_'.$inc] = array(
                        '#type' => 'hidden',
                        '#value' => $question_id,
                    );

                    $form['questiontitle_'.$inc] = array(
                        '#type' => 'hidden',
                        '#value' => $question,
                    );

                    $form['answer_type_'.$inc] = array(
                        '#type' => 'hidden',
                        //'#type' => 'textfield',
                        '#value' => $answer_option_type,
                    );

                    $form['required_'.$inc] = array(
                        '#type' => 'hidden',
                        '#value' => $survey_questions[$inc]['required'],
                    );
                    unset($answers);
                }

                $form['current_session'] = array(
                    '#type' => 'hidden',
                    '#value' => $session,
                );

                $form['next_start'] = array(
                    '#type' => 'hidden',
                    //'#type' => 'textfield',
                    '#value' => ($start_question+$inc),
                );

                $form['survey_id'] = array(
                    '#type' => 'hidden',
                    '#value' => $survey_id,
                );

                $form['selected_answers'] = array(
                    '#type' => 'hidden',
                    //'#type' => 'textfield',
                    '#value' => $question_and_answer,
                );

                $form['itration'] = array(
                    '#type' => 'hidden',
                    '#value' => $itration,
                );

                $form['totalpage'] = array(
                    '#type' => 'hidden',
                    '#value' => ceil($total_question/$totalQuestCountPerPage),
                );

                $form['retake'] = array(
                    '#type' => 'hidden',
                    '#value' => arg(2)=='retake'? '1':'0',
                );

                $textual_data_abovebutton   =   survey_display_textual_data('survey_textual_data_abovesubmit','survey_flag_show_textual_data_abovesubmit');
                $textual_data_bottom        =   survey_display_textual_data('survey_textual_data_bottom','survey_flag_show_textual_data_bottom');

                $form['submit']             =   array(
                    '#type' => 'submit',
                    //'#attributes' => array('class' => 'survey-submit'),
                    '#id' => 'survey-submit',
                    '#value' => $submit_value,
                    '#prefix' => $textual_data_abovebutton,
                    '#suffix' => $textual_data_bottom,
                );

                if($page > 1) {
                    $form['survey_previous'] = array(
                        '#type' => 'submit',
                        //'#attributes' => array('class' => 'survey-submit'),
                        '#id' => 'survey_previous',
                        '#value' => 'Previous',
                        '#attributes' => array('onclick'=>'javascript: history.go(-1);return false;'),
                        '#prefix' => $textual_data_abovebutton,
                        '#suffix' => $textual_data_bottom,
                    );
                }

                //survey_form_myvalidate($form);
                if (trim($ermsg)==""){
                //$form = drupal_rebuild_form('survey_dynamic_form',$form,null,null);
                //return $form;
                }
                return $form;
            } else {
                drupal_set_message($err_msg, 'status',FALSE);
            }
            return $form;
        }
	}

        function example_form_validate($form, &$form_state) {}

        function example_form_submit($form, &$form_state) {
            p($form_state); exit;
            if($form_state['storage']['page'] < $form_state['values']['totalpage']) {
                $form_state['rebuild'] = TRUE;
                $form_state['storage'][$form_state['storage']['page']]['values'] = $form_state['values'];
                $result = create_survey_evaluation($form_state);
                //print_r($result);exit;
                if ( $result->Message=='Success') {
                    drupal_set_message(t('Your Survey on the page number has been posted'), 'status',FALSE);
                } else {
                    form_set_error('submit', t('Oops! An error has occured, please try again later!'));
                }
                $form_state['storage']['page']++;
            } else {
                $result = create_survey_evaluation($form_state);
                if ( $result->Message=='Success'){
                    drupal_set_message(t('Thanks for taking the survey'), 'status',FALSE);
                    survey_redirect($form_state['values']['survey_id']);
                    exit;
                } else
                    $err_msg= t('Oops! An error has occured, please try again later!');
            }
        }


?>
