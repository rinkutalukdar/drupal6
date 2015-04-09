<?php
include_once 'classes/ISurveyContent.php';

class SurveyData implements ISurveyContent
{	
	
	private $SiteId;
	private $ServiceName;
	private $ServiceIdentity;
	private $ServiceURL;
	private $PostedData;
	private $Method;
	private $evaluationId;
	private $noOfQuestPerPage;
	private $offset;
	private $questions;
	private $answers;
	private $title;
	private $evaluationTypeName;
	private $userSession;
	private $hasExpired;
	private $currentPageNo;
	private $errMsg;
	private $userId;
	private $operation;
	private $action;
	private $set_oper;
	
	
	public function set_user_id($userId){
		$this->userId = $userId;
	}

	public function get_user_id(){
		return $this->userId;
	}
	
	public function SetSiteId($SiteId){
		$this->SiteId = $SiteId;
	}
	
	public function GetSiteId(){
		return $this->SiteId;
	}
	
	public function SetServiceName($ServiceName){
		$this->ServiceName = $ServiceName;
	}
	
	public function GetServiceName(){
		return $this->ServiceName;
	}

	
	public function SetServiceIdentity($ServiceIdentity){
		$this->ServiceIdentity = $ServiceIdentity;
	}
	
	public function GetServiceIdentity(){
		return $this->ServiceIdentity;
	}
	
//	public function SetServiceURL($ServiceURL){
//		
//		if(is_string($ServiceURL)){
//		  $this->ServiceURL = $ServiceURL;
//
//		}else if(is_array($ServiceURL)){
//			
//			for($i = 0; $i < count($ServiceURL); $i++){
//			
//				if($ServiceURL[$i]->Verb == $this->GetMethod()){
//					$this->ServiceURL = $ServiceURL[$i]->ServiceUrl.'/'.$ServiceURL[$i]->SiteName.'/'.$ServiceURL[$i]->ServiceName;
//					break;
//				}
//			
//			}
//			
//		}else if(is_object($ServiceURL)){
//			
//				if(trim($ServiceURL->Verb) == $this->GetMethod()){
//					
//					if($this->get_evaluation_type_name()){
//						$this->ServiceURL = $ServiceURL->ServiceUrl.'/'.$this->GetSiteId().'/'.$this->get_evaluation_type_name().'/'.$this->get_current_page_no().'/'.$this->get_no_of_questions_per_page();
//					}
//					else if($this->get_user_id()){
//						$this->ServiceURL = $ServiceURL->ServiceUrl.'?evaluationId='.$this->get_evaluation_id().'&userId='.$this->get_user_id().'&pageNumber='.$this->get_current_page_no().'&pageSize='.$this->get_no_of_questions_per_page();
//					}
//					else if($this->get_user_session()){
//						$this->ServiceURL = $ServiceURL->ServiceUrl.'/'.$this->get_evaluation_id().'/session/'.$this->get_user_session();
//					}
//					else if($this->get_evaluation_id()){
//						$this->ServiceURL = $ServiceURL->ServiceUrl.'/'.$this->get_evaluation_id().'/'.$this->get_current_page_no().'/'.$this->get_no_of_questions_per_page();
//					}
//					
//					else{
//					$this->ServiceURL = $ServiceURL->ServiceUrl;
//					}
//				}
//				  	
//		}
//		
//	}
public function SetServiceURL($ServiceURL){
		
		
		if(is_string($ServiceURL)){
		  $this->ServiceURL = $ServiceURL;

		}else if(is_array($ServiceURL)){
			for($i = 0; $i < count($ServiceURL); $i++){
			
				if($ServiceURL[$i]->Verb == $this->GetMethod()){
					$this->ServiceURL = $ServiceURL[$i]->ServiceUrl.'/'.$ServiceURL[$i]->SiteName.'/'.$ServiceURL[$i]->ServiceName;
					break;
				}
			
			}
			
		}else if(is_object($ServiceURL)){
			
				
				if(trim($ServiceURL->Verb) == $this->GetMethod()){
					if($this->get_operation_for_multipath()) {
						$this->ServiceURL = $ServiceURL->ServiceUrl.'?evaluationId='.$this->get_evaluation_id();
					}
					else if($this->get_user_operation()) {
						$this->ServiceURL = $ServiceURL->ServiceUrl.'?evaluationId='.$this->get_evaluation_id().'&userId='.$this->get_user_id().'&pageNumber='.$this->get_current_page_no().'&pageSize='.$this->get_no_of_questions_per_page();
					}
					else if($this->get_multipath_evaluation_operation()) {
//						$this->ServiceURL = $ServiceURL->ServiceUrl.'?pageNumber='.$this->get_current_page_no().'&pageSize='.$this->get_no_of_questions_per_page();
						$this->ServiceURL = $ServiceURL->ServiceUrl.'?siteId='.$this->GetSiteId().'&pageNumber='.$this->get_current_page_no().'&pageSize='.$this->get_no_of_questions_per_page();
					}
					else if($this->get_evaluation_type_name()){
						$this->ServiceURL = $ServiceURL->ServiceUrl.'/'.$this->GetSiteId().'/'.$this->get_evaluation_type_name().'/'.$this->get_current_page_no().'/'.$this->get_no_of_questions_per_page();
					}
					else if($this->get_user_id()){
						$this->ServiceURL = $ServiceURL->ServiceUrl.'/'.$this->get_evaluation_id().'/user/'.$this->get_user_id();
					}
					else if($this->get_user_session()){
						$this->ServiceURL = $ServiceURL->ServiceUrl.'/'.$this->get_evaluation_id().'/session/'.$this->get_user_session();
					}
					else if($this->get_evaluation_id()){
						$this->ServiceURL = $ServiceURL->ServiceUrl.'/'.$this->get_evaluation_id().'/'.$this->get_current_page_no().'/'.$this->get_no_of_questions_per_page();
					}
					else {
						$this->ServiceURL = $ServiceURL->ServiceUrl;
					}
				}
		}
        //echo $this->ServiceURL;
	}

