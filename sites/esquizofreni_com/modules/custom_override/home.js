function changeImageBanner(current_elment, title, description, imagePath, path, sliderID, maxNoElement) {

var findPrevSlide;
if(sliderID==0 && maxNoElement != 1)
findPrevSlide=maxNoElement-1;
else
findPrevSlide=sliderID-1;

	
	//remove other classes
	var all_banner_elements = new Array();
	for (i = 1; i<= maxNoElement; i++) {
		all_banner_elements[i-1] = "home_banner_" + i;
	}
	for(i=0;i<all_banner_elements.length;i++){
		if(all_banner_elements[i] != current_elment){
			$("#"+all_banner_elements[i]).removeClass("selected");
		}
	}
	if (maxNoElement > 1) {
		for (i = 0; i<maxNoElement; i++) {
			$("#slider_"+i).hide();
		}
		$("#slider_"+sliderID).fadeIn('Slow');	
		$("#"+current_elment).addClass("selected");
	}
}
$(document).ready(function() {
  
  $('#slider').show();
  $('.slider_loader').hide();
  
  	var elements = $('#slider').children(); 
	  $('#slider').css('position', 'relative').css('height','312px');
            for (var i = 0; i < elements.length; i++) {
                $(elements[i]).css('z-index', String(elements.length-i)).css('position', 'absolute');	
				
            };
  
  
  var banner_delay = '8';
  var banner_element_counter = Drupal.settings.banner_element_counter;
  
 

if ($(".slide-nav ul li a").length > 0){
 
  if (banner_element_counter == 3) {
	 $(".slide-nav ul li a").css('width', '33.19%'); 
  } else if (banner_element_counter == 2) {
	  $(".slide-nav ul li a").css('width', '49.9%');
  } else if (banner_element_counter == 1) {
	  $(".slide-nav ul li a").css('width', '100%');
  } else {
	  
  }
  
}  
  
  if (($('#home_banner_1').attr('class') == 'services selected') && banner_element_counter > 1) {
	  window.setInterval(function() {
		var cur_id = $('.selected').attr('id');
		var cur_id_array = cur_id.split('_');
		var next_id;
		if (cur_id_array[2] == banner_element_counter) {
		  next_id = 'home_banner_1';
		} else {
		  next_id = cur_id_array[0] + '_' + cur_id_array[1] + '_' + (parseInt(cur_id_array[2]) + 1);
		}
		var all_banner_elements = new Array();
		for (i = 1; i<= banner_element_counter; i++) {
			all_banner_elements[i-1] = "home_banner_" + i;
		}
		
		//var all_banner_elements = new Array("home_banner_1","home_banner_2","home_banner_3","home_banner_4");
		for(i=0;i<all_banner_elements.length;i++){
		  $("#"+all_banner_elements[i]).removeClass("selected");
		}
		$('#'+next_id).trigger('click');
	  }, (parseInt(banner_delay) * 1000));
	}
	//changeImage();
	
});
