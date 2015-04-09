<?php
        function survey_menu() {
            $items = array();
            $access_config = array('Configure survey settings');
            $access_content = array('access content');
            /*
            *	Creating menu for surverys
            */

            $items['survey/%survey'] = array(
                'title' => t('Survey'),
                'access arguments' => array('View and take surveys'),
                'page callback' => 'survey_page',
                'page arguments' => array(1, $form_state),
                'type' => MENU_CALLBACK,
                'file' => 'includes/survey.inc',
            );

            $items['multipath/%survey'] = array(
                'title' => t('Survey'),
                'access arguments' => array('View and take multipath'),
                'page callback' => 'multipath_survey_page',
                'page arguments' => array(1, $form_state),
                'type' => MENU_CALLBACK,
                'file' => 'includes/survey.inc',
            );

            $items['surveytitle'] = array(
                'title' => t('Survey'),
                'access arguments' => array('View and take surveys'),
                'page callback' => 'survey_title_page',
                'type' => MENU_NORMAL_ITEM,
                'file' => 'includes/survey.inc',
                'expanded'=>1,
            );

            $items['surveytitle/multipath'] = array(
                'page callback' => 'survey_multipath',
                'title' => t('Multipath Survey'),
                'type' => MENU_NORMAL_ITEM,
                'access arguments' => array('View and take surveys'),
                'file' => 'includes/survey.inc',
            );

            $items['modal-survey-title'] = array(
                'title' => t('Surveys'),
                'access arguments' => array('View and take surveys'),
                'page callback' => 'modal_survey_title_page',
                'type' => MENU_CALLBACK,
            );

            $items['result_image'] = array(
                'access arguments' => array('View and take surveys'),
                'page callback' => 'survey_result_graph',
                'type' => MENU_CALLBACK,
                'file' => 'includes/survey.inc',
            );

            $items['survey/%/retake'] = array(
                'title' => t('Survey'),
                'load arguments' => array(1),
                'access arguments' => array('View and take surveys'),
                'page callback' => 'drupal_get_form',
                'page arguments' => array('survey_form'),
                'type' => MENU_CALLBACK,
                'file' => 'includes/survey.inc',
            );

            $items['survey/result'] = array(
                'title' => t('Survey Results'),
                'access arguments' => array('View and take surveys'),
                'page callback' => 'survey_result',
                'type' => MENU_CALLBACK,
                'file' => 'includes/survey.inc',
            );

            $items['admin/settings/survey'] = array(
                'title' => t('Survey Configuration'),
                'description' => t('Configuration options for Survey'),
                'page callback' => 'drupal_get_form',
                'page arguments' => array('survey_admin_settings_form'),
                'access arguments' => $access_config,
                'file' => 'includes/survey.inc',
            );

            $items['admin/settings/survey/settings'] = array(
                'title' => t('General'),
                'description' => t('Survey Configuration'),
                'type' => MENU_DEFAULT_LOCAL_TASK,
                'weight' => 1,
            );

            $items['admin/settings/survey/configure_text_content'] = array(
                'title' => t('Custom content'),
                'description' => t(''),
                'page callback' => 'drupal_get_form',
                'page arguments' => array('survey_admin_text_content_form'),
                'type' => MENU_LOCAL_TASK,
                'access arguments' => $access_config,
                'weight' => 4,
                'file' => 'includes/survey.inc',
            );

            $items['admin/settings/survey/survey-page-settings'] = array(
                'title' => t('Survey Page Settings'),
                'description' => t(''),
                'page callback' => 'drupal_get_form',
                'page arguments' => array('survey_page_settings_form'),
                'type' => MENU_LOCAL_TASK,
                'access arguments' => $access_config,
                'weight' => 4,
                'file' => 'includes/survey.admin.inc',
            );

            $items['admin/settings/survey/survey-popover-settings'] = array(
                'title' => t('Survey Popover settings'),
                'page callback' => 'drupal_get_form',
                'page arguments' => array('survey_popover_settings_form'),
                'type' => MENU_LOCAL_TASK,
                'access arguments' => $access_config,
                'weight' => 4,
                'file' => 'includes/survey.admin.inc',
            );

            $items['thank-you/survey'] = array(
                'page callback' => 'survey_thank_you',
                'type' => MENU_CALLBACK,
                'access arguments' => array('View and take surveys'),
                'file' => 'includes/survey.inc',
            );

            $items['no/question'] = array(
                'page callback' => 'survey_no_question',
                'type' => MENU_CALLBACK,
                'access arguments' => array('View and take surveys'),
                'file' => 'includes/survey.inc',
            );

            $items['survey/multipath-questions/%survey'] = array(
                'title' => t('Multipath Survey'),
                'page callback'	=> 'drupal_get_form',
                'page arguments' => array('multipath_questions'),
                'type' => MENU_CALLBACK,
                'access arguments' => array('View and take surveys'),
            );

            $items['survey/multipath'] = array(
                'title' => t('Multipath Questions'),
                'page callback' => 'drupal_get_form',
                'page arguments' => array('multipath_question_form'),
                'type' => MENU_CALLBACK,
                'access arguments' => array('access content'),
            );

            /*$items['formwizard/thanks'] = array(
                'title' => t('Thanks!'),
                'page callback' => 'formwizard_thanks',
                'type' => MENU_CALLBACK,
                'access arguments' => array('access_content'),
            );*/

            $items['survey/annoynomus_user'] = array(
                'title' => t('Get User Details of Anonymous User'),
                'page callback' => 'drupal_get_form',
                'page arguments' => array('survey_annoynomus_user'),
                'type' => MENU_CALLBACK,
                'access arguments' => array('access content'),
            );

            return $items;
        }
?>