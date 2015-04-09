function changeHandle(e,ui) {
  var id = $(ui.handle).parents('div.slider-widget-container').attr('id');
  if (typeof(ui.values) != 'undefined') {
    $.each(ui.values, function(i,val) {
      $("#"+id+"_value_"+i).val(val);
      $("#"+id+"_nr_"+i).text(val+"%");
    });
  } else {
    $("#"+id+"_value_0").val(ui.value);
    $("#"+id+"_nr_0").text(ui.value+"%");
  }
}

var jsonData = null;
var chart = null;
google.load("visualization", "1", {packages:["corechart"]});
google.setOnLoadCallback(drawChart);
google.setOnLoadCallback(drawChart);

function drawChart() {	  
		var jsonDataResult = $.ajax({
			url: "report1",
			dataType: "json",
			async: false,
			success: (
				function(data) {		
					jsonData = data;					
				})
		});	  
        var data = google.visualization.arrayToDataTable(jsonData);
        var options = {
          title: 'SEO Compliance - Content Percentage',
		  colors: ['#4DA20C','#DC3912'], is3D:true,
		  /* pieSliceText: 'Name', */

        };
        chart = new google.visualization.PieChart(document.getElementById('chart_div'));
        chart.draw(data, options);
		google.visualization.events.addListener(chart, 'select', selectHandler);

	}

function selectHandler(e) {
var selection = chart.getSelection();
for (var i = 0; i < selection.length; i++) {
    var item = selection[i];
	if(item.row==1){
		window.location = 'seoreport'; 
	}
  }
 }

  var wrapper="";
  var data="";
 function drawVisualization() {
		var jsonDataResult = $.ajax({
			url: "report2",
			dataType: "json",
			async: false,
			success: (
				function(data) {		
					jsonData = data;					
				})
		});	  
  wrapper = new google.visualization.ChartWrapper({
    chartType: 'ColumnChart',
    dataTable: jsonData,
    options: {'title': 'SEO Compliance - Per Content Type','width':'600', 'height':'400','backgroundColor':'#F5DEB3','allowHtml':true,
      vAxis: {minValue:0, maxValue:100,title: "Failed Percentage"},
	  hAxis: {title: "Content types"},
	  

	  
},
    containerId: 'visualization'
  });
  wrapper.draw();	
}
google.setOnLoadCallback(drawVisualization); 



