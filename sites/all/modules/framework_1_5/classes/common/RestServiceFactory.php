<?php
/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of RestAPIFactory
 *
 * @author Praveen
 */
final class RestServiceFactory {

    private static $instance;

    private function __construct(){

    }

    public static function getInstance(){
        
		if (!isset(self::$instance)){
            self::$instance = self::createInstance();
        }

        return self::$instance;
    }

    // -- Private Functions --

    private static function createInstance(){
        // Read from properties
		
		$obj = new PearRESTServiceAPI();

		return $obj;
		
    }

    // -- Private Functions End --
	
	private static function getClassName(){
		return self::getProperties('type');
	}
	
	private static function getProperties($param = NULL){
	
		$name = 'sites/all/modules/framework_1_5/classes/common/restAPI.properties';
		$fp = fopen($name, 'rb');
		
		while(!feof($fp)){
			$asd = fgets($fp);
			if($asd{0} != ';'){
				$Parameters = split(':', $asd);
				$properties[$Parameters[0]] = $Parameters[1];
				
			}
		}
		if($param != NULL){
			return $properties[$param];
		}else{
			return $properties;
		}
		
	}
}
?>
