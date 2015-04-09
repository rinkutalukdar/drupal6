
// $Id: modalframe_example.js,v 1.1.2.6 2009/06/17 12:54:57 markuspetrux Exp $


/*
*	Funtion for Modal popup
*/
function modelframe_close(){	
     window.parent.$('.modalframe').hide();
     window.parent.$('.ui-dialog-overlay').hide();
     newURL = window.location.protocol + "//" + window.location.host + Drupal.settings.basePath + "surveytitle";
     window.parent.location = newURL;
}

function modalframe_popup_show(strurl, nameOfClass){
	
/*
*	Format the query string and add the render type
*/
	StrToCheck= strurl.replace(/^\s+|\s+$/, '');
	if(StrToCheck.length == 0){
		return false;
	}

	
	var searchRendertype = /renderType=popover/;
	var matchPos1 = strurl.search(searchRendertype);
	
	if(matchPos1 == -1){
		startFrom = strurl.indexOf('?');
		if(startFrom != -1){
			strurl = strurl + '&renderType=popover';	
		}else{
			strurl = strurl + '?renderType=popover';	
		}
	}
    // This is our onSubmit callback that will be called from the child window
    // when it is requested by a call to modalframe_close_dialog() performed
    // from server-side submit handlers.
    function onSubmitCallbackExample(args, statusMessages) {
      // Display status messages generated during submit processing.
      
      if (statusMessages) {
        $('.survey-messages').hide().html(statusMessages).show('slow');
      }

      if (args && args.message) {
        // Provide a simple feedback alert deferred a little.
        setTimeout(function() { alert(args.message); }, 500);
      }
    }

    // Hide the messages are before opening a new dialog.
    $('.survey-messages').hide('fast');
    // Build modal frame options.
	//alert(strurl);
    var modalOptions = {
      url: strurl,
      autoResize: true,
      onSubmit: onSubmitCallbackExample
    };

    // Try to obtain the dialog size from the className of the element.
    var regExp = /^.*survey-size\[\s*([0-9]*\s*,\s*[0-9]*)\s*\].*$/;
    if (typeof nameOfClass == 'string' && regExp.test(nameOfClass)) {
      var size = nameOfClass.replace(regExp, '$1').split(',');
      modalOptions.width = parseInt(size[0].replace(/ /g, ''));
      modalOptions.height = parseInt(size[1].replace(/ /g, ''));
    }
    // Open the modal frame dialog.
    Drupal.modalFrame.open(modalOptions);

    // Prevent default action of the link click event.
    return false;
  	
}

$(function() {
				
				/*	For Result page Redirection	*/
				/*	--Result Page Code Start--	*/			
				$("input[@name='survey_page_redirect']").click(function(){show_survey_redirection_settings(this.value);});
				/*	--Result Page Code Ends--	*/	
				
				
				$("#edit-survey-modalpopup-display").click(function() { 
    				if($("input[@name='survey_modalpopup_display']:checked").val() == 1){
						$("#survey_trigger_popup_divid").show();
						show_individual_modal_settings();
					}else{
						$("#survey_trigger_popup_divid").hide();
						hide_individual_modal_settings();
					}
				});
				
				
				
				/*	For Modal Pop up display method	*/
				/*	--Modal Popup Code Start--	*/
				
				$("input[@name='survey_trigger_popup']").click(function(){show_individual_modal_settings();});
				
				
				/*	--Modal Popup Code Ends--	*/	
				
				
			});


$(document).ready(function(){
	
	/* Page redirection settings on page load */
	if($("input[@name='survey_page_redirect']:checked").val() == 0){
		$("#edit-survey-thanksmessage-wrapper").show();
		$("#survey_redirect_custom_url").hide(); 
		
	}else if($("input[@name='survey_page_redirect']:checked").val() == 2){
		$("#edit-survey-thanksmessage-wrapper").hide(); 
		$("#survey_redirect_custom_url").show(); 
	}else{
		$("#survey_redirect_custom_url").hide(); 
		$("#edit-survey-thanksmessage-wrapper").hide(); 
	}
	/* End */
	
    
	/* Modal popup enabled it show a set of fileds */
	if($("input[@name='survey_modalpopup_display']:checked").val() == 1){
		$("#survey_trigger_popup_divid").show();
		show_individual_modal_settings();
	}else{
		$("#survey_trigger_popup_divid").hide();
		hide_individual_modal_settings();
	}
	/* Ens of modal popup */
	

				
});


