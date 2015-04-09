<?php
/**
 * @file
 * This is a template file for a pop-up prompting user to give their consent for
 * the website to set cookies.
 *
 * When overriding this template it is important to note that jQuery will use
 * the following classes to assign actions to buttons:
 *
 * agree-button      - agree to setting cookies
 * find-more-button  - link to an information page
 *
 * Variables available:
 * - $message:  Contains the text that will be display whithin the pop-up
 */
?>

<div>
  <div id="popup-close">
      <a href="#" id="close_popup" onclick="close_popup();"><img src="<?php print base_path() .''.drupal_get_path('module', 'itrinno_eucookie_compliance') ?>/images/close-button-small.png" alt="<?php echo t('Close'); ?>"></a> 
  </div> 
  <div class ="popup-content info"> 
     
    <div id="popup-text">
      <?php print $message ?>
    </div>       		
  </div>
  
</div>
