// $Id: survey.js,v 1 2010/11/03 18:25:28 rabith Exp $

/**
 * @file survey.js
 * * Handles survey form submission and validation.
 */
  $(document).ready(function()
  {
    $('.webform-client-form .form-radios .question').remove();
    $('.webform-client-form .form-checkboxes .question').remove();
    $('#homepage-surveyform .form-required').remove();
     $('#hsurvey_right .webform-client-form .form-required').remove();

     var base =window.location.href;
   url_arr = base.split('/');
   if(url_arr[2] == 'localhost'){
     var basePath = url_arr[0]+'//localhost/'+url_arr[3]+'/';//For local systems
   }else{
    var basePath = url_arr[0]+'//'+url_arr[2]+'/'; //For production servers
   }

  if(url_arr[url_arr.length-1] == 'user-survey'){
   $(".webform-client-form").addClass("webform-client-form-survey");
  }
   if(url_arr[url_arr.length-2]== 'sid' &&  url_arr[url_arr.length-1] !=''){
    //$('#block-menu_block_split-0 .expanded .last a').addClass('active');

	$("#block-menu_block_split-0 .content .menu li.expanded .menu li a").each(function() {
	       if($(this).html() == 'Results'){
	       $(this).addClass('active');
	       }
		})


   }
   //if(url_arr[url_arr.length-1] == 'relapse'){
  /*    	$("#block-menu_block_split-0 .content .menu li a").each(function() {
      		//alert($(this).html());
	       if($(this).html() == 'Survey'){
	    	   $(this).parent().addClass('survey');
	       }
		});
*/
	//}
  });



/*
*survey home ajax submit
*/
/*
 $("input[@name*='submitted']").click(function(){
     var base =window.location.href;
   url_arr = base.split('/');
   if(url_arr[2] == 'localhost'){
     var basePath = url_arr[0]+'//localhost/'+url_arr[3]+'/';//For local systems
   }else{
    var basePath = url_arr[0]+'//'+url_arr[2]+'/'; //For production servers
   }
if(url_arr[url_arr.length-1] != 'user-survey'){
	 var qstn = $("input[@name*='submitted']:checked").attr('name');
	 qstnArra = qstn.split('[');
	 qstnStr = qstnArra[1].split(']')
	  var first_ans=  $("input[@name*='submitted']:checked").val();


	      $.ajax({
	          type: 'POST',
	          data: "first_qstnAns="+qstnStr[0]+'~*~*~'+first_ans,
	          url: basePath+'homesurvey',
	          global: true,
	          async:false,
	          success: function (content) {
	                if(content == 1) { //success
	                  window.location=basePath+'user-survey';
	                  } else {
	               		flag = 0;
	               		$('.survey_error').addClass('error');
	               		$('.survey_error').html('You have already submitted this form ');
	                  }
	          }
	     });
}

  });
*/
  function HomeSurveyValidate(){
  //base path
     var base =window.location.href;
   url_arr = base.split('/');
   if(url_arr[2] == 'localhost'){
     var basePath = url_arr[0]+'//localhost/'+url_arr[3]+'/';//For local systems
   }else{
    var basePath = url_arr[0]+'//'+url_arr[2]+'/'; //For production servers
   }
   //end
   var flag = 0;
   	      $.ajax({
          type: 'POST',
          url: basePath+'homesurvey',
          global: true,
          async:false,
          success: function (content) {
                if(content == 1) { //success
                  //window.location=basePath+'user-survey';
                  flag = 1;
                  } else {
               		flag = 0;
               		$('.survey_error').addClass('error');
               		$('.survey_error').html('You have already submitted this form ');
               		flag = 0;
                  }
          }
     });

     if(flag == 1 ) {
     	return true;
     } else {
     	return false;
     }

  }

/*
*Graph popup function  //error in ie
*/

  function show_graph(sid){
    var data = $("#syrvey_graph_"+sid).html();
   var title = $("#qst_"+sid).html();
   var new_title = wordwrap(title, 60, '<br/>\n');
   $('#dialog').html(data);
   $('#dialog .graph_option').show();
   $('#dialog td').css('padding-right','20px');
   $('#dialog .magnifier').css('display','none');
   $('#dialog .popupGraph').css('display','none');
   $('#dialog .popupGraph_bigger').css('display','block');

   $("#dialog").dialog({
        modal: true,
        minHeight: 300,
        minWidth: 500,
 	    title: '<span style="color:#E2C169;font-size:1em;font-weight:bold;line-height:20px;">Q.<br /></span>'+new_title,
        resizable: false,
        overlay : {
            opacity: 0.7,
            background: "black"
        }
    });
  }

/*
*
*/
  function webform_validate(){
  $('#edit-field-expiry-date-0-value-wrapper .error').remove();
  var flag = 0;
  if ($("#edit-field-active-value").attr('checked')===true) {
 //compare current date with expiry date
  var myDate=new Date();
  date_arr = $("#edit-field-expiry-date-0-value-datepicker-popup-0").val().split('-');
  myDate.setFullYear(date_arr[0],date_arr[1]-1,date_arr[2]);
  var today = new Date();
  if (myDate<today)//failure
   {
    $('#edit-field-expiry-date-0-value-wrapper').append("<div class='feildRequired error'>Expiry Date should be greater then or equal to current date.</div>");
    return false;
   }else{
      $('#edit-field-expiry-date-0-value-wrapper .error').remove();
   }
//de-activate other survey
   var base =window.location.href;
   url_arr = base.split('/');
   if(url_arr[2] == 'localhost'){
     var basePath = url_arr[0]+'//localhost/'+url_arr[3]+'/';//For local systems
   }else{
    var basePath = url_arr[0]+'//'+url_arr[2]+'/'; //For production servers
   }
       $.ajax({
          type: 'POST',
          url: basePath+'surveydeactivate',
          global: true,
          async:false,
          success: function (content) {
                if(content == 1) { //success
                    flag = 1;
                  } else {
               		flag = 0;
                  }
          }
     });

   }else{
   flag = 1;
   }

  if(flag == 1 ) {
	return true;
  } else {
	return false;
  }


  }

function wordwrap( str, width, brk, cut ) {

    brk = brk || '\n';
    width = width || 75;
    cut = cut || false;

    if (!str) { return str; }

    var regex = '.{1,' +width+ '}(\\s|$)' + (cut ? '|.{' +width+ '}|.+$' : '|\\S+?(\\s|$)');

    return str.match( RegExp(regex, 'g') ).join( brk );

}





