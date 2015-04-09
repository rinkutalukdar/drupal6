<?php
	$options = $element['#options'];
	if(isset($element['#post'][$element['#parents'][0].'_list'])){
		$value = $element['#post'][$element['#parents'][0].'_list'];
	}else{
		$value = $element['#value'];
	}
	if(is_array($value)){
		$_countrycode = $value[$element['#name'].'_countrycode'];
		$_stdcode = $value[$element['#name'].'_stdcode'];
		$_phnum = $value[$element['#name'].'_phnum'];
	}else{
		$_valueArray = explode('-', $value);
		$_countrycode = ltrim($_valueArray[0], '+');
		$_stdcode = trim($_valueArray[1]);
		$_phnum = trim($_valueArray[2]);
	}
	
	if (isset($element['#field_prefix'])) {?>
		<span class="field-prefix"><?php echo $element['#field_prefix']?></span><?php
	}?>
	
	<div id="sourceTargetDiv_<?php echo $element['#name']?>" style="width:100%; padding-top:10px; padding-bottom:10px; float:left;" onMouseout="selectListValues($('#<?php echo $element['#name']?>_list').get(0), this.id, event)">
		
		<div style="float:left; padding-right:5px;" align="center">
		  <select name="<?php echo $element['#name']?>_source[]" id="<?php echo $element['#name']?>_source" size="5" multiple>
		  <?php
		  if(!is_array($value)){
		  	$value = array();
		  }
			if(is_array($options)){
				foreach($options as $optionValue => $optionDisplayText){
					if(in_array($optionValue, $value)){
						$listSelectBoxValue[$optionValue] = $optionDisplayText;
					}else{?>
					<option value="<?php echo $optionValue?>"><?php echo $optionDisplayText;?></option><?php
					}
				}
			}?></select>
			
	  </div>


		<div style="width:95px; float:left; padding-right:5px;" align="center">
			<div style="padding-bottom:5px;padding-top:15px;">
				<img src="<?php echo base_path().drupal_get_path('module', 'framework_1_5')?>/images/right_option.gif" alt="L" onclick="f_optionMove('<?php echo $element['#name']?>_source', '<?php echo $element['#name']?>_list', 'right')" />
			</div>
			
			<div style="padding-bottom:5px;padding-top:15px;">
				<img src="<?php echo base_path().drupal_get_path('module', 'framework_1_5')?>/images/left_option.gif" alt="L" onclick="f_optionMove('<?php echo $element['#name']?>_list', '<?php echo $element['#name']?>_source', 'left')" />
			</div>
		</div>
		
	
	<div style="float:left; padding-right:5px;" align="center">
			 <select name="<?php echo $element['#name']?>_list[]" id="<?php echo $element['#name']?>_list" size="5" multiple class="<?php echo $element['#attributes']['class']?>">
		  <?php
			if(is_array($listSelectBoxValue)){
				foreach($listSelectBoxValue as $listOptionValue => $listDisplayText){?>
					<option value="<?php echo $listOptionValue?>" selected="selected"><?php echo $listDisplayText;?></option><?php
				}
			}?></select>
		</div>
	
	<?php
	
	if (isset($element['#field_suffix'])) {?>
		<span class="field-suffix">'<?php echo $element['#field_suffix']?></span><?php
	}?>

	</div>