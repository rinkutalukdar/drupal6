<?php
/**
 * Implementation of admin contact us page settings
 */
function contactus_adminpage(&$form_state) {

  global $base_url;
  global $itrinno_site_id;

		modalframe_parent_js();
	    $form = array();

		$objContactusData = new ContactusData();
		$objContactusData->SetServiceName('contactus');
		$objContactusData->SetServiceIdentity('load');
		$objContactusData->SetSiteId($itrinno_site_id);
		$objContactusData->SetMethod('get');

		$objContactus = new ContactusService();
		$processedData = $objContactus->GetSubjects($objContactusData);

		$decodeResult = json_decode($processedData);

		$options['no_subject'] = t('--Choose subject--');
		foreach($decodeResult->subject_list as $key => $value){
			if(trim($value->statusCode) == 'Active')
			$options[$value->SubjectId] = $value->Name;
		}

		if(count($options) == 1)
		foreach($options as $subject_key=>$subject_val){
			$entity = $subject_key;
		}

		if (count($options) > 1) {

			  $form['contactus_entity'] = array(
				  '#title' => t('Choose a Subject'),
				  '#type' => 'select',
				  '#default_value' => 'Choose Subject',
				  '#description' => t(''),
				  '#options' => $options);
		}
		else {
			$form['contactus_entity'] = array(
				  '#title' => t(''),
				  '#type' => 'hidden',
				  '#description' => t(''),
				  '#default_value' => $entity,
				  );
		}

		   $avail_forms = get_available_forms();

			$form['contactus_forms'] = array(
			  '#type' => 'fieldset',
			  '#id' => 'edit-contactus-field-objects',
			  '#title' => t(''),
			  );

		if (count($avail_forms) != 0) {
			$form['contactus_forms']['contactus_subject_form'] = array(
				'#type' => 'radios',
				'#title' => t('List of Available Forms'),
				'#options' => $avail_forms,
				'#attributes' =>array('onclick'=>'test(this.value)'),
				'#default_value' => contactus_getform(),
				'#description' => t('Choose the form for the selected subject. Place the mouse cursor above the form name to view the form fields.'),
			);

		if (!is_null($decodeResult)) {
				$form['contactus_forms']['contactus_multiple_form'] = array(
					'#type' => 'checkbox',
					'#title' => t('Use current form for all subject choices'),
					'#default_value' => variable_get('contactus_multiple_form', 0),
					'#description' => t(''),
				);
			}
		}
		else {
			    $form['contactus_forms']['contactus_nosubject_form'] = array(
					'#value' => '',
					'#type' => 'item',
			    );
		}

        	//seding baseurl to preview contact us forms
			$form['contactus_forms_pre']['url'] = array(
				'#type' => 'hidden',
				'#title' => t(''),
				'#value' =>$base_url	,
			);


		if (module_exists('captcha')) {

			$form['contactus_captcha'] = array(
				'#type' => 'checkbox',
				'#title' => t('Allow spam control - Captcha'),
				'#default_value' => variable_get('contactus_captcha', 0),
				'#description' => t(''),
			);
		}

	   		$form['contactus_register_link'] = array(
				'#type' => 'checkbox',
				'#title' => t('Provide a link for the user to create an account after sending the Contact Us message'),
				'#default_value' => variable_get('contactus_register_link', 0),
				'#description' => t(''),
			);

			$form['contactus_registration_page'] = array(
				'#prefix' => '<div id="contactus_registration_page_url" style="display:none">',
				'#type' => 'textfield',
				'#title' => t('Link to registration page'),
				'#default_value' => variable_get('contactus_registration_page', ''),
				'#size' => 45,
				'#maxlength' => 120,
				'#suffix'=>'</div>',
			);


			 $form['contactus_forms_redirect'] = array(
			  '#type' => 'fieldset',
			  '#id' => 'edit-contactus-field-objects_redirect',
			  '#title' => t(''),
			  );

			 $options = array('1' => 'Display thank you message', '2'=>'Redirect to a custom URL');
			 $form['contactus_forms_redirect']['contactus_page_redirect'] = array(
			   '#type' => 'radios',
			   '#id' => 'SrPgReId',
			   '#title' => t('Redirection method'),
			   '#description' => t('Choose the method of redirection after Contact Us'),
			   '#default_value' => variable_get('contactus_page_redirect', 1),
			   '#options' => $options,
			   '#required' => true,
			 );


			 $form['contactus_forms_redirect']['contactus_redirect_thankyou_message'] = array(
			   '#prefix' => '<div id="contactus_redirect_thankyouMessage" style="display:none">',
			   '#type' => 'textarea',
			   '#title' => '<b>'.t('Enter thank you message').'</b>',
			   '#default_value'=>variable_get('contactus_redirect_thankyou_message',t('Thank you for your message')),
				'#suffix'=>'</div>',

			 );


			 $form['contactus_forms_redirect']['contactus_redirect_custom_url'] = array(
			   '#prefix' => '<div id="contactus_redirect_custom_url" style="display:none">',
			   '#type' => 'textfield',
			   '#title' => '<b>'.t('Enter the Custom URL to be redirected').'</b>',
			   '#default_value'=>variable_get('contactus_redirect_custom_url',''),
				'#suffix'=>'</div>',

			 );

			/* $form['contactus_forms_redirect']['contactus_redirect_custom_url_thankyou_message'] = array(
			   '#prefix' => '<div id="contactus_redirect_custom_url_thankyou_message" style="display:none">',
			   '#type' => 'textarea',
			   '#title' => '<b>'.t('Enter Custom URL thank you message').'</b>',
			   '#default_value'=> variable_get('contactus_redirect_custom_url_thankyou_message', t('Thank you for your message')),
				'#suffix'=>'</div>',

			 );*/

	   		$form['contactus_submit'] = array(
		        '#type' => 'submit',
		        '#value' => 'Save Configuration',
			);

			$form['contactus_create_form'] = array(
		       '#prefix' => '<p class="smallText">' . t('If you would like to configure Contact Us forms, please click below'). '</p>',
		       '#type' => 'submit',
		       '#id' => 'edit-contactus-create-form',
		       '#value' => 'Configure Contact Us Forms',
		       '#weight' => 10,
			);

	return $form;
}

