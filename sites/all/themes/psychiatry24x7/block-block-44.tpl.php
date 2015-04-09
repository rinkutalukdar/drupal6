<?php
// $Id: block.tpl.php,v 1.0 2010/10/12 15:55:00 narendra.b Exp $
?>
<div id="facebook_container">
	<?php 
	global $base_url; 
	$message = facebook_status_message1(); 
	$url = 'http://www.facebook.com/connect/prompt_feed.php?message='.$message; 
	?>
	<div class="jc_fcontainer">
		<div class="jc_fleft">
		
		<?php  
		if(arg(0) == 'walkinglog' ){ 
		     echo '<a href="'.$url.'" target="_blank"><img src="/sites/all/themes/psychiatry24x7/images/share_my_progress.gif" alt="Share my progress on facebook" title="Share my progress on facebook" /></a>'; 
		} else{   
		     echo '<img src="/sites/all/themes/psychiatry24x7/images/sm_jcommunity.gif" alt="Join our community" title="Join our community" />'; } 
		?>
		
		</div>
		<div class="jc_fright">
			<img src="/sites/all/themes/psychiatry24x7/images/sm_ficon.gif" alt="Facebook" title="Facebook" />
		</div>
	</div>
	<div id="likebox-frame">
		<?php print $block->content ?>
	</div>
</div>
<div id="facebook_ftcontainer">
<p><a title="Visit our facebook page" target="_blank" href="http://www.facebook.com/pages/Schizophrenia24x7/163516357009774">Visit our facebook page</a></p>
</div>

<?php
/*
 * Facebook posting 
 */
function facebook_status_message1(){
	$wl_row = getWalkingLogID1();
	$wl_id 	= $wl_row['wl_id'];
	$walked_time_res = db_query('SELECT wl_user_id , wl_walked_duration FROM {walking_log_status} wls INNER JOIN {walking_log} wl ON wls.wl_id=wl.wl_id WHERE wls.wl_id = %d ', $wl_id);
	$walked_time_row = db_fetch_array($walked_time_res);
	
	$walked_time = $walked_time_row['wl_walked_duration'];
	$walked_user = user_load($walked_time_row['wl_user_id']);
	$total_walked_time = db_result(db_query('SELECT SUM(wl_walked_duration) as total_walked_time FROM {walking_log_status} wls INNER JOIN {walking_log} wl ON wls.wl_id=wl.wl_id WHERE wls.wl_id = %d ', $wl_id));
	if($total_walked_time == ''){
		$total_walked_time = 0;
	}
	if($walked_time == ''){
		$walked_time = 0;
	}
	return urlencode($walked_user->name.' has completed a '.$walked_time.' minute walk, bringing their total to '.$total_walked_time.' minutes. Start your own walking log! on www.schizophrenia24x7.com');	
}


/*
 * helper function 
 */
function getWalkingLogID1(){
	global $user;
	$wl_res = db_query('SELECT * FROM {walking_log} WHERE wl_user_id = %d ORDER BY wl_created DESC LIMIT 1', $user->uid);
	return 	db_fetch_array($wl_res);
}
?>