<div class="filter">
<?php
	drupal_add_css(drupal_get_path('module', 'user_profile') .'/consent.css');
?>

	<ul class="consentTitle">
		<li class="wid2751">		<?php echo "Consent Url" ?>	</li>
		<li class="wid117">		<?php echo "Consent Version" ?>	</li>
		<li class="wid117">	<?php echo "Date" ?>	</li>
		<li class="wid50">	<?php echo "Enable" ?>	</li>
	</ul>
<?php	
	
	if(count($list)){ 
		while($res = db_fetch_object($list)){ 
			if($res->status == 1){ 
				$oldversion=$res->consent_id;
			}			
?>
		<ul>
			<li class="wid275"><a href="<?php echo $res->consent_url ?>" target="_blank" title = "<?php echo $res->consent_url ?>" ><?php echo $res->consent_url ?></a></li>
			<li class="wid117"><?php echo $res->consent_version ?></li>
			<li class="wid117">
					<div class="txtbosdate">
						<div class="txtbosdatetxt"><?php echo date('m/d/Y',$res->consent_date)?></div>
					</div>
			</li>
			<li class="wid50">	<input type="radio" name="status" value="<?php echo $res->consent_id ?>" id="<?php echo $res->consent_id ?>" onClick = 'consentStatus("<?php print $oldversion ?>");' <?php if($res->status){ print checked; } ?> >	</li>
		</ul>
  <?php }
  }else { 
	print "No versions available"; 
  } ?>
  <?php print $form; ?>
</div>