/**
 * Implementation to validate the admin contactus page settings
 */
function contactus_adminpage_validate($form, &$form_state) {

	if($form_state['values']['contactus_register_link'] == 1 && $form_state['values']['contactus_registration_page'] == '') {
		form_set_error('contactus_registration_page', t("Please provide link to registration page"));
	}

}


/**
 * Implementation to submit the admin contactus page settings
 */
function contactus_adminpage_submit($form, &$form_state) {
	global $itrinno_site_id;
	$entity = $form_state['values']['contactus_entity'] ? $form_state['values']['contactus_entity'] : 'no_subject';
	$entity_form = $form_state['values']['contactus_subject_form'] ? $form_state['values']['contactus_subject_form'] : 'default';

	variable_set('contactus_page_redirect', $form_state['values']['contactus_page_redirect']);
	if($form_state['values']['contactus_page_redirect'] != 1)
		variable_set('contactus_redirect_custom_url', $form_state['values']['contactus_redirect_custom_url']);
	else
		variable_set('contactus_redirect_custom_url', '');

	variable_set('contactus_register_link', $form_state['values']['contactus_register_link']);

	variable_set('contactus_registration_page', $form_state['values']['contactus_registration_page']);

	variable_set('contactus_captcha', $form_state['values']['contactus_captcha']);
	variable_set('contactus_multiple_form', $form_state['values']['contactus_multiple_form']);
	variable_set('contactus_redirect_thankyou_message',$form_state['values']['contactus_redirect_thankyou_message']);
	if ($form_state['values']['contactus_multiple_form'] == 1) {

		db_query("DELETE FROM {contactus}");

		$objContactusData = new ContactusData();
		$objContactusData->SetServiceName('contactus');
		$objContactusData->SetServiceIdentity('load');
		$objContactusData->SetSiteId($itrinno_site_id);
		$objContactusData->SetMethod('get');

		$objContactus = new ContactusService();
		$processedData = $objContactus->GetSubjects($objContactusData);

		$decodeResult = json_decode($processedData);
		if ($decodeResult) {
			foreach ($decodeResult as $key => $value) {
				if($key=="TotalCount")
		   		continue;
				db_query("INSERT INTO {contactus} (subject_id, form_id) VALUES ('%s', '%s')", $key, $entity_form);
			}
		}

	}
	else
	{

		db_query("REPLACE INTO {contactus} (subject_id, form_id) VALUES ('%s', '%s')", $entity, $entity_form);
	}

	set_contactus_captcha();

	drupal_set_message(t('The configuration options have been saved.'));
}



/**
 * Get the available forms generated from Form Builder module.
 */
