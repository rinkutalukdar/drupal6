$(document).ready(function(){
	
	$('#img_felt_sad').click(function(){
		var src = $('#img_felt_sad').attr('src').replace('mood-before-sad-inactive.png','mood-before-sad.png');
		clear_all('#img_felt_');
		$('#img_felt_sad').attr('src',src);
		$('#edit-wl-how-user-felt').val('sad');
	});
	$('#img_felt_normal').click(function(){
		var src = $('#img_felt_normal').attr('src').replace('mood-before-normal-inactive.png','mood-before-normal.png');
		clear_all('#img_felt_');
		$('#img_felt_normal').attr('src',src);
		$('#edit-wl-how-user-felt').val('normal');
	});
	$('#img_felt_happy').click(function(){
		var src = $('#img_felt_happy').attr('src').replace('mood-before-happy-inactive.png','mood-before-happy.png');
		clear_all('#img_felt_');
		$('#img_felt_happy').attr('src',src);
		$('#edit-wl-how-user-felt').val('happy');
	});
	$('#img_felt_after_sad').click(function(){
		var src = $('#img_felt_after_sad').attr('src').replace('mood-sad-inactive.png','mood-sad.png');
		clear_all('#img_felt_after_');
		$('#img_felt_after_sad').attr('src',src);
		$('#edit-wl-how-user-felt-later').val('sad');
	});
	$('#img_felt_after_normal').click(function(){
		var src = $('#img_felt_after_normal').attr('src').replace('mood-normal-inactive.png','mood-normal.png');
		clear_all('#img_felt_after_');
		$('#img_felt_after_normal').attr('src',src);
		$('#edit-wl-how-user-felt-later').val('normal');
	});
	$('#img_felt_after_happy').click(function(){
		var src = $('#img_felt_after_happy').attr('src').replace('mood-happy-inactive.png','mood-happy.png');
		clear_all('#img_felt_after_');
		$('#img_felt_after_happy').attr('src',src);
		$('#edit-wl-how-user-felt-later').val('happy');
	});
	$('#img_weather_rainy').click(function(){
		var src = $('#img_weather_rainy').attr('src').replace('weather-rainy-inactive.png','weather-rainy.png');
		clear_all('#img_weather_');
		$('#img_weather_rainy').attr('src',src);
		$('#edit-wl-weather').val('rainy');
	});
	$('#img_weather_thunder').click(function(){
		var src = $('#img_weather_thunder').attr('src').replace('weather-thunder-inactive.png','weather-thunder.png');
		clear_all('#img_weather_');
		$('#img_weather_thunder').attr('src',src);
		$('#edit-wl-weather').val('thunder');
	});
	$('#img_weather_sunny').click(function(){
		var src = $('#img_weather_sunny').attr('src').replace('weather-sunny-inactive.png','weather-sunny.png');
		clear_all('#img_weather_');
		$('#img_weather_sunny').attr('src',src);
		$('#edit-wl-weather').val('sunny');
	});
	$('#edit-wl-how-user-felt-wrapper').css('display','none');
	$('#edit-wl-how-user-felt-later-wrapper').css('display','none');
	$('#edit-wl-weather-wrapper').css('display','none');
	
	var val = $('#edit-wl-how-user-felt').val();
	if(val){
		var src = $('#img_felt_'+val).attr('src').replace('mood-before-'+val+'-inactive.png','mood-before-'+val+'.png');
		$('#img_felt_'+val).attr('src',src);
	}
	var val1 = $('#edit-wl-how-user-felt-later').val();
	if(val1){
		var src = $('#img_felt_after_'+val1).attr('src').replace('mood-'+val1+'-inactive.png','mood-'+val1+'.png');
		$('#img_felt_after_'+val1).attr('src',src);
	}
	var val2 = $('#edit-wl-weather').val();
	if(val2){
		var src = $('#img_weather_'+val2).attr('src').replace('weather-'+val2+'-inactive.png','weather-'+val2+'.png');
		$('#img_weather_'+val2).attr('src',src);
	}
	var current_month = get_current_month();
	if(document.URL.search('walking_log/log')!= -1){
		show_log_data(current_month,'miles');
		show_log_data(current_month,'minutes');
		
	}
	else if (document.URL.search('walking_log/progress') != -1){
		show_log_data(current_month,'miles');
		show_log_data(current_month,'minutes');
		if(document.getElementById('canvaspng')){
			$.blockUI({message: '<p><img src="/sites/all/themes/psychiatry24x7/images/ajax_loading.gif"></img></p>'});
		}
	}
	$('#edit-field-distance-unit-value').appendTo('#edit-field-miles-planned-value-wrapper');
	$('#log-walk-form .distance-unit').appendTo('#edit-wl-miles-walked-wrapper');
	$("#progress_key").click(function(){
		if($('.mood-weather-ctr').css('display')=='none'){
			$('.mood-weather-ctr').show();
		}
		else{
			$('.mood-weather-ctr').hide();
		}
	});
	//$('#min-placeholder').css('visibility','hidden');
	//$('#miles-placeholder').css('visibility','hidden');
});
$(window).load(function() {
// executes when complete page is fully loaded, including all frames, objects and images
if(document.getElementById('canvaspng')){
			//alert('loaded');
			setTimeout(call_onclick_event,1000);
			//setTimeout($.unblockUI,15000);
}
});
function clear_all(field){
	var src;
	switch(field){
		case '#img_felt_':
			src = $('#img_felt_sad').attr('src').replace('mood-before-sad.png','mood-before-sad-inactive.png');
			$('#img_felt_sad').attr('src',src);
			src = $('#img_felt_normal').attr('src').replace('mood-before-normal.png','mood-before-normal-inactive.png');
			$('#img_felt_normal').attr('src',src);
			src = $('#img_felt_happy').attr('src').replace('mood-before-happy.png','mood-before-happy-inactive.png');
			$('#img_felt_happy').attr('src',src);
			$('#edit-wl-how-user-felt').val('');
			break;
		case '#img_felt_after_':
			src = $('#img_felt_after_sad').attr('src').replace('mood-sad.png','mood-sad-inactive.png');
			$('#img_felt_after_sad').attr('src',src);
			src = $('#img_felt_after_normal').attr('src').replace('mood-normal.png','mood-normal-inactive.png');
			$('#img_felt_after_normal').attr('src',src);
			src = $('#img_felt_after_happy').attr('src').replace('mood-happy.png','mood-happy-inactive.png');
			$('#img_felt_after_happy').attr('src',src);
			$('#edit-wl-how-user-felt-later').val('');
			break;
		case '#img_weather_':
			src = $('#img_weather_rainy').attr('src').replace('weather-rainy.png','weather-rainy-inactive.png');
			$('#img_weather_rainy').attr('src',src);
			src = $('#img_weather_thunder').attr('src').replace('weather-thunder.png','weather-thunder-inactive.png');
			$('#img_weather_thunder').attr('src',src);
			src = $('#img_weather_sunny').attr('src').replace('weather-sunny.png','weather-sunny-inactive.png');
			$('#img_weather_sunny').attr('src',src);
			
			$('#edit-wl-weather').val('');
			break;
	}
}

