<?php

$path = drupal_get_path('theme','psychiatry24x7');
$month = date("F");
$type = "miles";
//echo "<pre>";print_r($response);exit;
$class="";
if($response['change_bg']==1){
	$class = 'my-progress-content-hm';
}
?>
	
<div class="my-progress-content <?php print $class; ?>">
	<div class="walking-log-nav">
	    <div class="nav-buttons"><a href="<?php echo url('walking_log'); ?>"><img alt="Create-Plan" src="<?php echo url($path.'/images/create-plan.png'); ?>" /></a></div>
	    <div class="nav-buttons"><a href="<?php echo url('walking_log/log'); ?>"><img alt="Log-a-Walk" src="<?php echo url($path.'/images/log-a-walk.png'); ?>" /></a></div>
	    <div class="nav-buttons"><a href="<?php echo url('walking_log/progress'); ?>"><img alt="My-Progress" src="<?php echo url($path.'/images/my-progress.png'); ?>"></a></div>
		<div class="nav-buttons <?php print ($user->uid==0)?'nav-disable':''; ?>"><a href="<?php echo url('user/edit_profile'); ?>"><img alt="My Account" src="<?php echo url($path.'/images/my-account-edit.png'); ?>"></a></div>
	    <div class="progress-container"> 
    			<div class="plot-container">
				<div><img src="<?php echo $response['yaxis_minutes_image'];?>" /></div>
				<div><img src="<?php echo $response['yaxis_miles_image']; ?>"/></div>
			</div>
		    	<div class="login-walk-container"><img alt="login" src="<?php echo url($path.'/images/my-progress-title.png'); ?>" />
				<div class="print-progress-ctr">
					<a id="print_progress" target="_blank" href="<?php echo url("print/walking_progress")."?month=$month&type=$type"; ?>" ><img src="<?php echo url($path.'/images/print.png'); ?>" alt='print' class='my-progress-print'/></a>
				</div>
				<?php if(!empty($response['share_fb'])){ ?>
					<div class="share-fb-ctr"><?php print $response['share_fb']; ?></div>
				<?php } ?>
				<div class="progress-key-ctr"><a id="progress_key" href="javascript:void(0);" ><img src="<?php echo url($path.'/images/key.png'); ?>" alt='<?php print t('Key'); ?>' class='my-progress-key'/></a>
					<div class="mood-weather-ctr">
						<ul>
							<li><?php print t('Key:'); ?></li>
							<li><?php print t('Mood'); ?></li>
							<li><img src="<?php echo $response['mood_image']; ?>"/><?php print $response['mood']; ?></li>
							<li><?php print t('Weather'); ?></li>
							<li><img src="<?php echo $response['weather_image']; ?>"/><?php print $response['weather']; ?></li>
					</div>
				</div>
		          <div id="placeholder" style="width:450px;height:300px;">
						<?php if($response['msg']!=""){ ?>
								<div style="font-weight: bold; margin-left: 174px; padding-top: 100px; font-size: 20px;"><?php echo $response['msg']; ?></div>
						<?php } ?>
				  </div>
					<?php if($response['msg']==""){ ?>
					<script id="source">
						$(document).ready(function () {

							var d = <?php echo $response['month_miles_data']; ?> ;
							var graph = $.plot($("#placeholder"), [d], { grid:{backgroundColor:"<?php echo $response['grid_background_color'];?>"},series:{lines: {show: true},color:"#FFFFFF"},xaxis: { mode: "time",timeformat: "%m/%d",labelWidth:"40" } });
						      var points = graph.getData();
						      var graphx = $('#placeholder').offset().left;
						      graphx = graphx + 30; // replace with offset of canvas on graph
						      var graphy = $('#placeholder').offset().top;
						      graphy = graphy + 10; // how low you want the label to hang underneath the point
						      var plotoffset = graph.getPlotOffset();
						      var left = plotoffset["left"];
						      var top = plotoffset["top"];
      						for(var k = 0; k < points.length; k++){
								var xoffset = points[k].xaxis.p2c(<?php echo $response['time_last_walked']; ?>);
								var yoffset = points[k].yaxis.p2c(<?php echo $response['miles_last_walked']; ?>);
								var centrex = points[k].xaxis.p2c(0);
								var centrey = points[k].yaxis.p2c(0);
								showTooltip(xoffset,yoffset,left,top);
						      }
						      //show_weather_mood_icons(top,left);	    
						});
						function show_weather_mood_icons(centrex,centrey){
							//$('<div class="button" style="left:23px;top:0px"><img src="<?php echo $response['weather_image']; ?>" height="35px"/></div>').appendTo('#placeholder');
							$('<div class="button"><img src="<?php echo $response['mood_image']; ?>" height="35px"/>&nbsp;&nbsp;<img src="<?php echo $response['weather_image']; ?>" height="35px"/></div>').css( {
		      			          position: 'absolute',
			            		    display: 'block',
		      			          top: centrey-8,
			            		    left: centrex+20
						       }).appendTo("#placeholder");
						}
						function showTooltip(x, y,left,top) {
							var graphx = $('#placeholder').offset().left;
							var graphy = $('#placeholder').offset().top;
						      $('<div id="tooltip" style=""><img src="<?php echo $response['graph_status_image']; ?>" height="55px"/></div>').css( {
		      			          position: 'absolute',
			            		    display: 'block',
		      			          top: y-60,
			            		    left: x
						       }).appendTo("#placeholder");
						}
					</script>
					<?php } ?>
				<div class="month-navigation">
				        <div class="month-prev"><?php echo $response['month_prev']; ?></div>
				        <div class="month-slctd"><img src="<?php echo $response['xaxis_month_image']; ?>" /></div>
				        <div class="month-next"><?php echo $response['month_next']; ?></div>
			      </div>
			</div>
			
	    </div>
      
    	</div>
	<?php if($response['type']=='minutes'){ ?>
		<div class="miles-timer-left miles-down"><?php echo $response['miles_timer_left']; ?></div>
	<?php }else{ ?>
		<div class="miles-timer-left"><?php echo $response['miles_timer_left']; ?></div>
	<?php } ?>
  <?php echo $response['minutes_left_image']; ?>
  <div class="miles-left"><?php echo $response['toggle_link']; ?></div>
  <div class="month-display"><?php echo $response['month_display']; ?></div>
  
  <div class="miles-timer-right"><?php echo $response['miles_timer_right']; ?></div>
  <?php if($response['type']=='miles'){ ?>
	<div class="miles-min-display miles-right"><?php echo $response['miles_min_display']; ?></div> 
  <?php }else if($response['change_bg']!=1){ ?>
	<div class="miles-min-display"><?php echo $response['miles_min_display']; ?></div> 
  <?php } ?>
</div>


