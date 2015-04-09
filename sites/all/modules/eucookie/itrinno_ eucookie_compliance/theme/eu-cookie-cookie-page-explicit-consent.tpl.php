<?php
/**
 * @file
 * This is a template file for a pop-up informing a user that he has already
 * agreed to cookies.
 *
 * When overriding this template it is important to note that jQuery will use
 * the following classes to assign actions to buttons:
 *
 * hide-popup-button - destroy the pop-up
 * find-more-button  - link to an information page
 *
 * Variables available:
 * - $warning:  Contains the text that will be display whithin the pop-up
 */
?>

<div id="modal-container">
 <div id="popup-agree">
      <input type="button" value="<?php echo t('I Agree'); ?>" id="i_agree" onclick="agree_popup();" style="cursor:pointer;">
  </div> 
  <div class ="popup-content info">
    <div id="popup-text">
      <?php print $message ?>
    </div>       		
  </div>
</div>