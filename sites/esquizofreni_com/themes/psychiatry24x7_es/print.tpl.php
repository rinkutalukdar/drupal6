<?php
// $Id: print.tpl.php,v 1.8.2.11 2008/10/22 21:13:09 jcnventura Exp $
ob_start(); 
/**
 * @file
 * Default print module template
 */
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="<?php  print $print['language'] ?>" xml:lang="<?php  print $print['language'] ?>">
  <head>
  <?php
  $theme_default = variable_get('theme_default', '');
  $path_to_theme = drupal_get_path('theme', $theme_default);
  ?>
    <title><?php  print $print['title'] ?></title>
    <?php  print $print['head'] ?>
    <?php  print $print['scripts'] ?>
    <?php  print $print['robots_meta'] ?>
    <?php  print $print['base_href'] ?>
    <?php  print $print['favicon'] ?>
    <?php  print $print['css'] ?>
    <link type='text/css' rel='stylesheet' media='all' href='<?php print url().$path_to_theme; ?>/css/print.css' />
   
<style type="text/css">
   .taking_to_doctor_container .getting_better h2{
	background:url(<?php print url().$path_to_theme; ?>/images/getting_better.gif) left top no-repeat;
	text-indent:-9999999px;
	height:24px;
	margin-bottom:10px;
}

.latest_news_block h2{
	background:url(<?php print url().$path_to_theme; ?>/images/latest_news.gif) left top no-repeat;
	height: 24px;
	margin-bottom: 24px;
	margin-top: 5px;
	width:69px;
}

#hblocks_container #hblock3 h2 {
    background: url("<?php print url().$path_to_theme; ?>/images/looking_for_answer.gif") no-repeat scroll left top transparent;
    padding-bottom: 47px;
    text-indent: -1e+8px;
}
#hblocks_container #hblock2 {
    height: 281px;
    padding-right: 254px;
    padding-top: 17px;
    width: 194px;
}
#hblocks_container #hblock3 {
    height: 281px;
    padding-right: 210px;
    padding-top: 17px;
    width: 238px;
}
.taking_to_doctor_container {
    border: 4px solid #F2F1F1;
    float: left;
    height: 221px;
    margin-bottom: 20px;
    width: 692px;
}

.hjoin_network {
    background: url("<?php print url().$path_to_theme; ?>/images/bg_join_our_network.gif") no-repeat scroll left top transparent;
    float: left;
    height: 145px;
    margin-left: -10px;
    margin-top: -5px;
    padding-left: 15px;
    padding-top: 69px;
    width: 235px;
}
.survey h2 {
    background: url("<?php print url().$path_to_theme; ?>/images/your_opinion.gif") no-repeat scroll left top transparent;
    height: 30px;
    margin: 21px 0 0 0;
    text-indent: -999999px;
}

#hblocks_container #hblock2 h2 {
    background: url("<?php print url().$path_to_theme; ?>/images/your_medication.gif") no-repeat scroll left top transparent;
    padding-bottom: 28px;
    text-indent: -1e+8px;
}
.taking_to_doctor_container .your_choices h2 {
    background: url("<?php print url().$path_to_theme; ?>/images/your_choices.gif") no-repeat scroll left top transparent;
    height: 56px;
    margin-bottom: 10px;
    text-indent: -1e+7px;
}

.taking_to_doctor_container .getting_better h2 {
    background: url("/sites/dev-psychiatry24x7-hu.jnj.com/themes/psychiatry24x7_es/images/getting_better.gif") no-repeat scroll left top transparent;
    height: 33px;
    margin-bottom: 10px;
    text-indent: -1e+7px;
}
#hblocks_container #hblock2 {
    background: url("/sites/all/themes/psychiatry24x7/images/bg_your_medication.jpg") no-repeat scroll right top #82CBD8;
}
#hblocks_container #hblock3 {
    background: url("/sites/all/themes/psychiatry24x7/images/bg_looking_for_answer.jpg") no-repeat scroll right top #C2D17B;
}
#hblocks_container #hblock2 h2 {
    background: url("/sites/dev-psychiatry24x7-hu.jnj.com/themes/psychiatry24x7_es/images/your_medication.gif") no-repeat scroll left top transparent;
    padding-bottom: 40px;
}
.survey {
    background: url("/sites/all/themes/psychiatry24x7/images/bg_your_opinion.gif") no-repeat scroll right top #F3F2F2;
    border: 4px solid #EBE8E3;
    float: left;
    height: 197px;
    padding-left: 20px;
    position: relative;
    width: 432px;
}
.hjoin_network {
    background: url("<?php print url().$path_to_theme; ?>/images/bg_join_our_network.gif") no-repeat scroll left top transparent;
    float: left;
    height: 145px;
    margin-left: -10px;
    margin-top: -5px;
    padding-left: 15px;
    padding-top: 69px;
    width: 235px;
}
.survey h2 {
    background: url("<?php print url().$path_to_theme; ?>/images/your_opinion.gif") no-repeat scroll left top transparent;
    height: 30px;
    margin: 21px 0 0;
    text-indent: -999999px;
}

</style>
	<script>
		swfobject = new Object();
		swfobject.embedSWF = function(args) { return false; }
	</script>
	<!--[if lte IE 7]>
			<?php print phptemplate_get_ie_scripts(); ?>
	<![endif]-->
  </head>
  <body><?php  print $print['sendtoprinter'] ?>
  <?php /*$images_path = url().path_to_theme().'/images/'; */?>
  <?php $images_path = base_path().drupal_get_path('theme', 'psychiatry24x7_es').'/images/'; ?>
    <?php if (!empty($print['message'])) print '<div class="print-message">'. $print['message'] .'</div><p />' ?>
    <div class="print-logo"><?php  //print $print['logo'] ?><img src="<?php print $images_path; ?>logo_main.png" alt="" title="" /></div>
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
    		<div id="elcome_container">
		    	<?php
		    		$block = module_invoke('block', 'block', 'view', 45);
				    print $block['content'];
    			?>
    		</div>
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
	    	?>
      </div>
    	 	 </div>
    <?php
    }else {
    	print $print['content'];
		$block = module_invoke('questionaire', 'block', 'view', 0);
	    print $block['content'];
		$block1 = module_invoke('block', 'block', 'view', 81);
	    print $block1['content'];
    }
	if(isset($_SESSION['questionaire'])){
						unset($_SESSION['questionaire']);
	}

    ?></div>
    <div class="print-taxonomy"><?php print $print['taxonomy'] ?></div>
    <hr class="print-hr" />
    <div class="print-footer"><?php  print $print['footer_message'] ?></div>
    <div class="print-source_url"><?php  print $print['source_url'] ?></div>
    <div class="print-links"><?php  print $print['pfp_links'] ?></div>
  </body>
</html>
<?php
@ob_end_flush();
?>

