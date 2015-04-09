<?php
// ; $Id: iapp_rules.config.inc,v 1.0 2009/05/20 19:47:55 Exp $

/**
 * @file iapp_rules.config.inc
 * Module wide constants.
 */

//! IAPP basic enforcement level
define("IAPP_BASIC", 1);
//! IAPP standard I enforcement level
define("IAPP_STANDARD1", 2);
//! IAPP standard II enforcement level
define("IAPP_STANDARD2", 3);

//! IAPP enforcement method I
define("IAPP_METHOD1", 1);
//! IAPP enforcement method II
define("IAPP_METHOD2", 2);

//! basic class password length
define("PWD_BASIC_LENGTH", 6);
//! standard I class password length
define("PWD_STANDARD1_LENGTH", 6);
//! standard II class password length
define("PWD_STANDARD2_LENGTH", 8);

//! complexity level for standard I
define("PWD_STANDARD1_COMPLEXITY", 3);
//! complexity level for standard II
define("PWD_STANDARD2_COMPLEXITY", 2);

//! password validity for standard I
define('PWD_STANDARD1_EXPIRE_LENGTH', 90);
//! password validity for standard II
define('PWD_STANDARD2_EXPIRE_LENGTH', 90);

//! number of login attempts allowed
define('IAPP_UNLOGIN_ATTEMPTS', 5);
//! amount of time for which account will be locked
define('IAPP_UNLOGIN_LOCK_TIME', 15);
//! time gap within which the n number tries will cause account to be locked
define('IAPP_UNLOGIN_TRY_TIME', 15);

//! number of password no-repeat iterations for method I
define('IAPP_M1_ITERATIONS_ALLOWED', 5);
//! number of password no-repeat days for method II 
define('IAPP_M2_DAY_SPAN', 365);

//! IAPP activity log span
define('IAPP_ACTIVITY_LOG_SPAN', 90);

//! password status OK
define('PWD_OK', 0);
//! password needs newnewal
define('PWD_NEEDS_RENEWAL', 1);
//! password has expired
define('PWD_EXPIRED', 2);

//! forgot password validity
define('FORGOT_PASSWORD_VALIDITY', 1);
//! forgot password requests span (in days) 
define('IAPP_FORGOT_PASSWORD_GAP', 1);

//! activity source is 'user'
define('ACTIVITY_SOURCE_USER', 'user');
//! activity source is 'system'
define('ACTIVITY_SOURCE_SYSTEM', 'system');
//! activity source is 'process'
define('ACTIVITY_SOURCE_PROCESS', 'process');


//! method1 password already used message
define('METHOD1_ITERATION_MESSAGE', 'You have already used this password before, please try another one.');
//! method1 password already changed message
define('METHOD1_CHANGED_TODAY_MESSAGE', 'You have already changed password today, you cannot change the password more than 1 time a day.');
//! method2 password reuse message
define('METHOD2_DAY_SPAN_MESSAGE', 'You have used this password within 365 days, please choose another one.');

//! password expiry warning period
define('PASSWORD_EXPIRE_WARNING', '7');
//! password expiry warning message
define('PASSWORD_EXPIRE_WARNING_MESSAGE', 'You password will expire within one week, please change it.');

//! password expiry warning mail subject
define('PASS_WARNING_MAIL_SUBJECT', 'Your password for !site is about to expire');
//! password expiry warning mail message
define('PASS_WARNING_MAIL_MESSAGE', 'Hi !username,
Your password will expire in !days days
Please login to !site to change it.');

//! password already expired message
define('PASSWORD_EXPIRE_MESSAGE', 'You password has expired, please change it now.');

//! user blocked message
define('USER_BLOCKED_MESSAGE', 'Your account has been blocked, please try after some time.');

//! subject for forgot password mail
define('FORGOT_PASSWORD_SUBJECT', 'Password for !site');
//! forgot password mail content
define('FORGOT_PASSWORD_MESSAGE', 'Hi !username,
Your new password is !password
Please change this password after login.');
//! cannot sent forgot password mail more than n times message
define('FORGOT_PASSWORD_ALREADY_CHANGED', 'You cannot send this request more than one time a day.');
//! change password message on login after forgot password
define('FORGOT_PASSWORD_FIRST_LOGIN', 'You have to change your auto generated password.');
//! resetted password expired message
define('FORGOT_PASSWORD_EXPIRED_MESSAGE', 'Your auto generated password has expired, please change it now.');
define('FORGOT_PASSWORD_MAIL_SUBJECT', 'Your password for !site');
//! password expiry warning mail message
define('FORGOT_PASSWORD_MAIL_MESSAGE', 'Hi !username,
Your password !password Please login to !site to change it.');

//! create user password mail subject
define('ADD_USER_PASSWORD_SUBJECT', 'Password at !site');
//! create user password mail content
define('ADD_USER_PASSWORD_MESSAGE', 'Hi !username,
Your password is !password
You may need to change it on the first login.');

//! invalid redirect page URL error message
define('ERR_INVALID_REDIRECT_URL', 'Invalid redirect URL, please give a valid drupal internal URL');
//! registration information sent message
define('PASSWORD_FURTHER_INSTRUCTIONS', 'Further instructions have been sent to your e-mail address.');
//! password reset successfull message
define('MSG_PASSWORD_RESET_SUCCESS','Password reset successful.');
//! current password field error message
define('ERR_CURRENT_PASSWORD','Invalid current password');
//! empty password error message
define('ERR_EMPTY_PASSWORD', 'Password cannot be empty');
//! empty current password error message
define('ERR_EMPTY_NEW_PASSWORD', 'New password cannot be empty');
//! username and password are same
define('ERR_USERNAME_PASSWORD_SAME', 'Username and password cannot be same');