	public function set_user_operation($opr) {
		$this->operation = $opr;
	}

	public function get_user_operation() {
		return $this->operation;
	}

	public function set_multipath_evaluation_operation($opr) {
		$this->action = $opr;
	}

	public function get_multipath_evaluation_operation() {
		return $this->action;
	}

	public function set_operation_for_multipath($opr) {
		$this->set_oper = $opr;
	}

	public function get_operation_for_multipath() {
		return $this->set_oper;
	}

	
	public function GetServiceURL(){
        //echo $this->ServiceURL . '<br />';
		return $this->ServiceURL;
	}
	
	public function SetPostedData($PostedData){
		$this->PostedData = $PostedData;
	}
	
	public function GetPostedData(){
		return $this->PostedData;
	}
	
	public function SetMethod($Method){
		switch (strtolower($Method))
		{
			case "post":
			$this->Method = "POST";
			break;
			case "get":
			$this->Method = "GET";
			break;
			case "put":
			$this->Method = "PUT";
			break;
		}
		
	}
	
	public function GetMethod(){
		return $this->Method;
	}
	
	public function DataDecode($Data){
		return json_decode($Data);
	}
	
	public function DataEncode($Data){
		return json_encode($Data);
	}
	
	public function set_evaluation_id($evaluationId){
		$this->evaluationId = $evaluationId;
	}

	public function get_evaluation_id(){
		return $this->evaluationId;
	}
	
	public function set_no_of_questions_per_page($noOfQuestPerPage){
		$this->noOfQuestPerPage = $noOfQuestPerPage;
	}
			

	public function get_no_of_questions_per_page(){
		return $this->noOfQuestPerPage;
	}
	
	
	public function set_offset($offset){
		$this->offset = $offset;
	}

	public function get_offset(){
		return $this->offset;
	}
	
	public function set_questions($questions){
		$this->questions = $questions;
	}
			
	public function get_questions(){
		return $this->questions;
	}

	public function set_answers($answers){
		$this->answers = $answers;
	}
			
	public function get_answers(){
		return $this->answers;
	}
			
	public function set_evaluation_title($title){
		$this->title = $title;
	}
			
	public function get_evaluation_title(){
		return $this->title;
	}

	public function set_evaluation_type_name($evaluationTypeName){
		$this->evaluationTypeName = $evaluationTypeName;
	}
			
	public function get_evaluation_type_name(){
		return $this->evaluationTypeName;
	}
	
	
	public function set_user_session($userSession){
		$this->userSession = $userSession;	
	}
	
	public function get_user_session(){
		return $this->userSession;	
	}
	
	
	public function set_expired_flag($hasExpired){
		$this->hasExpired = $hasExpired;
	}

	public function get_expired_flag($hasExpired){
		return $this->hasExpired;
	}
	
	
	public function set_error_message($errMsg){
		$this->errMsg = $errMsg;
	}

	public function get_error_message(){
		return $this->errMsg;
	}

	public function set_current_page_no($currentPageNo){
		$this->currentPageNo = $currentPageNo;
	}

	public function get_current_page_no(){
		return $this->currentPageNo;
	}


}

?>