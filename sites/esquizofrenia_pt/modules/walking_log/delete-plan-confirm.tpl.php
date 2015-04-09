<?php
$path = drupal_get_path('theme','psychiatry24x7');
$class="";
if($change_bg==1){
	$class = 'my-progress-content-hm';
}

?>
<div class="my-progress-content <?php print $class; ?>">
  <div class="walking-log-nav">
    <div class="nav-buttons"><a href="<?php echo url('walking_log'); ?>"><img alt="Create-Plan" src="<?php echo url($path.'/images/create-plan.png'); ?>" /></a></div>
    <div class="nav-buttons"><a href="<?php echo url('walking_log/log'); ?>"><img alt="Log-a-Walk" src="<?php echo url($path.'/images/log-a-walk.png'); ?>" /></a></div>
    <div class="nav-buttons"><a href="<?php echo url('walking_log/progress'); ?>"><img alt="My-Progress" src="<?php echo url($path.'/images/my-progress.png'); ?>"></a></div>
	<div class="nav-buttons <?php print ($user->uid==0)?'nav-disable':''; ?>"><a href="<?php echo url('user/edit_profile'); ?>"><img alt="My Account" src="<?php echo url($path.'/images/my-account-edit.png'); ?>"></a></div>
    <div class="login-walk-container">
		<?php print drupal_render($form['confirm_delete']); ?>
		<?php print drupal_render($form['node_id']); ?>
		<?php print drupal_render($form['submit']); ?>
		<?php print drupal_render($form); ?>
    </div>
  </div>
  <?php if($type=='minutes'){ ?>
	<div class="miles-timer-left miles-down"><?php echo $miles_timer_left; ?></div>
  <?php }else{ ?>
	<div class="miles-timer-left"><?php echo $miles_timer_left; ?></div>
  <?php } ?>
  <?php echo $minutes_left_image; ?>
  <div class="miles-left"><?php echo $toggle_link; ?></div>
  <div class="month-display"><?php echo $month_display; ?></div>
  <div class="miles-timer-right"><?php echo $miles_timer_right; ?></div>
  <?php if($type=='miles'){ ?>
	<div class="miles-min-display miles-right"><?php echo $miles_min_display; ?></div> 
  <?php }else if($change_bg!=1){ ?>
	<div class="miles-min-display"><?php echo $miles_min_display; ?></div> 
  <?php } ?>
</div>