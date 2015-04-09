<?php

/*
*	Class for publish the data for the services
*	and also validate the data and remove the 
*	unwanted datum
*/

//require_once('UserProfilePearRestAPI.php');

class UserProfileService {
  
  const SERVICE_IDENTITY_CREATE = "create";
  const SERVICE_IDENTITY_UPDATE = "update"; // To be change when service for backward compatibility are created.
  const SERVICE_IDENTITY_DELETE = "delete"; // To be change when service for backward compatibility are created.
  const SERVICE_IDENTITY_LOAD = "load"; // To be change when service for backward compatibility are created.
  const SERVICE_METHOD_POST = "POST";
  const SERVICE_METHOD_PUT = "PUT";
  const SERVICE_METHOD_GET = "GET";
  const SERVICE_METHOD_DELETE = "DELETE";
  const SERVICE_NAME = "userprofile";
  const SERVICE_NEW_NAME = "UserIdentity";

  public function ExecuteUserProfileReq(UserProfileData $Data){
      //print "<pre>";print_r($Data);print "</pre>";
      $restCall = GetRestApiInstance();
      //$this->setServiceURL($Data);
      return $restCall->executeRequest($Data);
  }
  
  public function ExecuteUserProfileReqDecoded(UserProfileData $Data){
      //print "<pre>";print_r($Data);print "</pre>";
      $restCall = GetRestApiInstance();
      //$this->setServiceURL($Data);
      return json_decode($restCall->executeRequest($Data));
  }

  //Method: This will decided which service to call based on the verb (method).
  //Basecially replaces service registry.
  private function setServiceURL(UserProfileData $serviceData){ 
	  $obj = new ServiceURL();
	  $obj->Verb = $serviceData->GetMethod();
	  $obj->SiteId = $serviceData->GetSiteId();
	  $obj->ServiceUrl = UserProfileService::getServiceUrl();
          $serviceData->SetServiceURL($obj);
  }
  
  private function getServiceInstance(){
    $restCall = null;
    $siteId = UserProfileService::getSiteId();
    $siteAuthKey = UserProfileService::getSiteAuthKey();
       
    if($siteId && $siteAuthKey){
      $restCall = new UserProfilePearRestAPI();
      $restCall->setSiteId($siteId);
      $restCall->setSiteAuthKey($siteAuthKey);
    }else{
      $restCall = GetRestApiInstance();
    }
    
    return $restCall;
    
  }
  
  public static function getSiteId(){
    $siteId = variable_get("user_profile_SiteId", null);
    if(!$siteId){
	  if(class_exists('ContextService')){
      $siteId = ContextService::getSiteId();
	  }
    }
    
    return $siteId;
    
  }
  
  public static function getSiteAuthKey(){
    $siteAuthKey = variable_get("user_profile_SiteAuthKey", null);
    
    if(!$siteAuthKey){
	  if(class_exists('ContextService')){
      $siteAuthKey = ContextService::getSiteAuthorizationKey();
	  }
    }
    
    return $siteAuthKey;
    
  }
  
  public static function getServiceUrl(){
    $serviceUrl = variable_get("user_profile_serviceUrl", null);
    return $serviceUrl;
    
  }
  
}

class ServiceURL {
 public $Verb;
 public $ServiceUrl;
 public $SiteId;
}

?>