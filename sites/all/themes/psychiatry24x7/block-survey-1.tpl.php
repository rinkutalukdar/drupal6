<?php

// $Id: block.tpl.php,v 1.0 2010/10/12 15:55:00 narendra.b Exp $

?>

<?php
$survey_submitted = variable_get('custommod_survey_success');
//print "survey_submitted = ".$survey_submitted;
//print $survey_submitted." before <br>";

if($survey_submitted == 1){
	//variable_set('custommod_survey_success', 0);
	//print variable_get('custommod_survey_success')." After";

		echo '<div class="survey">
				<h2>Your opinion</h2>
				<div> 
				<div class="survey_success">'.t("Thank you for completing our polls").'</div>
				</div>
			  </div>';
		//setcookie("survey_cookie_success", "1", time()-3600*24*30, '/');	  
		
	}else { 
		//setcookie("survey_cookie", "1", time()+3600*24*30, '/'); ?>
        <div id="block-<?php print $block->module .'-'. $block->delta; ?>" class="clear-block block block-<?php print $block->module ?>">
		<?php if (!empty($block->subject)): ?>
			<h2><?php print $block->subject ?></h2>
		<?php endif;?>
		<div class="content"><?php print $block->content ?></div>
		</div>  
		<?php 
		//echo "cookie not set";
		//setcookie("survey_cookie", "1", time()-3600*24*30, '/'); 
		//variable_set('custommod_survey_success','1');
	} 
	
	?>