<?php
// $Id: print.tpl.php,v 1.8.2.11 2008/10/22 21:13:09 jcnventura Exp $

/**
 * @file
 * Default print module template
 */
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="<?php  print $print['language'] ?>" xml:lang="<?php  print $print['language'] ?>">
  <head>
    <title><?php  print $print['title'] ?></title>
    <?php  print $print['head'] ?>
    <?php  print $print['scripts'] ?>
    <?php  print $print['robots_meta'] ?>
    <?php  print $print['base_href'] ?>
    <?php  print $print['favicon'] ?>
    <?php  print $print['css'] ?>
	<script>
		swfobject = new Object();
		swfobject.embedSWF = function(args) { return false; }
	</script>
	<!--[if lte IE 7]>
			<?php print phptemplate_get_ie_scripts(); ?>
	<![endif]-->
  </head>
  <body<?php  print $print['sendtoprinter'] ?>>
  <?php $images_path = url().path_to_theme().'/images/'; ?>
    <?php if (!empty($print['message'])) print '<div class="print-message">'. $print['message'] .'</div><p />' ?>
    <div class="print-logo"><?php  //print $print['logo'] ?><img src="<?php print $images_path; ?>print_logo.jpg" alt="" title="" /></div>
    <div class="print-site_name"><?php  //print $print['site_name'] ?></div>
    <p />
    
    
    <h1 class="print-title"><?php  print $print['title'] ?></h1>
    <div class="print-submitted"><?php  print $print['submitted'] ?></div>
    <div class="print-created"><?php  print $print['created'] ?></div>
    <p />
    <div class="print-content"><?php  
    
    if($_GET['q'] == 'node'){
    	?>
	<div id="body_container">
	    <div id="body_bmiddle">
    		<div id="welcome_container">
		    	<?php 
		    		$block = module_invoke('block', 'block', 'view', 5);		
				    print $block['content'];
    			?>
    		</div>    
    	</div> 
	    <div id="hblocks_container">
	     <?php /* Content Middle Blocks */
	    	$block = module_invoke('block', 'block', 'view', 4);
	    	print $block['content'];
	    	?>
	    </div>
	    
	    
	    <div id="hsurvey_container">
		    <div id="hsurvey_left">
			      <?php /* Survey Left Block */
			    	$block = module_invoke('block', 'block', 'view', 6);
			    	print $block['content'];
			    	?>
		    </div>
		    <div id="hsurvey_right">
		    <div class="clear-block block block-block" id="block-block-48">
		      <div class="content">
			    <?php /* Survey Right Block */
			    	$block = module_invoke('block', 'block', 'view', 7);
			    	print $block['content'];
		    	?>
		    	</div>
		    </div>
		    </div>
	    </div>
 	 </div>
    <?php
    }else {
    	print $print['content'];
    } 
    
    ?></div>
    <div class="print-taxonomy"><?php print $print['taxonomy'] ?></div>    
    <hr class="print-hr" />
    <div class="print-footer"><?php  print $print['footer_message'] ?></div>    
    <div class="print-source_url"><?php  print $print['source_url'] ?></div>
    <div class="print-links"><?php  print $print['pfp_links'] ?></div>
  </body>
</html>
