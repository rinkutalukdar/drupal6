<div class="extlink_content country_popup">
			<?php print variable_get('custommod_popup_text', '');?>
			<form class="exit-popup">
			<select name="country_selector" id="language_selector_popup">
				<option value=""><?php print t("- Select Language -");?></option>
				<?php foreach($countries as $url => $language) { ?>
					<option value="<?php print $url;?>"><?php print $language;?></option>
				<?php } ?>
			</select>
			<br/>
		  <input type="button" name="go" value="<?php print t('Submit');?>" class="popup_go_button" onclick="custommod_choose_language(0);"/>
		</form>
</div>