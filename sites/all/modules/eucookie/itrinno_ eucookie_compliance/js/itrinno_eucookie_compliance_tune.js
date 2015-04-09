//var baseURL;

Drupal.behaviors.eu_cookie_extra_tuner = function (context) {
//alert('hii'+Drupal.settings.eu_cookie_extra_tune.module_path);
  // To set defaul yes/no button default value
  var level = $.cookie("cookie-compliance-accepted-level", { path : '/'});  
  if ( level == null ) {
	//alert(Drupal.settings.eu_cookie_extra_tune.site_impact_level + '--level');
	if (Drupal.settings.eu_cookie_extra_tune.site_impact_level == 1){ // implied consent
	  level = 2;
	}
	else if (Drupal.settings.eu_cookie_extra_tune.site_impact_level == 2){ // explicit consent
	  level = 0;
	}
	$.cookie('cookie-compliance-accepted-level', level, {path: '/' });
  }
 //----------------- 
  var setVal = 0;  
  var consent_info = 0;   
  // whether there are any cookie compliance needed
  if ( Drupal.settings.eu_cookie_extra_tune.site_impact_level > 0 &&  Drupal.settings.eu_cookie_extra_tune.site_impact_level <= 2 ) {
    //--------- Dont show banner if user gives feedback -------- //
	var user_response = $.cookie("cookie-compliance-user-response", { path : '/'});
	
	if ( user_response != 1 ) {	
	consent_info = 1; // user never responded
	// COUNTRY SPECIFIC EXPLICIT CONSENT (highest priority)    
	if ( Drupal.settings.eu_cookie_extra_tune.country_specific_match == true ) {
	  //consent_info = 1; 	
      if ( Drupal.settings.eu_cookie_extra_tune.site_impact_level > Drupal.eu_cookie_extra_tune.getStatus() ) {		  
        //IF POP UP ENABLED SHOW POP UP
	    if ( Drupal.settings.eu_cookie_extra_tune.popup_enabled == 1 || (Drupal.settings.eu_cookie_extra_tune.country_popup_match == true ) ) {
          Drupal.eu_cookie_extra_tune.popup( Drupal.settings.eu_cookie_extra_tune.country_specific_explicit_consent, false);     
	    //ELSE SHOW BANNER
	    } else {
	      Drupal.eu_cookie_extra_tune.banner( Drupal.settings.eu_cookie_extra_tune.country_specific_explicit_consent );
		  clear_all_cookies(0);
		  }
	  }
	  
    } else if ( Drupal.settings.eu_cookie_extra_tune.country_specific_exist == false ) { 
      
	  // PAGE SPECIFIC EXPLICIT CONSENT OR EXPLICIT SITE LEVEL IMPACT and VISITOR ACCEPTED LEVEL LESS THAN 2  
      if ( ( Drupal.settings.eu_cookie_extra_tune.explicit_page == true || Drupal.settings.eu_cookie_extra_tune.site_impact_level == 2 )
	    && Drupal.eu_cookie_extra_tune.getStatus() < 2 ) { 
		//consent_info = 1; 
		
		//IF POP UP ENABLED SHOW POP UP
        if ( Drupal.settings.eu_cookie_extra_tune.popup_enabled == 1 ) {
          Drupal.eu_cookie_extra_tune.popup( Drupal.settings.eu_cookie_extra_tune.page_explicit_consent, false );
		  clear_all_cookies(0);
		//ELSE SHOW BANNER
		} else {
		  Drupal.eu_cookie_extra_tune.banner( Drupal.settings.eu_cookie_extra_tune.page_explicit_consent );     
		  clear_all_cookies(0);
		  
	    }
	  // ELSE IMPLIED SITE IMPACT LEVEL
      } else { 
	    
		//IF NO CONSENT FROM VISITOR
        //if (  Drupal.eu_cookie_extra_tune.getStatus() == 0  ) { 
		  //consent_info = 1; 		
		  //IF POP UP ENABLED SHOW POP UP
          if ( Drupal.settings.eu_cookie_extra_tune.popup_enabled == 1 ) {
            Drupal.eu_cookie_extra_tune.popup( Drupal.settings.eu_cookie_extra_tune.first_visitor_entry, false );
			// to hide close buttton...
			$('#popup-close').html('');
			$('#close-modal').click(function (e) {				
				close_popup();				
			});
			// Load dialog on click
			
	      //ELSE SHOW BANNER
		  } else {
	        Drupal.eu_cookie_extra_tune.banner( Drupal.settings.eu_cookie_extra_tune.first_visitor_entry );
		//	alert('im 1111');
			clear_all_cookies(0);
	      }
        //}  
      }
    }
	}
	//--------- Dont show banner if user gives feedback -------- //
    //CHANGE COOKIE COMPLIANCE LEVEL SHOW WHEN BOTH IMPLIED N EXPLICIT INFO ARE NOT VISIBLE
    //if ( Drupal.settings.eu_cookie_extra_tune.country_specific_consent == false && $.cookie('cookie-compliance-accepted-level') != null && Drupal.settings.eu_cookie_extra_tune.explicit_page == false )     
    if ( consent_info == 0 ){	   
		var cookie_panel_fontcolor = Drupal.settings.eu_cookie_extra_tune.cookie_panel_fontcolor;
		var cookie_panel_bgcolor = Drupal.settings.eu_cookie_extra_tune.cookie_panel_bgcolor;
		$('.change-cookie-settings a').css({"color" : cookie_panel_fontcolor});
		$('.change-cookie-settings').css({"background-color" : cookie_panel_bgcolor}).css('display','block');
		if(Drupal.settings.eu_cookie_extra_tune.cookie_panel_show_in_footer==1){
			$('.change-cookie-settings').css('visibility','hidden');
		}else{
			$('.change-cookie-settings').removeAttr('visibility');
		}
    }
  }
  $('#eu_cookie_compliance_table tr.even').css({"background-color" : Drupal.settings.eu_cookie_extra_tune.third_party_bgcolor});
  $('#eu_cookie_compliance_table tr.odd').css({"background-color" : Drupal.settings.eu_cookie_extra_tune.third_party_bgcolor});
  $('#eu_cookie_compliance_table tr.even p').css({"color":Drupal.settings.eu_cookie_extra_tune.third_party_fontcolor});
  $('#eu_cookie_compliance_table tr.odd p').css({"color":Drupal.settings.eu_cookie_extra_tune.third_party_fontcolor});
  
  $('#eu_cookie_compliance_table td.eu-cookie-compliance-cat-txt1').addClass(Drupal.settings.eu_cookie_extra_tune.third_party_fontstyles)
	.addClass(Drupal.settings.eu_cookie_extra_tune.third_party_fontsize)
	.addClass(Drupal.settings.eu_cookie_extra_tune.third_party_fontweight);
  $('#eu_cookie_compliance_table td.eu-cookie-compliance-cat-txt').addClass(Drupal.settings.eu_cookie_extra_tune.third_party_fontstyles)
	.addClass(Drupal.settings.eu_cookie_extra_tune.third_party_fontsize);
	$('#eu_cookie_compliance_table td.eu-cookie-compliance-purpose-txt').addClass(Drupal.settings.eu_cookie_extra_tune.third_party_fontstyles)
	.addClass(Drupal.settings.eu_cookie_extra_tune.third_party_fontsize);
	$('#eu_cookie_compliance_table td.eu-cookie-compliance-expire-txt').addClass(Drupal.settings.eu_cookie_extra_tune.third_party_fontstyles)
	.addClass(Drupal.settings.eu_cookie_extra_tune.third_party_fontsize);
	$('#eu_cookie_compliance_table td.eu-cookie-compliance-block-txt').addClass(Drupal.settings.eu_cookie_extra_tune.third_party_fontstyles)
	.addClass(Drupal.settings.eu_cookie_extra_tune.third_party_fontsize);
  
  
  
  $('#warning-popup .popup-content #popup-text p').each(function(){
	$(this).addClass(Drupal.settings.eu_cookie_extra_tune.cookie_banner_fontstyles)
	.addClass(Drupal.settings.eu_cookie_extra_tune.cookie_banner_fontsize)
	.addClass(Drupal.settings.eu_cookie_extra_tune.cookie_banner_fontweight);
  });
  $('#cookieWrapper').parent().parent().css({"background-color" : Drupal.settings.eu_cookie_extra_tune.cookie_panel_popup_bgcolor});
  $('#cookieWrapper .cookiePop p').css({"color":Drupal.settings.eu_cookie_extra_tune.cookie_panel_popup_fontcolor}).addClass(Drupal.settings.eu_cookie_extra_tune.cookie_panel_popup_fontsize).addClass(Drupal.settings.eu_cookie_extra_tune.cookie_panel_popup_fontstyles);
  $("table.tbl_cookie_settings").css({"color":Drupal.settings.eu_cookie_extra_tune.cookie_panel_popup_fontcolor}).addClass(Drupal.settings.eu_cookie_extra_tune.cookie_panel_popup_fontsize).addClass(Drupal.settings.eu_cookie_extra_tune.cookie_panel_popup_fontstyles);
  $("table.tbl_e3rd_cookie_settings").css({"color":Drupal.settings.eu_cookie_extra_tune.cookie_panel_popup_fontcolor}).addClass(Drupal.settings.eu_cookie_extra_tune.cookie_panel_popup_fontsize).addClass(Drupal.settings.eu_cookie_extra_tune.cookie_panel_popup_fontstyles).addClass(Drupal.settings.eu_cookie_extra_tune.cookie_panel_popup_fontweight);
  $("#cookieFooter p.cookiePanelWarning").css({"color":Drupal.settings.eu_cookie_extra_tune.cookie_panel_popup_fontcolor}).addClass(Drupal.settings.eu_cookie_extra_tune.cookie_panel_popup_fontsize).addClass(Drupal.settings.eu_cookie_extra_tune.cookie_panel_popup_fontstyles).addClass(Drupal.settings.eu_cookie_extra_tune.cookie_panel_popup_fontweight);
  /*$('#cookieWrapper').each(function(){
	$(this).addClass(Drupal.settings.eu_cookie_extra_tune.cookie_banner_fontstyles)
	.addClass(Drupal.settings.eu_cookie_extra_tune.cookie_banner_fontsize)
	.addClass(Drupal.settings.eu_cookie_extra_tune.cookie_banner_fontweight);
  });*/
  if(Drupal.settings.eu_cookie_extra_tune.cookie_banner_overlay==0){
	$("div#warning-popup").css('position','relative');
  }
  if(Drupal.settings.eu_cookie_extra_tune.show_as_page==0){
	$('.cookie-panel-link').attr("href",'javascript:void(0);');
  }
	$('.cookie-panel-link').click(function(){
		displaymodal();
	});
}

