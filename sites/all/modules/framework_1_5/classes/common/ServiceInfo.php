<?php
/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of ServiceInfo
 *
 * @author Praveen
 */
final class ServiceInfo {

    public $SiteId;
    public $ServiceName;
    public $Action;
    public $ServiceUrl;
	public $Verb;
	public $SiteAuthorizationKey;
	
    public function getSiteId(){
        return $this->SiteId;
    }

    public function getServiceName(){
        return $this->$ServiceName;
    }

    public function getAction(){
        return $this->$Action;
    }

    public function getServiceUrl(){
        return $this->ServiceUrl;
    }
	
	public function getVerb(){
        return $this->Verb;
    }

    public function setSiteId($value){
        $this->SiteId = $value;
    }

    public function setServiceName($value) {
        $this->ServiceName = $value;
    }

    public function setAction($value){
        $this->Action = $value;
    }

    public function setServiceUrl($value){
        $this->ServiceUrl = $value;
    }
	
	public function setVerb($value){
        $this->Verb = $value;
    }
	
	 public function getSiteAuthorizationKey(){
        return $this->SiteAuthorizationKey;
    }
	
	public function setSiteAuthorizationKey($value){
        $this->SiteAuthorizationKey = $value;
    }

}
?>
