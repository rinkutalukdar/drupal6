<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="<?php print $language->language ?>" lang="<?php print $language->language ?>" dir="<?php print $language->dir ?>">
<head>

	<?php print $head ?>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="viewport" content="width=device-width,initial-scale=1">
	<title><?php print $head_title ?></title>
	<?php print $styles ?>
	<link href="<?php print base_path().drupal_get_path('module', 'survey');?>/jquery-ui.css" rel="stylesheet" type="text/css" media="screen"/>
<!--[if lte IE 7]>
<script src="<?php print url().path_to_theme();?>/js/iepngfix.js" type="text/javascript"></script>
<link href="<?php print url().path_to_theme();?>/css/ie.css" rel="stylesheet" type="text/css" media="screen"/>
<![endif]-->
<script src="<?php print url().path_to_theme();?>/js/swfobject.js" type="text/javascript"></script>
<?php
print $scripts;
 if(arg(0) == 'survey-result' || arg(0) =='survey-confirm' ){?>
 	<script src="<?php print url().path_to_theme();?>/js/jquerymin/jquery.min.js" type="text/javascript"></script>
 	<script src="<?php print url().path_to_theme();?>/js/jquerymin/jquery-ui.min.js" type="text/javascript"></script>
 <?php }
 print phptemplate_get_bg_image_scripts();

 ?>
</head>
<body>
<?php $images_path = url().path_to_theme().'/images/'; ?>
<div id="main_container">
<?php if(function_exists("popupsurvey_popup_continue_survey")): ?>
	    	<a style="display:none;" id="choose_survey" href="<?php print base_path();?>continue-survey" rel="lightmodal[|width:450px; height:230px;]">
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
	    <div id="header_middle">
	       		<a href="<?php print $front_page ?>" title="<?php print t('Home') ?>">
		    		<img src="<?php print $images_path; ?>logo_main.png" alt="<?php print t('Home') ?>" />
			   	</a>
	    </div>
	<?php //if($header_right_links || $header_topnav): ?>
	    <div id="header_right">
	    <?php if(function_exists("custommod_country_selector") && variable_get('custommod_languages','')): ?>
	    	<?php print theme('custommod_language_dropdown');?>
	    	<a style="display:none;" id="choose_language" href="<?php print base_path();?>country-selector" rel="lightmodal[|width:400px; height:250px;]">
				<?php print t('Choose Language');?>
			</a>
	    	<?php endif; ?>
		    <div id="topnav">
	        <?php print $header_topnav ?>
	      </div>
	      <div id="right_menu">
		    	<?php print psychiatry24x7_links($header_right_links, NULL , $header_left_links_count); ?>
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
    <?php print $breadcrumb; ?>
    <?php if($left):?>
    <div id="body_left">
		<?php print $left; ?>
	</div>
    <?php elseif(strpos($_GET['q'], 'patientartgallery') !== false): ?>
    <div id="body_left">
    <?php print '&nbsp;'; ?>
    </div>
    <?php endif ?>
    <?php if($node->path == "advice"): ?>
    	<div id="body_bmiddle" class="decision_trees">
    <?php elseif($left || strpos($_GET['q'], 'patientartgallery') !== false):?>
    	<div id="body_middle">
    <?php elseif($_GET['q'] == 'sitemap'): ?>
    	<div id="body_middle_sitemap">
    <?php else: ?>
    	<div id="body_bmiddle">
    <?php endif  ?>

    <?php if ($title): print '<h1'. ($tabs ? ' class="with-tabs"' : '') .'>'. $title .'</h1>'; endif; ?>
	<?php if ($tabs):
      			//print '<div id="tabs-wrapper" class="clear-block">';
       			//print '<ul class="tabs primary">'. $tabs .'</ul></div>';
    endif; ?>
    <?php if ($show_messages && $messages): print $messages; endif; ?>
	<?php print $content; ?><br>
    </div>
    <div id="body_right">
      <div id="search_container">
 				<?php print $search_container; ?>
      </div>
    <?php
      	if($right && $node->path != "advice"):
    	  	print $right;
      	endif
    ?>

    </div>
  </div>
  <!-- Body Ends here //-->
 <!-- Footer Starts here //-->
  <div id="footer_container">
  	<?php if($share): ?>
    	<div id="share"> <?php print $share; ?></div>
    <?php endif ?>
    <?php //if($footer_links || $footer_right): ?>
    	<div id="ftmenu_container">
    		<?php if($footer_left): ?>
      			<div id="ftmenu_left">
					<?php print $footer_left;?>
      			</div>
      		<?php endif ?>

		    	<div id="ftmenu_right">
      				<ul>
          					<li class="italic"><?php print t('This site is brought to you by');?></li>
          					<li><img src="<?php print $images_path; ?>logo_janssen.gif" alt="Logo" title="Logo" /></li>
        			</ul>
      			</div>
    	</div>
    <?php //endif ?>
    <?php print $footer; ?>
  </div>
  <!-- Footer Ends here //-->
</div>
 <?php print $closure ?>
</body>
</html>