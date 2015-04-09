<?php

require_once('HTTP/Request.php');

class UserProfilePearRestAPI{

  private $SiteId;
	private $SiteAuthKey;
	
  public function SetSiteId($siteId){
		$this->SiteId = $siteId;
		//print $this->SiteId;
	}
	
	public function GetSiteId(){
		return $this->SiteId;
	}
  
  public function SetSiteAuthKey($siteAuthKey){
		$this->SiteAuthKey = $siteAuthKey;
		//print $this->SiteAuthKey;
	}
	
	public function GetSiteAuthKey(){
		return $this->SiteAuthKey;
	}
  
	public function executeRequest($ServiceData)
	{//print "in executeRequest";
    $req = &new HTTP_Request($ServiceData->GetServiceURL());
		$req->setMethod($ServiceData->GetMethod());
		
		switch(trim($ServiceData->GetMethod()))
		{
			case "PUT":
			$req->SetBody('ServiceReq'."=".$ServiceData->GetPostedData());
			break;
			
			case "POST":
			$req->addPostData('ServiceReq',$ServiceData->GetPostedData());
			//$testData = $req->addPostData('ServiceReq',$ServiceData->GetPostedData());
			//print_r($testData);
			break;
      
			case "GET":
			$req->clearPostData();
			break;
		}
         
		 //For this contextService we needs to be installed Framework module

		$stringToSign = $this->createSignature($ServiceData->GetServiceURL());
    
    $req->addHeader('Authorization', 'Basic ' .base64_encode($this->SiteId.":". $this->SiteAuthKey)); //HTTP Auth
		$req->addHeader('SITEID', $this->SiteId); //HTTP Auth
		$req->addHeader('Debug', "true"); //HTTP Auth
		
		$req->sendRequest();

		$code = $req->getResponseCode();

		ob_start();
		print_r($req->_requestHeaders);
		echo "\n";
		print_r($ServiceData->GetPostedData());
		$err_body= ob_get_contents();
		ob_end_clean();
			
		if($code != 200 && $code != 201 && $code != 202 && $code != 203) {
			$response_msg = $this->getStatusMessage($code);
			watchdog('Framework', $response_msg."\n".$err_body, "", WATCHDOG_ERROR);
			$ServiceData->set_error_message("Error in ServiceURL, ".$response_msg);
			return;
		}
		
		return $req->getResponseBody();
		
	}
    
    private function createSignature($serviceUrl) {
       
	    $parsedUrl = parse_url($serviceUrl);
        $stringToSign = $parsedUrl['host'];
        return trim($stringToSign);
		
    }

	
	function getStatusMessage($code, $serviceName = '') {
		
		switch ($code) {
			case 404:
			$err_msg = t("Error Code 404: Document not found");
			break;
			
			case 403:
			$err_msg = t("Error Code 403: The server doesn't let the Client access");
			break;
			
			case 401:
			$err_msg = t("Error Code 401: Authentication error");
			break;
			
			case 500:
			$err_msg = t("Error Code 500: Internal Server error");
			break;

			case 200:
			$err_msg = t("OK");
			break;
		
		}
		
		return $err_msg;
	}
	
}

?>