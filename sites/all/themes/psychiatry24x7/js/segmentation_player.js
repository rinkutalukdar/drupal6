var cuepointslist;
var video_duration = 0;
var bcExp;
var modExp;
var modCue;
var modVid;
var queuedTime;
// Values in PERCENTAGE
//var pHeight = 270;
var pHeight = 51;
//var pWidth = 480;
//var pWidth = 33;
var pWidth = 33;
//var sWidth = 720;
//var sWidth = 64;
var sWidth = 64;
//var sHeight = 652;
var sHeight = 100;
var playStatus = 'play'; // play | pause
var muteStatus = 'mute'; //mute | unmute
var volumeValue = 0.5;
var thumbsView = 'hide';
var FitToScreenStatus = 'collapsed'; // expanded | collapsed
var hVideo;
var wVideo;
var switchPlayerStatus = 'reduced'; //reduced | enlarged
var wStdPlayer;
var hStdPlayer;
var wStdSlide;
var hStdSlide;
var animateSpeed = 800;
var slideInitHeight; // Initial height of the slide image in pixels
var vdo_play=[];
document.createElement('header');
document.createElement('footer');
document.createElement('nav');
document.createElement('figure');
document.createElement('section');
document.createElement('details');
document.createElement('aside');
document.createElement('article');
var BCL = {};
BCL.currentPlayerWidth = 1;
var $BCLbodyContent = $('#webplayer_container');
var $BCLcontainingBlock = $('#wp_video_wrapper');

/*BRIGHTCOVE RELATED*/
/**
 * Automatically called by the Brightcove API.
 */

function onTemplateLoaded(experienceId) {

	bcExp = brightcove.getExperience(experienceId);	
	// get references to the modules we'll need
	modExp = bcExp.getModule(APIModules.EXPERIENCE);
	BCL.exp = bcExp.getModule(APIModules.EXPERIENCE);
	modVid = bcExp.getModule(APIModules.VIDEO_PLAYER);	
	// listen for the content load event so we can grab the videos cuepoints
	modExp.addEventListener(BCExperienceEvent.CONTENT_LOAD, onContentLoad);
	modVid.addEventListener(brightcove.api.events.MediaEvent.PROGRESS, onProgressModi);
	//PLAY events
	//modVid.addEventListener(brightcove.api.events.MediaEvent.PLAY, onVideoPlay);
	//modVid.addEventListener(brightcove.api.events.MediaEvent.STOP, onVideoStop);
	modVid.addEventListener(brightcove.api.events.MediaEvent.COMPLETE, onVideoComplete);	
	
	// Bind actions to player buttons

}
/**
 * Called when the video content is loaded.
 */

function onContentLoad(event) {
	console.log('onContentLoad1:');
	// Update duration
	video_duration = modVid.getCurrentVideo().length;
	// Convert to seconds
	if (video_duration) {
		video_duration = video_duration / 1000;
	}
	wpUpdateDuration();
	console.log('onContentLoad2:');
	// Update volume c	
	// Seek slider
	
	//$(function() {
	console.log('onContentLoad3:');
	
	jq( "#wp_seek_slider" ).slider({
		range: "min",
		value: 0,
		min: 0,
		max: video_duration,
		slide: function( event, ui ) {
			updateCurrentPosition(ui.value);
			// Update seek
			seek(ui.value);
			
		}
	});
	//updateCurrentPosition(0);
	console.log('onContentLoad4:');
	//});
	console.log('onContentLoad5:');
}

function onProgressModi(event) {
	//console.log(event.position);
	jq( "#wp_seek_slider" ).slider( "value", event.position );
	// Update current video position to seek bar
	updateCurrentPosition(event.position);
}

/**
 * Seeks to the given time in the video.
 */
function seek(time) {
	// it's not possible to seek unless the video is playing
	// so check to see if it's playing and if it's not then
	// save the time and tell the video to play
	if (modVid.isPlaying()) {
		modVid.seek(time);
	}
	else {
		queuedTime = time;
		modVid.addEventListener(BCMediaEvent.PROGRESS, onProgress);
		modVid.play();
	}
}

/**
 * Called when the video starts playing.
 */
