function drawChart(myprogress_data,current_month,tHours, total_minutes_convert,images_path){
	//alert(window);
	$("#holder").html('');
	$("#walkinglog_y_axis_legend").remove();
	$("#walkinglog_x_axis_legend").remove();
	$("#walkinglog_graph_message").remove();
	
	document.getElementById('light').style.display='block';
	//alert(document.getElementById('fade'));
	document.getElementById('fade').style.display='block';
	
	var r = Raphael("holder");
	var str;
    //r.g.txtattr.font = "12px \'Fontin Sans\', Fontin-Sans, sans-serif";
	
    var x = [], y = [];
    for (var i = 0; i < 1e6; i++) {
        x[i] = i * 10;
        y[i] = (y[i - 1] || 0) + (Math.random() * 7) - 3;
    }
    
    var count_myprogress_data1 = 0;
    var count_myprogress_data2 = 200;
    
   

    var lines = r.g.linechart(80, 100, 300, 220, [[count_myprogress_data1, count_myprogress_data2]], [[0, myprogress_data]], {nostroke: false, axis: "0 0 1 1", symbol: "o", smooth: true}).hoverColumn(function () {
        window.tags = r.set();
        for (var i = 0, ii = window.y.length; i < ii; i++) {
            window.tags.push(r.g.tag(window.x, window.y[i], window.values[i], 160, 10).insertBefore(window).attr([{fill: "#fff"}, {fill: window.symbols[i].attr("fill")}]));
        }
    }, function () {
        window.tags && window.tags.remove();
    });
    
   // alert("GOpal");
	//return ;
    
 // Modify the x axis labels
	  var xText = lines.axis[0].text.items; 
	  for(var i in xText){ // Iterate through the array of dom elems, the current dom elem will be i
	      var _oldLabel = (xText[i].attr("text") + "").split("."), // Get the current dom elem in the loop, and split it on the decimal
	     _newLabel = " "; // Format the result into time strings
	     	      
  		  xText[i].attr({"text": _newLabel}); // Set the text of the current elem with the result
  	  };
  	  
  	
	  //xText[6].attr({"text": "'.$current_month.'"}); // Set the text of the current elem with the result

    //lines.symbols.attr({r: 3});
    // lines.lines[0].animate({"stroke-width": 6}, 1000);
    // lines.symbols[0].attr({stroke: "#fff"});
    // lines.symbols[0][1].animate({fill: "#f00"}, 1000);
    
  	
	str = '<div id="walkinglog_y_axis_legend">Walk Lenght (in minutes)</div>'+
	'<div id="walkinglog_x_axis_legend">'+current_month+'</div>'+
	'<div id="walkinglog_graph_message">In total to date, you\'ve walked for '+tHours+' <br />'+
	'which is approximately '+total_minutes_convert+' miles!</div>';
	
	
	$("#light").append(str);
}		