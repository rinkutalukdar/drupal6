

<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="<?php print $language->language ?>" lang="<?php print $language->language ?>" dir="<?php print $language->dir ?>">
<head>

	<?php print $head; ?>

	<title><?php print $head_title; ?></title>
	<?php print $styles; ?>
	
	<script language="javascript" type="text/javascript" src="<?php echo url(drupal_get_path('module', 'walking_log').'/js/excanvas.min.js'); ?>" ></script>
	<script language="javascript" type="text/javascript" src="<?php echo url(drupal_get_path('module', 'walking_log').'/js/jquery.js'); ?>" ></script>
	<script language="javascript" type="text/javascript" src="<?php echo url(drupal_get_path('module', 'walking_log').'/js/jquery.flot.js'); ?>" ></script>





//print $scripts;
 
</head>
<body>
<?php $images_path = url().path_to_theme().'/images/'; ?>
<div id="main_container">
<!-- Header Starts here //-->
  <div id="header_container">
  	
	    <div id="header_left">
	    	<?php //print psychiatry24x7_links($header_left_links); ?>
	    </div>
	<?php //endif ?>
	    <div id="header_middle">
	       		<a href="<?php print $front_page ?>" title="<?php print t('Home') ?>">
		    		<img src="<?php print $images_path; ?>logo_main.png" alt="<?php print t('Home') ?>" />
			   	</a>
	    </div>
	<?php //if($header_right_links || $header_topnav): ?>
	    <div id="header_right">
	      <div id="topnav">
	        <?php print $header_topnav ?>
	      </div>
	      <div id="right_menu">
		    	<?php //print psychiatry24x7_links($header_right_links, NULL , $header_left_links_count); ?>
		   </div>
	    </div>
	

    <?php //endif ?>
  </div>
  <!-- Header Ends here //-->
  <!-- Body Starts here //-->
  <div id="body_container" class="<?php print $navigation_body_color; ?>">
    
    <?php if($left):?>
    <div id="body_left">
		<?php print $left; ?>
	</div>
    <?php endif ?>
    <div id="body_bmiddle">
    

    <?php if ($title): print '<h1'. ($tabs ? ' class="with-tabs"' : '') .'>'. $title .'</h1>'; endif; ?>
	<?php if ($tabs):
      			print '<div id="tabs-wrapper" class="clear-block">';
       			print '<ul class="tabs primary">'. $tabs .'</ul></div>';
    endif; ?>
    
    
	<?php print $content; ?><br>
	<script id="source">
$(function () {

var d = [[1332934820000,0],[1333021220000, 1], [1333107620000, 2],[1333194020000,3],[1333280420000,4],[1333366820000,5],
[1333453220000,5],[1333539620000,null],[1333626020000,null],[1333712420000,null],[1333798820000,null],
[1333885220000,null],[1333971620000,null],[1334058020000,null],[1334144420000,null],[1334230820000,null],
[1334317220000,null],[1334403620000,null],[1334490020000,null],[1334576420000,null],[1334662820000,null],
[1334749220000,null],[1334835620000,null],[1334922020000,null],[1335008420000,null],[1335094820000,null],
[1335181220000,null],[1335267620000,null],[1335354020000,null],[1335440420000,null],[1335526820000,30]];
     var graph = $.plot($("#placeholder"), [d], { series:{lines: {show: true}},xaxis: { mode: "time" } });


      var points = graph.getData();
      var graphx = $('#placeholder').offset().left;
	
      graphx = graphx + 30; // replace with offset of canvas on graph
      var graphy = $('#placeholder').offset().top;
      graphy = graphy + 10; // how low you want the label to hang underneath the point

      var plotoffset = graph.getPlotOffset();
      var left = plotoffset["left"];
      var top = plotoffset["top"];
      
      for(var k = 0; k < points.length; k++){
		var xoffset = points[k].xaxis.p2c(1333453220000);
		var yoffset = points[k].yaxis.p2c(5);
		showTooltip(xoffset,yoffset,left,top);
      }
	  
    var ctx = graph.getCanvas();
//	alert(ctx);
var canvasData = ctx.toDataURL("image/png");
document.write("<img src='"+canvasData+"' />");

});
function showTooltip(x, y,left,top) {
	var graphx = $('#placeholder').offset().left;
	var graphy = $('#placeholder').offset().top;

        $('<div id="tooltip">' + 'Image' + '</div>').css( {
                position: 'absolute',
                display: 'block',
                top: y + graphy + top,
                left: x + graphx + left,
                border: '1px solid #fdd',
                
                'background-color': '#fee'
        }).appendTo("body");
}

</script>
    </div>
    <div id="body_right">
     
    <?php
      	if($right && $node->path != "advice"):
    	  	//print $right;
      	endif
    ?>

    </div>
  </div>
  <!-- Body Ends here //-->
 <!-- Footer Starts here //-->
  <div id="footer_container">
  	
  </div>
  <!-- Footer Ends here //-->
</div>
 <?php print $closure ?>
</body>
</html>