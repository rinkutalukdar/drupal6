<table width="100%" border="0" cellpadding="2" cellspacing="2">
	<tr>
		<td>
			<strong>Survey Topics</strong>
		</td>
	</tr>
	<tr>
		<td>
			<?php
				if(variable_get('survey_modalpopup_display', 0) == 1){
					$linkfunction = survey_get_item;
					$width = variable_get('survey_modalpopup_width',350);
					$height =variable_get('survey_modalpopup_height', 400);
					$options = "$width,$height";
				}else{
					$linkfunction = l;
					$options = array();
				}
				if(is_array($evaluation))
				foreach($evaluation as $element){
					echo '<div style="width:100%; float:left">';
                    if($operation == 'multipath') {
                        echo $linkfunction(stripslashes($element->DisplayName), 'survey/multipath/' . $element->EvaluationId, $options);
                    } else {
                        echo $linkfunction(stripslashes($element->DisplayName), $type.'/' . $element->EvaluationId, $options);
                    }
					echo '</div>';
				} ?>
		</td>
	</tr>
</table>
	