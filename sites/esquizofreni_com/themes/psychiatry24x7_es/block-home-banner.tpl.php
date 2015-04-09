<?php
		//echo "this ios test";
		
		//$results['title']       = stripslashes($results['priority_data']['title']);
        //$results['description'] = stripslashes($results['priority_data']['description']);
		unset($results['priority_data']);
	//	print_r($results['priority_data']['image_path']);
	//	die();
	
        global $theme;
        $path = drupal_get_path('theme', $theme);

	//die($path);
?>
	
      
   <div class="banner-nav-home">
    <div class="banner-nav">
	<div class="slider_loader"><img  src="<?php print "/".$path."/images/ajax-loader.gif"; ?>"/></div>    
	<?php $i = 0; 


	
     foreach ($results as $type=>$data) { ?>
     <div class="banner-image" <?php print $i != 0 ? 'style=display:none;' : ''; ?> id="<?php print "slider_" . $i;?>">
		  <a href="<?php print $data['linkurl']; ?>"><img src="<?php print base_path() . $data['image_path']; ?>" alt="<?php //print t($data['banner_type']); ?>" /></a>
      <div class="sticky-bannerNote">
       <h3><?php  print stripslashes($data['title']); ?></h3>
       <p><?php   print stripslashes($data['description']); ?></p>
	   <?php
		//Fetching default values
		$linkLabal=t('FULL ARTICLE');
		$linkUrl=$data['path'];
		
		if($data['field_linklabel'] <> ''){
			$linkLabal=$data['field_linklabel'];
		}
		if($data['linkurl'] <> ''){
			
			if (substr($data['linkurl'], 0, 4) === 'http'){
					$linkUrl=$data['linkurl'];
				}else{
				$linkUrl="http://".$_SERVER['SERVER_NAME'].'/'.$data['linkurl'];
			}	
		}
		print l($linkLabal,$linkUrl);
	   ?>
	          <?php /* if($data['field_linklabel'] == '') { print l(, $data['path']); } else { print l($data['field_linklabel'], $data['linkurl']); } */ ?> 
	   </div>
	   
     </div>
	 
     <?php $i++; }?>
     <div class="nav-button" id="bannerSmallImage">
	<ul>
      <?php
	   $i = 1;
       foreach ($results as $type=>$data) { 
	  ?>
	   <li id="home_banner_<?php print $i; ?>" <?php print $i == 1 ? 'class="services selected"' : ''; ?> <?php print $i == count($results) ? 'class="products last"' : ''; ?>" onclick="return changeImageBanner(this.id,'<?php print $data['title']; ?>' , '<?php // print $results['services']['description']; ?>' , '<?php print base_path() . $data['image_path']; ?>', <?php print "'" . $data['path'] . "'" . ',' . ($i-1) . ',' . count($results); ?>);">
	  </li>  
	  <?php $i++; } ?>
	</ul>
</div>



    </div>
   </div>
   <div class="clear"></div>