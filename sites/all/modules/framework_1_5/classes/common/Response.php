<?php
/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

final class Response {
    private $errCode;
    private $errMsg;
    private $responseBody;
    private $httpStatusCode;
    private $hasError = 'false';
    private $headers;
    private $cookies;

    public function __construct(
          $responseBody
        , $httpStatusCode = null
        , $errCode = null
        , $errMsg = null
        , $hasError = 'false'
        , $headers = null
        , $cookies = null){

        $this->responseBody = $responseBody;
        $this->httpStatusCode = $httpStatusCode;
        $this->errMsg = $errMsg;
        $this->errCode = $errCode;
        $this->hasError = $hasError;
        $this->headers = $headers;
        $this->cookies = $cookies;

    }

    public function getErrCode(){
        return $this->errCode;
    }

    public function getErrMsg(){
        return $this->errMsg;
    }

    public function getResponseBody(){
        return $this->responseBody;
    }

    public function getHasError(){
        return $this->hasError;
    }

    /**
     * Return array of headers added to the current request.
     * @return <type>
     */
    public function getHeaders(){
        return $this->headers;
    }

    /**
     * Returns the list of cookies added
     * @return <type>
     */
    public function getCookies(){
        return $this->cookies;
    }

    /**
     * Add http headers
     * @param <type> $key
     * @param <type> $value
     */
    public function addHeader($key, $value){
        $this->headers[$key] = $value;
    }

    /**
     * Add http cookie key value pair
     * @param <type> $key
     * @param <type> $value
     */
    public function addCookie($key, $value){
        $this->cookies[$key] = $value;
    }
}

?>
