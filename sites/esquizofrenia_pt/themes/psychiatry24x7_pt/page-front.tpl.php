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
<link href="<?php print url().path_to_theme();?>/css/confirm.css" rel="stylesheet" type="text/css" media="screen"/>
<!--
<script src="<?php //print url().path_to_theme();?>/js/iepngfix.js" type="text/javascript"></script>
<link href="<?php //print url().path_to_theme();?>/css/ie.css" rel="stylesheet" type="text/css" media="screen"/>
-->
<?php print $scripts;
 print phptemplate_get_doctors_net_uk_scripts();
 print phptemplate_get_bg_image_scripts(); 
 	
 
 ?>
 

<!--<link rel="stylesheet" href="http://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css" />
<script src="http://code.jquery.com/jquery-1.9.1.js"></script>
<script src="http://code.jquery.com/ui/1.10.3/jquery-ui.js"></script>-->

<!--<script type="text/javascript">
$(document).ready(function() {
//alert(getCookie('username'));
       //if(getCookie('popup') != 1){
       //   setCookie("popup",1);
           //$("a#example1").fancybox();
           //$("a#example1").trigger('click');
		   
		   $( "#dialog-confirm" ).dialog({
				resizable: false,
				height:471,
				width:766,
				modal: true
			});
      //  }
		$(".ui-dialog-titlebar-close").click(function(){
		  setCookie("disable_menu",1);
		  window.location.href = "/?d=1";
		});
		if(getCookie('disable_menu') == 1){
		  $("div.menu").css("display", "none");
		  $(".align_search_box").css("padding", "0px");
	    }
		setCookie("popup",1);
	/*if($.cookie('disable_menu') == 1){
	  $("#main_container #header_country_selector").css("display", "none");
	}*/
    });
	
</script>-->
<!--<script>
$(document).ready(function() {
    if($.cookie('popup') != 1){
           $.cookie('popup', '1');
			$.msgBox({
				title: "Are You Sure",
				content: "Would you like a cup of coffee?",
				type: "confirm",
				buttons: [{ value: "Yes" }, { value: "No" }, { value: "Cancel"}],
				success: function (result) {
					if (result == "Yes") {
						window.location.href = "http://schizo-local.com/schizo/home";
					}
				}
			});
		 }
    });
</script>-->

<script src="<?php print url().path_to_theme();?>/js/jquery.simplemodal.js?v=1" type="text/javascript"></script>
<script type="text/javascript">

jQuery(document).ready(function() {
	//e.preventDefault();
		//example of calling the confirm function
		// you must use a callback function to perform the "yes" action
	if(getCookie('popup1') != 1){	
		$('body').append('<div id="confirm-overlay" class="simplemodal-overlay" style="opacity: 0.5; height: 1416px; width: 1263px; position: fixed; left: 0px; top: 0px; z-index: 1001; display: block;"></div>')
		.append('<div id="confirm-container" class="simplemodal-container" style="position: fixed; z-index: 1002; height: 886px; width: 770px; left: 438px; top: 20%;">');
		showconfirm();
		
		 /* showconfirm("", function () {
			window.location.href = 'http://simplemodal.com';
		  });*/
		}
});
//function showconfirm(message, callback) {
function showconfirm() {
	/*$('#confirm').modal({
		//closeHTML: "<a href='#' title='Close' class='modal-close' onClick='return check()'></a>",
		closeHTML: "<a href='#' title='Close' class='modal-close'></a>",
		position: ["20%"],
		overlayId: 'confirm-overlay',
		containerId: 'confirm-container', 
		onShow: function (dialog) {
			var modal = this;

			$('.message', dialog.data[0]).append(message);

			// if the user clicks "yes"
			$('.yes', dialog.data[0]).click(function () {
				// call the callback
				if ($.isFunction(callback)) {
					callback.apply();
				}
				// close the dialog
				modal.close(); // or $.modal.close();
			});
		}
	});*/
	$('body #confirm-container').append('<a class="modal-close simplemodal-close" title="Close" href="javascript:void(0);" onclick="close_modal_popup();" style="display:block; position:absolute;"></a>')
	.append('<div tabindex="-1" class="simplemodal-wrap" style="height: 100%; outline: 0px none; width: 100%; overflow: visible;">');
	$('body .simplemodal-wrap').append($('#confirm'));
	$('#confirm').css('display','block');
}
function close_modal_popup(){
	$('#confirm').css('display','none');
	$('.align_search_box').append($('#confirm'));
	$('body #confirm-container').remove();
	setCookie("popup1",1);
}
</script>
<script>
function check() {
$(".align_tab_24x7, .align_tab_familt, .align_tab_myjob, .align_tab_iam, .align_tab_recently") . attr('href','javascript:void(0)');
 $(".align_tab_24x7, .align_tab_familt, .align_tab_myjob, .align_tab_iam, .align_tab_recently") . css('cursor','default');
 $(".align_tab_24x7, .align_tab_familt, .align_tab_myjob, .align_tab_iam, .align_tab_recently") . css('opacity','.5');
 setCookie("disable_menu",1);
  window.location.href = "/?d=1";
}

