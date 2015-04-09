/*
*	Ajax form submit for Survey page settings
*/

var survey_page;
var survey_id;
var op;
var render_type;
var output;
var render_text = new Array();
render_text[0] = 'Pop Over';
render_text[1] = 'Inline';
var spid = '';
$(function() {

$("#edit-survey-page-add").click(function() {
	survey_page = $("input[@name='survey_page']").val();
	survey_id = $("#edit-survey-titles").val();
	render_type = $("input[@name='render_type']:checked").val();
	if(render_type != 1) {
		render_type = 0;
	}
	//alert(render_type);
	if(survey_page=='') {
		alert('Enter a valid Page.');
		return false;
	}
	if(survey_id=='0'){
		alert('Select a Survey Question');
		return false;
	}
	try{
		spid = $("input[@name='survey_spid']").val();
	}catch(e){}
	//salert(spid);

	if(spid == '0'){
		op = 'POST';
		data = '&page=' + survey_page + '&survey_id=' + survey_id + '&render_type=' + render_type + '&op=' + op;
	}else{
		op = 'UPDATE';
		data = '&page=' + survey_page + '&survey_id=' + survey_id + '&render_type=' + render_type + '&op=' + op + '&spid=' + spid;
	}
	post_data(data);
	return false;
});
		   });
function post_data(data){
	$("input[@name='survey_page']").val('');
	$("#edit-survey-titles").val(0);
	$("input[@name='survey_spid']").val(0);
	$("input[@name='op']").val('Add');
  $.ajax({type: "POST",url: Drupal.settings.basePath + 'admin/settings/survey/survey-page-settings',data: data,
		 success: function(message){
			 	output = message;
				survey_page_load_list();
			 }});return false;
}

function survey_page_load_list(){
    if(output != '') {
		try{
			$('#0').remove();
		} catch(exception) {}
			switch(op){
				case 'POST':
				if(output == 0){
				  	document.getElementById('surveyStatusMessage').innerHTML = '<font color = "red">Data Already Present</font>';
				} else {
					  document.getElementById('surveyStatusMessage').innerHTML = '<font color = "green">Record Added Successfully.</font>';
                      var tblRow =
                            "<tr id='"+survey_id+"'>"
                            +"<td>"+survey_page+"</td>"
                            +"<td>"+option[survey_id]+"</td>"
                            +"<td>"+render_text[render_type]+"</td>"
                            +"<td><a href='"+ Drupal.settings.basePath + "admin/settings/survey/survey-page-settings/edit/"+output+"'>Edit</a></td>"
                            +"<td><a onclick ='DelConfirm = confirm(\"Are you sure to delete this record?\");if(DelConfirm){return true;}else{return false;}' href='"+ Drupal.settings.basePath + "admin/settings/survey/survey-page-settings/delete/"+output+"'>Delete</a></td>"
                            +"</tr>"
                        $(tblRow).appendTo("#survey_score_add tbody");
				}
				break;

				case 'UPDATE':
                    $('#surveyStatusMessage').html('<font color = "green">Record updated Successfully.</font>');
                    tableRow = document.getElementById(output);
                    td = tableRow.getElementsByTagName("td");
                    td[0].innerHTML=survey_page;
                    td[1].innerHTML=option[survey_id];
                    td[2].innerHTML=render_text[render_type];
                    td[3].innerHTML='<a href="'+ Drupal.settings.basePath + 'admin/settings/survey/survey-page-settings/Edit/'+output+'">Edit</a>';
                    td[4].innerHTML='<a onclick ="DelConfirm = confirm(\'Do you want to delete this record?\');if(DelConfirm){return true;}else{return false;}" href="' + Drupal.settings.basePath + 'admin/settings/survey/survey-page-settings/delete/'+output+'">Delete</a>';
                break;
            case 'DELETE':
                $('#'+survey_id).remove();
            break;
		}
	}
}

