// -------------------------------------------------------------------
// DHTML Modal window- By Dynamic Drive, available at: http://www.dynamicdrive.com
// v1.0: Script created Feb 27th, 07'
// v1.01 May 5th, 07' Minor change to modal window positioning behavior (not a bug fix)
// REQUIRES: DHTML Window Widget (v1.01 or higher): http://www.dynamicdrive.com/dynamicindex8/dhtmlwindow/
// -------------------------------------------------------------------



function extlink_window(path, url, target, dWidth, dHeight){
  ext_window = dhtmlmodal.open('External Link', 'iframe', path+'&url='+url, 'External Link Page', path, 'width='+dWidth+'px,height='+dHeight+'px,center=1,resize=0,scrolling=0');
  ext_window.onclose =  function(){ //Define custom code to run when window is closed
		var theform = this.contentDoc.forms[0]; //Access first form inside iframe just for your reference
	
  }
}