Drupal.eu_cookie_extra_tune = {};

Drupal.eu_cookie_extra_tune.popup = function ( html, type) {
  if(!ifInIframe()){
	displaymodal_html(html, type);
  }
  // to solve double click issue in pop up only 
	if(Drupal.settings.eu_cookie_extra_tune.show_as_page==0){  
	  $('#cookie-panel').click(function (e) {		
		displaymodal();             			
		return false;
	  });
	}
  $('#close-modal').click(function (e) {		
	window.parent.jQuery.modal.close();             			
	return false;
  });
  //var cookie_panel_link =  $('#lb_container') .html();
  //$('#explicit_consent_lb_container') .html(cookie_panel_link);
}

Drupal.eu_cookie_extra_tune.banner = function (html) {
 if(!ifInIframe()){
	  var position = 'bottom';
	  var fontcolor = Drupal.settings.eu_cookie_extra_tune.fontcolor;
	  var bgcolor = Drupal.settings.eu_cookie_extra_tune.bgcolor;
	  var opacity = Drupal.settings.eu_cookie_extra_tune.transparency;
	  var cookie_panel_fontcolor = Drupal.settings.eu_cookie_extra_tune.cookie_panel_fontcolor;
	  var cookie_panel_bgcolor = Drupal.settings.eu_cookie_extra_tune.cookie_panel_bgcolor;
	  
	  var bannerhtml = $(html)    
		.attr({"id": "warning-popup"})	
		.css({"background-color" : bgcolor, "opacity" : opacity})	
		//.height(Drupal.settings.eu_cookie_extra_tune.height+'px')
		.hide();   
		$('warning-popup #close').hide();   
		if(Drupal.settings.eu_cookie_extra_tune.bar_position != 1) {       
		  bannerhtml.prependTo('body');	 
		  var height = bannerhtml.height();	
		  bannerhtml.show()
			.attr({"class": "sliding-popup-top"})
			.css({"top": -1 * height})
			.animate({top: 0}, 0.5);		
		} else {	
		  bannerhtml.appendTo('body');
		  height = bannerhtml.height();	  
		  bannerhtml.show()
			  .attr({"class": "sliding-popup-bottom"})
			  .css({"bottom": -1 * height})
			  .animate({bottom: 0}, 0.5);
		}	
	  $('#warning-popup #popup-text p').css({"color":fontcolor});
	  var cookie_panel_link =  $('#lb_container') .html(); 
	  $('#explicit_consent_lb_container') .html(cookie_panel_link);
	  
	  /* Code for fading out the banner after 20 sec */ 
	  /* start */
	   //alert(Drupal.settings.eu_cookie_extra_tune.site_impact_level);
	   /* To apply the fadeout feature for only implicit banner */
	  if ( (Drupal.settings.eu_cookie_extra_tune.site_impact_level == 1) && ( Drupal.settings.eu_cookie_extra_tune.explicit_page == false )) {
	  
		  // to check the fadout cookie value
		  if ( ($.cookie('cookie-compliance-fadeout-response') != 1) ) {
			  /*var t=setTimeout(function(){
			  //alert('12111');
			  
				  bannerhtml.show().slideUp(2500);
				  $.cookie('cookie-compliance-fadeout-response', 1, { expires: 10, path: '/' });
				  $.cookie('cookie-compliance-accepted-level', 2, { expires: 30, path: '/' });
				  $.cookie('cookie-compliance-user-response', 1, { expires: 30, path: '/' });  
					   setTimeout(function(){
					   
						$('.change-cookie-settings a').css({"color" : cookie_panel_fontcolor});
						$('.change-cookie-settings').css({"background-color" : cookie_panel_bgcolor}). show () . slideDown(4000);
					   },3000);
				  },20000);*/
			}
				/* End */
		  else {
			  $('.change-cookie-settings a').css({"color" : cookie_panel_fontcolor});
			  $('.change-cookie-settings').css({"background-color" : cookie_panel_bgcolor}). show () . slideDown(4000);
			  bannerhtml.hide();
		   }		
			
		 }
	}
}

