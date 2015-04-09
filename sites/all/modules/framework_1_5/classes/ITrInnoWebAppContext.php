<?php
/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of ITrInnoWebAppContext
 *
 * @author Praveen
 */

final class ITrInnoWebAppContext {
    
    public $siteInfo;
    
    public function __construct(
		SiteInfo $siteInfo){
		
		$this->siteInfo = $siteInfo;
        
    }

    public function getSiteInfo(){
        return $this->siteInfo;
    }


}

?>
