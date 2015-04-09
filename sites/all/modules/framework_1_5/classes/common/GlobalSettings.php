<?php
/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of GlobalSettings
 *
 * @author PRajappa
 */
final class GlobalSettings {

    private function __construct(){

    }

	public static function getServiceRegistryUrl(){
        return (variable_get('framework_1_5_service_registry_url',GLOBALS_REGISTRY_URL));
	}

    public static function getCASDomain(){
        return (variable_get('framework_1_5_cas_service_domain',GLOBALS_CAS_SERVER_URL));
	}

    public static function getCASPort(){
        return (variable_get('framework_1_5_cas_service_port',GLOBALS_CAS_PORT));
	}

    public static function getCASUri(){
        return (variable_get('framework_1_5_cas_service_uri',GLOBALS_CAS_URI));
	}
}
?>
