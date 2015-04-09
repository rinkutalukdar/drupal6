<?php
$path = drupal_get_path('theme','psychiatry24x7');
$class="";
if($change_bg==1){
	$class = 'my-progress-content-hm';
}

?>
<div class="my-progress-content <?php print $class; ?>" id="progress_content_block">
  <div class="walking-log-nav">
    <div class="nav-buttons"><a href="<?php echo url('walking_log',array('fragment'=>'progress_content_block')); ?>"><img alt="Create-Plan" src="<?php echo url($path.'/images/create-plan.png'); ?>" /></a></div>
    <div class="nav-buttons"><a href="<?php echo url('walking_log/log',array('fragment'=>'progress_content_block')); ?>"><img alt="Log-a-Walk" src="<?php echo url($path.'/images/log-a-walk.png'); ?>" /></a></div>
    <div class="nav-buttons"><a href="<?php echo url('walking_log/progress',array('fragment'=>'progress_content_block')); ?>"><img alt="My-Progress" src="<?php echo url($path.'/images/my-progress.png'); ?>"></a></div>
	<div class="nav-buttons <?php print ($user->uid==0)?'nav-disable':''; ?>"><a href="<?php echo url('user/edit_profile',array('fragment'=>'login_content_block')); ?>"><img alt="My Account" src="<?php echo url($path.'/images/my-account-edit.png'); ?>"></a></div>
    <div class="login-walk-container login-walk-container-expanded">
		<img alt="login" src="<?php echo url($path.'/images/log-a.png'); ?>" />
      <p><?php echo t('Add your walk information to record your progress.'); ?></p>
      <div>
        <?php print drupal_render($form['wl_miles_walked']); ?><?php print drupal_render($form['wl_distance_unit']); ?>
      </div>
      <div>
		<label><?php print $form['wl_walk_hours']['#title']; ?>:&nbsp;</label>
	      <span>hours:</span>
        	<?php print drupal_render($form['wl_walk_hours']); ?>
		<span>minutes:</span>
	      <?php print drupal_render($form['wl_walk_minutes']); ?>
      </div>
      <div class="feel-content"><span><?php print $form['wl_how_user_felt']['#title']; ?>: <em class="form-required"> *</em></span>
      	<div>
			<a onclick="return false;" href="javascipt:void(0);"><img id='img_felt_sad' src="<?php echo url($path.'/images/mood-before-sad-inactive.png'); ?>"></a>
			<a onclick="return false;" href="javascipt:void(0);"><img id='img_felt_normal' src="<?php echo url($path.'/images/mood-before-normal-inactive.png'); ?>"></a>
			<a onclick="return false;" href="javascipt:void(0);"><img id='img_felt_happy' src="<?php echo url($path.'/images/mood-before-happy-inactive.png'); ?>"></a>
		</div>
      </div>
      <div class="feel-content"><span><?php print $form['wl_how_user_felt_later']['#title']; ?>: <em class="form-required"> *</em></span>
      	<div>
			<a onclick="return false;" href="javascipt:void(0);"><img id='img_felt_after_sad' src="<?php echo url($path.'/images/mood-sad-inactive.png');?>"></a>
			<a onclick="return false;" href="javascipt:void(0);"><img id='img_felt_after_normal' src="<?php echo url($path.'/images/mood-normal-inactive.png'); ?>"></a>
			<a onclick="return false;" href="javascipt:void(0);"><img id='img_felt_after_happy' src="<?php echo url($path.'/images/mood-happy-inactive.png'); ?>"></a>
		</div>
      </div>
      <div class="feel-content"><span><?php print $form['wl_weather']['#title']; ?>: <em class="form-required"> *</em></span>
        	<div>
			<a onclick="return false;" href="javascipt:void(0);"><img id='img_weather_rainy' class="weather-smily" src="<?php echo url($path.'/images/weather-rainy-inactive.png'); ?>"></a>
			<a onclick="return false;" href="javascipt:void(0);"><img id='img_weather_thunder' src="<?php echo url($path.'/images/weather-thunder-inactive.png'); ?>"></a>
			<a onclick="return false;" href="javascipt:void(0);"><img id='img_weather_sunny' src="<?php echo url($path.'/images/weather-sunny-inactive.png'); ?>"></a>
		</div>
      </div>
	<?php print drupal_render($form['submit']); ?>
	<?php print drupal_render($form); ?>
	<div class="footnote footnote1"><span class="form-required">* <label><?php print t('Mandatory field'); ?></label></span></div>
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