<?php
/*
*	Declare an interface IContent to get the 
*	contenct type of the datum
*/
interface IContactUsContent{

	public function SetSiteId($SiteId);
	
	public function GetSiteId();
	
	public function SetServiceName($ServiceName);
	
	public function GetServiceName();
	
	public function SetServiceIdentity($ServiceIdentity);
	
	public function GetServiceIdentity();
	
	public function SetServiceURL($ServiceURL);
	
	public function GetServiceURL();
	
	public function SetPostedData($PostedData);
	
	public function GetPostedData();
	
	public function SetMethod($Method);
	
	public function GetMethod();
	
	public function DataDecode($Data);
	
	public function DataEncode($Data);
	
}
?>
