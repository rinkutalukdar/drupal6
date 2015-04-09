<?php
/*$options[$chkBoxValue]['Title'] ='';
$options[$chkBoxValue]['emailaddress'] ='';*/
	$options = $element['#options'];
	$size=30;
	if($element['#size']){
	 $size = $element['#size'];
	}
	
	$default_value = $element['#default_value'];
	
	if(isset($element['#post'][$element['#parents'][0].'_list'])){
		$value = $element['#post'][$element['#parents'][0].'_list'];
	}else{
		$value = $element['#value'];
	}

	if (isset($element['#field_prefix'])) {?>
		<span class="field-prefix"><?php echo $element['#field_prefix']?></span><?php
	}?>
	
	<div style="width:100%;">
		<?php
			foreach($options as $key => $option){
				if(array_key_exists($key, $default_value)){
					$checked = 'checked="TRUE"';
				}else{
					$checked = ''; 
				}
			?>
				<div style="width:100%;">
					<label class="option">
					<input type="checkbox" <?php print $checked?> value="<?php print $key?>" name="<?php print $element['#name']?>_<?php print $key?>" />
					<?php print $option?>
					</label>
				</div>
				<div style="width:100%;">
					<input type="text" value="<?php print $default_value[$key]?>" name="<?php print $element['#name']?>_emailAddr_<?php print $key?>" size="<?php print $size?>" />
				</div>
				<div class="description">
					<?php print $element['#description']?>	
				</div>
				<?php
			}
			?>
		
	<?php
	
	if (isset($element['#field_suffix'])) {?>
		<span class="field-suffix">'<?php echo $element['#field_suffix']?></span><?php
	}?>

	</div>