$(document).ready(function(){
	if($('#edit-explanation-configure-val-1').length > 0)
		var configuration_val = $('#edit-explanation-configure-val-1').val();
	else
		var configuration_val = $('#edit-explanation-configure-val').val();

	//alert(configuration_val);
	$('.form-radio').each(function() {
		if($(this).attr('checked') == true)  { 
			var click_method = String($(this).attr('onclick'));
			if(click_method.indexOf("{") > -1) {
				var split_method = click_method.split("{");
				var split_method_for_bracket = split_method[1].split(")");
				var split_from_comma = split_method_for_bracket[0].split(",");	
				display_explanation_for_survey($(this),1,configuration_val,Number(split_from_comma[3]));
				change_button_lavel($(this));
					
			} else {
				
				
			}
			if(configuration_val == 1) 
				display_explanation($(this));
			
			enabled_button();
		}
	});
	$('.form-select').each(function() {
		if($(this).attr('multiple') == false) {
			var change_method = String($(this).attr('onchange'));
			var split_method = change_method.split("{");
			if(split_method[1]){
			   var split_method_for_multipath = split_method[1].split(",");

			  var t_name = $.trim(split_method_for_multipath[0].substring(0,12));
			}
			if(t_name == "enabled" || t_name == "enabled_but") {  
				display_explanation($(this));
			} else { 
				if(change_method.indexOf("{") > -1 ) { 
					var split_method_for_bracket = split_method[1].split(")");
					var split_from_comma = split_method_for_bracket[0].split(",");	
					display_explanation_for_survey($(this),Number(split_from_comma[1]),configuration_val,Number(split_from_comma[3]));
					} 
				}
			} else {
				var change_method = String($(this).attr('onclick'));
				var split_method = change_method.split("{");
				if(change_method.indexOf("{") > -1 ) { 
					var split_method_for_bracket = split_method[1].split(")");
					var split_from_comma = split_method_for_bracket[0].split(",");	
					display_explanation_for_survey_for_multiple_box($(this),Number(split_from_comma[1]),configuration_val,Number(split_from_comma[3]));	
				}
			}
	});
		
	$('.form-checkbox').each(function() {
		
		if($(this).attr('checked') == true)  {
			var click_method = String($(this).attr('onclick'));
			if(click_method.indexOf("{") > -1) {
				var split_method = click_method.split("{");
				var split_method_for_bracket = split_method[1].split(")");
				var split_from_comma = split_method_for_bracket[0].split(",");	
				display_explanation_for_survey_for_checkbox($(this),Number(split_from_comma[1]),configuration_val,Number(split_from_comma[3]));
			}
		}
	});	
	if($('#explanation_answer').length > 0 )  {
		enabled_button();
	}
});

function display_explanation_for_survey_for_multiple_box(obj,inc,setting,qid) {
	if(obj.value!=undefined) {
		var id = obj.id;
		var len = document.getElementById(id).length;
		var obj_js = document.getElementById(id);
	} else {
		var id = obj.attr('id');
		var len = document.getElementById(id).length;
		var obj_js = document.getElementById(id);
	}
	for(i=0;i<len;i++) {
		 $('#div_id_'+obj_js.options[i]).remove();
	}
	var div = '';
	for(i=0;i<len;i++) {
		if(obj_js.options[i].selected == true) {
			var serial = i+1;
			var div = div + "<div id='div_id_"+obj_js.options[i].value+"'><strong>"+ serial +" : " + $('#div_id_'+obj_js.options[i].value).html()  +"</strong><br></div>";
		}			
	}
	$('#explanation_of_answer_id_'+inc+'_'+qid).html(div);
}

