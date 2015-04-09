<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/es/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="<?php print $language->language ?>" lang="<?php print $language->language ?>" dir="<?php print $language->dir ?>">
<head>
	<?php print $head ?>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title><?php print $head_title ?></title>
	<?php print $styles ?>
<!--[if lte IE 7]>
<script src="<?php print url().path_to_theme();?>/js/iepngfix.js" type="text/javascript"></script>
<link href="<?php print url().path_to_theme();?>/css/ie.css" rel="stylesheet" type="text/css" media="screen"/>
<![endif]-->
<script src="<?php print url().path_to_theme();?>/js/swfobject.js" type="text/javascript"></script>
 <?php print $scripts;
 print phptemplate_get_bg_image_scripts();
 ?>

</head>
<body id="schizo_ru">
<?php $images_path = url().path_to_theme().'/images/'; ?>
<div id="main_container">
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
		    <div id="topnav">
	        <?php print $header_topnav ?>
	      </div>
	      <div id="right_menu">
		    	<?php print psychiatry24x7_links($header_right_links, NULL, $header_left_links_count); ?>
		   </div>
	    </div>
    <?php //endif ?>
  </div>
  <!-- Header Ends here //-->
  <!-- Body Starts here //-->
  <div id="body_container" class="<?php print $navigation_body_color; ?>">
    <div id="body_bmiddle">
      <div id="twocol">
          <?php print '<h1>'.t("Search Results").'</h1>';?>
                   <?php if ($show_messages && $messages): print $messages; endif; ?>
		<?php print str_replace('<h2>Search results</h2>',' ',$content); ?><br>
     </div>
    </div>
    <div id="body_right">
      <div id="search_container">
 				<?php print $search_container; ?>
      </div>
    <?php
      	if($right):
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
    <?php if($footer_links || $footer_right): ?>
    	<div id="ftmenu_container">
    		<?php if($footer_left): ?>
      			<div id="ftmenu_left">
					<?php print $footer_left; ?>
      			</div>
      		<?php endif ?>

		    	<div id="ftmenu_right">
      				<ul>
          					<!--  <li class="italic"><?php print $brought_text; ?></li>-->
          					<li><img src="<?php print $images_path; ?>logo_janssen.gif" alt="Logo" title="Logo" /></li>
        			</ul>
      			</div>
    	</div>
    <?php endif ?>
    <?php print $footer; ?>
  </div>
  <!-- Footer Ends here //-->
</div>
 <?php print $closure ?>
</body>
</html>