Drupal.eu_cookie_extra_tune.setCookie = function(status) {
//alert('status'+status);
  if(status == 0) {
    clear_all_cookies(status);
	$.cookie('cookie-compliance-accepted-level', status, { path: '/' });
	//$.cookie('cookie-compliance-user-response', 1, { expires: -10, path: '/' });  
  }
  else {
    clear_all_cookies(status);
    $.cookie('cookie-compliance-accepted-level', status, {expires: 30, path: '/' })
	$.cookie('cookie-compliance-user-response', 1, { expires: 30, path: '/' });;
  }
}
// Call this function to know visitors choice on cookie compliance level
Drupal.eu_cookie_extra_tune.getStatus = function() {
  //var level = $.cookie("cookie-compliance-accepted-level");
  var level = $.cookie("cookie-compliance-accepted-level", { path : '/'});
  //alert('level'+level);
  if ( level == null ) return 0;
  
    else return level;  
}

// Call this function to know visitors choice on cookie compliance level
Drupal.eu_cookie_extra_tune.isCookieDenied = function(denied_key) {
  //var level = $.cookie("cookie-compliance-accepted-level");
  // To disable third party script at the basic of user settings
  var tp_denied_str = $.cookie('tp_denied_str');
  var tp_denied_arr = tp_denied_str . split(",");    
  var ind = $.inArray(denied_key, tp_denied_arr);
  if(ind >=0) return 1 ;
  return 0;       
}
function close_popup() {
  $('#warning-popup').hide(); 
  //Drupal.eu_cookie_extra_tune.setCookie(1);
  $.cookie('cookie-compliance-user-response', 1, { expires: 10, path: '/' });
  location.reload();
}

