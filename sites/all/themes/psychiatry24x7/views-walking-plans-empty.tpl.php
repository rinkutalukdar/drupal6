<?php
$path = drupal_get_path('theme','psychiatry24x7');
$arr_view = get_progress_view_for_month();
$toggle_view_tobe_disabled="";
if($arr_view['singleview']==true){
	$view = $arr_view['view'];
	$toggle_view_tobe_disabled = ($view=='miles')?'minutes':'miles';
}
else{
	$view = 'miles';
	$toggle_view_tobe_disabled = 'minutes';
}
$arr_response = get_monthly_graph_data(date("F"),'miles','toggle',$toggle_view_tobe_disabled);
$minutes_left_image = $arr_response['minutes_left_image'];
$toggle_link = $arr_response['toggle_link'];
$month_display = $arr_response['month_display'];
$miles_min_display = $arr_response['miles_min_display'];
?>

 <div class="my-progress-content">
  <div class="walking-log-nav">
    <div class="nav-buttons"><a href="<?php echo url('walking_log'); ?>"><img alt="Create-Plan" src="/<?php echo $path.'/images/create-plan.png'; ?>" /></a></div>
    <div class="nav-buttons"><a href="<?php echo url('walking_log/log'); ?>"><img alt="Log-a-Walk" src="/<?php echo $path.'/images/log-a-walk.png'; ?>" /></a></div>
    <div class="nav-buttons"><a href="<?php echo url('walking_log/progress'); ?>"><img alt="My-Progress" src="/<?php echo $path.'/images/my-progress.png'; ?>"></a></div>
	<div class="nav-buttons <?php print ($user->uid==0)?'nav-disable':''; ?>"><a href="<?php echo url('user/edit_profile'); ?>"><img alt="My Account" src="<?php echo url($path.'/images/my-account-edit.png'); ?>"></a></div>
	<div class="login-monthly-container"><img alt="login" src="/<?php echo $path.'/images/your-monthly-plan.png' ?>">
    	
	</div>
  </div>
  <?php echo $minutes_left_image; ?>
  <div class="miles-left"><?php echo $toggle_link; ?></div>
  <div class="month-display"><?php echo $month_display; ?></div>
  <div class="miles-min-display  miles-right"><?php echo $miles_min_display; ?></div>
</div>