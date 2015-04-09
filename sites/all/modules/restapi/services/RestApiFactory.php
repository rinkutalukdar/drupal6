<?php

/**
 * Rest API interface
 */
 
class RestApiFactory
{

    /**
     * Create a new Rest API object for the specified Service type
     *
     * @param string $type     the Service type (eg "PEAR")
     *
     * @return object  a new Service object. 
     *
     */
	 
	 
	function &CreateInstance(){
	
		$type = RestApiFactory::getClassName();
		
		require_once "classes/{$type}.php";
		
		$classname = $type;

        if (!class_exists($classname)) {

            trigger_error('Class File Not found', E_USER_ERROR);
			return $tmp;
        }
      
		
		@$obj = new $classname;
		
		return $obj;
			
	
	}


	function getClassName(){
		return RestApiFactory::getProperties('type');
	}
	
	function getProperties($param = NULL){
	
		$name = 'sites/all/modules/restapi/services/restAPI.properties';
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