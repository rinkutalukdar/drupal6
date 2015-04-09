jQuery(document).ready(function() {
	 //$('.seo-check-rule-results').hide();
	 $('.ruledata').hide();	 
});

function showRules(nodeid){
	if(document.getElementById('ruledata_' + nodeid).style.display == 'none'){
		$('.ruledata').hide();
		$('#ruledata_' + nodeid).show();
	}
	else{
		$('#ruledata_' + nodeid).hide();
	}
}	

function showcustomRules(nodeid,row){
	if(document.getElementById('ruledata_' + nodeid + row).style.display == 'none'){
		$('.ruledata').hide();
		$('#ruledata_' + nodeid + row).show();
	}
	else{
		$('#ruledata_' + nodeid + row).hide();
	}
}