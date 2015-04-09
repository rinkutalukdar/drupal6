<?php
/**
-------------------------------------------------------------------------

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
 <div>
  <a href="#" id="close"></a>  		
  <div class="clearfix" id="cookieWrapper">	
  <form name="control-panel-form" class="cookiePop">
  <p class="strng"><?php echo t('COOKIE SETTINGS PANEL'); ?></p>
  <p><?php // echo t('1<sup>st</sup> Party cookies :'); ?> <?php // print 'Necessary Cookie ='.$_COOKIE['necessary'] .':: '.t('Enhancement').'='. $_COOKIE['enhancement']; ?></p>
  <table class="tbl_cookie_settings">  
	  <tr style="font-weight:bold;">	  
	   <td width="23%"><?php echo t('Type of cookie'); ?></td>
	   <td><?php echo t('Purpose'); ?></td>
	   <td width="27%"><?php echo t('Expiry'); ?></td>
	   <td width="15%"></td>
	  </tr>
	  <tr>
		  <td><?php echo t('Cookies necessary for essential website purposes and functions'); ?></td>
		  <td><?php echo t('These cookies are strictly necessary for the proper operation of our site.  They allow us to ensure the security and efficient delivery of our site.'); ?></td>
		  <td><?php echo t('The cookie we set for this purpose is automatically removed from your device one month after you last visited our website.'); ?></td>
		  <td>
			<input type="radio" name="radio1" id="yes1" value="1"/>
			<label><?php echo t('Yes'); ?></label>
			<input type="radio" name="radio1" id="no1" value="0"/>
			<label><?php echo t('No'); ?></label>
		  </td>
	  </tr>
	  <tr>
		  <td><?php echo t('Website enhancement cookies'); ?></td>
		  <td><?php echo t('These cookies help enhance the performance and usability of our website. For example, they may allow us to detect whether your browser can run small website programs (called scripts) that provide additional website functionality or enable us to remember any website preferences you set (such as font size or language preferences).'); ?></td>
		  <td><?php echo t('The cookie we set for this purpose is automatically removed from your device once you close your browser'); ?></td>
		  <td>
			<input type="radio" name="radio2" id="yes2" value="1"/>
			<label><?php echo t('Yes'); ?></label>
			<input type="radio" name="radio2" id="no2" value="0"/>
			<label><?php echo t('No'); ?></label>
		  </td>
	  </tr>
  </table>
  <table class="tbl_e3rd_cookie_settings">
	  <tr>
		<td colspan="4"><p class="strng noMargin"><?php echo t('3<sup>rd</sup> Party cookies'); ?>:</p>
			<p><?php echo t('For viewing the available 3<sup>rd</sup> Party cookies Please navigate through the following link'); ?> <?php echo l('Third Party Cookies','eu-cookie-compliance',array('attributes'=>array('target'=>'_blank')));?></p>
		</td>
	  </tr>
  </table>
  </div>
  <div id="cookieFooter">
	<div class="cookieButton cookieButtonBlue buttonSelected">
		<input type="submit" value="<?php echo t('Save and close'); ?>" class="agree-button" id="agree-button" style="cursor: pionter; cursor: hand">
		<input type="submit" value="<?php echo t('Cancel'); ?>" class="cookie-cancel" style="cursor: pionter; cursor: hand">
	</div>
	 </form>
	<p class="cookiePanelWarning"><img src="/<?php print path_to_theme(); ?>/images/warning.png" rel="lightbox" alt="" /><?php echo t('When you refuse the use of - 1<sup>st</sup> or 3<sup>rd</sup> party - cookies, this site will not behave
as designed due to the unavailability of cookies.');?></p>
  </div>
   
</div>