function onProgress(event) {
	// remove the progress event listener and seek to the saved time
	modVid.removeEventListener(BCMediaEvent.PROGRESS, onProgress);
	seek(queuedTime);	
}
function updateCurrentPosition(val) {
	val = convertToTime(val);
	$( "#wp_currentposition" ).html( "&nbsp;&nbsp;&nbsp;" + val);
}
// Update video duration value
function wpUpdateDuration() {
	$( "#wp_duration" ).html(convertToTime(video_duration));
}
function convertToTime(count) {
	if (isNaN(count)) count = 0;
	var hrs = Math.floor(count/3600);
	var tmp = count - (hrs*3600);
	var mnts = Math.floor(tmp/60);
	var seconds = Math.floor(tmp-(mnts*60));
	return hrs  + ":" + mnts + ":" + seconds;
}
function onVideoComplete(event) {
	playStatus = 'play';
	$('#play-btn').removeClass('pause-btn').addClass('play-btn');
	//console.log('Video completed');
	$('#webplayer_container .btn-controls').hide();
	$('.user-input-form').show();
}

function onVideoStop() {
	$('#play-btn').removeClass('pause-btn').addClass('play-btn');
	//console.log('Video stopped');
}

function onVideoPlay(event) {
	playStatus = 'pause';
	$('#play-btn').removeClass('play-btn').addClass('pause-btn');
	//console.log('Video Playing');
}

function onVideoMuteChange() {
	//playStatus = 'pause';
	//$('#play-btn').removeClass('play-btn').addClass('pause-btn');
	//console.log('Video Mute Change');
}

function setVolume(value) {
	value = value/100;
	if (value > 1) {
		value = 1;
	}	
	else if (value < 0) {
		value = 0;
	}
	// Set global value
	volumeValue = value;
	// Set volume 	
	modVid.setVolume(value);
	// Add mute class if necessary
	if (value <= 0) {
		$('#wp_volume_icon').addClass('mute');
	}
	else {
		$('#wp_volume_icon').removeClass('mute');
	}
}
function changeVideo(id) {
   
   modVid.loadVideo(id);
}
$(document).ready(function(){	
	// Bind play
	$('#play-btn').bind('click', function() {
		if (playStatus == 'play') {
			modVid.play();
			playStatus = 'pause';
			$('#play-btn').removeClass('play-btn').addClass('pause-btn');
		}
		else if(playStatus == 'pause'){
			modVid.pause();
			playStatus = 'play';
			$('#play-btn').removeClass('pause-btn').addClass('play-btn');
		}
		// Show seek and mute
		$('#duration-wrapper').show();
		$('#stream_timeline_wrapper').show();
		$('#mute-wrapper').show();
	});
		// Bind mute control events
	$('#wp_volume_icon').bind('click', function() {
		if (muteStatus == 'mute') {
			setVolume(0);
			muteStatus = 'unmute';
		}
		else if (muteStatus == 'unmute') {
			if (!volumeValue) {
				volumeValue = 50;
			}			
			setVolume(volumeValue);
			muteStatus = 'mute';
		}
	});
	
	$('.user-input-form .btn-row input').click(function(){
		$.ajax({
			url: '/markinspace_videos_to_load',
			method: 'POST',
			data: 'nid=1',
			success: function(data){
				var json = eval("("+data+")");
				var arr=[];
				for(var i in json.data){
					vdo_play[i] = json.data[i];
					
		
				}
				$('.user-input-form').hide();
				changeVideo(vdo_play[0]);
			}
		  });
	});
	/*
	jq( "#wp_seek_slider" ).slider({
		range: "min",
		value: 0,
		min: 0,
		max: video_duration,
		slide: function( event, ui ) {
			//updateCurrentPosition(ui.value);
			// Update seek
			//seek(ui.value);
			
		}
	});	
	//$.noConflict();
	*/
	
});
$(window).resize(function() {
	BCL.log("window resize");
	//BCL.resizePlayer(BCL.currentPlayerWidth);
});
// debugging tool - wraps console.log to avoid errors in IE 7 & 8
BCL.log = function(message) {
	if (window["console"] && console["log"]) {
	  var d = new Date();
	  console.log(d + ": ");
	  console.log(message);
	}
}

BCL.resizePlayer = function(newWidth) {
	//BCL.log(newWidth + '==$BCLbodyContent.width()=' + $BCLbodyContent.width() + '==$BCLcontainingBlock.width()=' + $BCLcontainingBlock.width() +"==$BCLcontainingBlock.height()="+$BCLcontainingBlock.height());
	$('.tab_container #tab2').width($('.tab_container #tab2').width() * newWidth);
	BCL.exp.setSize($('.tab_container #tab2').width(),$('.tab_container #tab2').height());
	BCL.currentPlayerWidth = newWidth;
}