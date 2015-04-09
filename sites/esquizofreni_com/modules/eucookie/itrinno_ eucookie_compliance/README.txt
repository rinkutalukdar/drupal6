eu-cookie-tweaks for Drupal 6.x
-----------------------------------
This module will help users to accept/deny the third party sites accessing the site.

Installation
---------------------------------------
1. Install the module the same as any other contributed module.
2. Go to admin >> settings >> EU Cookie configuration settings .  There are two other tabs where admin may configure cookie related setting.
3. Front user : If the user has accepted for ‘Website enhancement’, then it will be considered accepted for ‘Necessary cookie’ automatically
3. For viewing the available 3rd Party cookies Please navigate through the following link : EU Cookie Compliance (/eu-cookie-compliance)
4. As now we have worked on thirdparty cookies including google analytics and ChartBeat.If we want to integrate this module to remove the cookie for other
   parties,developer may use the following function to know cookie setting status.
   
	===============
	JS function : Drupal.eu_cookie_extra_tune.isCookieDenied ('denied_GA'));
	'denied_GA' is denied key paramaeter. It will return TRUE for if cookie is denied by user, otherwise FALSE.
	
	PHP function : eu_cookie_tweaks_is_cookie_denied($denied_key)
	'$denied_GA' is denied key paramaeter. It will return TRUE for if cookie is denied by user, otherwise FALSE.
	
	To know the denied key for any third party see this array
	        [GA] => Google Analytics
            [CB] => ChartBeat
            [WT] => Webtrends
            [CE] => Crazy Egg
            [OM] => Omniture (Adobe Web Analytics)
            [IC] => InSites Consulting
            [PG] => Performance Horizon Group
            [AN] => AppNexus
            [IM] => Invite Media
            [PM] => Pubmatic
            [DC] => DoubleClick
            [GD] => Google Adwords
            [MM] => Media Math
            [MA] => MicroSoft Advertising
            [SL] => Skimlinks
            [SM] => Specific Media
            [VN] => VoiceFive Networks
            [IVD] => Imagini (Visual DNA)
            [RM] => Right Media
            [GNS] => GENIUS
            [AT] => AddThis
            [FB] => Facebook
            [TW] => Twitter
            [YT] => YouTube
            [SS] => Slide Share
            [MF] => McAfee
			
	For example denied key for 'YouTube': denied_YT