function agree_popup() {
  $('#warning-popup').hide(); 
  Drupal.eu_cookie_extra_tune.setCookie(2);
  $.cookie('cookie-compliance-user-response', 1, { expires: 10, path: '/' });
  location.reload();
}

function displaymodal(){

  	$.modal.close();	
	/*$('#cp_container').modal( {		
		closeHTML:'closeHTML:<div style="float:right; position: absolute; height: 20px; width:98%;"><a id="close-modal" style="float:right;" href="javascript:void(0);" onclick="window.parent.jQuery.modal.close();"><img src="'+ Drupal.settings.eu_cookie_extra_tune.module_path +'/images/close-button-small.png" alt="Close"></a></div>',
		containerCss: {
			backgroundColor:"#fff",
			borderColor:"#fff",
			maxHeight: '80%',
			padding:0,
			width:'100%',
			overflow: 'auto'
		},
		overlayClose:true,
		escClose: true		
	});*/
	$.modal('<iframe src="/cookie-settings-panel" height="600px" width="1010px" style="border:0">', {
		closeHTML:'closeHTML:<div style="float:right; position: absolute; height: 20px; width:98%;"><a id="close-modal" style="float:right;" href="javascript:void(0);" onclick="window.parent.jQuery.modal.close();"><img src="'+ Drupal.settings.eu_cookie_extra_tune.module_path +'/images/close-button-small.png" alt="Close"></a></div>',
		containerCss: {
			backgroundColor:"#fff",
			borderColor:"#fff",
			maxHeight: '80%',
			padding:0,
			width:'100%',
			overflow: 'auto'
		},
		overlayClose:true,
		escClose: true		
	});
}

