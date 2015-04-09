<?php
/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of ServiceRegistryMgr
 *
 * @author Praveen
 */
final class ServiceRegistryMgr{

    private function __construct(){

    }

	public static function clearRegistryCache($serviceName, $serviceAction){
	}
	
	public static function clearAllRegistryCache(){
		
	}

    public static function getServiceInfo($serviceName, $serviceAction){
        
		//TODO: check if exists in the cache.
		
        $siteId = ContextService::getSiteId();
		
		// Call appropriate service return the ServiceInfo object.
		// Create RESTAPI instance
		$restApi = RestServiceFactory::getInstance();
		
        $serviceUrl = str_replace('[SITEID]', $siteId, GlobalSettings::getServiceRegistryUrl());
		//$serviceUrl = str_replace('https', 'http',$serviceUrl);
		$serviceUrl = "{$serviceUrl}{$siteId}/{$serviceName}/{$serviceAction}";
		///$serviceUrl = "http://174.129.13.99:8080/serviceregistry/service/{$siteId}/{$serviceName}/{$serviceAction}";
		
		// This serviceInfo needs to be created by ourselves as to get the serviceInfo of other objects we need to know the service registry. We cannot lookup. 
		$serviceInfo = new ServiceInfo();
		$serviceInfo->setSiteId($siteId);
		$serviceInfo->setServiceName($serviceName);
		$serviceInfo->setServiceUrl($serviceUrl);
		$serviceInfo->setVerb(FWK_HTTP_GET); //create HTTP_GET, HTTP_POST, HTTP_PUT, HTTP_DELETE
		$serviceInfo->setSiteAuthorizationKey(ContextService::getSiteAuthorizationKey());
		
        $response = $restApi->execute($serviceInfo, null);
		// call REST execute
		$siteInfoJson = $response->getResponseBody();
		
		/*p("right in here..");
		p($siteInfoJson);
		p("right out here..");
		exit;*/
		
		$serviceInfo = new ServiceInfo();

    	//TEST CODE:
		//$serviceInfo = JSONSerializer::decodeAndCast('{"SiteId":"1003","ServiceName":"context","Action":null,"ServiceUrl":"http:\/\/174.129.13.99:8080\/serviceregistry\/service\/2\/subscriber\/loadall","Verb":"get","InsertDate":null,"UpdateDate":null,"ServiceSiteRegistryId":null}', $serviceInfo); // Needs to check with Praveen return is correct??
		$serviceInfo = JSONSerializer::decodeAs($siteInfoJson, $serviceInfo); // Needs to check with Praveen return is correct??
		
		//TODO: Add to cache if does not exists
		
		return $serviceInfo;
    }

}
?>
