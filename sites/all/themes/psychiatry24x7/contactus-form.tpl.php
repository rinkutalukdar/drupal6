<?php
// $Id: user-survey.tpl.php,v 1.1 2010/11/08 03:11:18 rabith Exp $
   //print drupal_render($form['navigation']);
  //print_r($form);
	unset($form[mandatory]);//unseting the mandatory field instruction
	print drupal_render($form);//displaying the form
