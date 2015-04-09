<?php
    function survey_admin_settings_form() {
        $form = array();
        $total_option_color = 10;

        $form['style'] = array(
            '#type' => 'markup',
            '#value' => "<script type='text/javascript'>
                    $(document).ready(function() {
                    $('#demo').hide();
                    $('#survey_color_picker').farbtastic('#survey_question_color');
                    });
                    </script>",
        );

        $form['survey_configuration'] = array(
            '#type' => 'fieldset',
            '#title' => t('Basic Configuration'),
        );
        $form['survey_configuration']['survey_questions_per_page'] = array(
            '#type' => 'select',
            '#title' => 'Number of questions to display per page',
            '#description' => 'Choose the number of questions to display per page for each survey.',
            '#default_value' => variable_get('survey_questions_per_page', 5),
            '#options' => array('5' => 5, '10' => 10, '20' => 20, '25' => 25),
        );
        $form['survey_configuration']['survey_chart_type'] = array(
            '#type' => 'select',
            '#title' => 'Chart type',
            '#description' => 'Choose the type of graph to display in the survey results page.',
            '#default_value' => variable_get('survey_chart_type', 'pie'),
            '#options' => array('pie' => 'PIE CHART', 'column' => 'BAR CHART (VERTICAL)' ,'bar' => 'BAR CHART (HORIZONTAL)', 'line' => 'LINE GRAPH', 'area' => 'AREA CHART'),
            '#required' => true,
        );
        $form['survey_configuration']['survey_chart_size_height'] = array(
            '#type' => 'select',
            '#title' => 'Chart Height',
            '#description' => 'Choose the height of chart.',
            '#default_value' => variable_get('survey_chart_size_height', '500'),
            '#options' => array('150'=>'150','175'=>'175','200'=>'200','225'=>'225','250'=>'250','275'=>'275','300'=>'300','350'=>'350','400'=>'400','450'=>'450','500'=>'500'),
            '#required' => true,
        );
        $form['survey_configuration']['survey_chart_size_width'] = array(
            '#type' => 'select',
            '#title' => 'Chart Width',
            '#description' => 'Choose the width of chart.',
            '#default_value' => variable_get('survey_chart_size_width', '350'),
            '#options' => array('150'=>'150','175'=>'175','200'=>'200','225'=>'225','250'=>'250','275'=>'275','300'=>'300','350'=>'350','400'=>'400','450'=>'450','500'=>'500'),
            '#required' => true,
        );
        $form['survey_configuration']['survey_chart_color'] = array (
            '#type' => 'fieldset',
            '#title' => 'Chart color cubes',
            '#collapsible' => TRUE,
            '#collapsed' => TRUE,
            '#description' => t('Configure the color cubes for the chart. Choose upto 10 colors (each color representing a color cube in the chart). For example, if there are 3 result cubes found in the graph in the survey results page, the first three colors chosen here will be used for those cubes.'),
        );
        // Default 15 colors mentioned in the LibChart class file.
        $defult10_color = array('0,0,0','2, 78, 0','148, 170, 36','233, 191, 49','240, 127, 41','243, 63, 34','190, 71, 47','135, 81, 60','128, 78, 162','121, 75, 255','142, 165, 250','162, 254, 239','137, 240, 166','104, 221, 71','98, 174, 35','93, 129, 1');
        for( $option_count = 1; $option_count <= $total_option_color; $option_count++ ) {
            $existing_color = variable_get('survey_chart_color'.$option_count, rgb2html($defult10_color[$option_count]));
            $existing_color = $existing_color == '' ? rgb2html($defult10_color[$option_count]):$existing_color;
            $form['survey_configuration']['survey_chart_color']['survey_chart_color_'.$option_count] = array(
                '#type' => 'textfield',
                '#description' => t("Click the text box to choose color for graph cube $option_count"),
                '#title' => t('Color for graph cube '.$option_count),
                '#id' => 'survey_chart_color_option_'.$option_count,
                '#size' => 10,
                '#maxlength' => 7,
                '#default_value' => $existing_color,
                '#suffix' =>'<div id=\'picker_'.$option_count.'\'></div>',
                '#attributes' => array('onClick'=>'load_color_picker(\''.$option_count.'\');', 'style'=>'background-color:'.$existing_color),
            );
        }

        $form['survey_configuration']['survey_chart_background']= array (
            '#type' => 'fieldset',
            '#title' => 'Chart Background properties',
            '#collapsible' => TRUE,
            '#collapsed' => TRUE,
            '#description' => t('Configure the background color, transparency of the graph (0-100) for the chart...'),
        );
        $existing_color = variable_get('survey_chart_background_color', rgb2html($defult10_color[$option_count]));
        $form['survey_configuration']['survey_chart_background']['survey_chart_background_color'] = array (
            '#type' => 'textfield',
            '#title' => 'Background Color',
            '#description' =>t("Click the text box to choose background color for the graph."),
            '#id' => 'chart_color_option_background_color',
            '#size' => 10,
            '#maxlength' => 7,
            '#default_value' => $existing_color,
            '#suffix' =>'<div id=\'picker_background_color\'></div>',
            '#attributes' => array('onClick'=>'load_color_picker(\'background_color\');', 'style'=>'background-color:'.$existing_color),
        );
        $form['survey_configuration']['survey_chart_background']['survey_8/31/2009'] = array (
            '#type' => 'textfield',
            '#title' => 'Background Transparency',
            '#description' =>t("The background transparency of the graph (0-100)."),
            '#id' => 'survey_chart_background_bgalpha',
            '#default_value' => variable_get('survey_chart_background_bgalpha',100),
            '#size' => 10,
        );

        $form['survey_configuration']['canvas']= array (
            '#type' => 'fieldset',
            '#title' => 'Chart Canvas Properties',
            '#collapsible' => TRUE,
            '#collapsed' => TRUE,
        );
        $existing_color = variable_get('survey_chart_canvasbackground_color', rgb2html($defult10_color[$option_count]));
        $form['survey_configuration']['canvas']['survey_chart_canvasbackground_color'] = array (
            '#type' => 'textfield',
            '#title' => 'Background Color',
            '#description' =>t("Click the text box to choose canvas background color for the graph."),
            '#id' => 'chart_color_option_canvasbackground_color',
            '#size' => 10,
            '#maxlength' => 7,
            '#default_value' => $existing_color,
            '#suffix' =>'<div id=\'picker_canvasbackground_color\'></div>',
            '#attributes' => array('onClick'=>'load_color_picker(\'canvasbackground_color\');', 'style'=>'background-color:'.$existing_color),
        );
        $form['survey_configuration']['canvas']['survey_chart_canvasbackground_bgalpha'] = array (
            '#type' => 'textfield',
            '#title' => 'Background Transparency',
            '#description' =>t("The background transparency of the graph (0-100)."),
            '#id' => 'chart_background_bgalpha',
            '#default_value' => variable_get('survey_chart_canvasbackground_bgalpha',100),
            '#size' => 10,
        );
        $existing_color = variable_get('survey_chart_canvasborder_color', rgb2html($defult10_color[$option_count]));
        $form['survey_configuration']['canvas']['survey_chart_canvasborder_color'] = array (
            '#type' => 'textfield',
            '#title' => 'Canvas Border Color',
            '#description' =>t("Click the text box to choose the border color of the canvas"),
            '#id' => 'chart_color_option_canvasborder_color',
            '#size' => 10,
            '#maxlength' => 7,
            '#default_value' => $existing_color,
            '#suffix' =>'<div id=\'picker_canvasborder_color\'></div>',
            '#attributes' => array('onClick'=>'load_color_picker(\'canvasborder_color\');', 'style'=>'background-color:'.$existing_color),
        );

        $form['survey_configuration']['canvas']['survey_chart_canvasborder_size'] = array (
            '#type' => 'textfield',
            '#title' => 'Canvas Border Size',
            '#description' =>t("NumericalValue(0-100) : This attribute helps you set the border thickness (in pixels) of the canvas"),
            '#id' => 'chart_canvasborder_size',
            '#default_value' => variable_get('survey_chart_canvasborder_size',0),
            '#size' => 10,
        );

        $form['survey_configuration']['chart_font']= array (
            '#type' => 'fieldset',
            '#title' => 'Chart Font Properties',
            '#collapsible' => TRUE,
            '#collapsed' => TRUE,
            '#description' => t('All the values and the names in the chart which lie on the canvas will be displayed using the font configuration provided here'),
        );
        $form['survey_configuration']['chart_font']['survey_chart_font_name'] = array (
            '#type' => 'select',
            '#title' => 'Font Name',
            '#description' =>t("This attribute sets the base font family of the chart font which lies on the canvas."),
            '#id' => 'chart_font_name',
            '#options' => array('Arial'=>'Arial','Helvetica'=>'Helvetica','Times New Roman'=>'Times New Roman','Times'=>'Times','Courier New'=>'Courier New','Courier'=>'Courier','Georgia'=>'Georgia','Verdana'=>'Verdana','Geneva'=>'Geneva'),
            '#default_value' => variable_get('survey_chart_font_name','Arial'),
        );

        $existing_color = variable_get('survey_chart_font_color', rgb2html($defult10_color[$option_count]));
        $form['survey_configuration']['chart_font']['survey_chart_font_color'] = array (
            '#type' => 'textfield',
            '#title' => 'Font Color',
            '#description' =>t("Click the text box to choose base font color for the graph."),
            '#id' => 'chart_color_option_font_color',
            '#size' => 10,
            '#maxlength' => 7,
            '#default_value' => $existing_color,
            '#suffix' =>'<div id=\'picker_font_color\'></div>',
            '#attributes' => array('onClick'=>'load_color_picker(\'font_color\');', 'style'=>'background-color:'.$existing_color),
        );

        $form['survey_configuration']['chart_font']['survey_chart_font_size'] = array (
            '#type' => 'select',
            '#title' => 'Font Size',
            '#description' =>t("This attribute sets the base font size of the chart."),
            '#id' => 'survey_chart_font_size',
            '#default_value' => variable_get('survey_chart_font_size',0),
            '#options' => array('6'=>'6','7'=>'7','8'=>'8','9'=>'9','10'=>'10','11'=>'11','12'=>'12','13'=>'13','14'=>'14','15'=>'15','16'=>'16','17'=>'17','18'=>'18','19'=>'19','20'=>'20','21'=>'21','22'=>'22','23'=>'23','24'=>'24'),
        );

        $form['survey_configuration']['generic']= array (
            '#type' => 'fieldset',
            '#title' => 'Chart Generic Properties',
            '#collapsible' => TRUE,
            '#collapsed' => TRUE,
        );
        $existing_color = variable_get('survey_chart_font_color', rgb2html($defult10_color[$option_count]));
        $form['survey_configuration']['generic']['survey_chart_show_names'] = array (
            '#type' => 'checkbox',
            '#title' => 'Show names',
            '#description' => t("Whether the X-axis values (for the data sets) will be displayed or not."),
            '#id' => 'survey_chart_show_names',
            '#default_value' => variable_get('survey_chart_show_names',0),
        );
        $form['survey_configuration']['generic']['survey_chart_show_values'] = array (
            '#type' => 'checkbox',
            '#title' => 'Show values',
            '#description' => t("Whether the data numerical values will be displayed along with the columns, bars, lines, areas and the pies."),
            '#id' => 'survey_chart_show_names',
            '#default_value' => variable_get('survey_chart_show_values',0),
        );
        $form['survey_configuration']['generic']['survey_chart_animation'] = array (
            '#type' => 'checkbox',
            '#title' => 'Animation',
            '#description' => t("This attribute sets whether the animation is to be played or whether the entire chart would be rendered at one go."),
            '#id' => 'survey_chart_animation',
            '#default_value' => variable_get('survey_chart_animation',0),
        );
        $form['survey_configuration']['generic']['survey_chart_rotate'] = array (
            '#type' => 'checkbox',
            '#title' => 'Rotate names',
            '#description' => t("This attribute sets that whether the category name text boxes would be rotated or not (if the chart supports axis)"),
            '#id' => 'survey_chart_animation',
            '#default_value' => variable_get('survey_chart_rotate',0),
        );
        $form['survey_configuration']['generic']['survey_chart_x_axis_title'] = array (
            '#type' => 'textfield',
            '#title' => 'X-Axis Title',
            '#description' => t("x-Axis text title (if the chart supports axis) "),
            '#id' => 'survey_chart_x_axis_title',
            '#default_value' => variable_get('survey_chart_x_axis_title','Title'),
        );
        $form['survey_configuration']['generic']['chart_y_axis_title'] = array (
            '#type' => 'textfield',
            '#title' => 'Y-Axis Title',
            '#description' => t("y-Axis text title (if the chart supports axis) "),
            '#id' => 'chart_y_axis_title',
            '#default_value' => variable_get('chart_y_axis_title','Title'),
        );

        // Default 15 colors mentioned in the LibChart class file.
        $defult10_color = array('0,0,0','2, 78, 0','148, 170, 36','233, 191, 49','240, 127, 41','243, 63, 34','190, 71, 47','135, 81, 60','128, 78, 162','121, 75, 255','142, 165, 250','162, 254, 239','137, 240, 166','104, 221, 71','98, 174, 35','93, 129, 1');
        for( $option_count = 1; $option_count <= $total_option_color; $option_count++ ) {
            $existing_color = variable_get('survey_chart_color_'.$option_count, rgb2html($defult10_color[$option_count]));
            $existing_color = $existing_color == '' ? rgb2html($defult10_color[$option_count]):$existing_color;

            $form['survey_configuration']['survey_chart_color']['survey_chart_color_'.$option_count] = array(
                '#type' => 'textfield',
                '#description' => t("Click the text box to choose color for graph cube $option_count"),
                '#title' => t('Color for graph cube '.$option_count),
                '#id' => 'chart_color_option_'.$option_count,
                '#size' => 10,
                '#maxlength' => 7,
                '#default_value' => $existing_color,
                '#suffix' =>'<div id=\'picker_'.$option_count.'\'></div>',
                '#attributes' => array('onClick'=>'load_color_picker(\''.$option_count.'\');', 'style'=>'background-color:'.$existing_color),
            );
        }

        $form['survey_configuration']['survey_answer_display_type'] = array(
            '#type' => 'select',
            '#title' => t('Answer Display Type'),
            '#description' => t('Choose the display format for rendering the answer options in the survey form.'),
            '#default_value' => variable_get('survey_answer_display_type', 'ver'),
            '#options' => array('ver' => t('Vertical Display'), 'hor' => t('Horizontal Display')),
            '#required' => true,
        );

        $form['survey_configuration']['survey_question_color'] = array(
            '#type' => 'textfield',
            '#id' => 'survey_question_color',
            '#size' => 10,
            '#maxlength' => 10,
            '#title' => t('Color for questions'),
            '#default_value' => variable_get('survey_question_color', '#FF0000'),
            '#required' => true,
            '#description' => t('Color choice for the survey questions.'),
        );

        $form['survey_configuration']['style'] = array(
            '#type' => 'markup',
            '#value' => "<div id='survey_color_picker'>
                                        &nbsp;
                                    </div>",
        );

        /*	$form['survey_configuration']['allow_user_skip_survey'] = array(
            '#type' => 'checkbox',
            '#title' => '<b>'.t('Allow the user to skip the survey').'</b>',
            '#description' => t('Allow the user to skip the survey.'),
            '#default_value' => variable_get('allow_user_skip_survey', 0),
        );*/
        $options = array('0' => 'Display thank you message', '1'=>'Redirect to survey graph result page', '2'=>'Redirect to a custom URL');

        $form['survey_configuration']['survey_page_redirect'] = array(
            '#type' => 'radios',
            '#id' => 'SrPgReId',
            '#title' => t('Redirection Method'),
            '#description' => t('Choose the method of redirection after survey.'),
            '#default_value' => variable_get('survey_page_redirect', 0),
            '#options' => $options,
            '#required' => true,
        );

        $form['survey_configuration']['survey_thanksmessage'] = array(
            '#type' => 'textarea',
            '#title' => '<b>'.t('Enter a Thank you message to display.').'</b>',
        '#default_value'=>variable_get('survey_thanksmessage',''),
        '#weight'=>15,

        );

        $form['survey_configuration']['survey_redirect_custom_url'] = array(
            '#prefix' => '<div id="survey_redirect_custom_url" style="display:none">',
            '#type' => 'textfield',
            '#description' => t('Please enter an external URL along with http:// Eg: http://www.google.com'),
            '#title' => '<b>'.t('Enter the custom URL to be redirected.').'</b>',
        '#default_value'=>variable_get('survey_redirect_custom_url',''),
        '#suffix'=>'</div>',

        );

        $form['survey_configuration']['survey_cookie_lifetime'] = array(
            '#type' => 'textfield',
            '#description' => 'Enter the life time of the cookie in terms of days',
            '#title' => '<b>'.t('Enter the cookie life time for the survey.').'</b>',
            '#default_value'=>variable_get('survey_cookie_lifetime',30),

        );

        $form['explanation_configure'] = array(
              '#type' => 'checkbox',
              '#title' => t('Display Explanation of Answer.'),
              '#default_value'=>variable_get('explanation_configure',0),
        );

        $form['user_first_last_configure'] = array(
              '#type' => 'checkbox',
              '#title' => t('Display First and Last Name For Anonymous User.'),
              '#default_value'=>variable_get('user_first_last_configure',0),
        );

        $form['submit'] = array(
            '#type' => 'submit',
            '#value' => t('Save Configuration'),
        );
        return $form;
    }

    function survey_admin_month_form() {
        global $session_value;
        $obj_survey = initialize_survey_client();
        $form = $options = array();

        //getEvaluations method
        $err_msg ='';
        $obj_survey = initialize_survey_client();
        $result = $obj_survey->getEvaluations(100,0,$session_value,0,$err_msg);

        if( strlen($err_msg)<1 ) {
            if( isset($result["GetEvaluationsResponse"]["Count"]) && $result["GetEvaluationsResponse"]["Count"]>1 ) {
                foreach ( $result["GetEvaluationsResponse"]["Evaluations"]["Evaluation"] as $element ) {
                    $key = $element["EvaluationId"];
                    $options[$key] = $element["EvaluationName"];
                }
            } elseif ( $result["GetEvaluationsResponse"]["Count"]==1 ) {
                $key = $result["GetEvaluationsResponse"]["Evaluations"]["Evaluation"]["EvaluationId"];
                $options[$key] = $result["GetEvaluationsResponse"]["Evaluations"]["Evaluation"]["EvaluationName"];
            } else {
                $options[0] = 'None';
            }

            $form['survey_month_configuration'] = array(
                '#type' => 'fieldset',
                '#title' => t('Survey of the month'),
            );

            $form['survey_month_configuration']['survey_of_month'] = array(
                '#type' => 'radios',
                '#title' => t('Choose the Survey of the month'),
                '#options' => $options,
                '#default_value' => variable_get('survey_of_month', 0),
                '#return_value' => variable_get('survey_of_month', 0),
                '#description' => t(''),
            );

            $form['submit'] = array(
                '#type' => 'submit',
                '#value' => t('Save Configuration'),
            );
        } else {
            $form['survey_month_configuration'] = array(
                '#type' => 'fieldset',
                '#title' => t('Survey of the month'),
                '#description' => $err_msg,
            );
        }
        return $form;
    }

    function survey_admin_text_content_form() {
        global $session_value;
        $obj_survey = initialize_survey_client();
        $form = $options = array();
        //getEvaluations method
        $err_msg='';

        // Survey takeup page: configure custom content
        $form['survey_admin_text_content']['takeup'] = array(
            '#type' => 'fieldset',
            '#title' => 'Custom Content - Take survey page',
        );

        /**
            * This top positions setup will be used later once displaying issue is solved.
            *
        $form['survey_admin_text_content']['survey_flag_show_textual_data_top'] = array(
            '#type' => 'checkbox',
            '#title' => t('Show the textual data on the survey pages at Top position'),
            '#description' => t('Select this check box to enable the textual data display at Top of all survey pages/result pages'),
            '#default_value' => variable_get('survey_flag_show_textual_data_top',false),
        );

        $form['survey_admin_text_content']['survey_textual_data_top'] = array(
            '#type' => 'textarea',
            '#title' => t('Textual data to display at Top'),
            '#default_value' => variable_get('survey_textual_data_top',''),
            '#description' => t('The textual data would be displaied at top of every survey pages and its result pages.'),
        );
        */

        $form['survey_admin_text_content']['takeup']['survey_flag_show_textual_data_abovedesc'] = array(
            '#type' => 'checkbox',
            '#title' => t('Enable custom content between the Survey title and Description'),
            '#default_value' => variable_get('survey_flag_show_textual_data_abovedesc',false),
        );

        $form['survey_admin_text_content']['takeup']['survey_textual_data_abovedesc'] = array(
            '#type' => 'textarea',
            '#title' => t('Provide the custom content'),
            '#default_value' => variable_get('survey_textual_data_abovedesc',''),
            '#description' => t('You can provide plain text, HTML tags and Inline CSS styles'),
        );

        $form['survey_admin_text_content']['takeup']['survey_flag_show_textual_data_belowdesc'] = array(
            '#type' => 'checkbox',
            '#title' => t('Enable custom content between the Survey description and the Form content'),
            '#default_value' => variable_get('survey_flag_show_textual_data_belowdesc',false),
            '#prefix' => '<hr class=\'survey-field-hr\'>',
        );

        $form['survey_admin_text_content']['takeup']['survey_textual_data_belowdesc'] = array(
            '#type' => 'textarea',
            '#title' => t('Provide the custom content'),
            '#default_value' => variable_get('survey_textual_data_belowdesc',''),
            '#description' => t('You can provide plain text, HTML tags and Inline CSS styles'),
        );

        $form['survey_admin_text_content']['takeup']['survey_flag_show_textual_data_abovesubmit'] = array(
            '#type' => 'checkbox',
            '#title' => t('Enable custom content at the bottom of the survey page (above the Submit/ Next button)'),
            '#default_value' => variable_get('survey_flag_show_textual_data_abovesubmit',false),
            '#prefix' => '<hr class=\'survey-field-hr\'>',
        );

        $form['survey_admin_text_content']['takeup']['survey_textual_data_abovesubmit'] = array(
            '#type' => 'textarea',
            '#title' => t('Provide the custom content'),
            '#default_value' => variable_get('survey_textual_data_abovesubmit',''),
            '#description' => t('You can provide plain text, HTML tags and Inline CSS styles'),
        );

        $form['survey_admin_text_content']['takeup']['survey_flag_show_textual_data_bottom'] = array(
            '#type' => 'checkbox',
            '#title' => t('Enable custom content at the bottom of the survey page (below the Submit/ Next button)'),
            '#default_value' => variable_get('survey_flag_show_textual_data_bottom',false),
            '#prefix' => '<hr class=\'survey-field-hr\'>',
        );

        $form['survey_admin_text_content']['takeup']['survey_textual_data_bottom'] = array(
            '#type' => 'textarea',
            '#title' => t('Provide the custom content'),
            '#default_value' => variable_get('survey_textual_data_bottom',''),
            '#description' => t('You can provide plain text, HTML tags and Inline CSS styles'),
        );

        $form['survey_admin_text_content']['takeup']['survey_flag_show_textual_data_first_page'] = array(
        '#type' => 'checkbox',
        '#title' => t('Enable custom content at the first page of the survey page (below the Title and description)'),
        '#default_value' => variable_get('survey_flag_show_textual_data_first_page',false),
        '#prefix' => '<hr class=\'survey-field-hr\'>',
        );

        $form['survey_admin_text_content']['takeup']['survey_textual_data_first_page'] = array(
            '#type' => 'textarea',
            '#title' => t('Provide the custom content'),
            '#default_value' => variable_get('survey_textual_data_first_page',''),
            '#description' => t('You can provide plain text, HTML tags and Inline CSS styles'),
        );

        $form['survey_admin_text_content']['takeup']['survey_flag_show_textual_data_last_page'] = array(
            '#type' => 'checkbox',
            '#title' => t('Enable custom content at the last page of the survey page (below the Submit/ Next button)'),
            '#default_value' => variable_get('survey_flag_show_textual_data_last_page',false),
            '#prefix' => '<hr class=\'survey-field-hr\'>',
        );

        $form['survey_admin_text_content']['takeup']['survey_textual_data_last_page'] = array(
            '#type' => 'textarea',
            '#title' => t('Provide the custom content'),
            '#default_value' => variable_get('survey_textual_data_last_page',''),
            '#description' => t('You can provide plain text, HTML tags and Inline CSS styles'),
        );
        // Resutl page settup

        $form['survey_admin_text_content']['result'] = array(
            '#type' => 'fieldset',
            '#title' => 'Custom Content - Survey results page',
        );

        $form['survey_admin_text_content']['result']['survey_flag_show_textual_data_abovedesc_r'] = array(
            '#type' => 'checkbox',
            '#title' => t('Enable custom content between the Survey title and Description'),
            //'#description' => t('Select this check box to enable the textual data display on all survey page\'s and its result page\'s above the description.'),
            '#default_value' => variable_get('survey_flag_show_textual_data_abovedesc_r',false),
            //'#prefix' => '<hr class=\'survey-field-hr\'>',
        );

        $form['survey_admin_text_content']['result']['survey_textual_data_abovedesc_r'] = array(
            '#type' => 'textarea',
            '#title' => t('Provide the custom content'),
            '#default_value' => variable_get('survey_textual_data_abovedesc_r',''),
            '#description' => t('You can provide plain text, HTML tags and Inline CSS styles'),
        );

        $form['survey_admin_text_content']['result']['survey_flag_show_textual_data_belowdesc_r'] = array(
            '#type' => 'checkbox',
            '#title' => t('Enable custom content between the Survey description and result'),
            '#default_value' => variable_get('survey_flag_show_textual_data_belowdesc_r',false),
            '#prefix' => '<hr class=\'survey-field-hr\'>',
        );

        $form['survey_admin_text_content']['result']['survey_textual_data_belowdesc_r'] = array(
            '#type' => 'textarea',
            '#title' => t('Provide the custom content'),
            '#default_value' => variable_get('survey_textual_data_belowdesc_r',''),
            '#description' => t('You can provide plain text, HTML tags and Inline CSS styles'),
        );

        $form['survey_admin_text_content']['result']['survey_flag_show_textual_data_abovesubmit_r'] = array(
            '#type' => 'checkbox',
            '#title' => t('Enable custom content at above the Re-Take button (if the Re-Take button is present)'),
            '#default_value' => variable_get('survey_flag_show_textual_data_abovesubmit_r',false),
            '#prefix' => '<hr class=\'survey-field-hr\'>',
        );

        $form['survey_admin_text_content']['result']['survey_textual_data_abovesubmit_r'] = array(
            '#type' => 'textarea',
            '#title' => t('Provide the custom content'),
            '#default_value' => variable_get('survey_textual_data_abovesubmit_r',''),
            '#description' => t('You can provide plain text, HTML tags and Inline CSS styles'),
        );

        $form['survey_admin_text_content']['result']['survey_flag_show_textual_data_bottom_r'] = array(
            '#type' => 'checkbox',
            '#title' => t('Enable custom content at the bottom of the Survey result page'),
            '#default_value' => variable_get('survey_flag_show_textual_data_bottom_r',false),
            '#prefix' => '<hr class=\'survey-field-hr\'>',
        );

        $form['survey_admin_text_content']['result']['survey_textual_data_bottom_r'] = array(
            '#type' => 'textarea',
            '#title' => t('Provide the custom content'),
            '#default_value' => variable_get('survey_textual_data_bottom_r',''),
            '#description' => t('You can provide plain text, HTML tags and Inline CSS styles'),
        );

        //Thank you page: Configure custom content
        $form['survey_admin_text_content']['thankyou'] = array(
                '#type' => 'fieldset',
                '#title' => 'Custom Content - survey thank you page',
        );

        $form['survey_admin_text_content']['thankyou']['survey_flag_show_textual_data_above_thankyou'] = array(
            '#type' => 'checkbox',
            '#title' => t('Enable custom content at above the Thank you message'),
            '#default_value' => variable_get('survey_flag_show_textual_data_above_thankyou',false),
            //'#prefix' => '<hr class=\'survey-field-hr\'>'
        );

        $form['survey_admin_text_content']['thankyou']['survey_textual_data_above_thankyou'] = array(
            '#type' => 'textarea',
            '#title' => t('Enter custom content for above the Thank you message'),
            '#default_value' => variable_get('survey_textual_data_above_thankyou',false),
            '#description' => t('You can provide plain text, HTML tags and Inline CSS styles'),
            //'#prefix' => '<hr class=\'survey-field-hr\'>'
        );

        $form['survey_admin_text_content']['thankyou']['survey_flag_show_textual_data_below_thankyou'] = array(
            '#type' => 'checkbox',
            '#title' => t('Enable custom content at below the Thank you message'),
            '#default_value' => variable_get('survey_flag_show_textual_data_below_thankyou',false),
            '#prefix' => '<hr class=\'survey-field-hr\'>'
        );

        $form['survey_admin_text_content']['thankyou']['survey_textual_data_below_thankyou'] = array(
            '#type' => 'textarea',
            '#title' => t('Enter custom content for below the Thank you message'),
            '#default_value' => variable_get('survey_textual_data_below_thankyou',false),
            '#description' => t('You can provide plain text, HTML tags and Inline CSS styles'),
            //'#prefix' => '<hr class=\'survey-field-hr\'>'
        );

        // Block: configure custom content
        $form['survey_admin_text_content']['block'] = array(
            '#type' => 'fieldset',
            '#title' => 'Custom Content - Survey Blocks or Title Page',
        );

        $form['survey_admin_text_content']['block']['survey_flag_show_textual_data_activesurvey'] = array(
            '#type' => 'checkbox',
            '#title' => t('Enable custom content between the Active Survey block title and the Survey items.'),
            '#default_value' => variable_get('survey_flag_show_textual_data_activesurvey',false),
        );

        $form['survey_admin_text_content']['block']['survey_textual_title_activesurvey'] = array(
            '#type' => 'textfield',
            '#title' => t('Provide the custom Title'),
            '#default_value' => variable_get('survey_textual_title_activesurvey',''),
            '#description' => t('You can provide plain text.'),
        );

        $form['survey_admin_text_content']['block']['survey_textual_data_activesurvey'] = array(
            '#type' => 'textarea',
            '#title' => t('Provide the custom content'),
            '#default_value' => variable_get('survey_textual_data_activesurvey',''),
            '#description' => t('You can provide plain text, HTML tags and Inline CSS styles'),
        );

        $form['survey_admin_text_content']['block']['survey_flag_show_textual_data_surveyofmonth'] = array(
            '#type' => 'checkbox',
            '#title' => t('Enable custom content between the Survey of the month block title and the Survey items.'),
            '#default_value' => variable_get('survey_flag_show_textual_data_surveyofmonth',false),
            '#prefix' => '<hr class=\'survey-field-hr\'>',
        );

        $form['survey_admin_text_content']['block']['survey_textual_data_surveyofmonth'] = array(
            '#type' => 'textarea',
            '#title' => t('Provide the custom content'),
            '#default_value' => variable_get('survey_textual_data_surveyofmonth',''),
            '#description' => t('You can provide plain text, HTML tags and Inline CSS styles'),
        );

        $form['survey_admin_text_content']['block']['survey_flag_show_textual_data_pastsurvey'] = array(
            '#type' => 'checkbox',
            '#title' => t('Enable custom content between the Past Survey block title and the Survey items.'),
            '#default_value' => variable_get('survey_flag_show_textual_data_pastsurvey',false),
            '#prefix' => '<hr class=\'survey-field-hr\'>',
        );

        $form['survey_admin_text_content']['block']['survey_textual_data_pastsurvey'] = array(
            '#type' => 'textarea',
            '#title' => t('Provide the custom content'),
            '#default_value' => variable_get('survey_textual_data_pastsurvey',''),
            '#description' => t('You can provide plain text, HTML tags and Inline CSS styles'),
        );

        $form['submit'] = array(
            '#type' => 'submit',
            '#value' => t('Save Configuration'),
        );
        return $form;
    }

    function survey_admin_text_content_form_submit($form, &$form_state) {
        survey_admin_settings_form_submit($form, $form_state);
    }

    function survey_admin_expired_form() {
        global $session_value;
        $obj_survey = initialize_survey_client();
        $form = $options = $default_value = array();
        $default = variable_get('survey_expired', array('0' => ''));

        foreach ($default as $key => $value ) {
            $default_value[$value] = $value != '' ? $value : '';
        }

        //getEvaluations method
        $err_msg        =   '';
        $obj_survey     =   initialize_survey_client();
        $result         =   $obj_survey->getEvaluations(100,0,$session_value,1,$err_msg);

        if( strlen($err_msg)<1 ) {
            if( isset($result["GetEvaluationsResponse"]["Count"]) && $result["GetEvaluationsResponse"]["Count"]>1 ) {
                foreach ( $result["GetEvaluationsResponse"]["Evaluations"]["Evaluation"] as $element ) {
                    $key = $element["EvaluationId"];
                    $options[$key] = $element["EvaluationName"];
                }
            } elseif ( $result["GetEvaluationsResponse"]["Count"]==1 ) {
                $key = $result["GetEvaluationsResponse"]["Evaluations"]["Evaluation"]["EvaluationId"];
                $options[$key] = $result["GetEvaluationsResponse"]["Evaluations"]["Evaluation"]["EvaluationName"];
            } else {
                $options[0] = 'None';
            }

            $form['survey_expired_configuration'] = array(
                '#type' => 'fieldset',
                '#title' => t('Past Surveys'),
            );

            $form['survey_expired_configuration']['survey_expired'] = array(
                '#type' => 'checkboxes',
                '#title' => t("Choose the Survey's to show in Past Surveys block"),
                '#options' => $options,
                '#default_value' => $default_value,
                '#description' => t('List of past surveys'),
            );

            $form['submit'] = array(
                '#type' => 'submit',
                '#value' => t('Save Configuration'),
            );
        } else {
            $form['survey_expired_configuration'] = array(
                '#type' => 'fieldset',
                '#title' => t('Past Surveys'),
                '#description'=> $err_msg,
            );
        }
        return $form;
    }

    function survey_admin_expired_form_submit($form, &$form_state ) {
        $surveys    =   $form_state['values']['survey_expired'];
        variable_set('survey_expired', $surveys);
        drupal_set_message(t('The configuration options have been saved.'), 'status',FALSE);
    }

    function survey_admin_settings_form_validate($form, &$form_state ) {
        switch($form_state['values']['survey_page_redirect']){
            case 0:
                    if(empty($form_state['values']['survey_thanksmessage'])){
                        form_set_error('survey_thanksmessage', t('Please enter a thank you message to display'));
                    }
            break;

            case 1:
                    //No specila condition for this case it wil be redirected to the result page
            break;

            case 2:
                    if(empty($form_state['values']['survey_redirect_custom_url'])) {
                        form_set_error('survey_redirect_custom_url', t('Please enter a thank you message to display'));
                    }
            break;
        }

        _validate_modal_popover_settings($form_state);
        $arr_colors =   $form['#post'];
        //$arr_colors = preg_grep('/^chart_color_\d+/',$arr_colors);

        foreach ( $arr_colors as $key => $arr_value ) {
            $str_value = strstr($key,'survey_chart_color_');
            if (!$str_value ) {
                unset($arr_colors[$key]);
            }
        }

        $t_color_option = t("Color Option ");
        $arr_duplicate=array_count_values($arr_colors);
        //unset($arr_duplicate['#fefefe']);
        unset($arr_duplicate['']);

        foreach ( $arr_duplicate as $color_value => $duplicate_value ) {
            if ( $duplicate_value == 1 ) {
                unset($arr_duplicate[$color_value]);
            }
        }

        if (count($arr_duplicate) > 0 ) {
            $br                 =   '';
            $duplicate_message  =   '<ul>';

            foreach ( $arr_colors as $key => $color_value ) {
                if (array_key_exists($color_value,$arr_duplicate) ) {
                    $option_name = str_replace("survey_chart_color_",$t_color_option,$key);
                    $duplicate_message .= '<li>'. t("$option_name Value $color_value is Duplicate!").'</li>';
                    $br = "<br />";
                }
            }
            $duplicate_message .= "</ul>";
            form_set_error('error',$duplicate_message);
        }
    }

    /*
    *	Function to validate the popover settings
    */
    function _validate_modal_popover_settings(&$form_state) {
        if($form_state['values']['survey_modalpopup_display'] == 0){
            unset($form_state['values']['survey_trigger_popup']);
            unset($form_state['values']['survey_popup_uievent']);
            unset($form_state['values']['survey_popup_which_page']);
            unset($form_state['values']['survey_popup_amount_of_time']);
        } else {
            switch($form_state['values']['survey_trigger_popup']){
                case 0:
                    if(empty($form_state['values']['survey_popup_uievent'])) {
                        form_set_error('survey_popup_uievent', t('Please select a UI event'));
                    }
                break;
                case 1:
                    if(empty($form_state['values']['survey_popup_which_page'])){
                        //form_set_error('survey_popup_which_page', t('Please enter which page the popup to be render'));
                    }
                break;

                case 2:
                    if(empty($form_state['values']['survey_popup_amount_of_time'])){
                        form_set_error('survey_popup_amount_of_time', t('Please enter the amount of time for the popover display after the page load'));
                    }
                break;
            }
        }
    }

    function survey_admin_settings_form_submit($form, &$form_state ) {
        $op = isset($form_state['clicked_button']['#parents'][0]) ? $form_state['clicked_button']['#parents'][0] : '';
        // Exclude unnecessary elements.
        unset($form_state['values']['submit'], $form_state['values']['reset'], $form_state['values']['form_id'], $form_state['values']['op'], $form_state['values']['form_token'], $form_state['values']['form_build_id']);

        foreach ($form_state['values'] as $key => $value ) {
            if (is_array($value) && isset($form_state['values']['array_filter']) ) {
                $value = array_keys(array_filter($value));
            }
            variable_set($key, $value);
        }
        variable_set('explanation_configure',$form_state['values']['explanation_configure']);
        variable_set('user_first_last_configure',$form_state['values']['user_first_last_configure']);
        drupal_set_message(t('The configuration options have been saved.'), 'status',FALSE);
        cache_clear_all();
        drupal_rebuild_theme_registry();
    }

    function survey_admin_month_form_submit($form, &$form_state ) {
        variable_set('survey_of_month', $form_state['values']['survey_of_month']);
        drupal_set_message(t('The configuration options have been saved.'), 'status',FALSE);
    }

    function survey_form(&$form_state, $survey) { //echo 'aaaggg'; exit;
        global $user,$base_url;
        $surveyId = $survey->data->Question[0]->EvaluationId;
        //Jagadees, Elen: Implemented to fix the login issue for Survey page. Quick fix and not to inject any defect.
        //Over all the code is needs to be refactored and cleaned. Other wise difficult during maintenance.

        if($form_state['post']['form_id'] <> 'user_login_block'){
            //Jagadeesh, Elen: No such Javascript.
            //drupal_add_js(drupal_get_path('module', 'survey') .'/js/survey.js');
            survey_back_js();
            global $session_value, $itrinno_site_id;
            $session                =   $session_value;
            $survey_title           =   '';
            $total_result           =   0;
            $survey_questions       =   array();
            $survey_answers         =   array();
            $can_retake             =   0;
            $err_msg                =   '';
            $question_per_page      =   variable_get('survey_questions_per_page','5');
            $totalQuestCountPerPage =   variable_get('survey_questions_per_page','5');
            $start_question         =   0;

            if(isset($form_state['storage']['page'])) {
                $page                           =   $survey->page;
                $clicked_button                 =   $form_state['values']['op'];
                $current_page                   =   $survey->page;
                $start_question                 =   (($page-1) * $question_per_page);
                $question_and_answer            =   '';
            } else {
                $page                           =   1;
                $current_page                   =   1;
                $form_state['storage']['page']  =   1;
                $start_question                 =   0;
            }

            /* For Retake the survey */
            $objSurveyData  =   new SurveyData();
            $objSurveyData->SetServiceName('evaluation');
            $objSurveyData->SetServiceIdentity('retake');
            $objSurveyData->SetMethod('get');
            $objSurveyData->set_evaluation_id($surveyId);

            $objSurveyData->set_current_page_no(1);
            $objSurveyData->set_user_id($user->uid);
            $objSurveyData->set_no_of_questions_per_page(10000);
            $objSurveyData->set_user_operation('retake');
            $objSurvey      =   new survey();

            $processedData  =   json_decode($objSurvey->get_evaluation_retake_answers($objSurveyData));  //echo "<pre>";print_r($processedData);
            $result_id      =   arg(3);
            $answer_array   =   array();

            if($result_id == '') {
                for($counter=0;$counter<count($processedData->evaluationResult[0]->evaluationQuestionResult);$counter++) {
                    $answer_array[$processedData->evaluationResult[0]->evaluationQuestionResult[$counter]->questionId][]            =   $processedData->evaluationResult[0]->evaluationQuestionResult[$counter]->answerId;
                }
            } else {
                for($counter=0;$counter<count($processedData->evaluationResult[0]->evaluationQuestionResult);$counter++) {
                    if($processedData->evaluationResult[0]->evaluationQuestionResult[$counter]->resultId == $result_id) {
                        if($processedData->evaluationResult[0]->evaluationQuestionResult[$counter]->answerId ==0)
                            $answer_array[$processedData->evaluationResult[0]->evaluationQuestionResult[$counter]->questionId][]    =   $processedData->evaluationResult[0]->evaluationQuestionResult[$counter]->responseText;
                        else
                            $answer_array[$processedData->evaluationResult[0]->evaluationQuestionResult[$counter]->questionId][]    =   $processedData->evaluationResult[0]->evaluationQuestionResult[$counter]->answerId;
                    }
                }
            }
            //p($answer_array); exit;
            $surveyResult       =   $survey;
            //print_r($surveyResult);
            $processedData      =   $surveyResult->data;
            $total_question     =   $surveyResult->data->TotalCount;
            $survey_questions   =   $surveyResult->questions;
            $survey_answers     =   $surveyResult->answers;

            $explanation_array  =   array();
            for($i=0;$i<count($surveyResult->data->Question);$i++)  {
                for($j=0;$j<count($surveyResult->data->Question[$i]->Answer);$j++) {
                    $explanation_array[$surveyResult->data->Question[$i]->Answer[$j]->AnswerId] =   $surveyResult->data->Question[$i]->Answer[$j]->explanation;
                }
            }

            $total_pages    =   ceil($total_question / $question_per_page);
            drupal_add_js(drupal_get_path('module', 'survey') .'/js/survey_progress_bar.js');
            drupal_add_js('$(document).ready(function() {$("#Spb5").survey_progressBar('.$current_page.', { max: '.$total_pages.', textFormat: \'fraction\', barImage: \''.$base_url.'/'.drupal_get_path('module', 'survey').'/images/progressbg_orange.gif\'} )});', 'inline', 'header');

          if ( $total_pages == 1) {
                $submit_value   =   t('Submit');
            } else {
                if ( $current_page > 1 ) {
                    $prev_value =   t(' Previous ');
                }

                if ( $current_page < $total_pages ) {
                    $next_value =   t('Next');
                }

                if ( $current_page == $total_pages ) {
                    $submit_value   =   t('Submit');
                }
            }

            if($surveyResult->status == 0)	{
                if( strlen($err_msg) < 1 ) {
                    $pub_date_display   =   variable_get('survey_addeddate_display', 0);
                    if ( $pub_date_display && $survey_content['published_date'] ) {
                        //$pub_date =	'&nbsp;<div class=\'survey-form-published_on\'><span class=\'survey-form-published_on-text\'>'.t('Published on ').'</span><span class=\'survey-form-published_on-date\'>'.date('m-d-Y',strtotime($survey_content['published_date'])).'</span></div>';
                        $pub_date   =   '&nbsp;<div class=\'survey-form-published_on\'><span class=\'survey-form-published_on-text\'>&nbsp;|&nbsp;</span><span class=\'survey-form-published_on-date\'>'.date('Y-m-d',strtotime($survey_content['published_date'])).'</span></div>';
                    }
                }
                //p($survey_questions);
                $form['style'] = array(
                    '#type' => 'markup',
                    /*'#value' => "<style>.survey-questioncolor { color: ".variable_get('survey_question_color','#000000')." } </style>",*/
										'#value' => "",
                );

                $form['questions_count'] = array(
                    '#type' => 'hidden',
                    '#value' => count($survey_questions),
                );

                $ReqFlag    =   0;
                //p($answer_array); exit;
                $question_tmp_array = array();
                //p($survey_questions);

                for ( $inc = 0; $inc < $question_per_page; $inc++ ) { //echo $inc;
                   $def_ans =   '';
                    if (isset($survey_questions[$inc]->id)) {
                        $question       =   str_replace('<br />',' ',$survey_questions[$inc]->title); // to avoid an extra <br> returing from services -- MODIFIED BY GIRI SHANKAR R dated 17/09/2010
                        $question_id    =   $survey_questions[$inc]->id;
                        $multiple       =   FALSE;
                        $answer_option  =   $survey_questions[$inc]->questionTypeName;
                        if(is_array($survey_answers))
                            foreach ($survey_answers as $element ) {
                                if( $element->questionid==$question_id ) {
                                    $answer_id              =   $element->id;
                                    $answer_title           =   $element->title;
                                    $answers[$answer_id]    =   $answer_title;

                                    if($element->isDefault){
                                        $def_ans    .=  $answer_id.',';
                                        $defaultAnswersValue[$question_id]  =   array($answer_id);
                                    } else {
                                        /*$answer_id = $answer_array[$question_id];
                                        $defaultAnswersValue[$question_id] = array($answer_id);*/
                                    }
                                }
                            }

                        $def = substr($def_ans,0,-1);
                        $defaultAnswersValue[$question_id] = explode(',',$def);
                        //print_r($defaultAnswersValue);
                        $def_ans = '';
                        $form_req = $survey_questions[$inc]->required == 1 ? "&nbsp;<span class='survey-form-required'></span>":'';

                        if($survey_questions[$inc]->required == 1){
                            $ReqFlag    =   1;
                        }

                        //p($answer_array[$question_id]);
                        //echo "{$start_question}+{$inc}<br />";
                        $question_title =   '<span class=\'survey-questioncolor\'>'.($start_question+$inc+1) . '. '. t($question).'</span>';
                        $option_description =   '';

                        if (form_get_errors()) {
                          if(strtolower($answer_option) == 'radiobutton' || strtolower($answer_option) == 'singleselectlistbox' || strtolower($answer_option) == 'dropdown' || strtolower($answer_option) == 'textbox') {
                                $posted_value   =   array('0' => $form_state['values']['answer_'.$inc]);
                          } else {
                                $posted_value   =   $form_state['values']['answer_'.$inc];
                          }
                        }
                        //print_r($answer_array);
                        $answerAttributeArray = array(
                                'answers' => $answers,
                                'question_title' => $question_title,
                                'option_description' => $option_description,
                                'required' => $survey_questions[$inc]->required == 1?TRUE:FALSE,
                            //	'default_value' => $defaultAnswersValue[$question_id] != '' ? $defaultAnswersValue[$question_id] : $posted_value,
                                'default_value' => $answer_array[$question_id] != '' ? $answer_array[$question_id] : $defaultAnswersValue[$question_id],
                                //'default_value' =>  $defaultAnswersValue[$question_id],
                                );
                        //print_r($answerAttributeArray);
                        //echo "<br>";
                        get_answer_option_type($form, $answer_option, $inc, $answerAttributeArray,$explanation_array,$question_id);
                        //echo "\$answer_option_type: $answer_option_type<br />";

                        $form['question_'.$inc] = array(
                            '#type' => 'hidden',
                            '#value' => $question_id,
                        );

                        $form['explanation_configure_val'] = array(
                            '#type' => 'hidden',
                            '#value' => variable_get('explanation_configure',0),
                            '#size' => '3',
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
                            '#value' => $survey_questions[$inc]->required,
                        );
                        unset($answers);
                    }
                }

                $form['#id'] = 'mysurveyform';
                $form['#attributes']    =   array('name' => 'survey_name',);
                $params->page           =   $page;
                $params->totalPage      =   $total_pages;
                $params->ReqFlag        =   $ReqFlag;

                if($page == $total_pages)
                    $lastPageCustomContent  =   '<div class="normal-container">'.survey_display_textual_data('survey_textual_data_last_page','survey_flag_show_textual_data_last_page','.variable_get("survey_modalpopup_display", "").').'</div>';

                $form['#prefix']        =   theme('survey_form_prefix', $processedData, $params);
                $form['#suffix']        =   $processedData->location=='footer'?$processedData->CustomContent:' '.'<div style="clear:both;"></div>'.$lastPageCustomContent;

                $form['current_session'] = array(
                    '#type' => 'hidden',
                    '#value' => $session,
                );

                $form['survey_id'] = array(
                    '#type' => 'hidden',
                    '#value' => $surveyResult->surveyId,
                );

                $form['selected_answers'] = array(
                    '#type' => 'hidden',
                    //'#type' => 'textfield',
                    '#value' => $question_and_answer,
                );

                $form['totalpage'] = array(
                    '#type' => 'hidden',
                    '#value' => $total_pages,
                );

                $form['currentPageNo'] = array(
                    '#type' => 'hidden',
                    '#value' => $survey->page,
                );

                $form['retake'] = array(
                    '#type' => 'hidden',
                    '#value' => arg(2)=='retake'? '1':'0',
                );

                $paramsAbove    =   '\'survey_textual_data_abovesubmit\',\'survey_flag_show_textual_data_abovesubmit\','.variable_get("survey_modalpopup_display", "");
                $paramsBelow    =   '\'survey_textual_data_bottom\',\'survey_flag_show_textual_data_bottom\','.variable_get("survey_modalpopup_display", "");
                $textual_data_abovebutton   =   ' <div style="float: left;" > '. survey_display_textual_data($paramsAbove).'</div>';
                $textual_data_bottom        =    survey_display_textual_data($paramsBelow);
                //
                
                if ( $prev_value ) {
                    $form['prev_submit'] = array(
                        '#type' => 'submit',
                        '#id' => 'survey-prev-submit',
                        '#value' => $prev_value,
                        '#prefix' => '<div class="progressBar-cntnr"><span class = "survey_progressBar" id="Spb5"></span></div>'.$textual_data_abovebutton,
                    );
                }

                if ( $next_value ) {
                    if ($prev_value) {
                        $textual_data_abovebutton   =   '';
                    }

                    $form['prev_next'] = array(
                        '#type' => 'submit',
                        '#id' => 'survey-next-submit',
                        '#value' => $next_value,
                        '#suffix' => $textual_data_bottom,
                        '#prefix' => '<div class="progressBar-cntnr"><span class = "survey_progressBar" id="Spb5"></span></div>'.$textual_data_abovebutton,
                    );
                }

                if ( $submit_value ) {
                    if ($prev_value) {
                        $textual_data_abovebutton   =   '';
                    }
                    $form['submit'] = array(
                        '#type' => 'submit',
                        '#id' => 'survey-submit',
                        '#value' => $submit_value,
                        '#suffix' => $textual_data_bottom,
                        //'#prefix' => '<div class="progressBar-cntnr"><span class = "survey_progressBar" id="Spb5"></span></div><div class="clearBoth">&nbsp;</div>'.$textual_data_abovebutton .' ',
                        '#prefix' => $textual_data_abovebutton,
                    );
                }

                if ($prev_value) {
                    $form['Cancel'] = array(
                        '#type' => 'submit',
                        '#value' => 'Cancel',
                        '#attributes' => array('class' => 'edit-Cancel-first','onclick'=>'modelframe_close();return false;'),
                        '#suffix' => '',
                    );
                } else {
                    $form['Cancel'] = array(
                        '#type' => 'submit',
                        '#value' => 'Cancel',
                        '#attributes' => array('onclick'=>'modelframe_close();return false;'),
                        '#suffix' => '',
                    );
                }
                //survey_form_myvalidate($form);
                if (trim($ermsg) == ""){
                    //$form = drupal_rebuild_form('survey_dynamic_form',$form,null,null);
                    //return $form;
                }
                return $form;
            } else {
                drupal_set_message($err_msg, 'status',FALSE);
            }
        }
        return $form;
    }

    function multipath_survey_form(&$form_state,$surveyId) {
		global $user;
		$page               =   1;
		$question_per_page  =   1;
		/* For Retake the survey */

        $objSurveyData      =   new SurveyData();
		$objSurveyData->SetServiceName('evaluation');
		$objSurveyData->SetServiceIdentity('retake');
		$objSurveyData->SetMethod('get');
		$objSurveyData->set_evaluation_id($surveyId);

        $objSurveyData->set_current_page_no($page);
		$objSurveyData->set_user_id($user->uid);
		$objSurveyData->set_no_of_questions_per_page($question_per_page);
		$objSurveyData->set_user_operation('retake');
		$objSurvey = new survey();

        $processedData  =   json_decode($objSurvey->get_evaluation_retake_answers($objSurveyData));
		$answer_array   =   array();
		for($counter=0;$counter<count($processedData->evaluationResult[0]->evaluationQuestionResult);$counter++) {
            $answer_array[$processedData->evaluationResult[0]->evaluationQuestionResult[$counter]->questionId][$processedData->evaluationResult[0]->evaluationQuestionResult[$counter]->resultId] = $processedData->evaluationResult[0]->evaluationQuestionResult[$counter]->answerId;
		}

		$tmp_array  =   array();
		$temp       =   '';
		$tmp        =   array();

		foreach($answer_array AS $key=>$values) {
			$max = max(array_keys($answer_array[$key]));
			$tmp_array[$key] = $answer_array[$key][$max];
		}

		$surveyResult       =   $survey;
		$processedData      =   $surveyResult->data;
		//echo "<pre>";
		//print_r($processedData);
		//exit;
		$total_question =   $surveyResult->data->TotalCount;
//		$total_question = count($surveyResult->data->Question);
		$survey_questions   =   $surveyResult->questions;
		$survey_answers     =   $surveyResult->answers;
		$total_pages        =   ceil($total_question / $question_per_page);

		drupal_add_js('$(document).ready(function() {$("#Spb5").survey_progressBar('.$current_page.', { max: '.$total_pages.', textFormat: \'fraction\', barImage: \''.base_path().drupal_get_path('module', 'survey').'/images/progressbg_orange.gif\'} )});', 'inline', 'footer');
		drupal_add_js(drupal_get_path('module', 'survey') .'/js/survey_progress_bar.js', NULL, 'footer');
	
		if ( $total_pages == 1) {
			$submit_value       =   t('Submit');
		}
		else {
			if ( $current_page > 1 ) {
				$prev_value     =   t('Previous');
			}
			if ( $current_page < $total_pages ) {
				$next_value     =   t('Next');
			}
			if ( $current_page == $total_pages ) {
				$submit_value   =   t('Submit');
			}
		}

        if($surveyResult->status == 0)	{
			if( strlen($err_msg) < 1 ) {
				$pub_date_display = variable_get('survey_addeddate_display', 0);
				if ( $pub_date_display && $survey_content['published_date'] ) {
					//$pub_date =	'&nbsp;<div class=\'survey-form-published_on\'><span class=\'survey-form-published_on-text\'>'.t('Published on ').'</span><span class=\'survey-form-published_on-date\'>'.date('m-d-Y',strtotime($survey_content['published_date'])).'</span></div>';
					$pub_date   =   '&nbsp;<div class=\'survey-form-published_on\'><span class=\'survey-form-published_on-text\'>&nbsp;|&nbsp;</span><span class=\'survey-form-published_on-date\'>'.date('Y-m-d',strtotime($survey_content['published_date'])).'</span></div>';
				}
			}

			$form['style']  =   array(
				'#type' => 'markup',
				/*'#value' => "<style>.survey-questioncolor { color: ".variable_get('survey_question_color','#000000')." } </style>",*/
				'#value' => "",
			);

            $form['questions_count'] = array(
				'#type' => 'hidden',
				'#value' => count($survey_questions),
			);

            $form['difference_flag'] = array(
				'#type' => 'hidden',
				'#value' => 'multipath_form',
			);
			
			$ReqFlag =0;
			for ( $inc = 0; $inc < $question_per_page; $inc++ ) {
				if (isset($survey_questions[$inc]->id)) {
					$question       =   $survey_questions[$inc]->title;
					$question_id    =   $survey_questions[$inc]->id;
					$multiple       =   FALSE;
					$answer_option  =   $survey_questions[$inc]->questionTypeName;

					if(is_array($survey_answers))
					foreach ($survey_answers as $element ) {
						if( $element->questionid==$question_id ) {
							$answer_id                              =   $element->id;
							$answer_title                           =   $element->title;
							$answers[$answer_id]                    =   $answer_title;

							if($element->isDefault){
//								echo "question id=".$question_id; 
								//$answer_id = $answer_array[$question_id];
								$answer_id                          =   $tmp_array[$question_id];
								$defaultAnswersValue[$question_id]  =   array($answer_id);
							} else {
								$answer_id = $tmp_array[$question_id];
								$defaultAnswersValue[$question_id]  =   array($answer_id);
							}
						}
					}

					$form_req   =   $survey_questions[$inc]->required == 1 ? "&nbsp;<span class='survey-form-required'></span>":'';
					if($survey_questions[$inc]->required == 1){
						$ReqFlag = 1;
					}

					//echo "{$start_question}+{$inc}<br />";
					$question_title     =   '<span class=\'survey-questioncolor\'>'.($start_question+$inc+1) . '. '. t($question).'</span>';
					$option_description =   '';

                    if (form_get_errors()) {
                      if(strtolower($answer_option) == 'radiobutton' || strtolower($answer_option) == 'singleselectlistbox' || strtolower($answer_option) == 'dropdown' || strtolower($answer_option) == 'textbox') {
                        $posted_value   =   array('0' => $form_state['values']['answer_'.$inc]);
                      } else {
                        $posted_value = $form_state['values']['answer_'.$inc];
                      }
                    }

					$answerAttributeArray = array(
                        'answers' => $answers,
                        'question_title' => $question_title,
                        'option_description' => $option_description,
                        'required' => $survey_questions[$inc]->required == 1?TRUE:FALSE,
                        'default_value' => $defaultAnswersValue[$question_id] != '' ? $defaultAnswersValue[$question_id] : $posted_value,
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
						'#value' => $survey_questions[$inc]->required,
					);
					unset($answers);
				}
			}
	
            $form['#id']            =   'mysurveyform';
            $form['#attributes']    =   array('name' => 'survey_name',);
            $params->page           =   $page;
            $params->totalPage      =   $total_pages;
            $params->ReqFlag        =   $ReqFlag;

            if($page == $total_pages) {
                $lastPageCustomContent  =   '<div style="float:left;width:100%">'.survey_display_textual_data('survey_textual_data_last_page','survey_flag_show_textual_data_last_page').'</div>';
            }

            $form['#prefix']    =   theme('survey_form_prefix', $processedData, $params);
            $form['#suffix']    =   '<div>'.$processedData->location=='footer'?$processedData->CustomContent:''.'</div>'.$lastPageCustomContent;

            $form['current_session'] = array(
				'#type' => 'hidden',
				'#value' => $session,
			);

            $form['survey_id'] = array(
				'#type' => 'hidden',
				'#value' => $surveyResult->surveyId,
			);

            $form['selected_answers'] = array(
				'#type' => 'hidden',
				//'#type' => 'textfield',
				'#value' => $question_and_answer,
			);

            $form['totalpage'] = array(
				'#type' => 'hidden',
				'#value' => $total_pages,
			);

            $form['currentPageNo'] = array(
				'#type' => 'hidden',
				'#value' => $survey->page,
			);

            $form['retake'] = array(
				'#type' => 'hidden',
				'#value' => arg(2)=='retake'? '1':'0',
			);
	
			$textual_data_abovebutton   =   survey_display_textual_data('survey_textual_data_abovesubmit','survey_flag_show_textual_data_abovesubmit');
			$textual_data_bottom        =   survey_display_textual_data('survey_textual_data_bottom','survey_flag_show_textual_data_bottom');

			if ( $prev_value ) {
				$form['prev_submit'] = array(
					'#type' => 'submit',
					'#id' => 'survey-prev-submit',
					'#value' => $prev_value,
					'#prefix' => '<div class="progressBar-cntnr"><span class = "survey_progressBar" id="Spb5"></span></div>'.$textual_data_abovebutton,
				);
			}
	
			if ( $next_value ) {
				if ($prev_value) {
					$textual_data_abovebutton   =   '';
				}

				$form['prev_next'] = array(
					'#type' => 'submit',
					'#id' => 'survey-next-submit',
					'#value' => $next_value,
					'#suffix' => $textual_data_bottom,
					'#prefix' => '<div class="progressBar-cntnr"><span class = "survey_progressBar" id="Spb5"></span></div>'.$textual_data_abovebutton,
				);
			}
	
			if ( $submit_value ) {
				if ($prev_value) {
					$textual_data_abovebutton   =   '';
				}

                $form['submit'] = array(
					'#type' => 'submit',
					'#id' => 'survey-submit',
					'#value' => $submit_value,
					'#suffix' => $textual_data_bottom,
					//'#prefix' => '<div class="progressBar-cntnr"><span class = "survey_progressBar" id="Spb5"></span></div>'.$textual_data_abovebutton,
                    '#prefix' => $textual_data_abovebutton,
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


    function survey_form_validate($form, &$form_state ) {
        /*
            foreach($form as $key1=>$firstlevel){
              foreach($firstlevel as $key2=>$secondlevel){
                if(in_array('#type',$form[$key1][$key2])){
                   if($form[$key1][$key2]['#type'] == 'sourceTargetList'){
                      $form[$key1][$key2]['#required'] = '';
                   }
                 }
              }
            }

            if($form_state['values']['op'] == t('Submit')){
                $form['#multistep'] = TRUE;
                $form_state['currentPageNo'] = FALSE;
            }
        */
    }

    function survey_form_submit($form, &$form_state ) {
        if ($form_state['values']['op'] == t('Next')) {
            $form_state['storage']['page']++;
        }

        if ($form_state['values']['op'] == t('Previous')) {
            $form_state['storage']['page']--;
        }

        if($form_state['values']['op'] != t('Submit')&& $form_state['values']['totalpage'] > $form_state['values']['currentPageNo']) {
            $form_state['rebuild']  =   TRUE;
            $form_state['storage'][$form_state['storage']['page']]['values'] = $form_state['values'];

            if($form_state['clicked_button']['#post']['op']!='Previous') {
                $result = create_survey_evaluation($form_state);
                if ( $result->Message=='Success'){
                    //drupal_set_message(t('Your Survey on the page number has been posted'), 'status',FALSE);
                } else{
                    form_set_error('submit', t('Oops! An error has occured, please try again later!'));
                }
            }
        } else if($form_state['values']['op'] == t('Submit') && $form_state['values']['totalpage'] == $form_state['values']['currentPageNo']) {
            $result =   create_survey_evaluation($form_state);
            if ( $result->Message=='Success'){
                drupal_set_message(t('Thanks for taking the survey'), 'status',FALSE);
                survey_redirect($form_state['values']['survey_id'],$result->ResultId);
                exit;
            } else
                $err_msg= t('Oops! An error has occured, please try again later!');
        }
    }
    function multipath_survey_form_submit() {
    //
    //	echo "<pre>";
    //	print_r($form_state);
    //	echo "</pre>";
    //	exit;

        if ($form_state['values']['op'] == t('Next')) {
            $form_state['storage']['page']++;
        }
        if ($form_state['values']['op'] == t('Previous')) {
            $form_state['storage']['page']--;
        }
        if($form_state['values']['op'] != t('Submit')&& $form_state['values']['totalpage'] > $form_state['values']['currentPageNo']) {
            $form_state['rebuild'] = TRUE;
            $form_state['storage'][$form_state['storage']['page']]['values'] = $form_state['values'];

            $result = create_survey_evaluation($form_state);
            if ( $result->Message=='Success'){
                //drupal_set_message(t('Your Survey on the page number has been posted'), 'status',FALSE);
                }
            else{
                form_set_error('submit', t('Oops! An error has occured, please try again later!'));
            }
        } else if($form_state['values']['op'] == t('Submit') && $form_state['values']['totalpage'] == $form_state['values']['currentPageNo']){

            $result = create_survey_evaluation($form_state);
            if ( $result->Message=='Success'){
                drupal_set_message(t('Thanks for taking the survey'), 'status',FALSE);
                survey_redirect($form_state['values']['survey_id']);
                exit;
                }
                else
                $err_msg= t('Oops! An error has occured, please try again later!');
        }
    }

function survey_result($isPage = TRUE) {
  global $itrinno_site_id;
if($isPage){
	if(variable_get('survey_modalpopup_display', 0) == 1){
		  $module_path = drupal_get_path('module', 'survey');
		  drupal_add_css($module_path .'/css/survey_modal.css');
		if(variable_get('survey_trigger_popup', 0) != 0){
			if($_GET['renderType'] == 'popover'){
				modalframe_child_js();	
				}
		}else{
			if($_GET['renderType'] == 'popover'){
			modalframe_child_js();
			}
		}
	}
	$surveyId = arg(2);
}else{
	$surveyId = get_survey_id();
}	
	//modalframe_child_js();
	global $session_value,$past_result_message,$base_root;
	$obj_survey = new survey();
	
	$err_msg='';

	$objSurveyData = new SurveyData();

	$objSurveyData->SetServiceName('evaluation');
	$objSurveyData->SetServiceIdentity('graph');
	$objSurveyData->SetSiteId($itrinno_site_id);
	$objSurveyData->SetMethod('get');
	$objSurveyData->set_evaluation_id($surveyId);
	$objSurveyData->set_current_page_no(1);
	$objSurveyData->set_no_of_questions_per_page(1);
 //$objEvaluationData->SetServiceURL('http://172.16.5.217:8080/evaluationService/evaluation/'.$evaluationId.'/1/5');

	$objsurvey = new survey();
	$TotalcountData = $objsurvey->get_evaluation_result_survey($objSurveyData);

	$Totalpagecountgraph = 10000;//$TotalcountData->TotalCount+1;TODO: Number of result side records are hardcoded have to remove it

	$objNewData = new SurveyData();

	$objNewData->set_no_of_questions_per_page($Totalpagecountgraph);
	$objNewData->SetServiceName('evaluation');
	$objNewData->SetServiceIdentity('graph');
	$objNewData->SetSiteId($itrinno_site_id);
	$objNewData->SetMethod('get');
	$objNewData->set_evaluation_id($surveyId);
	$objNewData->set_current_page_no(1);

	$objProcessedData = new survey();
	
	$processedData = $objProcessedData->get_evaluation_result_survey($objNewData);
	
	
	//$survey_content = $obj_survey->getEvaluationTitle($evaluation_id, $err_msg);
	//echo '<pre>';print_r($processedData);echo '</pre>';

	$output = '';
	$swf_path = $base_root . base_path() . drupal_get_path('module', 'survey')."/";
 	/* $output .='		<script src="'.$swf_path.'js/FusionCharts.js" language="javascript"></script>'."\n";*/
	if( strlen($err_msg) < 1 ) {
		$pub_date_display = variable_get('survey_addeddate_display', 0);
		if ( $pub_date_display && $survey_content['published_date'] ) {
			//$pub_date =	'&nbsp;<div class=\'survey-form-published_on\'><span class=\'survey-form-published_on-text\'>'.t('Published on ').'</span></span><span class=\'survey-form-published_on-date\'>'.date('m-d-Y',strtotime($survey_content['published_date'])).'</span></div>';
			// $pub_date =	'&nbsp;<div class=\'survey-form-published_on\'><span class=\'survey-form-published_on-text\'>&nbsp;|&nbsp;</span></span><span class=\'survey-form-published_on-date\'>'.date('Y-m-d',strtotime($survey_content['published_date'])).'</span></div>';
		}
		
		if($isPage){
		drupal_set_title($processedData->EvaluationText.$pub_date);
		}else{
			global $blockTitle;
			$blockTitle = $processedData->EvaluationText;
		}
		$output='';
		$output .= survey_display_textual_data('survey_textual_data_top','survey_flag_show_textual_data_top');
		//$output .= '<h2 class=\'survey-result-title\'>'.$survey_content['display_title'].$pub_date.'</h2>';
		$output .= survey_display_textual_data('survey_textual_data_abovedesc_r','survey_flag_show_textual_data_abovedesc_r');
		//$output .='<div class=\'survey-result-description\'>'.$survey_content['description_text'].'</div>';
		$output .= survey_display_textual_data('survey_textual_data_belowdesc_r','survey_flag_show_textual_data_belowdesc_r');
	}

	$question_title = '';
	$err_msg= '';
 	// $result = $obj_survey->get_evaluation_result_survey($evaluation_id, $err_msg);

	if( strlen($objSurveyData->get_error_message()) < 1 ) {
		$config_chart_type= variable_get('survey_chart_type', 'pie');
		$ques_processed= array();
		$ques_arr= array();
		$output.="<br />";
		$base_path= base_path();
		//echo 'result<br /><pre>';print_r($result);echo '</pre><hr>';

		$arr_find = array("|","*");
		$arr_replace = array("~^siphenmark^~","~^sstarmark^~");
		if( $processedData->TotalCount>0 ) {
			for( $i = 0; $i<count($processedData->Question); $i++ ) {

				$quesid= $processedData->Question[$i]->QuestionId;
				$ques= $processedData->Question[$i]->DisplayText;
				//$totalResponse = $processedData->Question[$i]->totalResponse; // total response count
				if( in_array($quesid, $ques_processed) )
					continue;
				$dataSet[$quesid] = $split_point. str_replace($arr_find,$arr_replace,$processedData->Question[$i]->Answer[0]->Answer)."|".str_replace($arr_find,$arr_replace,$processedData->Question[$i]->Answer[0]->Count);
				$total_response[$quesid] = $total_response[$quesid] + $processedData->Question[$i]->Answer[0]->Count; // total response count
				$split_point = "*";

				if( !in_array($quesid, $ques_processed) ) {
					$ques_processed[]= $quesid;
					$ques_arr[$quesid]= $ques;
					
				}

				for( $j=1; $j<count($processedData->Question[$i]->Answer); $j++ ) {
					if ( $processedData->Question[$i]->QuestionId==$quesid ) {
							$dataSet[$quesid] .= $split_point. str_replace($arr_find,$arr_replace,$processedData->Question[$i]->Answer[$j]->Answer)."|".str_replace($arr_find,$arr_replace,$processedData->Question[$i]->Answer[$j]->Count);
							$total_response[$quesid] = $total_response[$quesid] + $processedData->Question[$i]->Answer[$j]->Count; // total response count
					}
				}
				$split_point = "";
			}
			$no_count=1;
			foreach ($ques_processed as $i ) {
				$output.= '<div class=\'form-eveluation-question\'>'.$no_count.". ".$ques_arr[$i].'</div>';
				$ecnoded_url = base64_encode(base64_encode($dataSet[$i]));
				//$src_url = server_url().base_path()."?q=result_image/".$ecnoded_url."/".rand();
				$output.= "<div class='form-eveluation-graphimage'>".survey_flex_graph($ecnoded_url)."</div>"; //<input type='text' value='".$src_url."'><br />";
				$output.= "<div class='form-evaluation-totalusers'>".t('Total Response ').$total_response[$i]."</div>"; // total response count
				$no_count++;
			}
			$surveytitlepath = $base_root . base_path() . "surveytitle";
			$output.= "<div class='myclose'><input type='button' name='poll_title' value='Return to Survey topics' onclick='modelframe_close();return false;'></div>";
		}
		else {
			$output.=t("No results found!");
		}
	}
	else {
		$output.= $err_msg;
	}

	//For showing or not, the re-take survey button

	//Show re-take button only if
	//a. Evaluation has the can_retake flag set to 1
	//b. Evaluation is active - has a status >1

	$textual_data_bottom = survey_display_textual_data('survey_textual_data_bottom_r','survey_flag_show_textual_data_bottom_r');
	if ( $result["GetEvaluationResultResponse"]["CanRetake"]==1 && $result["GetEvaluationResultResponse"]["EvaluationStatus"]>0){
		$output .= drupal_get_form('retake_survey');
	}
	$output .= $textual_data_bottom;
	return $output;
}

/*
*	Page Callback for survey thank you page
*/
function survey_thank_you($isPage = TRUE){
	if(is_numeric(arg(1)) && arg(0) == 'survey'){
		$surveyId = arg(1);
	}else{
		$surveyId = get_survey_id();
	}
	
	$result = get_survey($surveyId, 1, 1);
	$decodedResult = json_decode($result);
	if($isPage){
		if(variable_get('survey_modalpopup_display', 0) == 1){
		  $module_path = drupal_get_path('module', 'survey');
		  drupal_add_css($module_path .'/css/survey_modal.css');
		if($_GET['renderType'] == 'popover')
			modalframe_child_js();
		}
		
		drupal_set_title($decodedResult->data->EvaluationText);
	}else{
		global $blockTitle;
		$blockTitle = $decodedResult->data->EvaluationText;
	}
	$output .= survey_display_textual_data('survey_textual_data_above_thankyou','survey_flag_show_textual_data_above_thankyou');
	if(arg(2) != 'multipath') {
		//$output .= variable_get('survey_thanksmessage', 'Thank you for taking the survey');
	}
	$output .= survey_display_textual_data('survey_textual_data_below_thankyou','survey_flag_show_textual_data_below_thankyou');
	if(arg(2) == 'multipath') {
		session_unset();
		//$output .= variable_get('survey_thanksmessage', 'Thank you for taking the survey');
		drupal_set_message('Thank you for taking the Survey');	
		$output .= ' '.l(' Click here to retake the survey','survey/multipath/'.arg(3).'/1');

	} else {
		$_SESSION['store_pre_ans'] = 0;
		unset($_SESSION['previous_value_array']);
		if(arg(2)==$_SESSION['survey_id']) { 
			if(arg(3)!='') { 
				$result_id = arg(3); 
				$_SESSION['result_id'] = $result_id;
			}
			if($_SESSION['result_id']!='')  { 
				$result_id = $_SESSION['result_id'];
			}
			else { 
				$_SESSION['result_id'] = arg(3);
			}

			$_SESSION['survey_id'] = arg(2);
		} else {
			if(arg(3)!='') {
				$result_id = arg(3); 
				$_SESSION['result_id'] = $result_id;
			} else {
				unset($_SESSION['result_id']);
			}
			$_SESSION['survey_id'] = arg(2);
		}
		$output .= ' '.l(' Click here to retake the survey ','survey/'.arg(2).'/1'.'/'.$result_id);
	}


	return $output;
}

function survey_result_graph() {
		$strurl = arg(1);
		$decoded_url = base64_decode(base64_decode($strurl));
		$grap_values=$decoded_url;

		$arr_graph = explode("*",$grap_values);
		$arr_find = array("~^siphenmark^~","~^sstarmark^~");
		$arr_replace = array("|","*");
			$i=1;
		if ( is_array($arr_graph) ) {
			foreach ( $arr_graph as $ans_val ) {
				$arr_answer = explode("|",$ans_val);
				$answer_name =$arr_answer[0];
				$result_value =$arr_answer[1];
				$answer_name = str_replace($arr_find,$arr_replace,$answer_name);
				$result_value = str_replace($arr_find,$arr_replace,$result_value);
				
				if (trim($answer_name)!='' && is_numeric($result_value)) {
					$arraylist_NameValue .= '<set name="'.$answer_name.'" showValue="0" value="'.$result_value.'" color="'.str_replace('#','',variable_get('survey_chart_color_'.$i, '')).'" isSliced="0" />'; // $amp . "=$result_value";
					$i++;
				}
			}
		}
		else {
			$arr_answer = explode("|",$grap_values);
			$answer_name =$arr_answer[0];
			$result_value =$arr_answer[1];
			$answer_name = str_replace(array("~^siphenmark^~","~^sstarmark^~"),array("|","*"),$answer_name);
			$result_value = str_replace(array("~^siphenmark^~","~^sstarmark^~"),array("|","*"),$result_value);

			if (trim($answer_name)!='' && is_numeric($result_value)) {
				$arraylist_NameValue .= '<set name="'.$answer_name.'" showValue="0" value="'.$result_value.'"	color="'.str_replace('#','',variable_get('survey_chart_color_'.$i, '')).'" isSliced="0" />';
			}
		}

		$config_chart_type= variable_get('survey_chart_type', 'pie');

			$chartsettings .= " bgColor = \"".variable_get('survey_chart_background_color','#ffffff')."\" ";
			$chartsettings .= " bgAlpha = \"".variable_get('survey_chart_background_bgalpha','100')."\" ";
			$chartsettings .= " baseFont = \"".variable_get('survey_chart_font_name','Arial')."\" ";
			$chartsettings .= " baseFontColor = \"".variable_get('survey_chart_font_color','#00000')."\" ";
			$chartsettings .= " baseFontSize = \"".variable_get('survey_chart_font_size','12')."\" ";
			$chartsettings .= " shownames = \"".variable_get('survey_chart_show_names','1')."\" ";
			$chartsettings .= " showValues = \"".variable_get('survey_chart_show_values','1')."\" ";
			$chartsettings .= " animation = \"".variable_get('survey_chart_animation','1')."\" ";
			$chartsettings .= " canvasBgColor = \"".variable_get('survey_chart_canvasbackground_color','1')."\" ";
			$chartsettings .= " canvasBorderColor = \"".variable_get('survey_chart_canvasborder_color','1')."\" ";
			$chartsettings .= " canvasBgAlpha = \"".variable_get('survey_chart_canvasbackground_bgalpha','100')."\" ";
			$chartsettings .= " canvasBorderThickness = \"".variable_get('survey_chart_canvasborder_size','1')."\" ";

			$chartsettings = str_replace('#','', $chartsettings);

		// $chartsettings='';
		switch ($config_chart_type) {
			case 'pie':

				$xml = '<graph	'.$chartsettings.' decimalPrecision="0">';
				$xml .= $arraylist_NameValue;
				$xml .= '</graph>';
			break;
			case 'column':
				$chartsettings .= " rotateNames = \"".variable_get('survey_chart_rotate','1')."\" ";
				$chartsettings .= " xAxisName = \"".variable_get('survey_chart_x_axis_title','')."\" ";
				$chartsettings .= " yAxisName = \"".variable_get('chart_y_axis_title','Title')."\" ";
				$chartsettings .= "yAxisMinValue='0'";

				$xml = '<graph '.$chartsettings.' decimalPrecision="0" formatNumberScale="0">';
				$xml .= $arraylist_NameValue;
				$xml .= '</graph>';
			break;
			case 'bar': 
				$chartsettings .= " rotateNames = \"".variable_get('survey_chart_rotate','1')."\" ";
				$chartsettings .= " xAxisName = \"".variable_get('survey_chart_x_axis_title','')."\" ";
				$chartsettings .= " yAxisName = \"".variable_get('chart_y_axis_title','Title')."\" ";
				$chartsettings .= "yAxisMinValue='0'";
				$xml = '<graph '.$chartsettings.' decimalPrecision="0" formatNumberScale="0">';
				$xml .= $arraylist_NameValue;
				$xml .= '</graph>';
			break;
			case 'line':
				$chartsettings .= " rotateNames = \"".variable_get('survey_chart_rotate','1')."\" ";
				$chartsettings .= " xAxisName = \"".variable_get('survey_chart_x_axis_title','')."\" ";
				$chartsettings .= " yAxisName = \"".variable_get('chart_y_axis_title','Title')."\" ";
				//$xml = '<graph caption="" subcaption="" showLegend="1"	xAxisName="" yAxisMinValue="15000" yAxisName="" decimalPrecision="0" formatNumberScale="0" numberPrefix="" showNames="1" showValues="1" showAlternateHGridColor="0" AlternateHGridColor="ff5904" divLineColor="ff5904" divLineAlpha="20" alternateHGridAlpha="5">';
				$xml = '<graph '.$chartsettings.' decimalPrecision="0" formatNumberScale="0" numberPrefix=""	showAlternateHGridColor="0" AlternateHGridColor="ff5904" divLineColor="ff5904" divLineAlpha="20" alternateHGridAlpha="5">';
				$xml .= $arraylist_NameValue;
				$xml .= '</graph>';
			break;
			case 'area':
				$chartsettings .= " rotateNames = \"".variable_get('survey_chart_rotate','1')."\" ";
				$chartsettings .= " xAxisName = \"".variable_get('survey_chart_x_axis_title','')."\" ";
				$chartsettings .= " yAxisName = \"".variable_get('chart_y_axis_title','Title')."\" ";
				$xml = '<graph '.$chartsettings.' decimalPrecision="0" formatNumberScale="0"	showAlternateHGridColor="0" AlternateHGridColor="009966" divLineColor="FF3366" divLineAlpha="20" alternateHGridAlpha="5">';
				$xml .= $arraylist_NameValue;
				$xml .= '</graph>';
			break;
			default:
			break;
		}
		header("Content-Type: text/xml");
		echo $xml;
}

function survey_flex_graph($strurl) {
		$config_chart_type= variable_get('survey_chart_type', 'pie');
		global $base_root;
		//exit;
		//$chart_width = '500';
		//$chart_height = '350';
		$server_url = server_url();

		//$swf_path = $base_root. base_path() . drupal_get_path('module', 'evaluation')."/";

	$swf_path = drupal_get_path('module', 'survey')."/";

	drupal_add_js($swf_path.'js/FusionCharts.js');

	/*$html = '<script src="'.$swf_path.'js/FusionCharts.js" language="javascript"></script>'."\n";*/

		switch ($config_chart_type) {
			case 'pie':
				$div_id = 'pie_'.rand(0,999);
				$chart_name = "FCF_Pie2D.swf";
			break;
			case 'column':
				$div_id = 'col_'.rand(0,999);
				$chart_name = "FCF_Column2D.swf";
			break;
			case 'bar':
				$div_id = 'bar_'.rand(0,999);
				$chart_name = "FCF_Bar2D.swf";
			break;
			case 'line':
					$div_id = 'lin_'.rand(0,999);
					$chart_name = "FCF_Line.swf";
			break;
			case 'area':
					$div_id = 'area_'.rand(0,999);
					$chart_name = "FCF_Area2D.swf";
			break;

			default:
				break;
		}
		//echo $server_url.base_path().'?q=result_image/'.$strurl.'<br />';
		$chart_width = variable_get('survey_chart_size_width','500');
		$chart_height = variable_get('survey_chart_size_height','350');
		$html .= '
			<div id="'.$div_id.'"></div>
			<script type="text/javascript">
					var chart1 = new FusionCharts("'.$base_root. base_path() . $swf_path.'charts/'.$chart_name.'", "ChId1", "'.$chart_width.'", "'.$chart_height.'");
					chart1.setDataURL("'.base_path().'?q=result_image/'.$strurl.'")
					chart1.render("'.$div_id.'");
			</script>
			';
		return $html;
}

function retake_survey() {
	$textual_data_abovebutton = survey_display_textual_data('survey_textual_data_abovesubmit_r','survey_flag_show_textual_data_abovesubmit_r');
	$form['survey_try_again'] = array(
		'#type' => 'submit',
		'#attributes' => array('class'=>'survey-retake-button'),
		'#prefix' => $textual_data_abovebutton.'<div class=\'survey-retake\'>',
		'#value' => t('Re-Take'),
		'#suffix' => '</div>'.$textual_data_bottom,
	);
	return $form;
}

function retake_survey_submit() {
	$obj_survey = initialize_survey_client();
	$survey_id = arg(2);
	drupal_goto('survey/' . $survey_id . '/retake');
}

function menuitem_update_submit($module, $menu_title, $menu_items = array() ) {
	$item = array();
	$menu_array = db_fetch_object(db_query("SELECT menu_name FROM {menu_custom} WHERE menu_name = '%s'", $menu_title));
	$menu_name = $menu_array->menu_name;
	$item['link_path'] = $menu_items['link_path'];
	$item['mlid'] = 0;
	$item['module'] = $module;
	$item['has_children'] = 0;
	$item['customized'] = 1;
	$item['link_title'] = $menu_items['link_title'];
	$item['enabled'] = 1;
	$item['expanded'] = 0;
	$item['weight'] = 0;
	$item['options']['attributes']['title'] = $menu_items['description'];
	$item['menu_name'] = $menu_name;
	$item['plid'] = 0;

	menu_link_save($item);
	menu_rebuild();
}

function server_url() {
	$s = empty( $_SERVER["HTTPS"] ) ? '' : ( $_SERVER["HTTPS"] == "on" ) ? "s" : "";
	$s1 =$_SERVER["SERVER_PROTOCOL"];
	$s2 = "/";
	$protocol = substr($s1, 0, strpos($s1, $s2));
	$port = ( $_SERVER["SERVER_PORT"] == "80" || $_SERVER["SERVER_PORT"] == "443" ) ? "" : ( ":".$_SERVER["SERVER_PORT"] );
	return $protocol."://".$_SERVER['SERVER_NAME'].$port;
}

function html2rgb($color ) {
		if ( $color[0] == '#' )
				$color = substr($color, 1);

		if ( strlen($color) == 6 )
				list($r, $g, $b) = array($color[0].$color[1],
																	$color[2].$color[3],
																	$color[4].$color[5]);
		elseif ( strlen($color) == 3 )
				list($r, $g, $b) = array($color[0].$color[0], $color[1].$color[1], $color[2].$color[2]);
		else
				return false;

		$r = hexdec($r); $g = hexdec($g); $b = hexdec($b);

		return array($r, $g, $b);
}

function rgb2html($rgb)
{

		list($r,$g,$b) = split(",",$rgb);
		$r = intval($r);
		$g = intval($g);
		$b = intval($b);

		$r = dechex($r<0?0:($r>255?255:$r));
		$g = dechex($g<0?0:($g>255?255:$g));
		$b = dechex($b<0?0:($b>255?255:$b));

		$color = (strlen($r) < 2?'0':'').$r;
		$color .= (strlen($g) < 2?'0':'').$g;
		$color .= (strlen($b) < 2?'0':'').$b;
		return '#'.$color;
}
/*
function survey_display_textual_data($textdata_variable,$flag_show,$showModal =  '') {
    $flag_show = variable_get($flag_show,false);print_r($textdata_variable);exit;
	$fck_editor_value = '';
	if ( ($flag_show) ) {
		$fck_editor_value = '<div class=\''.$textdata_variable.'\'>'.variable_get($textdata_variable,'').'</div>';
	} else if ($showModal == 0) {
            $surveyId   =   _get_latest_survey_id();
            $options = array('attributes' => array('class' => 'survey-popover-style modalframe-exclude'. (!empty($size) ? ' survey-size['. $size .']' : '')));
            if ($textdata_variable == 'survey_textual_data_activesurvey')
                return l(str_replace('survey_textual_data_active','',$textdata_variable), $path.'/survey/'.$surveyId, $options);
            else
                return l(variable_get($textdata_variable,''), $path.'/survey/'.$surveyId, $options);
    }
	return $fck_editor_value;
}
*/
function survey_display_textual_data($textdata_variable,$flag_show ) {
	$flag_show = variable_get($flag_show,false);
	$fck_editor_value = '';
	if ( $flag_show ) {
		$fck_editor_value = '<div class=\''.$textdata_variable.'\'>'.variable_get($textdata_variable,'').'</div>';
	}
	return $fck_editor_value;
}
/*
*	Page callback for the title page
*/

function survey_title_page($renderType = '') {
		$_SESSION['store_pre_ans'] = 0;
		unset($_SESSION['previous_value_array']);
		  if(arg(1) && is_numeric(arg(1)) && arg(0) == 'surveytitle'){
				$page = arg(1);
			}else{
				$page = 1;
			}
		$no_of_ques = 10;
		  $queryValue = array();
		  $renderType = '';
		  if(!empty($renderType) || $_GET['renderType'] == 'block'){
		  		$renderType = 'block';
				$queryValue[0] = 'renderType=block';
				$attribute = array('class' => 'survey-title-link');
		  }else{
//		  	drupal_set_title(survey_display_textual_data('survey_textual_title_activesurvey','survey_flag_show_textual_data_activesurvey'));
			drupal_set_title('Survey');

		  	$attribute = array();
		  }

		$decodedData = get_survey_titles($page, $no_of_ques);



		$output = survey_display_textual_data('survey_textual_data_activesurvey','survey_flag_show_textual_data_activesurvey');

		$query = array('query' => implode('&', $queryValue), 'attributes'=>$attribute);

		$output .= theme('survey_title', $decodedData->Evaluation, $decodedData->TotalCount, 'survey','');
		if($page > 1){
			$first = '<span style="margin:5px;">'.l('First', 'surveytitle/1', $query).'</span>';
		$previous = '<span style="margin:5px;">'.l('Previous','surveytitle/'.($page-1), $query).'</span>';
		}
		
		$display_pages = 10;
		$no_of_pages = ceil($decodedData->TotalCount/$no_of_ques);
		$start_page = 1;
		if($decodedData->TotalCount > $no_of_ques){
			if($no_of_pages > $display_pages && $page >= $display_pages){
				$start_page = $page;
				if($no_of_pages >= $start_page+$display_pages){
					$end_page = $start_page+$display_pages-1; 
				}
				else {
					$end_page = $no_of_pages; 
				}
			}else if($no_of_pages > $display_pages){
				$end_page = $display_pages;
			}else{
				$end_page = ceil($decodedData->TotalCount/$no_of_ques);
			}
			for($i = $start_page; $i<=$end_page; $i++){
				if($i == $page){
					$pager.='<span style="margin:5px;">'.$i.'</span>';
				}else{
					$pager.='<span style="margin:5px;">'.l($i, 'surveytitle/'.$i, $query).'</span>';
				}
			}
		}


		if($page < ceil($decodedData->TotalCount/$no_of_ques)){

			$next = '<span style="margin:5px;">'.l('Next', 'surveytitle/'.($page+1), $query).'</span>';
		$last = '<span style="margin:5px;">'.l('Last', 'surveytitle/'.ceil($decodedData->TotalCount/$no_of_ques), $query).'</span>';
		}

		$pagination = $first.$previous.$pager.$next.$last;
	  /*if($_GET['renderType'] == 'block'){
			echo $output.$pagination;
			exit;
		}else{
			return $output.$pagination;
		}*/
		return $output.$pagination;
}

/*
	List of Multipath survey
*/
function survey_multipath() {
		  if(arg(1) && is_numeric(arg(1)) && arg(0) == 'survey-multipath'){
				$page = arg(1);
			}else{
				$page = 1;
			}
		$queryValue = array();
		drupal_set_title('Multipath Survey');
		$attribute = array();
		$decodedData = get_multipath_survey_titles($page, 1200);
		$array_of_multipath_survey = get_array_of_multipath_survey($decodedData);

		$output .= theme('survey_multipath_title', $decodedData->Evaluation, $decodedData->TotalCount, 'survey','multipath',$array_of_multipath_survey);
		return $output;
}

function get_array_of_multipath_survey($decodedData) {
	$array = array();
	//echo count($decodedData->Evaluation);
	for($counter=0;$counter<count($decodedData->Evaluation);$counter++) {
		$array[$decodedData->Evaluation[$counter]->EvaluationId] = $decodedData->Evaluation[$counter]->DisplayName;
	}
	return $array;
}

function survey_redirect($survey_id = '',$result_id = null){
	
	if(isset($_GET['renderType'])){
		$query = 'renderType=popover';
	}else{
		$query = NULL;
	}

	switch(variable_get('survey_page_redirect', 0)){

		case 0:
		/*	Redirect to thank you page where we display the thank you
		*	Message Display by the admin
		*/
			drupal_goto('thank-you/survey/'.$survey_id.'/'.$result_id, $query);exit;
		break;

		case 1:
		/*	Redirect to Survey result page
		*/
			drupal_goto('survey/result/' . $survey_id, $query);exit;
		break;

		case 2:
		/*	Redirect to relative url or custome url
		*/
			$variable = variable_get('survey_redirect_custom_url', '');
			if(!empty($variable)){
				drupal_goto($variable);exit;
			}else{
				drupal_set_message('You will be redirecting a page which is not set by admin', 'error',FALSE);
				drupal_goto('survey/result/' . $survey_id, $query);exit;
			}
		break;

	}
}

/*
*	Page callback for the survey page
*/
function survey_page($survey){

    drupal_add_js(drupal_get_path('module', 'survey') .'/js/survey_admin.js');

global $user;
	$get_configure_variable = variable_get('user_first_last_configure',0);
	if(variable_get('annonymus_user_session_id',0) != session_id())  {
		//variable_del('user_first_last_configure');
		variable_del('annonymus_user_first_name',0);
		$get_user_first_name = variable_get('annonymus_user_first_name',0);
	} else  {
		$get_user_first_name = variable_get('annonymus_user_first_name',0);
	}
	
	 //$annonymus_user_session_id = session_id();

	if(variable_get('annonymus_user_session_id',0) != session_id()) {	   
		if($user->uid == 0 && empty($get_user_first_name) && $get_configure_variable == 1) {
			drupal_goto('survey/annoynomus_user/'.arg(1).'/1', 'renderType=popover');
			exit;
		}
	}
	if(arg(1)!='multipath-questions') {
	
        $survey_data = survey_load($survey);
		$result = json_decode($survey_data);
		//Check whether the user had taken the survey or not
		if($result->status == 1){
			//Taken Redirect to the result page
			drupal_set_message(t('You have already taken this survey.'));
			survey_redirect($result->surveyId);
			exit;
		}else{
			//Not Taken the survey already
			
			/*	Check whether the page is loaded in modal Pop over
			*	Or in the window directly
			*/

			  if(variable_get('survey_modalpopup_display', 0) == 1){
				  $module_path = drupal_get_path('module', 'survey');
				  drupal_add_css($module_path .'/css/survey_modal.css');
					if(variable_get('survey_trigger_popup', 0) != 0){
					if($_GET['renderType'] == 'popover'){
							modalframe_child_js();	
						}
					}else{
					if($_GET['renderType'] == 'popover')
						modalframe_child_js();
					}
			}
			//Modal Pop over Check ends
			drupal_set_title($result->data->EvaluationText);
			
			if($result->data->TotalCount == 0) {
				 
				 return "There is no questions created for this Survey ". l('Click here to go back to Survey list','surveytitle');
			}
        
			$output = drupal_get_form('survey_form', $result);
		}

		return $output;
	} 
}

function multipath_survey_page($survey) {
//	echo "<pre>";
//	print_r($survey);
//	echo "</pre>";
		$result = json_decode($survey);
	//Check whether the user had taken the survey or not
	if($result->status == 1){
		//Taken Redirect to the result page
		drupal_set_message(t('You have already taken this survey.'));
		survey_redirect($result->surveyId);
		exit;
	}else{
		//Not Taken the survey already
		
		/*	Check whether the page is loaded in modal Pop over
		*	Or in the window directly
		*/

          if(variable_get('survey_modalpopup_display', 0) == 1){
			  $module_path = drupal_get_path('module', 'survey');
			  drupal_add_css($module_path .'/css/survey_modal.css');
				if(variable_get('survey_trigger_popup', 0) != 0){
				if($_GET['renderType'] == 'popover'){
						modalframe_child_js();	
					}
				}else{
				if($_GET['renderType'] == 'popover')
					modalframe_child_js();
				}
		}
		//Modal Pop over Check ends
		drupal_set_title($result->data->EvaluationText);
		
//		echo "<pre>";
//		print_r($result);
	   if($result->data->TotalCount == 0) {
             
			 return "There is no questions created for this Survey ". l('Click here to go back to Survey list','survey-multipath');
	    }

		$output = drupal_get_form('multipath_survey_form', $result);
	}
	
	return $output;
}

function survey_no_question() {
	form_set_error('','No question in this survey');
	$output = l('Click here to select another survey','surveytitle/multipath');
	return $output;

}