function generate_graph(data){
	/*for(var i in data){
		alert(i+"=="+data[i]);
	}*/
	var d = eval(data['month_miles_data']);
	
	var graph = $.plot($("#placeholder"), [d], { grid:{backgroundColor:data['grid_background_color']},series:{lines: {show: true},color:"#FFFFFF"},xaxis: { mode: "time",timeformat: "%m/%d",labelWidth:"40" } });
	var points = graph.getData();
	var graphx = $('#placeholder').offset().left;
	graphx = graphx + 30; // replace with offset of canvas on graph
	var graphy = $('#placeholder').offset().top;
	graphy = graphy + 10; // how low you want the label to hang underneath the point
	var plotoffset = graph.getPlotOffset();
	var left = plotoffset["left"];
	var top = plotoffset["top"];
      for(var k = 0; k < points.length; k++){
		var xoffset = points[k].xaxis.p2c(data['time_last_walked']);
		var yoffset = points[k].yaxis.p2c(data['miles_last_walked']);
		var graphx = $('#placeholder').offset().left;
		var graphy = $('#placeholder').offset().top;
 	     $('<div id="tooltip" style="background-color: "'+data['grid_background_color']+'"><img src="'+data['graph_status_image']+'" height="55px"/></div>').css( {
		      			          position: 'absolute',
			            		    display: 'block',
		      			          top: yoffset - 60,
			            		    left: xoffset
       }).appendTo("#placeholder");
	   /*$('<div class="button"><img src="'+data['mood_image']+'" height="35px"/>&nbsp;&nbsp;<img src="'+data['weather_image']+'" height="35px"/></div>').css( {
		      			          position: 'absolute',
			            		    display: 'block',
		      			          top: top+10,
			            		    left: left + 20
						       }).appendTo("#placeholder");*/
	  }
	//$('<div class="button" style="left:23px;top:20px"><img src="'+data['weather_image']+'" height="55px"/></div>').appendTo('#placeholder');	    
	
}