function get_available_forms() {

	$forms = array();
	$query = db_query("SELECT form_id,form_name FROM {formbuilder_form} WHERE form_type='%s'", 'contactus');

	while ($form_array = db_fetch_object($query)) {
		$forms[$form_array->form_id] = '<span class="contactus-form-objects">' .$form_array->form_name . '</span>';
	}

	return $forms;
}

/**
 * Function to get the contactus form
 */
function contactus_getform() {

	$subject_id = arg(0) == 'admin' || is_null(arg(2)) ? 'no_subject' : arg(2);

	$form = db_result(db_query("SELECT form_id FROM {contactus} where subject_id='%s'", $subject_id));

	$form = $form != '' ? $form : '';

	if (arg(0) == 'admin') {
		return $form;
	}
	else {
		print $form;
	}
}

/**
 * Function to set the page after contactus form submits
 */
function contactus_custom_form($form_state) {

  	$form['contactus_custom_submission'] = array(
		'#title' => t('Custom content - Form submission page, <b>Use &lt;&lt;TRACKERID&gt;&gt;</b> to show Tracker ID in the result page'),
		'#type' => 'fieldset',
	);

	$form['contactus_custom_submission']['contactus_custom_topmiddle'] = array(
		'#type' => 'checkbox',
		'#title' => t('Enable custom content between the Title and the Form content'),
		'#default_value' => variable_get('contactus_custom_topmiddle', 0),
		'#description' => t(''),
	);

	$form['contactus_custom_submission']['contactus_custom_content_topmiddle'] = array(
		'#type' => 'textarea',
		'#title' => t('Provide the custom content'),
		'#default_value' => variable_get('contactus_custom_content_topmiddle', ''),
		'#description' => t('You can provide plain-text, HTML tags and inline CSS styles.'),
	);

	$form['contactus_custom_submission']['contactus_custom_bottommiddle'] = array(
		'#type' => 'checkbox',
		'#title' => t('Enable custom content between the Form content and the Submit button'),
		'#default_value' => variable_get('contactus_custom_bottommiddle', 0),
		'#description' => t(''),
	);

	$form['contactus_custom_submission']['contactus_custom_content_bottommiddle'] = array(
		'#type' => 'textarea',
		'#rows' => 5,
		'#title' => t('Provide the custom content'),
		'#default_value' => variable_get('contactus_custom_content_bottommiddle', ''),
		'#description' => t('You can provide plain-text, HTML tags and inline CSS styles.'),
	);

	$form['contactus_custom_submission']['contactus_custom_bottom'] = array(
		'#type' => 'checkbox',
		'#title' => t('Enable custom content at the bottom of the page, below the Submit button'),
		'#default_value' => variable_get('contactus_custom_bottom', 0),
		'#description' => t(''),
	);

	$form['contactus_custom_submission']['contactus_custom_content_bottom'] = array(
		'#type' => 'textarea',
		'#title' => t('Provide the custom content'),
		'#default_value' => variable_get('contactus_custom_content_bottom', ''),
		'#description' => t('You can provide plain-text, HTML tags and inline CSS styles.'),
	);

	//  Custom content for Thank You page

	$form['contactus_custom_thanks'] = array(
		'#title' => t('Custom content - Thank you page'),
		'#type' => 'fieldset',
	);

	$form['contactus_custom_thanks']['contactus_thank_topmiddle'] = array(
		'#type' => 'checkbox',
		'#title' => t('Enable custom content between the Title and the Thank you message'),
		'#default_value' => variable_get('contactus_thank_topmiddle', 0),
		'#description' => t(''),
	);

	$form['contactus_custom_thanks']['contactus_thank_content_topmiddle'] = array(
		'#type' => 'textarea',
		'#title' => t('Provide the custom content'),
		'#default_value' => variable_get('contactus_thank_content_topmiddle', ''),
		'#description' => t('You can provide plain-text, HTML tags and inline CSS styles.'),
	);

	$form['contactus_custom_thanks']['contactus_thank_bottommiddle'] = array(
		'#type' => 'checkbox',
		'#title' => t('Enable custom content below the Thank you message'),
		'#default_value' => variable_get('contactus_thank_bottommiddle', 0),
		'#description' => t(''),
	);

	$form['contactus_custom_thanks']['contactus_thank_content_bottommiddle'] = array(
		'#type' => 'textarea',
		'#rows' => 5,
		'#title' => t('Provide the custom content'),
		'#default_value' => variable_get('contactus_thank_content_bottommiddle', ''),
		'#description' => t('You can provide plain-text, HTML tags and inline CSS styles.'),
	);

	$form['contactus_custom_thanks']['contactus_thank_bottom'] = array(
		'#type' => 'checkbox',
		'#title' => t('Enable custom content at the bottom of the page'),
		'#default_value' => variable_get('contactus_thank_bottom', 0),
		'#description' => t(''),
	);

	$form['contactus_custom_thanks']['contactus_thank_content_bottom'] = array(
		'#type' => 'textarea',
		'#title' => t('Provide the custom content'),
		'#default_value' => variable_get('contactus_thank_content_bottom', ''),
		'#description' => t('You can provide plain-text, HTML tags and inline CSS styles.'),
	);

	$form['save_custom'] = array(
		'#type' => 'submit',
		'#value' => t('Save configuration'),
	);
	return $form;
}

