$(document).ready(function() {
    $("#datepicker").datepicker();
});

function consentStatus(oldVersion) {
	var newVersion = '';
	$('input[@type = "radio"]').each(function(){
		if(this.checked){
			newVersion = $(this).val();
		}
	});
	var loadimg = location.protocol +"//"+ location.host + Drupal.settings.basePath+'sites/all/modules/user_profile/images/load.gif';
	$("#"+newVersion).after("<img id='loading' src='"+loadimg+"' />");
	if( oldVersion > newVersion || oldVersion < newVersion ){
		if(window.confirm("Do you want to change the user consent version from "+oldVersion+" to "+newVersion + ' ? ')){
			$.ajax({
				type : "POST",
				url : location.protocol +"//"+ location.host + Drupal.settings.basePath+"admin/settings/userconsentlist/"+newVersion,
				success : function (result) {
					location.reload();return;
				}
			});
		} else {
			window.location=location.protocol +"//"+ location.host + Drupal.settings.basePath+"admin/settings/userconsentlist/";
		}
	}
}