function show_data(month,type){
	var basePath = '/';
	var dataurl = 'walking_log_progress';
	$.ajax({
        url: basePath+dataurl,
        method: 'POST',
        data: "month="+month+'&type='+type,
		beforeSend: function(){
		
			$.blockUI({message: '<p><img src="/sites/all/themes/psychiatry24x7/images/ajax_loading.gif"></img></p>'});
		},
        success: function(data){
			$('.my-progress-content').empty();
			$('.button').remove();
			$('#tooltip').remove();
			var json = eval("("+data+")");
			var d= json.data;
			if(d['msg'] != null){
				$('.my-progress-content').html(json.content);
				$('#placeholder').css('height','145px');
				$('#placeholder').html('<div style="font-weight: bold; margin-left: 174px; padding-top: 100px; font-size: 20px;">'+d['msg']+'</div>');
			}else{
				
				$('.my-progress-content').html(json.content);
				$('.my-progress-content #progress_key').click(function(){
					if($('.my-progress-content .mood-weather-ctr').css('display')=='none'){
						$('.my-progress-content .mood-weather-ctr').show();
					}
					else{
						$('.my-progress-content .mood-weather-ctr').hide();
					}
				});
				$('#tooltip').remove();
				$('.button').remove();
				generate_graph(json.data);
			}
			/*$('div .miles-timer-left').empty().html(d["miles_timer_left"]);
			$('div .minutes-left').remove();
			$('div .miles-timer-left').after(d["minutes_left_image"]);
			$('div .miles-left').empty().html(d["toggle_link"]);
			$('div .month-display').empty().html(d["month_display"]);*/
			$('div .my-progress-content-medium').removeClass("my-progress-content-med-hm");
			$('div .my-progress-content-expanded').removeClass("my-progress-content-expanded-hm");
			$('div .my-progress-content').removeClass("my-progress-content-hm");
			if(type=='minutes'){
				$('div .miles-timer-right').empty().addClass('miles-down').html(d["miles_timer_right"]);
				if(d["change_bg"]==0){
					$('div .miles-min-display').empty().removeClass('miles-right').html(d["miles_min_display"]);
				}else if(d["change_bg"]==1){
					$('div .miles-min-display').empty();
				}
				
				if($('div .walking-log-nav').parent().attr('class').search('my-progress-content-medium')!=-1){
					if(d["change_bg"]==1){
						$('div .my-progress-content-medium').addClass("my-progress-content-med-hm");
					}
					else if(d["change_bg"]==0){
						$('div .my-progress-content-medium').removeClass("my-progress-content-med-hm");
					}
				}
				else if($('div .walking-log-nav').parent().attr('class').search('my-progress-content-expanded')!=-1){
					if(d["change_bg"]==1){
						$('div .my-progress-content-expanded').addClass("my-progress-content-expanded-hm");
					}
					else if(d["change_bg"]==0){
						$('div .my-progress-content-expanded').removeClass("my-progress-content-expanded-hm");
					}
				}
				else if($('div .walking-log-nav').parent().attr('class').search('my-progress-content')!=-1){
					if(d["change_bg"]==1){
						$('div .my-progress-content').addClass("my-progress-content-hm");
					}
					else if(d["change_bg"]==0){
						$('div .my-progress-content').removeClass("my-progress-content-hm");
					}
				}
			}else{
				$('div .miles-timer-right').empty().removeClass('miles-down').html(d['miles_timer_right']);
				$('div .miles-min-display').empty().addClass('miles-right').html(d['miles_min_display']);
			}
			setTimeout($.unblockUI,1000);
		}
      });	
}

