<?php
include_once 'IUserProfileContent.php';

class UserProfileData implements IUserProfileContent
{
	private $SiteId;
	private $ServiceName;
	private $ServiceIdentity;
	private $ServiceURL;
	private $PostedData;
	private $Method;

	/*** Search Criteria ***/
	private $UserId;
	private $EmailId;
	//private $FirstName;
	//private $LastName;
	private $AuthId;
	private $AuthUserId;
	private $UserIdentityId;
	private $consentVersion;
	private $Remove;
	private $Days;

	public function SetSiteId($SiteId){
		$this->SiteId = $SiteId;
	}
	public function GetSiteId(){
		return $this->SiteId;
	}

	public function SetDays($Days){
		$this->Days = $Days;
	}
	public function GetDays(){
		return $this->Days;
	}

	public function SetRemove($Remove){
		$this->Remove = $Remove;
	}

	public function GetRemove(){
		return $this->Remove;
	}

	public function SetUserIdentityId($UserIdentityId){
		$this->UserIdentityId = $UserIdentityId;
	}

	public function GetUserIdentityId(){
		return $this->UserIdentityId;
	}

	public function SetServiceName($ServiceName){
		$this->ServiceName = $ServiceName;
	}

	public function GetServiceName(){
		return $this->ServiceName;
	}

	public function SetServiceMethod($method){
		$this->Method = $method;
	}

	public function GetServiceMethod(){
		return $this->Method;
	}

	public function SetServiceIdentity($ServiceIdentity){
		$this->ServiceIdentity = $ServiceIdentity;
	}

	public function GetServiceIdentity(){
		return $this->ServiceIdentity;
	}

	/******** CONSENT VERSION RELATED GET / SET methods --- added by GIRI SHANKAR R dated 18/08/2010*/
	public function GetConsentVersion(){
		return $this->consentVersion;
	}

	public function SetConsentVersion($consentVersion){
		$this->consentVersion	=	$consentVersion;
	}
	/******** CONSENT VERSION RELATED VARIABLES --- added by GIRI SHANKAR R dated 18/08/2010*/


	//public function SetSearchCriteria($emailId = null, $userId = null, $firstName = null, $lastName = null, $authId = null, $authUserId = null){
	public function SetSearchCriteria($emailId = null, $userId = null, $authId = null, $authUserId = null){
		$this->EmailId = $emailId;
		$this->UserId = $userId;
		//$this->FirstName = $firstName;
		//$this->LastName = $lastName;
		$this->AuthId = $authId;
		$this->AuthUserId = $authUserId;
	}

	public function SetServiceURL($ServiceURL){
		if(is_string($ServiceURL)) {
			//echo '<BR> HERE for string <BR><pre> ?  ' .$ServiceURL;

			$this->ServiceURL = $ServiceURL;

		} else if(is_array($ServiceURL)) { //echo '<BR> HERE for array <BR><pre> ?  ' . print_r($ServiceURL). '</pre>';
				
			for($i = 0; $i < count($ServiceURL); $i++){
					
				if($ServiceURL[$i]->Verb == $this->GetMethod()){

					$this->ServiceURL = $ServiceURL[$i]->ServiceUrl.'?siteId='.$ServiceURL[$i]->SiteName.'/'.$ServiceURL[$i]->ServiceName;
					break;
				}
					
			}
				
		} else if(is_object($ServiceURL)){ //echo "<pre>";print_r($ServiceURL);
			/*if(trim($this->FirstName)){
				$this->ServiceURL = $this->ServiceURL.'&firstName='. trim($this->FirstName);
				}
				if(trim($this->LastName)){
				$this->ServiceURL = $this->ServiceURL.'&lastName='. trim($this->LastName);
				}*/
				
			/*if(trim($this->AuthUserId)){
				$this->ServiceURL = $this->ServiceURL.'&authUserId='. trim($this->AuthUserId);
				}*/
				
			if(trim($ServiceURL->Verb) == 'GET'){
				if ($this->ServiceIdentity == 'getAuthenticator') {
					if (! (isset($this->ServiceURL))) {
						$this->ServiceURL   =   $ServiceURL->ServiceUrl;
					}
				}
				else {
					if(trim($this->UserId)) {
						$this->ServiceURL = $ServiceURL->ServiceUrl.'/userId/'. trim($this->UserId);
					}

					if(trim($this->UserId) == '' && trim($this->EmailId)){
						$this->ServiceURL = $ServiceURL->ServiceUrl.'/email/'. trim($this->EmailId);
					}
					if(trim($this->AuthId)){
						$this->ServiceURL = $this->ServiceURL.'/authenticator/'. trim($this->AuthId);
					}

					if (! (isset($this->ServiceURL))) {
						$this->ServiceURL   =   $ServiceURL->ServiceUrl;
					}
					//$this->ServiceURL = $ServiceURL->ServiceUrl;
					$this->ServiceURL = $this->ServiceURL.'?siteId='.$ServiceURL->SiteId.'&profileRequire=true';
				}
			}
			//echo $this->ServiceURL;

			if(trim($ServiceURL->Verb) == 'DELETE'){ //echo "came";
				$this->ServiceURL = $ServiceURL->ServiceUrl.'/userId/'.$this->UserId.'/authenticator/'.$this->AuthId.'?siteId='. $ServiceURL->SiteId;
				if($this->Remove){
					if($this->Days != ''){
						$this->ServiceURL = $ServiceURL->ServiceUrl.'/siteId/'.trim($this->SiteId).'/days/'.trim($this->Days);
					}else{
						$this->ServiceURL = $this->ServiceURL.'&remove=true';
					}
				}
			}
				
			if(trim($ServiceURL->Verb) == 'POST'){
				$this->ServiceURL = $ServiceURL->ServiceUrl;
			}
			if(trim($ServiceURL->Verb) == 'PUT'){
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
			case "delete":
				$this->Method = "DELETE";
				break;
		}

	}

	public function GetMethod(){
		return $this->Method;
	}

	public function DataDecode($Data){
		//print json_decode($Data);
		return json_decode($Data);
	}

	public function DataEncode($Data){
		//print "<pre>";print_r($Data);print "</pre>";
		//print_r(json_encode($Data));
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

//isEncrypted":false,"insertedById":0,"updatedById":0}]}

class UserProfile {
	public $userProfileId;
	public $userId;
	public $siteId;
	public $emailId;
	public $authId;
	//public $authUserId;
	public $userProfileInfo = array();

	function UserProfile($userProfileId = null){
		$this->userProfileId = $userProfileId;
	}
	function addUserProfileInfo($key, $value, $isEncrypted){
		$usrProInfo = new UserProfileInfo();
		$usrProInfo->fieldName = $key;
		$usrProInfo->fieldValue = $value;
		$usrProInfo->isEncrypted = $isEncrypted;
		$usrProInfo->userProfileId = $this->userProfileId;
		$this->userProfileInfo[] = $usrProInfo;
	}
	function addUserProfileInfoUpdated($key, $value, $isEncrypted, $userProfileIdParam){
		$usrProInfo = new UserProfileInfo();
		$usrProInfo->fieldName = $key;
		$usrProInfo->fieldValue = $value;
		$usrProInfo->isEncrypted = $isEncrypted;
		$usrProInfo->userProfileId = $userProfileIdParam;
		$this->userProfileInfo[] = $usrProInfo;
	}
}

class UserProfileInfo {
	public $fieldName;
	public $fieldValue;
	public $isEncrypted;
	public $userProfileId;
}
?>