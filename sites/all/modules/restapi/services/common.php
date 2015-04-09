<?php
/*
*	Class to get the Service configuration
*	TODO: Have to put in proper folder structure
*/
class ServiceConfig{

	public function get($ContentType, $cntxt = ''){
	

		
		$obj->host = 'http://pragatha:8180';
		$obj->uri = '/firstStepsServlet/items';
		$obj->verb = 'GET';
		$obj->params = array(
								'name' => 'test',
								'description' => 'test',
							);
							
		return $obj;
	
	}

}

?>