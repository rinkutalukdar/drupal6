<?php
if (!class_exists("HTTP_Request")) {
    require_once('HTTP/Request.php');
}
class PearRestAPI implements IRestAPI {
  function executeRequest($ServiceData) {
    if(!$ServiceData->GetServiceURL()) {

      $ServiceURL = json_decode($this->GetServices($ServiceData));

      if(strlen($ServiceData->get_error_message())<1) {
        $ServiceData->SetServiceURL($ServiceURL);
      }
      else {
        return;
      }
    }
    $service_url = $ServiceData->GetServiceURL();

    //echo $service_url."<br/><br/>";

    $req = &new HTTP_Request($ServiceData->GetServiceURL());
    $req->setMethod($ServiceData->GetMethod());

    switch(trim($ServiceData->GetMethod())) {
      case "PUT":
        $req->SetBody('ServiceReq'."=".$ServiceData->GetPostedData());
        break;

      case "POST":
        $req->addPostData('ServiceReq',$ServiceData->GetPostedData());
        break;

      case "GET":
        $req->clearPostData();
        break;

    }

    //For this contextService we needs to be installed Framework module

    $stringToSign = $this->createSignature($ServiceData->GetServiceURL());
	 if(class_exists('ContextService')){
    $siteAuthKey = ContextService::getSiteAuthorizationKey();
    $SiteId = ContextService::getSiteId();
    }
    $req->addHeader('Authorization', 'Basic ' .base64_encode($SiteId.":". $siteAuthKey)); //HTTP Auth
	 if(class_exists('ContextService')){
    $req->addHeader('SITEID', ContextService::getSiteId()); //HTTP Auth
	}
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
      
      $ServiceName = $ServiceData->GetServiceName();
      $ServiceIdentity = $ServiceData->GetServiceIdentity();

      watchdog('ITrInnoFwk'
                , '[@errCode] [%url] [%errMsg] [%siteId] [%serviceName] [%serviceIdty] [%authKey]'
                , array(
                    '@errCode' => $code,
                    '%url' => $service_url,
                    '%errMsg' => $response_msg,
                    '%siteId' => $SiteId,
                    '%serviceName' => $ServiceName,
                    '%serviceIdty' => $ServiceIdentity,
                    '%authKey' => $siteAuthKey)
                , WATCHDOG_ERROR, '');
      
      $ServiceData->set_error_message("Error in ServiceURL, ".$response_msg);
      return;
    }

    return $req->getResponseBody();

  }

  function GetServices($ServiceData) {
  if(class_exists('ContextService')){
    $SiteId = ContextService::getSiteId();
   }
    $ServiceName = $ServiceData->GetServiceName();
    $ServiceIdentity = $ServiceData->GetServiceIdentity();

    $registry_base = variable_get('framework_1_5_service_registry_url',GLOBALS_REGISTRY_URL);
	if(class_exists('ContextService')){
    $site_auth = ContextService::getSiteAuthorizationKey();
    }

    $req = &new HTTP_Request($registry_base."{$SiteId}/{$ServiceName}/{$ServiceIdentity}");
    $req->setMethod(HTTP_REQUEST_METHOD_GET);



    $stringToSign = $this->createSignature($registry_base);
	if(class_exists('ContextService')){
    $siteAuthKey = ContextService::getSiteAuthorizationKey();
	}
    
    $req->addHeader('Authorization', 'Basic ' .base64_encode($SiteId.":". $siteAuthKey)); //HTTP Auth
    $req->addHeader('SITEID', $SiteId); //HTTP Auth
    $req->addHeader('Debug', "true"); //HTTP Auth
    $req->sendRequest();
    $code = $req->getResponseCode();

    ob_start();
    print_r($req->_requestHeaders);
    echo "\n";
    print_r($req->_body);
    $err_body= ob_get_contents();
    ob_end_clean();

    if($code != 200) {
      $response_msg = $this->getStatusMessage($code);
      watchdog('ITrInnoFwk'
                , '[@errCode] [%url] [%errMsg] [%siteId] [%serviceName] [%serviceIdty] [%authKey]'
                , array(
                    '@errCode' => $code,
                    '%url' => $registry_base,
                    '%errMsg' => $response_msg,
                    '%siteId' => $SiteId,
                    '%serviceName' => $ServiceName,
                    '%serviceIdty' => $ServiceIdentity,
                    '%authKey' => $siteAuthKey)
                , WATCHDOG_ERROR, '');
      
      return;
    }

    $ServiceResponse = $req->getResponseBody();
    return $ServiceResponse;
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

  /**
   * get the property file details
   * @param $filename is the property file name of current need
   * @param $param particular property name
   *
   */

  function getFileDetails($filename, $param = NULL) {

    $name = 'sites/all/modules/restapi/propertyfiles/'.$filename;
    $fp = fopen($name, 'rb');

    while(!feof($fp)) {
      $asd = fgets($fp);
      if($asd{0} != ';') {
        $Parameters = split('=', $asd);
        $properties[$Parameters[0]] = $Parameters[1];

      }
    }
    if($param != NULL) {
      return $properties[$param];
    }else {
      return $properties;
    }

  }

}

?>