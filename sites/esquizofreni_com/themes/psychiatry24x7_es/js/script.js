$(document).ready(function(){

		$('.questionaries-form .form-item label.radio').click(function(){
			
			$(this).find('input:radio').attr('checked','true');
			var radio = $(this).find('input:radio');
			var id = radio.attr('id');
		
			var checked = radio.attr('checked');
				
				var arr = id.split('_');
				
				var selectid = arr[0].replace('q','edit-field-question-')+'-value';
				
				for(var i=0;i<2;i++){
					$('#'+arr[0]+'_'+i).attr('checked',false);
					$('#'+arr[0]+'_'+i).parent().removeClass('selected');
				}
				
				if(checked==true){
					radio.attr('checked',true);
					$(this).addClass('selected');
					$('#'+selectid).val(arr[1]);
				}
				else{
					radio.attr('checked',false);
					$(this).removeClass('selected');
					$('#'+selectid).val(arr[1]);
				}	
				
		});
		$("#questionaire-reset").click(function(){
			$('.questionaries-form .form-item input:radio').attr('checked',false);
			$('.questionaries-form .form-item label.radio').removeClass('selected');
			$('.questionaries-form .form-select').val('');			
		});
		$('.questionaries-form .mail-wrapper a').click(function(){
				var mail_body = "";
				$('.questionaries-form span.question').each(function(){
					mail_body += $(this).text() + "\n";
					var span_id = $(this).attr('id');
					var answer = Drupal.t('Not answered')+"\n\n";
					for(var j=1;j<=3;j++){
						if($('#'+span_id+"_"+j).attr('checked')==true){
							answer=$('#'+span_id+"_"+j).parent().text()+"\n\n";
						}
					}
					mail_body += answer;
				});
				$('.questionaries-form .mail-wrapper a').attr('href','mailto:'+$('#mail_address').val()+'?subject=My MARS Scale results&body='+encodeURIComponent(mail_body));
		});
		
		$('.questionaries-form #btn_print').click(function(){
			return process_qustionaire_print();
		});
		$('#btn_submit_print').click(function(){
			$('#block-questionaire-0 .error').remove();
			if($('.questionaries-form label.selected').length<17){
				$('.questionaries-form').before('<div class="error">'+Drupal.t('Please select all the choices to submit the form')+'</div>');
				return false;
			}
			process_qustionaire_print();
		});
		
});


function process_qustionaire_print(){
	var json_data = "{";
    var arr_query = [];    
	$('.questionaries-form span.question').each(function(){
					
					var span_id = $(this).attr('id');
					for(var j=0;j<=1;j++){
						if($('#'+span_id+"_"+j).attr('checked')==true){
								json_data += '"'+span_id+"_"+j+'"'+':'+'"selected",';
								arr_query.push('question_'+span_id+'_'+j+"=selected");
						}
					}
	});
	
	var pos = json_data.lastIndexOf(',');
	json_data = json_data.substring(0,pos);
	
	json_data += "}";
	
	$.ajax({
        url: '/questionaire_form/print',
        method: 'POST',
        data: arr_query.join('&'),
        success: function(data){
			OpenInNewTab('/print/node/260');
			$('.questionaries-form').submit();
		}
      });
	  return true;
}
function OpenInNewTab(url )
{
  var win=window.open(url, '_blank');
}