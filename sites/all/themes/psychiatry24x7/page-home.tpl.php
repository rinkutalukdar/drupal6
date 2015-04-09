<?php
// $Id: page-front.tpl.php,v 1.0 2010/10/12 15:55:00 narendra.b Exp $
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="<?php print $language->language ?>" lang="<?php print $language->language ?>" dir="<?php print $language->dir ?>">
<head>
	<?php print $head ?>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="viewport" content="width=device-width,initial-scale=1">
	<title><?php print $head_title ?></title>
	<?php print $styles ?>
<!--[if lte IE 7]>
<script src="<?php print url().path_to_theme();?>/js/iepngfix.js" type="text/javascript"></script>
<link href="<?php print url().path_to_theme();?>/css/ie.css" rel="stylesheet" type="text/css" media="screen"/>
<![endif]-->
<?php print $scripts;
 print phptemplate_get_bg_image_scripts(); ?>
<script>
 $(document).ready(function() {
   if ($("#header_left li.first a").text() == "Home") {
     //alert($("#header_left li.first a ").text());
    $("#header_left li.first a").attr("href", "/?d=1");
   }
 });
</script>
</head>
<body class="front_page">
<?php $images_path = url().path_to_theme().'/images/'; ?>
<div id="main_container" class="home_inner">
<?php if(function_exists("popupsurvey_popup_continue_survey")): ?>
	    	<a style="display:none;" id="choose_survey" href="<?php print base_path();?>continue-survey" rel="lightmodal[|width:450px; height:200px;]">
				<?php print t('dummy text');?>
			</a>
			<a style="display:none;" id="take_survey" href="<?php print base_path();?>stayin-survey" rel="lightmodal[|width:470px; height:230px;]">
				<?php print t('dummy text');?>
			</a>
	    	<?php endif; ?>
  <!-- Header Starts here //-->
  <div id="header_container">
  	<?php //if($header_left_links): ?>
	    <div id="header_left">
	    	<?php print psychiatry24x7_links($header_left_links); ?>
	    </div>
	<?php //endif ?>
	<?php //if($header_middle): ?>
	    <div id="header_middle">
	       		<a href="<?php print $front_page ?>" title="<?php print t('Home') ?>">
		    		<?php if (($_COOKIE['disable_menu']) == 1) { ?><img src="<?php print $images_path; ?>main_logo.png" alt="<?php print t('Home') ?>" />
					<?php } else { ?>
					<img src="<?php print $images_path; ?>logo_main.png" alt="<?php print t('Home') ?>" /> 
					<?php } ?>
			   	</a>
	    </div>
	<?php //endif ?>
	<?php //if($header_right_links || $header_topnav): ?>
	    <div id="header_right">
	    <?php if(function_exists("custommod_country_selector") && variable_get('custommod_languages','')): ?>
	    	<?php print theme('custommod_language_dropdown');?>
	    	<a style="display:none;" id="choose_language" href="<?php print base_path();?>country-selector" rel="lightmodal[|width:400px; height:250px;]">
				<?php print t('Choose Language');?>
			</a>
	    	<?php endif; ?>
			<?php if(($_COOKIE['disable_menu']) == 1) { ?><div id="topnav">
	        	      </div>
					  <?php } ?>
		    <div id="right_menu">
		    	<?php print psychiatry24x7_links($header_right_links, NULL, $header_left_links_count); ?>
		   </div>
	    </div>
    <?php //endif ?>
  </div>
  <!-- Header Ends here //-->
  <!-- Mobile header starts here -->
  <div class="mob-header">
	<a class="mob-logo" href="/"><img src="<?php print $images_path.'/mobile/shizo24x7-logo.png'; ?>" /></a>
	<div class="header-right">
		<div class="mob-lang-selector">
		<?php if(function_exists("custommod_country_selector") && variable_get('custommod_languages','')): ?>
	    	<?php print theme('custommod_language_dropdown');?>
	    	<a style="display:none;" id="choose_language" href="<?php print base_path();?>country-selector" rel="lightmodal[|width:400px; height:250px;]">
				<?php print t('Choose Language');?>
			</a>
	    	<?php endif; ?>
		</div>
		<div class="mob-search"><?php print $search_container; ?></div>
	</div>
	<?php if(($_COOKIE['disable_menu']) != 1) { ?>
	<div class="segments">
		<?php print theme('links',$segmentation_tabs,array('class'=>'','rel'=>'segmentation'),1,true); ?>
	</div>
	<?php } ?>
	<div class="main-nav">
		<span class="label"><a title="<?php print t('Home'); ?>" href="/"><?php print t('Home'); ?></a></span>
		<span class="menu"></span>
		
		<?php print theme('links',$mob_header_links,array('class' => '')); ?>
		
	</div>
  </div>
  <!-- Mobile header ends here -->
  <!-- Body Starts here //-->
  <div id="body_container" class="<?php print $navigation_body_color; ?>">
          <?php if ($tabs):
          			print '<div id="tabs-wrapper" class="clear-block">';
          			print '<ul class="tabs primary">'. $tabs .'</ul></div>';
          		endif;
          ?>

    <!--  <div id="body_left">body left</div> //-->
   	<?php if($welcome_container): ?>
	    <div id="body_bmiddle">

	        <?php print $welcome_container; ?>

	    </div>
	<?php endif; ?>
   	<?php if($search_container): ?>
    	<div id="body_right">
	      <div id="search_container">
	        <?php print $search_container; ?>
	      </div>
	    </div>
	<?php endif; ?>
	<?php if($home_story_container): ?>
		<div id="homepage-story-block">
	        <?php print $home_story_container; ?>
	      
	    </div>
	<?php endif; ?>
    <div id="hblocks_container">
    	<?php print $hblocks_container; ?>
    	<?php if(!$is_front): print $content; endif; //to remove the "Welcome content" on home page?>
    </div>

    	<div id="hsection_left">
    		<?php if($hcontent_middle_left): ?>
    			<?php print $hcontent_middle_left;?>
    		<?php endif;?>
		      </div>
		<div id="join_network_container">
    		<?php if($join_network_container): ?>
    			<?php print $join_network_container;?>
    		<?php endif;?>
		</div>
    	<div id="hsection_right">
    		<div>
    		    		<?php if($hcontent_middle_right): ?>
    			<?php print $hcontent_middle_right;?>
    		<?php endif;?>
		      </div>
			<div class="newsletter_image">
				<?php
		    		print $hcontent_newsletter;
    			?>
			</div>
	    </div>

  </div>
  <!-- Body Ends here //-->
  <!-- Footer Starts here //-->
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
          					<li class="italic">This site is brought to you by</li>
          					<li><img src="<?php print $images_path; ?>logo_janssen.gif" alt="Logo" title="Logo" /></li>
        			</ul>
      			</div>
    	</div>
    <?php print $footer;

 ?>

    <?php

	if (function_exists("popupsurvey_popup_continue_survey")) {
		 $current_time = time();
		$survey_popup_time = $_COOKIE["popupsurvey"];
		if (isset($_COOKIE['popupsurvey_days'])){
		    if ( $current_time > $survey_popup_time) {
		    		?>
			<script type="text/javascript">
			var expir = 1000;
			$(document).ready(function(){
			setTimeout(function() {
			$('#take_survey').triggerHandler("click");
			}
			,expir);
			});
			</script>
			<?php
			}
	  }
	}
	?>
	<?php /*if(variable_get('custommod_additional_languages','') != "") { ?>
    <script type="text/javascript">
    	$(document).ready(function(){
			setTimeout(function() {
				$('#choose_language').triggerHandler("click");
				}
			, 2000);
		});
    </script>
    <?php } */?>
</div>
<!-- Footer Ends here //-->
</div>
	<?php print $closure ?>
</body>
</html>
