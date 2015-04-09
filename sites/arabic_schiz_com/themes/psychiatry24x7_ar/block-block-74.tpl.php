<?php
// $Id: block.tpl.php,v 1.0 2010/10/12 15:55:00 narendra.b Exp $
?>
<div id="block-<?php print $block->module .'-'. $block->delta; ?>" class="clear-block block block-<?php print $block->module ?>">
<?php 
	global $base_url;
    // echo $base_url;
    $imgPath = $base_url."/".path_to_theme()."/images/";
    // echo "Gopal".$imgPath;
    echo "<div id='youtube_container'>";
    echo "<img src = ".$imgPath."hd_checkout.gif></img>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src = ".$imgPath."hd_youtube.gif></img>";
    echo "<br /><br />";
 	   //print $block->content;
 	   ?>
 	   <object height="160" width="140">	   
			<param value="http://www.youtube.com/e/<?php print getMostRecentYouTubeVideoID()?>?enablejsapi=1&version=3&enablejsapi=1&playerapiid=scz_youtube&border=0&rel=0&showinfo=0" name="movie">
			<param value="true" name="allowFullScreen">
			<param value="always" name="allowScriptAccess">
			<param value="transparent" name="wmode"> 
		    <embed height="160" width="140" wmode="transparent" allowscriptaccess="always" allowfullscreen="true" type="application/x-shockwave-flash" src="http://www.youtube.com/e/<?php print getMostRecentYouTubeVideoID()?>?enablejsapi=1&version=3&enablejsapi=1&playerapiid=scz_youtube&border=0&rel=0&showinfo=0" id="scz_youtube">
	   </object>

<?php 
    echo "</div>"; 
    
    echo "<div id='youtube_ftcontainer'><p>";
    echo "<a href ='http://www.youtube.com' target='_blank' id='current_video_url'>".t('Visit our youtube page')."</a>";
    echo "</p></div>";
?>
</div>

<?php 
/*
 * The below script is used to change the anchor tag URL to the current video playing.
 * The youtube player when loaded it will call onYouTubePlayerReady function
 * We are hooking a custom function on 'onstatechange' event
 * Changing the href of anchor to current video url.  
 */
?>
<script>
function onYouTubePlayerReady(playerId) {
	ytplayer = document.getElementById("scz_youtube");
    ytplayer.addEventListener("onStateChange", "onytplayerStateChange");
}

function onytplayerStateChange(newState) {
	   if(ytplayer){
			var url = ytplayer.getVideoUrl();
			$("a#current_video_url").attr("href", url);
	   }   	   
}
</script>

<?php 
/*
 * Helper function to fetch the latest youtube video ID
 */
function getMostRecentYouTubeVideoID(){
  module_load_include('inc', 'aggregator', 'aggregator.pages');
  $feed = new stdClass();
  $feed->fid = 8; //Feed id for YouTube Videos is 8
  // It is safe to include the fid in the query because it's loaded from the
  // database by aggregator_feed_load.
  $items = aggregator_feed_items_load('SELECT * FROM {aggregator_item} WHERE fid = '. $feed->fid .'  ORDER BY timestamp DESC, iid DESC');
  //print_r($items);
  foreach( $items as $key => $item){
		$most_recent_video_url = $item->link; //get only the first item URL and break the foreach.
		break;
  }
  $url = parse_url($most_recent_video_url); // Parse a URL and return its components
  parse_str($url['query']); //Parses the string into variables
  $video_id = $v;
return $video_id;
}
?>