if(getCookie('disable_menu') == 1){
	jQuery("div.menu").css("display", "none");
	jQuery("div.segments").css("display", "none");	
	jQuery(".align_search_box").css("padding", "0px");
}


</script>
</head>
<body class="front_page" >
<div id="dnukHeader"></div>
<?php $images_path = url().path_to_theme().'/images/'; ?>
<?php if(($_COOKIE['disable_menu']) != 1) { ?>
<div class="align_search_box">
<?php if(($_COOKIE['popup1']) != 1) { ?><div class="top-image"><img src="<?php print path_to_theme();?>/images/to-display.png"></div> <?php } ?>
  <?php if(function_exists("custommod_country_selector") && variable_get('custommod_languages','')): ?>
  <?php //print theme('custommod_language_dropdown');?> <a style="display:none;" id="choose_language" href="<?php print base_path();?>country-selector" rel="lightmodal[|width:400px; height:250px;]"> <?php print t('Choose Language');?> </a>
  <?php endif; ?> 
  <!-- modal content -->
  <?php if(($_COOKIE['popup1']) != 1) { ?>
		<div id='confirm'>
			<div class='header'><span></span></div>
			<div class='message'><p><span class="ui-icon ui-icon-alert" style="float: left; margin: 0 7px 20px 0;"></span><div class="top-logo"><img src="<?php print path_to_theme();?>/images/24-7.png"></div><?php print t('By choosing one of the options above, we can direct you to the content most useful to you'); ?></p></div>
			<div class='buttons'>
			</div>
		</div>
	<?php } ?>	
		<!-- preload the images -->
		<div style='display:none'>
			<img src='<?php print url().path_to_theme();?>/images/confirm/header.gif' alt='' />
			<img src='<?php print url().path_to_theme();?>/images/confirm/button.gif' alt='' />
		</div>
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
<div id="main_container" class="align_top_space">
<div class="sub_main_container">
    <div>
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
		    		<img src="<?php print $images_path; ?>logo_main.png" alt="<?php print t('Home') ?>" />
			   	</a>
	    </div>
	<?php //endif ?>
	<?php //if($header_right_links || $header_topnav): ?>
	    <div id="header_right">
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
	    	<?php //print theme('custommod_language_dropdown');?>
	    	<a style="display:none;" id="choose_language" href="<?php print base_path();?>country-selector" rel="lightmodal[|width:400px; height:250px;]">
				<?php //print t('Choose Language');?>
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
	    <div id="body_bmiddle" style="width:705px !important;">

	        <?php print $welcome_container; ?>

	    </div>
	<?php endif; ?>
	<div id="body_right">
   	<?php if($search_container): ?>
    	
	      <div id="search_container">
	        <?php print $search_container; ?>
	      </div>
	    		
	<?php endif; ?>
	<?php if($right_side_banner): ?>
		<div class="homepage-right-banner">
			<?php print $right_side_banner; ?>
		</div>
	<?php endif; ?>
	</div>
	
	<?php if($home_story_container): ?>
		<div id="homepage-story-block">
	        <?php print $home_story_container; ?>
	      
	    </div>
	<?php endif; ?>
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
          					<li class="italic"><?php print t('This site is brought to you by');?></li>
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
			jQuery(document).ready(function(){
			setTimeout(function() {
			jQuery('#take_survey').triggerHandler("click");
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
<div id="dnukFooter"></div>
</body>
</html>