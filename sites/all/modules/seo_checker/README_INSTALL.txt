Installation of seo_checker 6.x-2.x
-----------------------------------

1. Place the seo_checker directory in sites/all/modules.

2. Enable the core module and the submodules you need at /admin/build/modules

2.1 If you enable the module keyword_rules, your nodes require a CCK field that holds your keywords.
    It is recommended to use the Meta Tags module (http://drupal.org/project/nodewords)
    which provides such a field. Alternatively you can create your own CCK text field.

3. Enable the SEO compliance check for the desired content types 
	 at their configuration page.

4. The module comes with two submodules that include some basic checks. 
   Install or write further submodules that implement more such checks.

5. Configure the thresholds and other settings at admin/settings/seo_checker