/**
 * Function to submit the result page settings after contactus form submits
 */
function contactus_custom_form_submit($form, &$form_state) {

	variable_set('contactus_custom_bottom', $form_state['values']['contactus_custom_bottom']);
	variable_set('contactus_custom_content_bottom', $form_state['values']['contactus_custom_content_bottom']);
	variable_set('contactus_custom_topmiddle', $form_state['values']['contactus_custom_topmiddle']);
	variable_set('contactus_custom_content_topmiddle', $form_state['values']['contactus_custom_content_topmiddle']);
	variable_set('contactus_custom_bottommiddle', $form_state['values']['contactus_custom_bottommiddle']);
	variable_set('contactus_custom_content_bottommiddle', $form_state['values']['contactus_custom_content_bottommiddle']);

	//  Custom content for Thank You page
	variable_set('contactus_thank_bottom', $form_state['values']['contactus_thank_bottom']);
	variable_set('contactus_thank_content_bottom', $form_state['values']['contactus_thank_content_bottom']);
	variable_set('contactus_thank_topmiddle', $form_state['values']['contactus_thank_topmiddle']);
	variable_set('contactus_thank_content_topmiddle', $form_state['values']['contactus_thank_content_topmiddle']);
	variable_set('contactus_thank_bottommiddle', $form_state['values']['contactus_thank_bottommiddle']);
	variable_set('contactus_thank_content_bottommiddle', $form_state['values']['contactus_thank_content_bottommiddle']);

	drupal_set_message(t('The configuration options have been saved.'));
}

/**
 * Function to display the map with the form and subject in admin contact us setting form
 */
function contactus_getlayer() {

	if(arg(2) != '') {
		$name = str_replace('*','&',arg(2));
	}

	$form_name = arg(0) == 'admin' || is_null(arg(2)) ? 'default' : $name;
	//$form_name = arg(0) == 'admin' || is_null(arg(2)) ? 'default' : arg(2);

	$form = unserialize(db_result(db_query("SELECT form FROM {formbuilder_form} where form_name = '%s'", $form_name)));
	$form = $form != '' ? $form : array();
	$form = array_slice($form, 0, count($form)-6);

	foreach ($form as $keys => $values ) {
		foreach ($values as $key => $value ) {
			if ($key == '#title' && trim($value) != '') {
				$titles[] = $value;
				continue;
			}
		}
	}
	$content = implode(', ', $titles);
	print($content);
}


//newly created functions
function contactus_preview($form_id){

	$form = arg(4);
	$form_fields = unserialize(db_result(db_query("SELECT form FROM {formbuilder_form} WHERE form_id='%s'",  $form)));
	return $form_fields;

}

function preview_form(){
    modalframe_child_js();
	return drupal_get_form('contactus_preview');

}

function preview_form_check(){
	echo drupal_get_form('contactus_preview_check');
	exit;
}

function contactus_preview_check(){

	if(variable_get('contactus_multiple_form', 0) == 1)
	{
		$form = arg(5);
		if($form == '1') {
			$form_id = db_result(db_query("SELECT form_id FROM {contactus} LIMIT 0,1"));

			if($form_id == 'default') {
				$form_fields = unserialize(db_result(db_query("SELECT form FROM {formbuilder_form} WHERE active = 1 AND form_id='%s'",  'contactus_1251283145_form')));
				return $form_fields;
			}else {
				$form_fields = unserialize(db_result(db_query("SELECT form FROM {formbuilder_form} WHERE form_id='%s'",  $form_id)));
				return $form_fields;
			}
		}
	}
}

