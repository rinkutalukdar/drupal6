$Id: README.txt,v 0.2 2013/03/11 09:32:00  Exp $

CONTENTS OF THIS FILE
---------------------

 * INTRODUCTION
 * FEATURES
 * INSTALLATION
 * SETTINGS
 * PERMISSIONS
 * OBSERVATIONS


INTRODUCTION
------------

Current Maintainers: ITrInno Framework Team
Co-maintainer: 
Original Author: 

ITrInno Form Filter helps in automating the process of protecting your site by
implementing verifications for forms and URLs that keep your site from being
hacked by XSS or SQL injection attacks.

FEATURES
--------

Once you enable this module the following features will be available:
- Protects URLs and form submitted values against attacks (both XSS and SQL injection types).
  Uses two solutions: pattern matching and standard Drupal core protection (the latter for XSS only).
- Allows you to configure the patterns used for URL and form submitted values verification.
- Allows excluding/including forms from being checked through the module's admin interface
  and also through the forms themselves (for authorized users only).
- Fully configurable, allows admins to set error/redirection messages in case an attack attempt
  is detected.

INSTALLATION
------------

Installation is done in the same way as for any other Drupal module. Once it is installed and enabled
settings can be adjusted at admin/settings/itrinno-form-filter.

It is highly recommended that you read the below instructions carefully before using this module.

SETTINGS
--------

Settings can be configure through admin/settings/itrinno-form-filter. The settings available are:

- Form Protection settings: settings related to the form submitted values verification.
  - Form Protection Patterns: default set of string patterns used while checking for
    attack attempts on form submitted values. Those are distributed with the module as
    a basic set and should not be changed. Both XSS and SQL injection protection patterns
    can be included here.
  - Custom Form Protection Patterns: same as above, except these can be changed and allows
    to extend the set present in the previous setting. Both will be merged and used as a
    single set when checking form submitted values.
  - Unsafe Form Error Message: message shown to the user when a form submitted value is
    considered unsafe. IF LEFT EMPTY, VALUES WILL BE FILTERED WITHOUT USER NOTICE AND
    SUBMISSION WILL NOT BE PREVENTED.
  - Display Include/Exclude Link: Whether to display the form checking toggler in
    forms (those will be displayed to site admin or users with the permission
    "toggle form filtering").
  - Excluded Form Ids: list of form ID's that currently bypass all verifications. Those
    can be included/excluded using the links provided at the bottom of each form or
    the list can be manipulated directly through "Manually Set Excluded Forms List" tab.
- URL Protection settings: settings related to the requested URLs verification.
  - URL Protection Patterns and Custom URL Protection Patterns: work the same way as
    "form protection patterns" and "custom form protection patterns" described above.
  - Redirect-to Page: page to which the user will be redirected in case an unsafe value
    is detected in the current URL request.
  - Unsafe URL Error Message: Message to be displayed when redirecting the user when
    an unsafe value is detected.
- Form Verfication Include/Exclude Links:
  - "Exclude" Link Text: caption for the exclude link.
  - "Include" Link Text: caption for the include link.
- Enable Debug Info: if checked some information regarding unsafe detected values will
  be kept in Drupal's watchdog. THIS SHOULD NOT BE ENABLED IN PRODUCTION SITES AS
  SENSITIVE INFORMATION COULD BE STORED IN MYSQL.

- Manually Set Excluded Forms List tab: it is possible to edit manually the list of
  excluded form IDs through this tab. Its value should be a comma-separated list of
  valid form IDs.

PERMISSIONS
-----------

This modules sets 3 permissions:

- 'configure formfilter module': used to control access to admin page where settings
  can be configured.
- 'toggle form filtering': only users with this permission will see the include/exclude
  form link to disable/enable form verification and will have permission to do so.
- 'input unfiltered values': allows users to bypass any form verification. This could be
  set to content admins so that they can input contents with javascript in it without being
  prevented to do so by form filter.

OBSERVATIONS
------------
- Only forms built using Drupal's form API (directly or eg. by using WebForm) will be checked.
  Simple HTML forms WILL NOT be validated by this module.
- It is recommended to enable this module after doing unit tests. Enable the debug option and
  check if any values have been filtered for a normal use case. If any of the patterns being used
  prevent correct functionality then it should be REMOVED (in that case, please notify the ITrInno
  support team).
- THIS MODULE DOES NOT PROVIDE A COMPLETE PROTECTION AGAINST SQL INJECTION ATTACKS. While the
  patterns used will detect some kinds of attacks, it is still required of developers to
  properly use the database abstraction layer, which should provide a complete protection
  against SQL injection attacks (eg. by using db_query() correctly, that is, by using placeholders
  instead of directly embedding user input). Usage of the coder review module
  (http://www.drupal.org/project/coder) is recommended to check for incorrect usage of
  db_query().