function show_individual_modal_settings(){
	/* Modal popup individual settings */
	if($("input[@name='survey_trigger_popup']:checked").val() == 0){
		$("#survey_popup_uievent_divid").show();
		$("#survey_popup_which_class_divid").show();
		$("#survey_popup_amount_of_time_divid").hide(); 
		
	}else if($("input[@name='survey_trigger_popup']:checked").val() == 2){
		$("#survey_popup_uievent_divid").hide();
		$("#survey_popup_which_class_divid").hide();
		$("#survey_popup_amount_of_time_divid").show(); 
	}else{
		$("#survey_popup_uievent_divid").hide();
		$("#survey_popup_which_class_divid").hide();
		
		$("#survey_popup_amount_of_time_divid").hide(); 
	}
	/* End */

}

function hide_individual_modal_settings(){
		$("#survey_popup_uievent_divid").hide();
		$("#survey_popup_which_class_divid").hide();
		$("#survey_popup_amount_of_time_divid").hide(); 

};



/*
*	Start of Page redirect settings call back function
*/

function show_survey_redirection_settings(surveyRedirectSettingsValue){
	switch(surveyRedirectSettingsValue){
	
		case '0':
			$("#edit-survey-thanksmessage-wrapper").show();
			$("#survey_redirect_custom_url").hide(); 
		break;
		
		case '1':
			$("#survey_redirect_custom_url").hide(); 
			$("#edit-survey-thanksmessage-wrapper").hide(); 
		break;
		
		case '2':
			$("#edit-survey-thanksmessage-wrapper").hide();
			$("#survey_redirect_custom_url").show();
		break;
	}
}


/*
*	Function Ends
*/



$(function() {
		   	$(".survey-title-link").click(function() {survey_block_link_callback(this.href);return false;})
});

function survey_block_link_callback(url){
	document.getElementById('survey-title-block').innerHTML = 'Please wait while we process your request...';
	$.ajax({type: "GET",url: url,
		   success: function(message){
			   document.getElementById('survey-title-block').innerHTML = message;
				$(".survey-title-link").click(function() {
														   survey_block_link_callback(this.href);
														   return false;
														   });
				}
			}
	);
	return false;
}


/*
*	Filtered List function
*/
var filteredListKeys=new Array();

function survey_filteredList(id, optionscopy ) {
  // This method removes all of the options from the select list,
  // then adds only the options that match the pattern regexp.
  // It also unselects all of the options.
  var loop=0, index=0, regexp, e;
  var selectObj = $('#filter_sel_'+id).get(0);
  var inputObj = $('#filter_inp_'+id);
  // This variable for In-case sensitive
  var flags = 'i';
  if (selectObj==null || inputObj==null) return false;
  if (!selectObj.options) return false;
  var pattern = inputObj.val();
  //alert($('#filter_sel_'+id).val("4"));
  // Clear the select list so nothing is displayed
  //alert(selectObj.options.length);
  for(listLoop = 0; listLoop<selectObj.options.length; listLoop++){
		filteredListKeys[optionscopy[listLoop]] = selectObj.options[listLoop].value;
  }
  
  selectObj.options.length = 0;

  try {
    // Initialize the regexp
    regexp = new RegExp(pattern, flags);
  } catch(e) {
    return true;
  }

  // Loop through the entire select list and
  // add the matching items to the select list
  for (loop=0; loop < optionscopy.length; loop++) {
    // This is the option that we're currently testing
    var option = optionscopy[loop];
	var optionValue = filteredListKeys[option];
    // Check if we have a match
    if (regexp.test(option)) {
      // We have a match, so add this option to the select list
      // and increment the index
      selectObj.options[index++] = new Option(option, optionValue, false);
		if(option == pattern){
			selectObj.options[0].selected = true;
		}
    }
  }
  return true;
}

function modalframe_popup_hide(strurl){
  // Open the modal frame dialog.
  Drupal.modalFrame.close(false);
  // window.close();
  // Prevent default action of the link click event.
  return false;
}