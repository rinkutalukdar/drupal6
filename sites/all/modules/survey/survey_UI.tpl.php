<?php
        function survey_block($op = 'list', $delta = 0, $edit = array()) {
            global $session_value;
            global $itrinno_site_id;
            $obj_survey =   initialize_survey_client();
            $obj_survey =   initialize_survey_client();

            if ($op == 'list') {
                $blocks[1]['info']  =   t('Survey Block Form');
                //Survey Blocks
                $blocks[2]['info']  =   t('Active Surveys');
                // Not worth caching.
                $blocks[2]['cache'] =   BLOCK_NO_CACHE;
                return $blocks;
            } else if ($op == 'view') {
                $block  =   array();
                switch ($delta) {
                    case 1:
                        $block['subject'] = t('Survey Title');
                        survey_block_contents($block);
                        return $block;
                    break;

                    case 2:
                        if(user_access('View and take surveys')){
                            $block['subject'] = survey_display_textual_data('survey_textual_title_activesurvey','survey_flag_show_textual_data_activesurvey');
                            $block['content'] = '<div id="survey-title-block">'.survey_title_page('block').'</div>';
                            return $block;
                        }

                    case 3:
                        /* $output = '';
                            $err_msg='';
                            $block['subject'] = t('Past Surveys');

                            //getEvaluations method
                            //chnaged now $result = $obj_survey->getEvaluations(10,0,$session_value,1,$err_msg);
                            $output = survey_display_textual_data('survey_textual_data_pastsurvey','survey_flag_show_textual_data_pastsurvey');
                            $output .= '<br class=\'survey-line-break\' />';

                            if ( strlen($err_msg) < 1 ) {
                                    $list_expired_survey = variable_get('survey_expired',array());
                                    if ( !$list_expired_survey || $list_expired_survey == '' ) {
                                            $output .= t('No records found');
                                    }
                                    foreach ( $list_expired_survey as $survey_key ) {
                                            if( isset($result["GetEvaluationsResponse"]["Count"]) && $result["GetEvaluationsResponse"]["Count"] > 1 ) {
                                                    foreach ( $result["GetEvaluationsResponse"]["Evaluations"]["Evaluation"] as $element ) {
                                                            if ( $survey_key == $element["EvaluationId"] ) {
                                                                    $output .= l($element["EvaluationName"], 'survey/result/' . $element["EvaluationId"]) . "<br />";
                                                            }
                                                    }
                                            }
                                            elseif( $result["GetEvaluationsResponse"]["Count"]==1 ) {
                                                    if ( $survey_key == $result["GetEvaluationsResponse"]["Evaluations"]["Evaluation"]["EvaluationId"] ) {
                                                            $output.= l($result["GetEvaluationsResponse"]["Evaluations"]["Evaluation"]["EvaluationName"], 'survey/result/' . $result["GetEvaluationsResponse"]["Evaluations"]["Evaluation"]["EvaluationId"]) . "<br />";
                                                    }
                                            }
                                    }
                            }
                            else {
                                    $output.= $err_msg;
                            }
                            $block['content'] = $output;
                            return $block;
                        */
                    case 4:
                            /* $output = '';
                                $err_msg = '';

                                $block['subject'] = t('Survey of the Month');
                                $survey_of_month = variable_get('survey_of_month','');
                                $output .= survey_display_textual_data('survey_textual_data_surveyofmonth','survey_flag_show_textual_data_surveyofmonth');
                                $output .= '<br class=\'survey-line-break\' />';
                                if( empty($survey_of_month) ) {
                                        $output.= t("No records found");
                                }
                                else {
                                        //getEvaluationTitle method
                                        $details = $obj_survey->getEvaluationTitle($survey_of_month,$err_msg);
                                        if ( strlen($err_msg)<1 ) {
                                                $output .= l($details["display_title"], 'survey/surveyofthemonth') . "<br />";
                                        }
                                        else {
                                                $output.= $err_msg;
                                        }
                                }
                                $block['content'] = $output;
                                return $block; */
                }
            } else if($op == 'save') {
                switch($delta){
                    case 1:
                        db_query("UPDATE {blocks} SET visibility = %d WHERE module = '%s' AND delta = '%s'", 1, 'survey', $delta);
                        return $block;
                }
            }
        }

        /*
        *	Function to get the survey form block contents
        */

        function survey_block_contents(&$block){
            $survey_id              =   get_survey_id('inline');
            $survey                 =   load_survey($survey_id);

            if($survey){
                $surveyResult       =   json_decode($survey);
                $block['subject']   =   t('Survey Title');
                if($surveyResult->status == 1){
                    $block['content']   =   survey_result_value($survey_id);
                    global $blockTitle;
                    $block['subject']   =   $blockTitle;
                }else{
                    $formContent        =   drupal_get_form('survey_form', $surveyResult);
                    global $blockTitle;
                    $block['content']   =   $formContent;
                    $block['subject']   =   $blockTitle;
                }
            }
        }

        function survey_theme(){
            return array(
                    'survey_title' => array (
                        'arguments' => array('evaluation' => NULL, 'count' => NULL, 'type' => NULL,'operation' => NULL ),
                        'template' => 'survey-title',
                    ),

                    'survey_multipath_title' => array(
                        'arguments' => array('evaluation' => NULL, 'count' => NULL, 'type' => NULL,'operation' => NULL,'array_of_survey'=>NULL),
                        'template' => 'survey-multipath-title',
                    ),

                    'survey_class' => array('template' => 'survey-class'),

                    'survey_form_prefix' => array(
                        'arguments' => array('surveyData' => NULL, 'params' => NULL),
                        'template' => 'survey-form-prefix',
                    ),
              );
        }

?>