function toggle_data(month,type){
	
	var basePath = "/";
	var dataurl = 'walking_log_toggle_data';
	$.ajax({
        url: basePath+dataurl,
        method: 'POST',
        data: "month="+month+'&type='+type,
        success: function(data){
			
			var json = eval("("+data+")");
			$('div .miles-timer-left').empty().html(json.miles_timer_left);
			$('div .minutes-left').remove();
			$('div .miles-timer-left').after(json.minutes_left_image);
			$('div .miles-left').empty().html(json.toggle_link);
			$('div .month-display').empty().html(json.month_display);
			$('div .my-progress-content-medium').removeClass("my-progress-content-med-hm");
			$('div .my-progress-content-expanded').removeClass("my-progress-content-expanded-hm");
			$('div .my-progress-content').removeClass("my-progress-content-hm");
			if(type=='minutes'){
				$('div .miles-timer-right').empty().addClass('miles-down').html(json.miles_timer_right);
				if(json.change_bg==0){
					$('div .miles-min-display').empty().removeClass('miles-right').html(json.miles_min_display);
				}else if(json.change_bg==1){
					$('div .miles-min-display').empty();
				}
				
				if($('div .walking-log-nav').parent().attr('class').search('my-progress-content-medium')!=-1){
					if(json.change_bg==1){
						$('div .my-progress-content-medium').addClass("my-progress-content-med-hm");
					}
					else if(json.change_bg==0){
						$('div .my-progress-content-medium').removeClass("my-progress-content-med-hm");
					}
				}
				else if($('div .walking-log-nav').parent().attr('class').search('my-progress-content-expanded')!=-1){
					if(json.change_bg==1){
						$('div .my-progress-content-expanded').addClass("my-progress-content-expanded-hm");
					}
					else if(json.change_bg==0){
						$('div .my-progress-content-expanded').removeClass("my-progress-content-expanded-hm");
					}
				}
				else if($('div .walking-log-nav').parent().attr('class').search('my-progress-content')!=-1){
					if(json.change_bg==1){
						$('div .my-progress-content').addClass("my-progress-content-hm");
					}
					else if(json.change_bg==0){
						$('div .my-progress-content').removeClass("my-progress-content-hm");
					}
				}
			}else{
				$('div .miles-timer-right').empty().removeClass('miles-down').html(json.miles_timer_right);
				$('div .miles-min-display').empty().addClass('miles-right').html(json.miles_min_display);
			}
			
		}
      });	

}
function download_walking_log(){
	
	var canvas = document.getElementById('placeholder').firstChild;
	
	//alert(canvas.className);
	var img = canvas2png(canvas);
	//alert(img);
	var url = "/"+'download_walking_log';
	var form  = document.createElement("form");
    var input = document.createElement("input");

    form.setAttribute("action", url);
    form.setAttribute("method", "post");

    input.setAttribute("type",  "hidden");
	input.setAttribute("name",  "dataurl");
	input.setAttribute("value", img);

    document.body.appendChild(form);
    form.appendChild(input);
    form.submit();
    form.removeChild(input);
    document.body.removeChild(form);
}