function displaymodal_html( html, warning ){
	$.modal.close(); 	
	// Assign html for the popup div
	$("#modal-container").html(html);	
	$('#modal-container').modal( {		
		closeHTML:'closeHTML:<div style="float:right; position: absolute; height: 20px; width:98%;"><a id="close-modal" style="float:right;" href="javascript:void(0);" onclick="window.parent.jQuery.modal.close();agree_popup();"><img src="'+ Drupal.settings.eu_cookie_extra_tune.module_path +'/images/close-button-small.png" alt="Close"></a></div>',
		containerCss:{
			backgroundColor:Drupal.settings.eu_cookie_extra_tune.cookie_popup_bgcolor,
			borderColor:"#fff",
			height:'20%',
			padding:0,
			width:'80%'
		},
		overlayClose:true,
		escClose: true,
		onClose: function(e){
		 if (warning == true )
		    location.reload();
		  // return false;
		}
	});
	$('#modal-container p').css('color',Drupal.settings.eu_cookie_extra_tune.cookie_popup_fontcolor);
	$('#modal-container p').each(function(){
		$(this).addClass(Drupal.settings.eu_cookie_extra_tune.cookie_popup_fontstyles)
		.addClass(Drupal.settings.eu_cookie_extra_tune.cookie_popup_fontsize)
		.addClass(Drupal.settings.eu_cookie_extra_tune.cookie_popup_fontweight);
	});
}

