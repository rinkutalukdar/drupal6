$(document).ready(function(){

		$('.mob-header .main-nav .menu').click(function(){
			if($(this).hasClass('on')){
				$(this).removeClass('on');
				$('.mob-header .main-nav ul').hide();
			}
			else{
				$(this).addClass('on');
				$('.mob-header .main-nav ul').show();
			}
		});
		$('.zoom-obj img').mouseover(function(){
			$(this).animate({height:'79px', top:'-4', left:'-25'},'fast');
		});
		$('.zoom-obj img').mouseout(function(){
			$(this).animate({height:'70px', top:'0', left:'0'},'fast');
		});
		
		$('.questionaries-form .form-item input:radio').click(function(){
				var id = $(this).attr('id');
				var checked = $(this).attr('checked');
				var arr = id.split('_');
				for(var i=1;i<=3;i++){
					$('#'+arr[0]+'_'+i).attr('checked',false);
					$('#'+arr[0]+'_'+i).parent().removeClass('selected');
				}
				var elem = $(this).parent();
				if(checked==true){
					$(this).attr('checked',true);
					$(elem).addClass('selected');
				}
				else{
					$(this).attr('checked',false);
					$(elem).removeClass('selected');
				}
		});
		$("#questionaire-reset").click(function(){
			$('.questionaries-form .form-item input:radio').attr('checked',false);
			$('.questionaries-form .form-item label.radio').removeClass('selected');			
		});
		$('.questionaries-form .mail-wrapper a').click(function(){
				var mail_body = "";
				$('.questionaries-form span.question').each(function(){
					mail_body += $(this).text() + "\n";
					var span_id = $(this).attr('id');
					var answer = Drupal.t('Not answered')+"\n\n";
					for(var j=1;j<=3;j++){
						if($('#'+span_id+"_"+j).attr('checked')==true){
							//alert($('#'+span_id+"_"+j).attr('id'));
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
		
		$('a.expand-link').click(function(){
			//alert('clicked');
			//$("#POP").animate({top:0},"slow");
			$(this).hide();
			$('form.write-frnd').show('slow', function() {
				$('form.write-frnd').animate({bottom:0},"slow");
			});
		});
		$('.write-to-frnd-container input:radio').click(function(){
			var label_radio = $(this).parent();
			$('.write-to-frnd-container input:radio').each(function(){
				$(this).attr('checked',false);
				$(this).parent().removeClass('selected');
			})
			if($(label_radio).hasClass('selected')){
				//alert($(this).attr('class'));
				$(label_radio).removeClass('selected');
				$(this).attr('checked')=false;
				//alert($(this).find('input').attr('id'));
			}
			else{
				
				$(label_radio).addClass('selected');
				$(this).attr('checked')=true;
			}
		});
		
		$(".write-to-frnd-container #your_name").val(Drupal.t('Please enter your name'));
		$(".write-to-frnd-container #your_name").focus( function() {
			if (Drupal.t("Please enter your name") == this.value){
				this.value = '';
			}
		});
		$(".write-to-frnd-container #your_name").blur( function() {
			if (this.value == '') {
				this.value = Drupal.t("Please enter your name");
			}
		});
		$(".write-to-frnd-container #friend_name").val(Drupal.t('Please enter your friend\'s name'));
		$(".write-to-frnd-container #friend_name").focus( function() {
			if (Drupal.t("Please enter your friend's name") == this.value){
				this.value = '';
			}
		});
		$(".write-to-frnd-container #friend_name").blur( function() {
			if (this.value == '') {
				this.value = Drupal.t("Please enter your friend's name");
			}
		});
		$(".write-to-frnd-container #friend_email").val(Drupal.t('Please enter your friend\'s email'));
		$(".write-to-frnd-container #friend_email").focus( function() {
			if (Drupal.t("Please enter your friend's email") == this.value){
				this.value = '';
			}
		});
		$(".write-to-frnd-container #friend_email").blur( function() {
			if (this.value == '') {
				this.value = Drupal.t("Please enter your friend's email");
			}
		});
		$(".write-to-frnd-container #your_message").val(Drupal.t('Please enter a suitable message (no swear words or drug names please)'));
		$(".write-to-frnd-container #your_message").focus( function() {
			if (Drupal.t("Please enter a suitable message (no swear words or drug names please)") == this.value){
				this.value = '';
			}
		});
		$(".write-to-frnd-container #your_message").blur( function() {
			if (this.value == '') {
				this.value = Drupal.t("Please enter a suitable message (no swear words or drug names please)");
			}
		});
		$('.user-input-form').hide();
		
		$('.you-and-your-meds').wrapAll('<a href="/you-and-your-meds"></a>');
		$('.digital-diary').wrapAll('<a href="/digital-diary"></a>');
		$('.getting-better').wrapAll('<a href="/getting-better"></a>');
		$('.node/247').wrapAll('<a href="/node/247"></a>');
		$('.Desktop-wallpaper').wrapAll('<a href="/Desktop-wallpaper"></a>');
		$('.patient-arts').wrapAll('<a href="/patient-arts"></a>');
		$('.music-sharing').wrapAll('<a href="/music-sharing"></a>');
		$('.story').wrapAll('<a href="/story"></a>');
		$('.breakthroughmhart').wrapAll('<a href="http://breakthroughmhart.com"></a>');
		$('.different-treatments').wrapAll('<a href="/different-treatments"></a>');
		
		$('.send-multiple').click(function(){
			$('.multi-frnd-pop, .pop-shaded-bg').show();
			if($('#friend_name').val() != Drupal.t('Please enter your friend\'s name') && $('#friend_email').val() != Drupal.t('Please enter your friend\'s email')){
				$('#mark-in-space-frnd-0').val($('#friend_name').val());
				$('#mark-in-space-frnd-email-0').val($('#friend_email').val());
			}
		});
		$('#send-multi-cancel').click(function(){
			$('.multi-frnd-pop, .pop-shaded-bg').hide();
			$('.multi-frnd-pop').hide();
			
		});
		$('#send-multi-done').click(function(){
			
			$('#friend_email').val($('#mark-in-space-frnd-email-0').val());
			$('#friend_name').val($('#mark-in-space-frnd-0').val());
			
			var txt="";
			var count=0;
			for($i=0;$i<6;$i++){
				if($('#mark-in-space-frnd-'+$i).val()!="" && $('#mark-in-space-frnd-email-'+$i).val()!=""){
					txt += '<span class="markinspace-frnd-sent">'+$('#mark-in-space-frnd-'+$i).val()+'</span>';
					count++;
				}
			}
			
			if(count>1){
				$('#friend-email-ctr label').hide();
				$('#friend-email-ctr #friend_email').hide();
				$('#friend-name-ctr label').text(Drupal.t('Sending to...'));
				$('#friend-name-ctr #friend_name').hide();
				$('#friend-name-ctr .markinspace-frnd-send-ctr').html(txt);
				$('#friend-name-ctr .markinspace-frnd-send-ctr').show();
			}
			else{
				$('#friend-name-ctr label').text(Drupal.t('Your friend\'s name'));
				$('#friend-email-ctr label').show();
				$('#friend-email-ctr #friend_email').show();
				$('#friend-name-ctr #friend_name').show();
				$('#friend-name-ctr .markinspace-frnd-send-ctr').hide();
				if(count==0){
					$('#friend-name-ctr #friend_name').val(Drupal.t('Please enter your friend\'s name'));
					$('#friend-email-ctr #friend_email').val(Drupal.t('Please enter your friend\'s email'));
				}
			}
			
			$('.multi-frnd-pop, .pop-shaded-bg').hide();
			$('.multi-frnd-pop').hide();
		});
});


function process_qustionaire_print(){
	var json_data = "{";
        
	$('.questionaries-form span.question').each(function(){
					
					var span_id = $(this).attr('id');
					for(var j=1;j<=3;j++){
						if($('#'+span_id+"_"+j).attr('checked')==true){
								json_data += '"'+span_id+j+'"'+':'+'"selected",';
						}
					}
	});
	var pos = json_data.lastIndexOf(',');
	json_data = json_data.substring(0,pos);
	
	json_data += "}";
	
	$.ajax({
        url: '/questionaire/print',
        method: 'POST',
        data: "json="+json_data,
        success: function(data){
			OpenInNewTab('/print/you-and-your-meds');
		}
      });
	  return true;
}
function OpenInNewTab(url )
{
  var win=window.open(url, '_blank');
  win.focus();
}