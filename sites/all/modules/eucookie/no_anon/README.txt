
Description
-----------
The no_anon module eliminates the need for sessions for anonymous users

This has the potential to reduce the server load and/or database contention on busy
sites, since crawlers do not create entries in the session table for every page view.

Side effects
------------
Some modules use the $_SESSION superglobal variable to store info for anonymous users
will be affected by this module. If your modules use this only for logged in users,
then it will not be an issue. Before you install this module, make sure that your modules
do not depend on that.

This approach is known to cause the following features not to work:

1. The core Who's Online block

2. The core Throttle module

3. The anonymous user count in the Administration Menu module.

Installation
------------
To install this module, do the following:

1. Extract the tarball into your sites/all/modules directory.

2. Enable the module from admin/build/modules

3. You then must change your settings.php file to add the following line
   towards the end of the file:

   $conf['session_inc'] = './sites/all/modules/no_anon/session-no-anon.inc';

   Adjust the above to point to where you installed the module, e.g. 
   './sites/example.com/modules/no_anon/session-no-anon.inc' if that 
   is where you installed it.
   
FAQ
---
Q: Help! I can no longer log in to my web site!

A: Most likely, you've forgotten to enable the No Anonymous module. It is not
   enough to have the session_inc change above. Without the no_anon module,
   cookies will remain disabled at all times. The result is that while you
   can log in, your session ID will not be stored in your browser (because
   it couldn't store it in a cookie), which makes it impossible to remain
   logged in.

Author
------
Khalid Baheyeldin http://baheyeldin.com of http://2bits.com

Based on an article by Marco Carbone 
http://www.advomatic.com/blogs/marco-carbone/drupal-privacy-configuring-your-site-to-work-without-cookies-for-anonymous-users

