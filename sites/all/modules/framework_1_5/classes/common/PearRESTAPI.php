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

if (!class_exists("HTTP_Request")) {
    require_once('HTTP/Request.php');
}

final class PearRESTAPI implements IRestServiceAPI {

    /**
     *
     * @param <type> $serviceName
     * @param <type> $serviceAction
     * @param <type> $serviceData
     * @return <type>
     */
    public function execute($serviceName, $serviceAction, $serviceData) {
        $serviceInfo = ServiceRegistryMgr::getServiceInfo($serviceName, $serviceAction);
        return $this->makeRequest($serviceInfo, $jsonData);
    }

    /**
     *
     * @param <type> $serviceInfo
     * @param <type> $serviceData
     * @return <type> 
     */
    public function execute(ServiceInfo $serviceInfo, $serviceData) {

        return $this->makeRequest($serviceInfo, $jsonData);
    }

    /**
     *
     * @param <type> $serviceInfo
     * @param <type> $jsonData
     * @return <type>
     */
    private function makeRequest(ServiceInfo $serviceInfo, $jsonData) {
    // Complete the request
    // Now got the service info and json data so complete the requeset

        $req = &new HTTP_Request($serviceInfo->getServiceUrl());
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

        $req->addHeader('Authorization', 'Basic ' .base64_encode($siteAuthKey.":". $siteAuthHash)); //HTTP Auth
        $req->addHeader('SITEID', ContextService::getSiteId()); //HTTP Auth

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

		/*if (!is_null($parsedUrl['port'])) {
		  $stringToSign .= '\n' . $parsedUrl['port'];
		}
		
		$stringToSign .= '\n'.$parsedUrl['path'];*/

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
