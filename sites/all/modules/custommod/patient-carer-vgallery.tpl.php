<?php
//$term = taxonomy_get_term(307);
//echo "<pre>";print_r(term_fields_feeds_taxonomy_load($term));exit;
?>
<div class="patient-info-container">
	<div class="patient-info-text">	<?php $block = module_invoke('block','block','view',101); print $block['content'];?></div>
	<div class="patient-info-video">
	<!-- Start of Brightcove Player -->

<div style="display:none">

</div>

<!--
By use of this code snippet, I agree to the Brightcove Publisher T and C 
found at https://accounts.brightcove.com/en/terms-and-conditions/. 
-->

<script language="JavaScript" type="text/javascript" src="http://admin.brightcove.com/js/BrightcoveExperiences.js"></script>

<object id="myExperience" class="BrightcoveExperience">
  <param name="bgcolor" value="#FFFFFF" />
  <param name="width" value="650" />
  <param name="height" value="370" />
  <param name="playerID" value="2028569384001" />
  <param name="playerKey" value="AQ~~,AAABV5OycoE~,X9E4Chm4u-_pcDfsws2ZUcGGHk7Usgfz" />
  <param name="isVid" value="true" />
  <param name="isUI" value="true" />
  <param name="dynamicStreaming" value="true" />
  <param name="@videoPlayer" value="2174761591001" />
  <param name="includeAPI" value="true" />
  <param name="templateLoadHandler" value="myTemplateLoaded" /> 
  <param name="templateReadyHandler" value="onTemplateReady" />
  
</object>

<!-- 
This script tag will cause the Brightcove Players defined above it to be created as soon
as the line is read by the browser. If you wish to have the player instantiated only after
the rest of the HTML is processed and the page load is complete, remove the line.
-->
<script type="text/javascript">brightcove.createExperiences();</script>

<!-- End of Brightcove Player -->
		  
		  <!--
		  By use of this code snippet, I agree to the Brightcove Publisher T and C 
		  found at https://accounts.brightcove.com/en/terms-and-conditions/. 
		  -->
		  <script type="text/javascript">
				var player;
 
				var modVP;
				var modExp;
				var modCon;
				var previousVideoID=0;
				var currentVideo;
				var videosToSwap=new Array(1530831293001,1530836318001); //videos we will swap
				 
				function myTemplateLoaded(experienceID) {
					player = brightcove.api.getExperience(experienceID);
					modVP = player.getModule(brightcove.api.modules.APIModules.VIDEO_PLAYER);
					modExp = player.getModule(brightcove.api.modules.APIModules.EXPERIENCE);
					modCon = player.getModule(brightcove.api.modules.APIModules.CONTENT);
					//modExp.addEventListener(brightcove.api.events.ExperienceEvent.TEMPLATE_READY, onTemplateReady);
				}
				 
				function onTemplateReady(evt) {
					modVP.addEventListener(brightcove.api.events.MediaEvent.BEGIN, onMediaEventFired);
					modVP.addEventListener(brightcove.api.events.MediaEvent.CHANGE, onMediaEventFired);
					modVP.addEventListener(brightcove.api.events.MediaEvent.COMPLETE, onMediaEventFired);
					modVP.addEventListener(brightcove.api.events.MediaEvent.ERROR, onMediaEventFired);
					modVP.addEventListener(brightcove.api.events.MediaEvent.PLAY, onMediaEventFired);
					modVP.addEventListener(brightcove.api.events.MediaEvent.PROGRESS, onMediaProgressFired);
					modVP.addEventListener(brightcove.api.events.MediaEvent.STOP, onMediaEventFired);
				}
				function onMediaEventFired(evt) {
				   //document.getElementById("eventLog").innerHTML += "MEDIA EVENT: " + evt.type + " fired at position: " + evt.position + "<BR>";
				}

				function onMediaProgressFired(evt) {
				   //document.getElementById("positionLog").innerHTML = "CURRENT POSITION: " + evt.position;
				}
				function changeVideo(id) {
				   //modVP.getCurrentVideo(currentVideoCallback);
				   modVP.loadVideoByID(id);
				}
				function select_parent(element){
					$(element).parent().addClass('selected-li');
				}
		  </script>
	</div>
</div>
<div class="patient-help-text">
	<div class="pat-empty">&nbsp;</div>
	<div class="pat-msg"><h2><?php print t('Select a video to play:'); ?></h2></div>
</div>
<div class="patient-gallery-container">
	<div class="patient-carer-category patient-carer-category-road-recovery">The road to recovery a carer's perspective<!--<img src='/sites/default/files/the-road-to-recovery.png' /> --></div>
	<div class="patient-carer-gallery road-recovery"><?php print views_embed_view('patient_carer_gallery', 'default',307); ?></div>
</div>
<div class="patient-gallery-container">
	<div class="patient-carer-category patient-carer-category-impact-schizo"> The impact of schizophrenia on friends and family<!--<img src='/sites/default/files/the-imapct-of-schizo.png' /> --></div>
	<div class="patient-carer-gallery impact-schizo"><?php print views_embed_view('patient_carer_gallery', 'default',308); ?></div>
</div>
<div class="patient-gallery-container">
	<div class="patient-carer-category patient-carer-category-looking-fwd">Looking forward:<br />Ronen shares his hopes and plans for the future<!--<img src='/sites/default/files/looking-fwd.png' /> --></div>
	<div class="patient-carer-gallery looking-fwd"><?php print views_embed_view('patient_carer_gallery', 'default',309); ?></div>
</div>