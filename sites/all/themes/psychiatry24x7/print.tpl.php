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
	<link type="text/css" rel="stylesheet" media="screen" href="/sites/all/themes/psychiatry24x7/css/mobile.css?3" />
	<script>
		swfobject = new Object();
		swfobject.embedSWF = function(args) { return false; }
	</script>
	<!--[if lte IE 7]>
			<?php //print phptemplate_get_ie_scripts(); ?>
	<![endif]-->
	  <style>
  . survey #mysurveyform .form-item label {

    display: block;

    margin-bottom: 0;

    margin-left: -15px;

    margin-right: 0;

    margin-top: 0;

    padding-right: 0;

    text-align: left;

}

 

 

.survey #mysurveyform label.option {

    clear: both;

    margin-bottom: 0;

    margin-left: -20px;

    margin-right: 0;

    margin-top: -10px;

}




  </style>
  </head>
  <body><?php  print $print['sendtoprinter'] ?>
  <?php $images_path = base_path().drupal_get_path('theme', 'psychiatry24x7').'/images/'; ?>
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

<?php
		    		$block = module_invoke('block', 'block', 'view', 45);
				    print $block['content'];
    			?>
    	</div>
	    <div id="hblocks_container">
	     <?php /* Content Middle Blocks */
	    	$block = module_invoke('block', 'block', 'view', 46);
	    	print $block['content'];
	    	?>
	    </div>


    	<div id="hsection_left">
    		<?php /* Content Middle Blocks */
	    	$block = module_invoke('block', 'block', 'view', 76);
			print $block['content'];
			$block = module_invoke('block', 'block', 'view', 82);
			print $block['content'];
			$block = module_invoke('survey', 'block', 'view', 1);
	    	print $block['content'];
	    	?>
      </div>
    	<div id="hsection_right">
    		<div class="latest_news_block">
    			<h2><?php print t("Latest News");?></h2>
    			<?php print views_embed_view('latest_news', 'block_1'); ?>
		     </div>



	    </div>
 	 </div>
    <?php
    }else {
    	print $print['content'];
		if(isset($_SESSION['questionaire'])){
			unset($_SESSION['questionaire']);
		}
    }

    ?></div>
    <div class="print-taxonomy"><?php print $print['taxonomy'] ?></div>
    <hr class="print-hr" />
    <div class="print-footer"><?php  print $print['footer_message'] ?></div>
    <div class="print-source_url"><?php  print $print['source_url'] ?></div>
    <div class="print-links"><?php  print $print['pfp_links'] ?></div>
	
  </body>
</html>
