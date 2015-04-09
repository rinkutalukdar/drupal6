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
// search submit button not working in home page, so write a click hack
	$(".front_page .search_button #edit-submit").click(
		function(){
			location.href="/search/node/"+$(".search_box #edit-search-block-form-1").val();
			return false;
		}
	);
});
//endif