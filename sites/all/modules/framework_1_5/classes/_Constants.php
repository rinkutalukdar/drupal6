<?php
/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of _Constants
 *
 * @author Praveen
 */

define('CURRENT_CONTENT_SITE_ID','fwk_itrinno_site_id');
define('ADMIN_SITE_ID','fwk_itrinno_admin_site_id');

define('FRAMEWORK_MODULE_NAME','framework_1_5');
define('FRAMEWORK_ACTION_CREATE','create');
define('FRAMEWORK_SERVICE_NAME','context');
define('FRAMEWORK_ACTION_LOAD_SERVICE_META','GetServiceInfo');// Service action name for ServiceInfo look up

// Constanct for the HTTP verbs
define('FWK_HTTP_GET','GET');
define('FWK_HTTP_POST','POST');
define('FWK_HTTP_PUT','PUT');
define('FWK_HTTP_DELETE','DELETE');

define('WEB_CONTEXT_KEY',"ITrInnoWebCtx");

//http://174.129.13.99:8080/serviceregistry/service/[SITEID]/siteManagement/load

$registry_url = variable_get('framework_1_5_service_registry_url',GLOBALS_REGISTRY_URL);
$service_url = $registry_url.'[SITEID]/siteManagement/load';
define('FRAMEWORK_REGISTRY_URL',$service_url);
?>