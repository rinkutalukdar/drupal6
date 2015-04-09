<?php
/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of PearRestAPI
 *
 * @author Praveen
 */

//if (!class_exists("HTTP_Request")) {
    //require_once('HTTP/Request.php');
//}

final class PearRESTServiceAPI implements IRestServiceAPI {

    public function execute(ServiceInfo $serviceInfo, $serviceData) {

        return $this->makeRequest($serviceInfo, $serviceData);
    }

    private function makeRequest(ServiceInfo $serviceInfo, $jsonData) {
        // Complete the request
        // Now got the service info and json data so complete the requeset
        $url = $serviceInfo->getServiceUrl();
        //$url = str_replace('https','http',$url);

        $req = &new HTTP_Request($url);
        $req->setMethod($serviceInfo->getVerb());

        switch(trim($serviceInfo->getVerb())) {
            case "PUT":
                $req->addPostData('_method','put');

            case "POST":
                $req->addPostData('ServiceReq',$jsonData);
                break;

            case "GET":
                $req->clearPostData();
                break;

        }

        $stringToSign = $this->createSignature($serviceInfo);
        //echo $stringToSign;exit;
        $siteAuthKey = ContextService::getSiteAuthorizationKey();

        $siteAuthHash = CryptService::sign(
            $stringToSign
            , $siteAuthKey
            , 'sha1');

		
        // Only for the Debug Mode
		$req->addHeader('Authorization', 'Basic ' .base64_encode($serviceInfo->getSiteId().":". $siteAuthKey)); //HTTP Auth
		$req->addHeader('SITEID', $serviceInfo->getSiteId()); //HTTP Auth
		$req->addHeader('Debug', "true"); //HTTP Auth

	  $req->addHeader('Debug', 'True'); 
        $req->sendRequest();
        $code = $req->getResponseCode();

        $hasError = 'false';
        if($code != 200 && $code != 201 && $code != 202 && $code != 203) {
            $response_msg = $this->getStatusMessage($code);
            $hasError = true;
        }

        return new Response(
        $req->getResponseBody()
        , $code
        , $code
        , $response_msg
        , $hasError);
    }

    private function createSignature($serviceInfo) {

        $serviceUrl = $serviceInfo->getServiceUrl();

        $parsedUrl = parse_url($serviceUrl);

        $stringToSign = $parsedUrl['host'];

        return $stringToSign;
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
