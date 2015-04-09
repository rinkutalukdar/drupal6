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
$arr_response = get_monthly_graph_data(date("F"),$view,'toggle',$toggle_view_tobe_disabled);
$type = $arr_response['type'];
$minutes_left_image = $arr_response['minutes_left_image'];
$toggle_link = $arr_response['toggle_link'];
$month_display = $arr_response['month_display'];
$miles_min_display = $arr_response['miles_min_display'];
$miles_timer_left = $arr_response['miles_timer_left'];
$miles_timer_right = $arr_response['miles_timer_right'];

$count = count($rows);
if($count <= 4){
	$class= ($arr_response['change_bg']==1)?"my-progress-content-hm":"";
}
else if($count > 4  && $count <= 9){
	$class= ($arr_response['change_bg']==1)?"my-progress-content-med-hm":"my-progress-content-medium";
}
else if($count > 8 && $count <= 12){
	$class= ($arr_response['change_bg']==1)?"my-progress-content-expanded-hm":"my-progress-content-expanded";
}
global $user;
?>

 <div class="my-progress-content <?php print $class ?> " id="progress_content_block">
  <div class="walking-log-nav">
    <div class="nav-buttons"><a href="<?php echo url('walking_log',array('fragment'=>'progress_content_block')); ?>"><img alt="Create-Plan" src="/<?php echo $path.'/images/create-plan.png'; ?>" /></a></div>
    <div class="nav-buttons"><a href="<?php echo url('walking_log/log',array('fragment'=>'progress_content_block')); ?>"><img alt="Log-a-Walk" src="/<?php echo $path.'/images/log-a-walk.png'; ?>" /></a></div>
    <div class="nav-buttons"><a href="<?php echo url('walking_log/progress',array('fragment'=>'progress_content_block')); ?>"><img alt="My-Progress" src="/<?php echo $path.'/images/my-progress.png'; ?>"></a></div>
	<div class="nav-buttons <?php print ($user->uid==0)?'nav-disable':''; ?>"><a href="<?php echo url('user/edit_profile',array('fragment'=>'login_content_block')); ?>"><img alt="My Account" src="<?php echo url($path.'/images/my-account-edit.png'); ?>"></a></div>
	<div class="login-monthly-container"><img alt="login" src="/<?php echo $path.'/images/your-monthly-plan.png' ?>">
    	<?php
		$arr_month = array(date("F"),date("F",strtotime('+1 Months')),date("F",strtotime('+2 Months')),date("F",strtotime('+3 Months')),date("F",strtotime('+4 Months')),
		date("F",strtotime('+5 Months')),date("F",strtotime('+6 Months')),date("F",strtotime('+7 Months')),date("F",strtotime('+8 Months')),
		date("F",strtotime('+9 Months')),date("F",strtotime('+10 Months')),date("F",strtotime('+11 Months')));
		//foreach()
		//echo "<pre>";print_r(get_defined_vars());exit;
		foreach($rows as $row){
			print $row; 
		}
    	?>
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
  <?php }else if($arr_response['change_bg']!=1){ ?>
	<div class="miles-min-display"><?php echo $miles_min_display; ?></div> 
  <?php } ?>
</div>
