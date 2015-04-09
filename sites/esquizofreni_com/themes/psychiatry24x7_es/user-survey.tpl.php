<?php
// $Id: user-survey.tpl.php,v 1.1 2010/11/08 03:11:18 rabith Exp $

/**
 * @file
 * Customize the display of a complete webform.
 *
 * Available variables:
 * - $form: The complete form array.
 * - $nid: The node ID of the Webform.
 *
 * The $form array contains two main pieces:
 * - $form['submitted']: The main content of the user-created form.
 * - $form['details']: Internal information stored by Webform.
 */
?>
  <!--  <h2><?php //echo $form['#node']->title; ?></h2>
    <h4><?php //echo date("d F Y", $form['#node']->created);?></h4>
    <?php //$count =  db_result(db_query("SELECT count(*) FROM {webform_submissions} where nid=%d group by nid",$form['#node']->nid)); ?>
    <h4><?php  //if($count == ''){echo '0';} else{echo $count; } ?> entrants so far</h4> -->
<?php
  if($_SESSION['user_survey_error'] == 'error'){ ?>
  <div class="error_msg messages error" style="width: 520px; margin-left: 131px;margin-top: -19px;">OOPS! Not all the fields have been completed. Please check your answers and submit again.</div>
  <?php } $_SESSION['user_survey_error'] = '';


 if($_COOKIE['usersurveysuccess'] == '1'){
		echo '<div class="survey_success"> '.t("Thank you for completing our poll").' </div>';
	}


//print '<pre>';print_r($form);print '<pre>';
  // If editing or viewing submissions, display the navigation at the top.
  if (isset($form['submission_info']) || isset($form['navigation'])) {
    print drupal_render($form['navigation']);
    print drupal_render($form['submission_info']);
  }

  // Print out the main part of the form.
  // Feel free to break this up and move the pieces within the array.
   if($_COOKIE['usersurveysuccess'] == ''){
	  print drupal_render($form['submitted']);
	  print drupal_render($form['actions']['submit']);
   }

  // Always print out the entire $form. This renders the remaining pieces of the
  // form that haven't yet been rendered above.
  if($_COOKIE['usersurveysuccess'] == ''){
     print drupal_render($form);
  }
  // Print out the navigation again at the bottom.
  if (isset($form['submission_info']) || isset($form['navigation'])) {
    unset($form['navigation']['#printed']);
    print drupal_render($form['navigation']);
  }

  setcookie ("usersurveysuccess", "", time() - 3600,'/');