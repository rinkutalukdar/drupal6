<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="<?php print $language->language ?>" lang="<?php print $language->language ?>" dir="<?php print $language->dir ?>">
<head>

	<?php print $head ?>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="viewport" content="width=device-width,initial-scale=1">
	<title><?php print $head_title ?></title>
	<?php print $styles ?>
	
	<style>
	.ui-widget-overlay {
	position: static !important;
	}</style>
	
	<link href="<?php print base_path().drupal_get_path('module', 'survey');?>/jquery-ui.css" rel="stylesheet" type="text/css" media="screen"/>

<!--<script src="<?php print url().path_to_theme();?>/js/swfobject.js" type="text/javascript"></script>-->
<?php
print $scripts;
 if(arg(0) == 'survey-result' || arg(0) =='survey-confirm' ){?>
 	<script src="<?php print url().path_to_theme();?>/js/jquerymin/jquery.min.js" type="text/javascript"></script>
 	<script src="<?php print url().path_to_theme();?>/js/jquerymin/jquery-ui.min.js" type="text/javascript"></script>
 <?php }
 print phptemplate_get_bg_image_scripts();

 ?>
 <script>
 $(document).ready(function() {
   if($.cookie('disable_menu') == 1){
	  $("div.menu").css("display", "none");
	  $(".align_search_box").css("padding", "0px");
	  //$("#header_country_selector").css("display", "none");
	}
	if($.cookie('disable_menu') != 1){
	  $("#main_container #header_country_selector").css("display", "none");
	}
 });
	
 </script>
  <script> 
 $(document).ready(function() {
  if($.cookie('disable_menu') == 1){
   if ($("#header_left li.first a").text() == "Home") {
     //alert($("#header_left li.first a ").text());
     $("#header_left li.first a").attr("href", "/?d=1");
   }
   }
 });
</script>

</head>
<body>
<?php $images_path = url().path_to_theme().'/images/'; ?>
<?php if(($_COOKIE['disable_menu']) != 1) { ?>
<div class="align_search_box">
  <?php if(function_exists("custommod_country_selector") && variable_get('custommod_languages','')): ?>
  <?php //print theme('custommod_language_dropdown');?> <a style="display:none;" id="choose_language" href="<?php print base_path();?>country-selector" rel="lightmodal[|width:400px; height:250px;]"> <?php print t('Choose Language');?> </a>
  <?php endif; ?>
</div>

<div class="menu">
  <ul>
   <li><a href="/" class="align_tab_24x7 select_tab"></a></li>
    <li><a href="/family-friend" class="align_tab_familt"></a></li>
    <li><a href="/meet-people" class="align_tab_myjob"></a></li>
    <li><a href="/living-schizophrenia" class="align_tab_iam"></a></li>
    <li><a href="/recently-diagnosed" class="align_tab_recently"></a></li>
  </ul>
</div>
<?php } ?>
<div id="main_container">

<?php if(($_COOKIE['disable_menu']) != 1) { ?>
<div class="sub_main_container">
 <div>
 <?php } ?>
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
		    		<?php if (($_COOKIE['disable_menu']) == 1) { ?><img src="<?php print $images_path; ?>main_logo.png" alt="<?php print t('Home') ?>" />
					<?php } else { ?>
					<img src="<?php print $images_path; ?>logo_main.png" alt="<?php print t('Home') ?>" /> 
					<?php } ?>

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
			<?php if(($_COOKIE['disable_menu']) == 1) { ?><div id="topnav">
	        	      </div>
					  <?php } ?>
		    <div id="right_menu">
		    	<?php print psychiatry24x7_links($header_right_links, NULL , $header_left_links_count); ?>
		   </div>
	    </div>
    <?php //endif ?>
  </div>
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
  <!-- Header Ends here //-->
  <!-- Body Starts here //-->
  <div id="body_container" class="<?php print $navigation_body_color; ?>">
    <?php print $breadcrumb; ?>

   	<div class="meet-mark-ctr">


    <?php if ($title): print '<h1'. ($tabs ? ' class="with-tabs"' : '') .'>'. $title .'</h1>'; endif; ?>
	<?php if ($show_messages && $messages): print $messages; endif; ?>
	<div class="page-content-container">
		<div class="section-left">
			<div class="small-banner meet-mark-page-banner">
				<h1>Meet Mark</h1>
				<p>Not taking your medication as prescribed can cause life to become unpredictable and chaotic. Sometimes you may feel that taking medication has its down-sides, but by taking it as prescribed, you are giving yourself the best possible chance at regaining control of your life.</p>
			</div>
			<div class="section-left-small-bnr-ctr">
				<div class="small-banner"><img alt="meet mark" src="/sites/default/files/meet-mark-sticky.png" /></div>
				<div class="small-banner"><a href="/tell-a-friend?destination=meet-mark" rel="lightframe[|width:620px; height:405px;]"><img alt="tell a friend" src="/sites/default/files/tell-a-frnd.png" /></a></div>
			</div>
		</div>
		<div class="section-content">
			<div class="video-container">
			<div class="meet-mark-msg"></div>
			<link href="/sites/all/themes/psychiatry24x7/css/jquery-ui.css" rel="stylesheet" /> <script src="/sites/all/themes/psychiatry24x7/js/jquery-1.7.2.min.js"></script> <script src="/sites/all/themes/psychiatry24x7/js/jquery-ui.js"></script> <script type="text/javascript"> var jq = $.noConflict(true);</script>
