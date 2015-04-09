<?php
//echo "<pre>";print_r($form);exit;
$path = drupal_get_path('theme','psychiatry24x7');
$current_path = drupal_get_path_alias($_GET['q']);
global $user;
?>
<?php if($user->uid==0){ ?>
	<div class="login-block-content blank-bg">
<?php }else{ ?>
	<div class="login-content blank-bg">
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
				
			</div>
			<div class="user-login-container remove-bg">
				<p>
				  <?php print drupal_render($form['message']); ?>
				  <?php print drupal_render($form['help']); ?>
				</p>  
			</div>
			</div>
			
		</div>
		<div id="error_msg">
		
		</div>
	</div>
	<?php print drupal_render($form['submit']); ?>
		<?php print drupal_render($form); ?>
  </div>
</div>
