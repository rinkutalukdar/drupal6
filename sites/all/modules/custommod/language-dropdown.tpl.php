<span id="header_country_selector" class="mySelectBoxClass">
	<select name="choose_language" id="language_selector_top" onchange="custommod_choose_language(1);">
		<option value=""><?php print t('Select your language'); ?></option>
		<?php
		$c = custommod_get_country_array();
		global $base_url;
		foreach($c as $key => $value){
			echo "<option value='".$key."'>".$value."</option>";
		}
		$selected = "";
		$curr = trim($base_url, "http://");
		foreach($c as $key => $value){
			if($curr == $key) {
				$selected = $key;
			}
		}
		if(!$selected){
			$c = custommod_get_current_country_array();
			foreach($c as $key => $value){
				if($curr == $key) {
					$selected = $key;
				}
			}
		}
		?>
	</select>
</span>
<script type="text/javascript">
	$("#language_selector_top").val('<?php print $selected;?>');
</script>