<?php
/**
 * Service helper class to get the ContextInfo
 *
 * @author Jag
 */
 

final class ContextService {

    static public function loadSiteInfo() {
		$siteInfo = new SiteInfo(variable_get('framework_1_5_siteid',''), variable_get('framework_1_5_authkey',''));   
    	return $siteInfo;
	}
	
	static public function getSiteAuthorizationKey(){
	
		$ctx = ITrInnoWebAppContextMgr::getCurrent();		
		return $ctx->getSiteInfo()->getSiteAuthorizationKey();
	}
	
	static public function getSiteId(){
		$ctx = ITrInnoWebAppContextMgr::getCurrent();		
		return $ctx->getSiteInfo()->getSiteId();
	}

}
    
?>
