<?php

/*
*	Class for publish the data for the services
*	and also validate the data and remove the 
*	unwanted datum
*/

class ContactusService{

  /* APC -setting the time to leave (TTL ) for the cache as 4 hours=14400seconds */
  private $TTL=14400;

	function GetContactUsServiceURL(ContactusData $data){
	
		$restCall = GetRestApiInstance();
		return $restCall->GetServices($data);
		
	}
	
	function CreateContactUs(ContactusData $data){
		$restCall = GetRestApiInstance();
		return $restCall->executeRequest($data);
	
	}
	
	function GetSubjects(ContactusData $data){ 
	
	    /* apc intergrated code added by JUBIN editted on May 6 2010*/
		$key="ContactUs_".$data->GetSiteId();
		$result=$this->get_from_cache($key);
		if($result!=NULL)
		 {	      
		 return $result;
		 }
	  /*retreiving data from the webservice */
		$restCall = GetRestApiInstance(); 
		$result=$restCall->executeRequest($data);
		
	  /*adding to the cache if apc enabled and the data is not present in the cache */
		$this->add_to_cache($key,$result);
		
		return $result;
	}
	
	
			/*apc integration starts here ;added by JUBIN on May 6 2010*/
	
	  /* function to check whether apc is enabled or not */
	   
	   function apc_isenabled()
	   {
	     if(module_exists(apc_api))
           {
		   return true;
		   }
		return false;
	   }
	   
	  /*function to add to the cache*/
	  
	  function add_to_cache($key,$data)
	   {
	     if($this->apc_isenabled())
		 {
	     apc_api_set_to_cache($key,$data,"cache",$this->TTL);
		 }

	   }
	
	  /* function to get from cache */
	  function get_from_cache($key)
	  {
	    if(!$this->apc_isenabled())
		{
		return NULL;
		}
	   return apc_api_get_from_cache($key);      
	  }
	/*apc integration ends herer */
	
	
}



?>