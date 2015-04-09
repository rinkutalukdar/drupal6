$(document).ready(function() {
	$("#edit-search-block-form-1").val(Drupal.t('Keyword'));
	$("#edit-search-block-form-1").focus( function() {
		if (Drupal.t("Keyword") == this.value){
			this.value = ''
		}
	});
	$("#edit-search-block-form-1").blur( function() {
		if (this.value == '') {
			this.value = Drupal.t("Keyword")
		}
	});
});
//endif