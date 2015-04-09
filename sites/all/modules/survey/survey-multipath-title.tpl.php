<table width="100%" border="0" cellpadding="2" cellspacing="2">
	<tr>
		<td>
			<strong>Multipath Survey Title</strong>
		</td>
	</tr>
			<?php
				$explode_for_page = explode("=",$_GET['q']);
				if(!isset($explode_for_page[1])) {
					$page_number = 1;	
				} else {
					$page_number = $explode_for_page[1];
				}
				$chunk_number = $page_number - 1;
				if(count($array_of_survey)>0) {
					$chunk_array = array_chunk($array_of_survey,10,true);

					foreach($chunk_array[$chunk_number] AS $key=>$values) { ?>
						<tr>
							<td>
								<?php echo l($values,'survey/multipath/'.$key); ?>
							</td>
						</tr>
					<?php }	 
						if(count($chunk_array)>10){ 
					?>
						<tr>
							<td align="center"> <strong> Page </strong> 
						<?php
						for($counter=0;$counter<count($chunk_array);$counter++) {
							$page = $counter + 1;
							echo "<span align='center' style='width:10px;'> ".l($counter+1,'surveytitle/multipath/?p='.$page) ." </span>";
						}
						echo "</td></tr>";
						}
					}
					?>

	</tr>
</table>
	