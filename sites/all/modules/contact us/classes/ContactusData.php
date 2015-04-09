<?php
include_once 'IContactUsContent.php';

class ContactusData implements IContactUsContent
{	
	
	private $SiteId;
	private $ServiceName;
	private $ServiceIdentity;
	private $ServiceURL;
	private $PostedData;
	private $Method;
	
	
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
			
			if(trim($ServiceURL->Verb) == 'GET'){
					$this->ServiceURL = $ServiceURL->ServiceUrl.'/'. $ServiceURL->SiteId;
			}
			if(trim($ServiceURL->Verb) == 'POST'){
				$this->ServiceURL = $ServiceURL->ServiceUrl;
			}
				  	
		}
		
	}
	
	public function GetServiceURL(){
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
	
	/**
	 * Sets the error message.
	 * @param  error msg
	 * 
	*/
	public function set_error_message($errMsg){
		$this->errMsg = $errMsg;
	}
	
	/**
	 * Get error message.
	 * @param
	 * @return error message
	*/
	public function get_error_message(){
		return $this->errMsg;
	}
			
}

?>
