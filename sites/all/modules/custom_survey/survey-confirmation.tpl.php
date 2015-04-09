<?php
// $Id: survey-confirmation.tpl.php,v 1.1 2010/11/09 22:05:27 rabith Exp $

/**
 * @file
 * Customize confirmation screen after successful submission.
 *
 */
?>

<script type="text/javascript">
		function graphit(g,gwidth,option){
			//var graphimageP="poll_"+image_id+".gif";
			outputP='<table border="0" cellspacing="0" cellpadding="0">';
			outputP+='<tr class="magnifier"><td><img  src="<?php echo base_path().drupal_get_path('module', 'survey');?>/magnifier.gif"></td></tr>';
			outputP+='<tr><td class="graph_option" style="display:none;color:#E2C169;font-size:1em;font-weight:bold;line-height:20px;">A.</td></tr><tr><td>&nbsp;</td>';
			outputP+='</tr><tr>';
			for (i=0;i<g.length;i++){
				calwidthP=gwidth*(parseInt(g[i][1])/100);
				var graphimageP="poll_"+i+".gif";
				var graphimageP_big = "poll_big_"+i+".gif";
				outputP+='<td valign="bottom" width="42px" style="text-align:center;"><span class="graph_option" style="display:none;text-align:center;">'+g[i][1]+'%</span><img class="popupGraph" src="<?php echo base_path().drupal_get_path('module', 'survey').'/'; ?>'+graphimageP+'" height="'+calwidthP+'" width="18"><img style="display:none" class="popupGraph_bigger" src="<?php echo base_path().drupal_get_path('module', 'survey').'/'; ?>'+graphimageP_big+'" height="'+calwidthP+'" width="53"></td>';
			}
			outputP+='</tr><tr class="graph_option" style="display:none;text-align:center;">';
			for (i=0;i<g.length;i++){
				outputP+='<td valign="top" ><span class="graph_option" style="font-size:0.7em;display:none;">'+option[i]+'</span></td>';
			}
			outputP+='</tr>';
			//outputP+='<tr>';
			for (i=0;i<g.length;i++){
				//outputP+='<td valign="bottom">'+g[i][0]+'</td>';
			}
			//outputP+='</tr>';
			outputP+='</table>';
			return (outputP);
		}
	</script>

<?php

  drupal_add_js(drupal_get_path('module', 'survey') . '/js/survey.js');

?>
<div id="survey_content">
    <h2><?php echo $survey_title; ?></h2>
    <h4><?php echo date("d F Y", $survey_created);?></h4>
    <h4><?php  if($entrants == ''){echo '0';} else{echo $entrants; } ?> entrants so far</h4>

    <table cellspacing="0" cellpadding="0" border="0" width="100%">
    <tbody>
<?php  $qstn_array_keys = array_keys($qstn_array);

       foreach($qstn_array_keys as $values){  $s_id =$values;
      ${'graph_array_'.$s_id}= array();

       	?>
          <tr>
            <td class="question" colspan="5"><span>Q.</span> <br>
             <div id="qst_<?php echo $s_id ;?>"><?php echo $qstn_array[$values]['name'] ?> </div></td>
          </tr>
          <tr>
            <td colspan="5"><div class="survey_vlist"><span>A</span>
<?php
//qstn key-value array
     $value_setArr = explode("\n",$qstn_array[$values]['extra']['items']);
          $qstn_KeyValue = array();
         foreach($value_setArr as $valuseSet){
         	$valuseSet_arr =  explode('|',$valuseSet);
         	$qstn_KeyValue[$valuseSet_arr[0]] = $valuseSet_arr[1];
         }
//ans  count-key array
     $ans_KeyCount = array();

     $ans_res =  db_query("SELECT count(data) dataCount, data  FROM webform_submitted_data where nid=%d and cid =%d and data !=''  group by data",$qstn_array[$values]['nid'],$values);
      while($ans_key = db_fetch_array($ans_res)){
      $ans_KeyCount[$ans_key[data]] = $ans_key[dataCount];

      }
//Creating qstn count array
	  $qstn_ValueCount = array();
	  foreach($qstn_KeyValue as $key =>$values){
	   if($ans_KeyCount[$key] != ''){
		$qstn_ValueCount[$values] = $ans_KeyCount[$key];
	   }else{
		$qstn_ValueCount[$values] = 0;
	   }
	  }
//totel user for this Qstn
  $qstn_count_array = array_values($qstn_ValueCount);
  $totalUser = 0;
  foreach($qstn_count_array as $qstnCount){
  	$totalUser = $totalUser + $qstnCount;
  }
 //qstn wih percentage and chart
      $ans_key_graph = array(); //question option array
           foreach($qstn_ValueCount as $key => $value){
 //percentage calculation
	           	if($totalUser != 0){
	           	$percentage = ($value/$totalUser)*100;
	           	}else{
	           	 $percentage = 0;
	           	}

	          ${'graph_array_'.$s_id}[$key]= round($percentage);
	          $ans_key_graph[]=$key; //question option ; for displaying in graph
           	    ?>
                <p><span><?php echo round($percentage); ?>%</span> <?php echo  $key; ?> </p>

           <?php }  ?>
              </div>

<?php
	$graph_arr = array();
	$graph_arr = ${'graph_array_'.$s_id};
	$arr = array(0 => $graph_arr);
	?>
	<script type="text/javascript">
	 		   var graphx_option	=	new Array();
	 		   <?php
	 foreach($ans_key_graph as $key =>$val) {
	 	$v = rtrim($val);  ?>
				graphx_option[<?php print $key; ?>]=['<?php print $v;?>'];

	<?php }?>
</script>

	<?php  foreach($arr as $key => $val) {
		 	?>
	 	<script type="text/javascript">
	 		var i = 0;
	 		var graphx	=	new Array();
			<?php
			foreach($val as $k => $v) {
				$k = rtrim($k); //triming the extra space for the $key value.
			?>
				graphx[i]=['<?php print $k;?>', <?php print $v;?>];
				i++;
			<?php
	 		}
	 		?>
	 		document.write("<div onClick='show_graph(<?php echo $s_id;?>);' class='survey_graph' id='syrvey_graph_<?php echo $s_id; ?>'>"+graphit(graphx,200,graphx_option)+"</div>");
	 	</script>

	<?php

	 }
	 ?>
          </tr>
<?php } ?>
     </tbody>
    </table>
</div>
<div id="dialog" title="An Image!" style="display: none;"></div>