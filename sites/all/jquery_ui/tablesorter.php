<html>
<head>
<link rel="stylesheet" href="http://www.silverwareconsulting.com/includes/layout.css" type="text/css" />
<link rel="stylesheet" href="http://www.silverwareconsulting.com/includes/style.css" type="text/css" />
<link rel="stylesheet" href="/assets/jQuery/tablesorter/themes/blue/style.css" type="text/css" media="print, projection, screen" />
	
<script src="jquery-1.4.4.min.js" type="text/javascript"></script>
<script src="jquery.tablesorter.min.js" type="text/javascript"></script>
<script type="text/javascript" src="jquery/jquery-latest.js"></script>
<script type="text/javascript">
$(document).ready(function() {
	$table = $("#myTable")
	.tablesorter({widthFixed: true, widgets: ['zebra']});
FilterText = "";
ColumnArray = ["Country","Province/State"];
for (i=0;i<ColumnArray.length;i++) {
	$("#myTable tbody tr").find("td:eq(" + i + ")").click( function() {
		clickedText = $(this).text();
		FilterText = ((FilterText == clickedText) ? "" : clickedText );
		$.uiTableFilter( $table, FilterText, ColumnArray[i]);
	});
	$("table") 
    .tablesorter({widthFixed: true, widgets: ['zebra']}) 
    .tablesorterPager({container: $("#pager")}); 
}
});
</script>
</head>
<body>
<table id="myTable" class="tablesorter">
<thead>
<tr>
	<th>Last Name</th>
	<th>First Name</th>
	<th>Email</th>
	<th>Due</th>
	<th>Web Site</th>
</tr>
</thead>
<tbody>
<tr>
	<td>Smith</td>
	<td>John</td>
	<td>jsmith@gmail.com</td>
	<td>$50.00</td>
	<td>http://www.jsmith.com</td>
</tr>
<tr>
	<td>Bach</td>
	<td>Frank</td>
	<td>fbach@yahoo.com</td>
	<td>$50.00</td>
	<td>http://www.frank.com</td>
</tr>
<tr>
	<td>Doe</td>
	<td>Jason</td>
	<td>jdoe@hotmail.com</td>
	<td>$100.00</td>
	<td>http://www.jdoe.com</td>
</tr>
<tr>
	<td>Conway</td>
	<td>Tim</td>
	<td>tconway@earthlink.net</td>
	<td>$50.00</td>
	<td>http://www.timconway.com</td>
</tr>
</tbody>
</table>

</body>
</html>