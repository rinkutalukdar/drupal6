<?php

final class SiteInfo {
   
    private $SiteId;
    private $SiteAuthorizationKey;

    public function __construct(
          $siteId
        , $siteAuthorizationKey){

        $this->SiteId = $siteId;
        $this->SiteAuthorizationKey = $siteAuthorizationKey;

    }

    public function getSiteId(){
        return $this->SiteId;
    }

    public function getSiteAuthorizationKey(){
        return $this->SiteAuthorizationKey;
    }
}

?>