function clear_all_cookies(status){

 //alert('calling clear all cookies');
	//var cookies = document.cookie.split(";");
	//for (var i = 0; i < cookies.length; i++){
	//	setCookie(cookies[i].split("=")[0],"",-1);
	//}
	//alert(Drupal.settings.baseURL+'/clear_all_cookies');
	$.ajax({
        url: '/clear_all_cookies',
        method: 'GET',
        data: "status="+status,
		success: function(data){
		}
	});

}

$(document).ready(function() {
	baseURL = Drupal.settings.baseURL;
  var setVal = 0;
  if( Drupal.eu_cookie_extra_tune.getStatus() == 2 ) {
    $('#yes1').attr('checked', true);
    $('#yes2').attr('checked', true);
  }
  if( Drupal.eu_cookie_extra_tune.getStatus() == 1 ) {
   // set_cookies_timeInterval();
    $('#yes1').attr('checked', true);
	$('#no2').attr('checked', true );
  }
  if( Drupal.eu_cookie_extra_tune.getStatus() == 0 ) {
    //clear_all_cookies(0);
    $('#no1').attr('checked', true);
	$('#no2').attr('checked', true );
  }
  //alert(Drupal.eu_cookie_extra_tune.getStatus());
   
  // IF COOKIE PANEL AND COMPLIANCE AGREED

  $('.agree-button').click(function(){   
	
	$.cookie('cookie-compliance-user-response', 1, { path: '/' });  
	if ( $('#yes1').is(':checked') ) setVal = 1;		
	if ( $('#yes2').is(':checked') ) setVal = 2;
	
	Drupal.eu_cookie_extra_tune.setCookie(setVal);
	//alert('status val='+Drupal.eu_cookie_extra_tune.getStatus()+'explicit='+Drupal.settings.eu_cookie_extra_tune.explicit_page);
   //if ( Drupal.settings.eu_cookie_extra_tune.explicit_page == >= Drupal.settings.eu_cookie_extra_tune.site_impact_level )	
     //Drupal.settings.eu_cookie_extra_tune.explicit_page == false &&
    if ( Drupal.eu_cookie_extra_tune.getStatus() < 2){
	
      Drupal.eu_cookie_extra_tune.popup( Drupal.settings.eu_cookie_extra_tune.explicit_functional_warning, true );
	  }else{  	
	   // accepted both type of cookies
	   if(ifInIframe()){
			parent.location.reload();
	   }else{
			location.reload();
		}
	} 
	if(ifInIframe()){
			parent.location.reload();
	}
	
  });  
  //  onclick on cancel 
  $('.cookie-cancel').click(function(){    
	//alert(Drupal.eu_cookie_extra_tune.getStatus()+Drupal.settings.eu_cookie_extra_tune.explicit_page);
	$.cookie('cookie-compliance-user-response', 1, { path: '/' });  
	if(ifInIframe()){
		parent.location.reload();
	}else{
		location.reload();
	}
    //if ( Drupal.settings.eu_cookie_extra_tune.explicit_page == true && Drupal.eu_cookie_extra_tune.getStatus() != 2){
    if ( Drupal.eu_cookie_extra_tune.getStatus() < 2){
	   Drupal.eu_cookie_extra_tune.popup( Drupal.settings.eu_cookie_extra_tune.explicit_functional_warning, false);
    } 
	//location.reload();
	    
  });
  if(Drupal.settings.eu_cookie_extra_tune.show_as_page==0){
	  $('#cookie-panel').click(function(){    
			displaymodal();   
	  });	
  }
  if(ifInIframe()){
	$('.change-cookie-settings').css('visibility','hidden');
  }
  
});

function ifInIframe(){
	var isInIframe = (window.location != window.parent.location) ? true : false;
	return isInIframe;
}