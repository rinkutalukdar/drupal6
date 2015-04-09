<?php
	// $Id: user_profile.fields.inc, 06/10/2010

	/**
	* @file
	* ITrInno User Profile form fields.
	*/
    
	/**
	*  User profile default form fields.
	*/
	function user_profile_get_defaultfileds() {
        require_once('classes/UserProfileData.php');
        require_once('classes/UserProfileService.php');
        $fields = array();
        $objUsrProfData = new UserProfileData();
        $objUsrProfData->SetServiceName("DefaultUserFields");
        $objUsrProfData->SetServiceIdentity('getDefaultUserFields');
        $objUsrProfData->SetServiceMethod(UserProfileService::SERVICE_METHOD_GET);
        $objUsrProfData->SetSiteId(UserProfileService::getSiteId());
        $objUsrProfData->SetMethod('GET');
        $objUsrProfSrv = new UserProfileService();
        $result = $objUsrProfSrv->ExecuteUserProfileReq($objUsrProfData);

        $result = json_decode($result);
        $count = 0;
        foreach ($result->defaultUserProfileFields AS $fieldKey => $fieldVal) {
            if($fieldVal->renderType == 'select' || $fieldVal->renderType == 'Dropdown' || $fieldVal->renderType == 'radio' || $fieldVal->renderType == 'Radiobutton' || $fieldVal->renderType == 'checkbox' ||  $fieldVal->renderType == 'Checkbox') {
                    $options = array();
                    foreach($fieldVal->childFields AS $key => $option){
                        $options[$option->fieldId] = $option->displayText;
                    }
                    $fields[isset($fieldVal->fieldName)? $fieldVal->fieldName: $fieldVal->displayText] = array('#type' => 'select',
                    '#title' => $fieldVal->displayText,
                    '#options' => $options,
                    '#required' => TRUE,
                    '#encryption' => FALSE,
                    '#maxlength' => 60,
                    '#default_value' => t('Select'),
                    '#prefix' => "",
                    '#suffix' => "",
                    '#required' => "",
                    '#dontdelete' => false,
                    '#input' => true,
                    );
            } else {
                if($fieldVal->renderType == 'Textbox')
                    $fieldVal->renderType = 'textfield';

                if($fieldVal->renderType == 'Textarea')
                    $fieldVal->renderType = 'textarea';

                $fields[isset($fieldVal->fieldName)? $fieldVal->fieldName: $fieldVal->displayText] = array('#type' => $fieldVal->renderType,
                    '#title' => $fieldVal->displayText,
                    '#required' => TRUE,
                    '#encryption' => FALSE,
                    '#maxlength' => 60,
                    '#prefix' => "",
                    '#suffix' => "",
                    '#required' => "",
                    '#encryption' => "",
                    '#dontdelete' => false,
                    '#input' => true,
                    );                
            }
            $count++;
        }
        return $fields;
  }
  ?>