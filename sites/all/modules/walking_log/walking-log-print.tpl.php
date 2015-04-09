<?php

$path = drupal_get_path('theme','psychiatry24x7');
?>

<script language="javascript" type="text/javascript" src="<?php echo url(drupal_get_path('module', 'walking_log').'/excanvas.min.js'); ?>" ></script>
<script language="javascript" type="text/javascript" src="<?php echo url(drupal_get_path('module', 'walking_log').'/jquery.js'); ?>" ></script>
<script language="javascript" type="text/javascript" src="<?php echo url(drupal_get_path('module', 'walking_log').'/jquery.flot.js'); ?>" ></script>
<div class="my-progress-content">
	<img src="<?php echo url($path.'/images/my-progress-bg.png'); ?>"  >
	<div class="walking-log-nav">
	    <div class="nav-buttons"><a href="<?php echo url('walking_log'); ?>"><img alt="Create-Plan" src="<?php echo url($path.'/images/create-plan.png'); ?>" /></a></div>
	    <div class="nav-buttons"><a href="<?php echo url('walking_log/log'); ?>"><img alt="Log-a-Walk" src="<?php echo url($path.'/images/log-a-walk.png'); ?>" /></a></div>
	    <div class="nav-buttons"><a href="<?php echo url('walking_log/progress'); ?>"><img alt="My-Progress" src="<?php echo url($path.'/images/my-progress.png'); ?>"></a></div>
	    <div class="progress-container"> 
    			<div class="plot-container">
				<div><img src="<?php echo $response['yaxis_minutes_image'];?>" /></div>
				<div><img src="<?php echo $response['yaxis_miles_image']; ?>"/></div>
			</div>
		    	<div class="login-walk-container"><img alt="login" src="<?php echo url($path.'/images/my-progress-title.png'); ?>" /><img src="<?php echo url($path.'/images/print.png'); ?>" alt='print' class='my-progress-print' />
		          <div id="placeholder" style="width:450px;height:300px;">
						<?php if($response['msg']!=""){ ?>
								<div style="font-weight: bold; margin-left: 174px; margin-top: 158px; font-size: 20px;"><?php echo $response['msg']; ?></div>
						<?php } ?>
				  </div>
					<?php if($response['msg']==""){ ?>
					<script id="source">
						$(function () {

							var d = <?php echo $response['month_miles_data']; ?> ;
							var graph = $.plot($("#placeholder"), [d], { grid:{backgroundColor:"<?php echo $response['grid_background_color'];?>"},series:{lines: {show: true},color:"#FFFFFF"},xaxis: { mode: "time",labelWidth:"40" } });
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
								showTooltip(xoffset,yoffset,left,top);
						      }
						      show_weather_mood_icons();	    
						});
						function show_weather_mood_icons(){
							//$('<div class="button" style="left:23px;top:20px"><img src="<?php echo $response['weather_image']; ?>" height="55px"/></div>').appendTo('#placeholder');
						}
						function showTooltip(x, y,left,top) {
							var graphx = $('#placeholder').offset().left;
							var graphy = $('#placeholder').offset().top;
						      $('<div id="tooltip" style=""><img src="<?php echo $response['graph_status_image']; ?>" height="55px"/></div>').css( {
		      			          position: 'absolute',
			            		    display: 'block',
		      			          top: y - 50,
			            		    left: x + 10
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

  <div class="minutes-left"><?php echo $response['minutes_left_image']; ?></div>
  <div class="miles-left"><?php echo $response['toggle_link']; ?></div>
  <div class="month-display"><?php echo $response['month_display']; ?></div>
  <div class="miles-min-display"><?php echo $response['miles_min_display']; ?></div> 
</div>