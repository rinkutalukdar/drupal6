<?php
//echo "<pre>";print_r($form);exit;
$path = drupal_get_path('theme','psychiatry24x7');
$current_path = drupal_get_path_alias($_GET['q']);
global $user;
if(!is_bool($form['user_profile']['privacy_policy']['#access'])){
	$classname = 'login-cnt-small';
}
?>
<?php if($user->uid==0){ ?>
	<div class="login-block-content">
<?php }else{ ?>
	<div class="login-content register-bg">
<?php } ?>
  <div class="walking-log-nav">
    <div class="nav-buttons <?php print ($user->uid==0)?'nav-disable':''; ?>"><a href="<?php echo url('walking_log'); ?>"><img alt="Create-Plan" src="<?php echo url($path.'/images/create-plan.png'); ?>" /></a></div>
    <div class="nav-buttons <?php print ($user->uid==0)?'nav-disable':''; ?>"><a href="<?php echo url('walking_log/log'); ?>"><img alt="Log-a-Walk" src="<?php echo url($path.'/images/log-a-walk.png'); ?>" /></a></div>
    <div class="nav-buttons <?php print ($user->uid==0)?'nav-disable':''; ?>"><a href="<?php echo url('walking_log/progress'); ?>"><img alt="My-Progress" src="<?php echo url($path.'/images/my-progress.png'); ?>"></a></div>
	<div class="nav-buttons <?php print ($user->uid==0)?'nav-disable':''; ?>"><a href="<?php echo url('user/edit_profile'); ?>"><img alt="My Account" src="<?php echo url($path.'/images/my-account-edit.png'); ?>"></a></div>
	<div class="login-walk-container-parent">
		<div class="login-walk-container">
			<div class="user-login-container-top">
			<div class='user-login-coverup'>	
				<img src="<?php print url(drupal_get_path('theme','psychiatry24x7').'/images/my-account.png'); ?>" />
			</div>
			<div class="user-login-container <?php print $classname; ?>">
				  
				  <?php print drupal_render($form['account']['mail']); ?>
				  <?php print drupal_render($form['account']['pass']); ?>
				  <?php print drupal_render($form['timezone']); ?>
				  <?php print drupal_render($form['user_profile']['aboutme']); ?>
				  <?php //print drupal_render($form['user_profile']['privacy_policy']); ?>
			</div>
			<?php if(!is_bool($form['user_profile']['privacy_policy']['#access'])){ ?>
			<div class="user-login-container-blank"></div>
			<div class="user-login-container-1">
					<?php print drupal_render($form['user_profile']['privacy_policy']); ?>
			</div>
			<?php } ?>
			</div>
			
		</div>
		<div id="error_msg">
		<?php if($messages):  ?>
					<span class="err-msg-ctr"><span class="msg-spans'><?php print $messages; ?></span></span>
		<?php endif; ?>
		</div>
	</div>
	<div class="next-submit-btn">
	<?php print drupal_render($form['submit']); ?>
		<?php print drupal_render($form); ?>
		<div class="my-account-wrapper my-account-pos">
			<!--<a href="<php print url('user/edit_profile'); ?>"><em id='edit-account'>My Account</em></a>-->
		</div>
	</div>
  </div>
</div>