<link href="/sites/all/themes/psychiatry24x7/css/player.css" rel="stylesheet" type="text/css" /> <script language="JavaScript" type="text/javascript" src="http://admin.brightcove.com/js/BrightcoveExperiences_all.js"></script> <script language="JavaScript" type="text/javascript" src="/sites/all/themes/psychiatry24x7/js/player.js"></script>
				<div class="player" id="webplayer_container">
					<section id="wp_area_wrapper">
						<div class="video small" id="wp_video_wrapper">
							<script language="JavaScript" type="text/javascript" src="http://admin.brightcove.com/js/BrightcoveExperiences.js"></script>
							<object class="BrightcoveExperience" id="myExperience2725457548001">
								<param value="#FFFFFF" name="bgcolor" />
								<param value="100%" name="width" />
								<param value="100%" name="height" />
								<param value="1476014525001" name="playerID" />
								<param value="AQ~~,AAABV5OycoE~,X9E4Chm4u-8CgBz5D3Z3vRbxbY2kGqct" name="playerKey" />
								<param value="true" name="isVid" />
								<param value="true" name="isUI" />
								<param value="true" name="dynamicStreaming" />
								<param name="includeAPI" value="true" />
								<param value="2725457548001" name="@videoPlayer" /> 
							</object>
							<script type="text/javascript">brightcove.createExperiences();</script>
						</div>
					</section> 	
					<nav class="controls btn-controls">
							<ul> 		<!-- PLAY BUTTON -->
								<li class="play-btn" id="play-btn" title="Play"></li>
								<li class="stream-timeline"><!--  <span></span> -->
								<div id="wp_seek_slider">&nbsp;</div>
								</li>
								<li class="stream-time"><span class="playing-at" id="wp_currentposition">&nbsp;&nbsp;&nbsp;&nbsp;00:00</span> / <span id="wp_duration">00:00</span></li>
								<!-- Volume control slider -->
								<li class="volume" id="wp_volume_icon" title="Volume"></li>
							</ul>
							<div style="clear:both;">&nbsp;</div>
					</nav>
				</div>
			</div>
			<div class="user-input-form">
					<h1>What would you do if you were Mark ?</h1>
					<h2 class="que que-1">1. How does he travel?</h2>
					<div class="ans" id="ans-1">
						<label><input type="radio" name="que-1" id="a11">Catches the bus</label><label><input type="radio" name="que-1" id="a12">Pogos</label><label><input type="radio" name="que-1" id="a13">Cycles</label><label><input type="radio" name="que-1" id="a14">Flies</label><label><input type="radio" name="que-1" id="a15">Funs</label>
					</div>
					<h2 class="que que-2" id="ans-2">2. Where does he go?</h2>
					<div class="ans">
						<label><input type="radio" name="que-2" id="a21">the park</label><label><input type="radio" name="que-2" id="a22">France</label><label><input type="radio" name="que-2" id="a23">a mountain</label><label><input type="radio" name="que-2" id="a24">work</label><label><input type="radio" name="que-2" id="a25">a party</label>
					</div>
					<h2 class="que que-3" id="ans-3">3. What does he do?</h2>
					<div class="ans">
						<label><input type="radio" name="que-3"  id="a31">gets creative</label><label><input type="radio" name="que-3" id="a32">break a world record</label><label><input type="radio" name="que-3" id="a33">make a friend</label><label><input type="radio" name="que-3" id="a34">saves the day</label><label><input type="radio" name="que-3" id="a35">kisses Sam</label>
					</div>
					<div class="btn-row">
						<input type="button" value="Go">
					</div>
			</div>
			<div class="section-left-small-bnr-ctr">
				<div class="small-banner"><img alt="meet mark" src="/sites/default/files/meet-mark-sticky.png" /></div>
				<div class="small-banner"><a href="/tell-a-friend?destination=meet-mark" rel="lightframe[|width:620px; height:405px;]"><img alt="tell a friend" src="/sites/default/files/tell-a-frnd.png" /></a></div>
			</div>
		</div>
	</div>
    </div>
    <!--<div id="body_right">
      <div id="search_container">
 				<?php //print $search_container; ?>
      </div>
    <?php
      	if($right && $node->path != "advice"):
    	  	//print $right;
      	endif
    ?>

    </div>-->
  </div>
  <?php if(($_COOKIE['disable_menu']) != 1) { ?>
    
  </div>
  </div>
  <?php } ?>
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