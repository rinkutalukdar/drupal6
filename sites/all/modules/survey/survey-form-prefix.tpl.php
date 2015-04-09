<div style="float:left;width:100%"><?php echo survey_display_textual_data('survey_textual_data_abovedesc','survey_flag_show_textual_data_abovedesc')?></div>
		<div style="float:left;width:100%">
			<div class="survey-form-required" style="float:left;width:49%">
				<?php 
				if($params->ReqFlag==1){?>
					*<span class="survey-required_text"> = Required Field</span>
				<?php }?>
			</div>
			<div style="width:49%" align="right"><?php
			if($surveyData->location=='header'){
				if(!empty($processedData->CustomContent)){
					echo $processedData->CustomContent;
				}else{?>
					Page <?php echo $params->page?> of <?php echo $params->totalPage;
				}
			}else{?>
				Page <?php echo $params->page?> of <?php echo $params->totalPage;
			}?>
			</div>
			<div style="float:left;width:100%"><?php echo survey_display_textual_data('survey_textual_data_belowdesc','survey_flag_show_textual_data_belowdesc')?></div>
                        <?php if($params->page == 1){ ?>
                        <div style="float:left;width:100%"><?php echo survey_display_textual_data('survey_textual_data_first_page','survey_flag_show_textual_data_first_page')?></div>
                        <?php } ?>
        </div>