function show_log_data(month,type){
	var basePath = "/";
	var dataurl = 'walking_log_pdf_data';
	$.ajax({
        url: basePath+dataurl,
        method: 'POST',
        data: "month="+month+'&type='+type,
        success: function(data){
			
			var json = eval("("+data+")");
			//var miles= json.miles;
			//var minutes=json.minutes;
			//alert(miles)
			var dom = (type=='miles')?"#miles-placeholder":"#minutes-placeholder";
			if(json.empty=='false'){
				generate_mm_graph(json.data,dom);
			}
			
		
		}
      });	
}
function call_onclick_event(){
	
	var basePath = "/";
	var dataurl = 'walking_log_file_contente';
	var json = "{";
	var array=[];
	var xcount=0,ycount=0;
	if ($('#miles-placeholder').html()) {
		$("#miles-placeholder").find(".x1Axis").children().each(function(i){
			json += "x"+i+":'"+ $(this).text()+"|"+$(this).css('top')+"|"+$(this).css('left')+"',";
			array["x"+i] = $(this).text();
			xcount++;
		});
		
		$("#miles-placeholder").find(".y1Axis").children().each(function(i){
			json += "y"+i+":'"+ $(this).text()+"|"+$(this).css('top')+"|"+$(this).css('left')+"',";
			array["y"+i] = $(this).text();
			ycount++;
		});
		json += "xcount:"+xcount+",ycount:"+ycount+"}";
		
		json = eval("(" + json + ')');
		
		$.ajax({
			url: basePath+dataurl,
			method: 'POST',
			beforeSend: function(){
				//$.blockUI({message: '<p><img src="/sites/schizo.be.nl/themes/psychiatry24x7_be_nl/images/ajax_loading.gif"></img></p>'});
			},
			data: json,
			success: function(data){
				if(data=='success'){
					converttoimage('miles-placeholder');
					setTimeout($.unblockUI,7000);
				}
			}
		  });
	}
	else{
		window.location.href = document.location.protocol+ '//' + document.location.hostname + '/validateredirect';
		setTimeout($.unblockUI,3000);
	}
	
	
}
function generate_mm_graph(data,dom){
	/*for(var i in data){
		alert(i+"=="+data[i]);
	}*/
	var d = eval(data['month_miles_data']);
	
	var graph = $.plot($(dom), [d], { grid:{backgroundColor:data['grid_background_color']},series:{lines: {show: true},color:"#FFFFFF"},xaxis: { mode: "time",timeformat: "%m/%d",labelWidth:"40" } });
	var points = graph.getData();
	var graphx = $(dom).offset().left;
	graphx = graphx + 30; // replace with offset of canvas on graph
	var graphy = $(dom).offset().top;
	graphy = graphy + 10; // how low you want the label to hang underneath the point
	var plotoffset = graph.getPlotOffset();
	var left = plotoffset["left"];
	var top = plotoffset["top"];
      for(var k = 0; k < points.length; k++){
		var xoffset = points[k].xaxis.p2c(data['time_last_walked']);
		var yoffset = points[k].yaxis.p2c(data['miles_last_walked']);
		var graphx = $(dom).offset().left;
		var graphy = $(dom).offset().top;
 	     $('<div id="tooltip" style="background-color: "'+data['grid_background_color']+'"><img src="'+data['graph_status_image']+'" height="55px"/></div>').css( {
		      			          position: 'absolute',
			            		    display: 'block',
		      			          top: yoffset - 60,
			            		    left: xoffset
       }).appendTo(dom);
	}  
	
}
function converttoimage(dom){
	var canvas = document.getElementById(dom).firstChild;
	
	canvas2png(canvas);
	
	
}

function dwalkinglog(month){
	var basePath = "/";
	var dataurl = 'walking_log_file_contente';
	var json = "{";
	var array=[];
	var xcount=0,ycount=0;
	if ($('#minutes-placeholder').html()) {
		$("#minutes-placeholder").find(".x1Axis").children().each(function(i){
			json += "x"+i+":'"+ $(this).text()+"|"+$(this).css('top')+"|"+$(this).css('left')+"',";
			array["x"+i] = $(this).text();
			xcount++;
		});
		
		$("#minutes-placeholder").find(".y1Axis").children().each(function(i){
			json += "y"+i+":'"+ $(this).text()+"|"+$(this).css('top')+"|"+$(this).css('left')+"',";
			array["y"+i] = $(this).text();
			ycount++;
		});
		json += "xcount:"+xcount+",ycount:"+ycount+"}";
		
		json = eval("(" + json + ')');
		$.ajax({
			url: basePath+dataurl,
			method: 'POST',
			data: json,
			
			success: function(data){
				if(data=='success'){
					converttoimage('minutes-placeholder');
					//setTimeout($.unblockUI,7000);
				}
			
			}
		  });
		//converttoimage('miles-placeholder');
	}
	else{
		window.location.href = document.location.protocol+ '//' + document.location.hostname + '/validateredirect';
	}
	
}
function get_current_month(){
	var d=new Date();
	var month=new Array();
	month[0]="January";
	month[1]="February";
	month[2]="March";
	month[3]="April";
	month[4]="May";
	month[5]="June";
	month[6]="July";
	month[7]="August";
	month[8]="September";
	month[9]="October";
	month[10]="November";
	month[11]="December";
	return month[d.getMonth()]; 	
}