<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="<?php print $language->language ?>" lang="<?php print $language->language ?>" dir="<?php print $language->dir ?>">
<head>
<?php print $head ?>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1">
<title><?php print $head_title ?></title>
<?php print $styles ?>
<link href="<?php print base_path().drupal_get_path('module', 'survey');?>/jquery-ui.css" rel="stylesheet" type="text/css" media="screen"/>
<script src="<?php print url().path_to_theme();?>/js/swfobject.js" type="text/javascript"></script>
<?php
print $scripts;
 if(arg(0) == 'survey-result' || arg(0) =='survey-confirm' ){?>
<script src="<?php print url().path_to_theme();?>/js/jquerymin/jquery.min.js" type="text/javascript"></script>
<script src="<?php print url().path_to_theme();?>/js/jquerymin/jquery-ui.min.js" type="text/javascript"></script>
<?php }
 print phptemplate_get_bg_image_scripts();

 ?>
<script type="text/javascript">

$(document).ready(function() {

	$(".tab_content").hide();
	$(".tab_content:first").show(); 

	$("ul.tabs li").click(function() {
		$("ul.tabs li").removeClass("active");
		$(this).addClass("active");
		$(".tab_content").hide();
		var activeTab = $(this).attr("rel"); 
		$("#"+activeTab).fadeIn(); 
	});
});

</script>
<!--<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js"></script>-->
<script>
$(document).ready(function(){
	$(".menu_body").hide();
	//toggle the componenet with class menu_body
	$(".menu_head").click(function(){
		$(this).next(".menu_body").slideToggle(600); 
		var plusmin;
		plusmin = $(this).children(".plusminus").text();
		
		if( plusmin == '+')
		$(this).children(".plusminus").text('-');
		else
		$(this).children(".plusminus").text('+');
	});
});
</script>
</head>
<body>
<?php $images_path = url().path_to_theme().'/images/'; ?>
<div class="align_search_box">
  <?php if(function_exists("custommod_country_selector") && variable_get('custommod_languages','')): ?>
  <?php //print theme('custommod_language_dropdown');?> <a style="display:none;" id="choose_language" href="<?php print base_path();?>country-selector" rel="lightmodal[|width:400px; height:250px;]"> <?php print t('Choose Language');?> </a>
  <?php endif; ?>
</div>
<div class="menu">
  <ul>
  <li><a href="/" class="align_tab_24x7"></a></li>
    <li><a href="/family-friend" class="align_tab_familt"></a></li>
    <li><a href="/meet-people" class="align_tab_myjob select_tab"></a></li>
    <li><a href="/living-schizophrenia" class="align_tab_iam"></a></li>
    <li><a href="/recently-diagnosed" class="align_tab_recently"></a></li>
  </ul>
</div>
<div id="main_container" class="align_top_space">
  <div class="sub_main_container">
    <div>
      <?php if(function_exists("popupsurvey_popup_continue_survey")): ?>
      <a style="display:none;" id="choose_survey" href="<?php print base_path();?>continue-survey" rel="lightmodal[|width:450px; height:230px;]"> <?php print t('dummy text');?> </a>
      <?php endif; ?>
      <!-- Header Starts here //-->
      <div id="header_container">
        <?php //if($header_left_links): ?>
        <div id="header_left" class="header_align_list_family"> <?php print psychiatry24x7_links($header_left_links); ?> </div>
        <?php //endif ?>
        <div id="header_middle"> <a href="<?php print $front_page ?>" title="<?php print t('Home') ?>"> <img src="<?php print $images_path; ?>logo_main.png" alt="<?php print t('Home') ?>" /> </a> </div>
        <?php //if($header_right_links || $header_topnav): ?>
        <div id="header_right">
          <div id="right_menu"> <?php print psychiatry24x7_links($header_right_links, NULL , $header_left_links_count); ?> </div>
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
      <div id="body_right" class="align_spaces_search">
        <div id="search_container" class="search_width">
          <div id="block-search-0" class="clear-block block block-search">
            <div class="content">
              <form action="/schizo/" accept-charset="UTF-8" method="post" id="search-block-form">
                <div>
                  <div id="search_txt"><img src="<?php print $images_path;?>hd_search_new.gif" alt="Search" title="Search"></div>
                  <div id="search_fields">
                    <div class="search_box">
                      <input type="text" maxlength="128" name="search_block_form" id="edit-search-block-form-1" size="15" value="" title="Enter the terms you wish to search for." class="form-text">
                    </div>
                    <div class="search_button">
                      <input type="image" src="<?php print $images_path;?>icon_go_new.gif" name="op" id="edit-submit" value="Search" class=" form-submit">
                    </div>
                  </div>
                  <input type="hidden" name="form_build_id" id="form-dc539b78f8e8eb998b37ff23ac4e51c4" value="form-dc539b78f8e8eb998b37ff23ac4e51c4">
                  <input type="hidden" name="form_token" id="edit-search-block-form-form-token" value="8784f80c9cd1f7d5fc8fe6cc5a4f16e0">
                  <input type="hidden" name="form_id" id="edit-search-block-form" value="search_block_form">
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
			<?php print $tab_container; ?>
    </div>
	<?php print $lower_container; ?>
  </div>
  <div id="footer_container">
    <?php if($share): ?>
    <div id="share"> <?php print $share; ?></div>
    <?php endif ?>
    <?php //if($footer_links || $footer_right): ?>
    <div id="ftmenu_container">
      <?php if($footer_left): ?>
      <div id="ftmenu_left"> <?php print $footer_left;?> </div>
      <?php endif ?>
      <div id="ftmenu_right">
        <ul>
          <li class="italic"><?php print t('This site is brought to you by');?></li>
          <li><img src="<?php print $images_path; ?>logo_janssen.gif" alt="Logo" title="Logo" /></li>
        </ul>
      </div>
    </div>
    <?php //endif ?>
    <?php print $footer; ?> </div>
</div>
<?php print $closure ?>
</body>
</html>