function check_values(obj) {
		obj.value = obj.value.replace(/[!@#$%^&*()]/ig,'');
		enabled_button();
}

function back_to_list(url,type) {
	if(type == 1)
		window.location.href=url+'/surveytitle';
	else if(type == 2)
		window.location.href=url+'/surveytitle/multipath';
}


function check_values(obj) {
		obj.value = obj.value.replace(/[!@#$%^&*()]/ig,'');
		enabled_button();
}

function enabled_button() {
	if($('#explanation_answer').length > 0 )  {
		if($('.form-radio').length>0)  {
				$('.form-radio').each(function(){
					if($(this).attr('checked') == true) 
						if($('#edit-submit-1').length > 0)
							$('#edit-submit-1').attr('disabled',false);
						if($('#edit-submit').length > 0)
							$('#edit-submit').attr('disabled',false);	
				});
			}  else if($('.form-item').length>0)  {
				if($('#edit-submit-1').length > 0)
					$('#edit-submit-1').attr('disabled',false);
				if($('#edit-submit').length > 0)
					$('#edit-submit').attr('disabled',false);	
			}
	} else {
		if($('#edit-submit-1').length > 0)
			$('#edit-submit-1').attr('disabled',false);
		if($('#edit-submit').length > 0)
			$('#edit-submit').attr('disabled',false);	

	}
}
function display_explanation(obj) {
	$('#explanation_of_answer_id').html($('#div_id_'+obj.value).html());
	if(obj.value == undefined) {
		$('#explanation_of_answer_id').html($('#div_id_'+obj.val()).html());
	} else {
		$('#explanation_of_answer_id').html($('#div_id_'+obj.value).html());
	}

}

function display_explanation_for_survey(obj,inc,setting,qid) {
	if(setting == 1) {
		if(obj.value == undefined) {
			$('#explanation_of_answer_id_'+inc+'_'+qid).html($('#div_id_'+obj.val()).html());
		} else {
			$('#explanation_of_answer_id_'+inc+'_'+qid).html($('#div_id_'+obj.value).html());
		}
	}
}

var serial_number = 1;
function display_explanation_for_survey_for_checkbox(obj,inc,setting,qid) {
	if(obj.value == undefined) {
		var selected_val = obj.val();
		var checked_status = obj.attr('checked');
	//	var check_box_serial_number = obj.val();
	} else {
		var selected_val = obj.value;
		var checked_status = obj.checked;
	}
	
	if(setting == 1) {
		if(checked_status == true) {
			var div = "<div id='div_id_"+selected_val+"'><strong>:" + $('#div_id_'+selected_val).html()  +"</strong><br></div>";
			serial_number++;
			
			$('#explanation_of_answer_id_'+inc+'_'+qid).append(div);
		} else {
				
			serial_number--;
			
			serial_number = Number(serial_number);	
			//$('#explanation_of_answer_id_'+inc+'_'+qid).find('div[id=div_id_'+serial_number+']').each(function(){ $(this).remove(); });

			$('#explanation_of_answer_id_'+inc+'_'+qid).find('div[id=div_id_'+selected_val+']').each(function(){ $(this).remove(); });

			if(serial_number<1)
				serial_number = 1;
		}
	}
}


function change_button_lavel(obj) {
	if(obj.value == undefined) { 
		var id = 'answer_id_'+obj.val();	
	} else  {
		var id = 'answer_id_'+obj.value;	
	}	

	if($('#'+id).val()=='') {
		if($('#edit-submit-1').length>0) {
			$('#edit-submit-1').val('Submit');
		} if($('#edit-submit').length>0) {
			$('#edit-submit').val('Submit');
		}
	} else {
		if($('#edit-submit-1').length>0) {
			$('#edit-submit-1').val('Next');
		} if($('#edit-submit').length>0) {
			$('#edit-submit').val('Next');
		}
	}
}


$(document).ready(function(){
 if(document.survey_name){
	 var labeltype;
     for(i=0; i<document.survey_name.elements.length; i++){		
		 labeltype = 'filter_sel_'+i;
		  $("[@for="+labeltype+"]").css('display','none'); 
		
	 }
  }
});
