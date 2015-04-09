<?php
// $Id: page-front.tpl.php,v 1.0 2010/10/12 15:55:00 narendra.b Exp $
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="<?php print $language->language ?>" lang="<?php print $language->language ?>" dir="<?php print $language->dir ?>">
<head>
	<?php print $head ?>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title><?php print $head_title ?></title>
	<?php print $styles ?>
<!--[if IE]>
<script src="<?php print url().path_to_theme();?>/js/iepngfix.js" type="text/javascript"></script>
<link href="<?php print url().path_to_theme();?>/css/ie.css" rel="stylesheet" type="text/css" media="screen"/>
<![endif]-->

<!--[if IE 7]>
<link href="<?php print url().path_to_theme();?>/css/ie7.css" rel="stylesheet" type="text/css" media="screen"/>
<![endif]-->

<style type="text/css">
	#lightbox #imageDataContainer #bottomNavClose {
    	top: -294px;
	}
</style>
<?php print $scripts;
 print phptemplate_get_bg_image_scripts(); ?>
</head>
<body class="front_page">
<?php 
global $base_url;
$images_path = $base_url.'/'.path_to_theme().'/images/'; ?>
<div id="main_container">
  <!-- Header Starts here //-->
  <div id="header_container">
  	<?php //if($header_left_links): ?>
	    <div id="header_left">
	    	<?php print psychiatry24x7_links($header_right_links, NULL, $header_left_links_count); ?>
	    </div>
	<?php //endif ?>
	<?php //if($header_middle): ?>
	    <div id="header_middle">
	       		<a href="<?php print $front_page ?>" title="<?php print t('Home') ?>">
		    		<img src="<?php print $images_path; ?>logo_main.png" alt="<?php print t('Home') ?>" />
			   	</a>
	    </div>
	<?php //endif ?>
	<?php //if($header_right_links || $header_topnav): ?>
	    <div id="header_right">
	    	<?php if(function_exists("custommod_country_selector")): ?>
	    	<?php //print theme('custommod_language_dropdown');?>
	    	<a style="display:none;" id="choose_language" href="<?php print base_path();?>country-selector" rel="lightmodal[|width:400px; height:250px;]">
				<?php print t('Choose Language');?>
			</a>
	    	<?php endif; ?>
		    <div id="topnav">
	        <?php print $header_topnav ?>
	      </div>
	      <div id="right_menu">
	      		<?php print psychiatry24x7_links($header_left_links); ?>
		   </div>
	    </div>
    <?php //endif ?>
  </div>
  <!-- Header Ends here //-->
  <!-- Body Starts here //-->
  <div id="body_container" class="<?php print $navigation_body_color; ?>">
          <?php if ($tabs):
          			print '<div id="tabs-wrapper" class="clear-block">';
          			print '<ul class="tabs primary">'. $tabs .'</ul></div>';
          		endif;
          ?>

    <!--  <div id="body_left">body left</div> //-->
   	<!--mani added left region for search box starts here -->
	<?php if($left):?>
    <div id="body_left">
		<?php print $left; ?>
	</div>
    <?php elseif(strpos($_GET['q'], 'patientartgallery') !== false): ?>
    <div id="body_left">
    <?php print '&nbsp;'; ?>
    </div>
    <?php endif ?>
	<!-- added left region for search box end here  -->

	<?php if($welcome_container): ?>
	    <div id="body_bmiddle">

	        <?php print $welcome_container; ?>

	    </div>
	<?php endif; ?>


	   	<!--<?php //if($search_container): ?>
    	<div id="body_right">
	      <div id="search_container">
	        <?php //print $search_container; ?>
	      </div>
	    </div>
	<?php// endif; ?> -->
	<?php if($hblocks_container): ?>
    <div id="hblocks_container">
    	<?php print $hblocks_container; ?>
    	<?php if(!$is_front): print $content; endif; //to remove the "Welcome content" on home page?>
    </div>
	<?php endif; ?>

    	<div id="hsection_left">
    		<?php if($hcontent_middle_left): ?>
    			<?php print $hcontent_middle_left;?>
    		<?php endif;?>
		      </div>
    	<div id="hsection_right">
    		<!-- <div class="latest_news_block">
    		<h2><?php print t("Latest News");?></h2> -->
    		<?php if($hcontent_middle_right): ?>
    			<?php print $hcontent_middle_right;?>
    		<?php endif;?>
		      </div>

	    </div>
  <div id="footer_container">
  	<?php if($share): ?>
    	<div id="share"> <?php print $share; ?></div>
    <?php endif; ?>
    <?php //if($footer_links || $footer_right): ?>
    	<div id="ftmenu_container">
    		<?php if($footer_left): ?>
      			<div id="ftmenu_left">
					<?php print $footer_left; ?>
      			</div>
      		<?php endif; ?>

		    	<div id="ftmenu_right">
      				<ul>
          					<li><img src="<?php print $images_path; ?>logo_janssen.gif" alt="Logo" title="Logo" /></li>
							<li class="italic"><?php print t("This site is brought to you by");?></li>
          					
        			</ul>
      			</div>
    	</div>
    <?php print $footer; ?>
    <?php if(variable_get('custommod_additional_languages','') != "") { ?>
    <script type="text/javascript">
    	$(document).ready(function(){
			setTimeout(function() {
				$('#choose_language').triggerHandler("click");
				}
			, 2000);
		});
    </script>
    <?php } ?>
  </div>
  </div>
  <!-- Body Ends here //-->
  <!-- Footer Starts here //-->

  <!-- Footer Ends here //-->
</div>
	<?php print $closure ?>
</body>
</html>
