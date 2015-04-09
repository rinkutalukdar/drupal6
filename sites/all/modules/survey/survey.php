<?php
class survey{

	/* APC -setting the time to leave (TTL ) for the cache as 4 hours=14400seconds */
  private $TTL=14400;
	
	function GetContactUsServiceURL(SurveyData $data){
	
		$restCall = GetRestApiInstance();
		return $restCall->GetServices($data);
		
	}
	
	function CreateContactUs(SurveyData $Data){
		$restCall = GetRestApiInstance();
		
		return $restCall->executeRequest($Data);
	
	}
	
	function get_evaluation_details(SurveyData $data){ 
	
	    /* apc intergrated code added by JUBIN editted on May 6 2010*/
		
		$key="Survey_detail_".$data->get_evaluation_id()."_".$data->GetSiteId();
		$key.="_".$data->get_current_page_no()."_".$data->get_no_of_questions_per_page();
		$result=$this->get_from_cache($key);
		if($result!=NULL)
		 {	      
		 return $result;
		 }
		 
		$restCall = GetRestApiInstance(); 
		$result = $restCall->executeRequest($data);
		
		$decodedResult = json_decode($result);
/*		echo 'i am in Get Subjects Class<br />===========================================================================================================<br />';
			echo '<pre>';
			print_r($decodedResult) 	;
			echo '</pre>';
		echo '<br />End======================================================================================================================<br />';
*/		
        //$survey_title= $result["GetEvaluationDetailsResponse"]["Title"];
	
        if(isset($decodedResult->TotalCount)) {
          $quesInc=0;
          $ansInc=0;
          $surveyProcessedQuestions= array();
          //echo '<pre>';print_r($result["GetEvaluationDetailsResponse"]["EvaluationDetails"]["QuestionsAnswers"]);echo '</pre>';
			  foreach($decodedResult->Question as $element) {
				if(!in_array($element->QuestionId,$surveyProcessedQuestions)) {
					$surveyQuestions[$quesInc]['id']= $element->QuestionId;
					$surveyQuestions[$quesInc]['title']= $element->DisplayText;
					$surveyQuestions[$quesInc]['required']= $element->isMandatory;
					$surveyQuestions[$quesInc]['questionTypeName']= $element->RenderType;
					$surveyProcessedQuestions[]=  $element->QuestionId;
					$quesInc++;
				}
				foreach($element->Answer as $valueAnswers){
				
				  $surveyAnswers[$ansInc]['id']= $valueAnswers->AnswerId;
				  $surveyAnswers[$ansInc]['questionid']= $element->QuestionId;
				  $surveyAnswers[$ansInc]['title']= $valueAnswers->DisplayText;
				  $surveyAnswers[$ansInc]['isDefault']= $valueAnswers->isDefault;
				  $ansInc++;
			   }
			  }
			}else{
			if($quesInc == 0){
				$data->set_error_message('No Data found');
			}
		}
		$data->set_questions($surveyQuestions);
		$data->set_answers($surveyAnswers);
		$data->set_evaluation_title($decodedResult->EvaluationText);
			/*adding to the cache if apc enabled and the data is not present in the cache */
	    $this->add_to_cache($key,$decodedResult);
		return $decodedResult;
      		
		
	}
	
	
//  function getEvaluationDetails($evaluation_id, &$survey_questions, &$survey_answers, &$survey_title, &$err_msg, $itration, $question_per_page) {

	
	function get_evaluations(SurveyData $data) {
	//function getEvaluations($items_per_page, $offset, $session_value, $has_expired, &$err_msg) {
    
		/* apc intergrated code added by JUBIN editted on May 6 2010*/
		
		$key="Survey_list_".$data->GetSiteId();
        $key.="_".$data->get_current_page_no()."_".$data->get_no_of_questions_per_page();
	    $key.="_".$data->get_multipath_evaluation_operation();
		$result=$this->get_from_cache($key);
		if($result!=NULL)
		 {	      
		 return $result;
		 }
	 /*retreiving data from the webservice */
		$restCall = GetRestApiInstance(); 
		$result = $restCall->executeRequest($data);
		/*adding to the cache if apc enabled and the data is not present in the cache */
	    $this->add_to_cache($key,$result);
		return $result;
		
		//$decodedResult = json_decode($result);
	  
		//Web Services call
		
		
		//getEvaluations method
		
/*		$params->GetEvaluations->SiteId= self::$fwk_siteid;
		$params->GetEvaluations->EvaluationTypeName= "Assessment";
		$params->GetEvaluations->ItemsPerPage= $items_per_page;
		$params->GetEvaluations->Offset= $offset;
		$params->GetEvaluations->UserSession = $session_value;
		$params->GetEvaluations->HasExpired= $has_expired;
		
*/		//$result = $this->fwk_ws_client->call("GetEvaluations", array($params));
		
		
		
		
/*		if ($this->fwk_ws_client->fault) {
			$err_msg= t('Oops! An error has occured, please try again later!');
			
			$fault_code= "Fault code is: ".$this->fwk_ws_client->faultcode." ";
			$fault_string= "Fault string is: ".$this->fwk_ws_client->faultstring." ";
			    
			log_assessment_err("GetEvaluations", t("SOAP Client Fault: ").$fault_code.$fault_string);
    }
		else {
				
			$err = $this->fwk_ws_client->getError();
			
			if ($err) {
				$err_msg= t('Oops! An error has occured, please try again later!');
				log_assessment_err("GetEvaluations", t("SOAP Client error: ").$err);
			}
			else {
  	  	return $result;
			}
		}
*/  }

  //function createEvaluation($session_value, $evaluation_id, $retake, $response_arr, &$err_msg) {
  function create_evaluation(SurveyData $data) {
		$restCall = GetRestApiInstance(); 
		
		//print_r($data);
		$result = $restCall->executeRequest($data);
		
		return $decodedResult = json_decode($result);
  
  }
  
  
  function get_evaluation_times_taken(SurveyData $data){
		$restCall = GetRestApiInstance(); 
		$result = $restCall->executeRequest($data);
		
		return $decodedResult = json_decode($result);
  
  }

  function get_evaluation_retake_answers(SurveyData $data) {
		$restCall = GetRestApiInstance(); 
		$result = $restCall->executeRequest($data);
		return $result;
//		return $decodedResult = json_decode($restCall);
  }


	


	//function getEvaluationResultSurvey($evaluation_id, &$err_msg) {
	function get_evaluation_result_survey(SurveyData $data) {

		$restCall = GetRestApiInstance(); 
		$result = $restCall->executeRequest($data);
		$decodedResult = json_decode($result);
		//print_r($decodedResult);
		if($decodedResult->TotalCount > 0){
			return $decodedResult;
		}else{
			$data->set_error_message('No Data Found');
		}
    }
 /*apc integration starts here ;added by JUBIN on May 6 2010*/
	
	  /* function to check whether apc is enabled or not */
	   
	   function apc_isenabled()
	   {
	     if(module_exists(apc_api))
           {
		   return true;
		   }
		return false;
	   }
	   
	  /*function to add to the cache*/
	  
	  function add_to_cache($key,$data)
	   {
	     if($this->apc_isenabled())
		 {
	     apc_api_set_to_cache($key,$data,"cache",$this->TTL);
		 }

	   }
	
	  /* function to get from cache */
	  function get_from_cache($key)
	  {
	    if(!$this->apc_isenabled())
		{
		return NULL;
		}
	   return apc_api_get_from_cache($key);      
	  }
	/*apc integration ends herer */
	

}

?>