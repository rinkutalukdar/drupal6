// -------------------------------------------------------------------
// DHTML Modal window- By Dynamic Drive, available at: http://www.dynamicdrive.com
// v1.0: Script created Feb 27th, 07'
// v1.01 May 5th, 07' Minor change to modal window positioning behavior (not a bug fix)
// REQUIRES: DHTML Window Widget (v1.01 or higher): http://www.dynamicdrive.com/dynamicindex8/dhtmlwindow/
// -------------------------------------------------------------------

function extlink_window(path, url, target, dWidth, dHeight){
  url = encodeURIComponent(url);
  ext_window = dhtmlmodal.open('External Link', 'iframe', path+'&url='+url, Drupal.settings.extlink.extDhtmlTitle, path, 'width='+dWidth+'px,height='+dHeight+'px,center=1,resize=0,scrolling=0');
  ext_window.onclose =  function(){ //Define custom code to run when window is closed
    var theform = this.contentDoc.forms[0]; //Access first form inside iframe just for your reference

  }
}

function extlink_window_onmouseover(path, url, target){
  if(!($("#disclaimer-"+$(url).attr("id")).length > 0)) {
    $.ajax({
      url: path+"&url="+url+"&url_id="+$(url).attr("id"),
      async: false,
      success: function(data) {
        var res = data;
        $("body").append("<div id='disclaimer-"+$(url).attr("id")+"' class='disclaimer' style='display:none;'>" + res + "</div>");

        var selector = jQuery(url), link = url, queueName = 'tooltip_close';
          Drupal.extlink.startQueue( selector, queueName);

          var position = selector.offset();
          position.top += selector.height();

          // Position and display the disclaimer tooltip.
          $(".disclaimer").css({
            background: 'url('+Drupal.settings.extlink.extHoverBackgroundimage+') no-repeat scroll 0 0 transparent',
              color: '#'+Drupal.settings.extlink.extHoverBackgroundcolor,
              width: Drupal.settings.extlink.extHoverBackgroundwidth+'px',
              height: Drupal.settings.extlink.extHoverBackgroundheight+'px'
          });
          position.left += (( selector.width() / 2 ) - ( $("#disclaimer-"+$(url).attr("id")).width() / 2 ) );
          $(".disclaimer").css({
            position: 'absolute',
            top: position.top + 'px',
            left: position.left + 'px'
          });
          $("#disclaimer-"+$(url).attr("id")).show();

          jQuery("#disclaimer-"+$(url).attr('id')+" input[id='continue-button']").click(function( e2 ) {
            if($(url).hasClass("addthis-siteexit")) {
                addthis_open(link, "", "[URL]", "[TITLE]");
            } else {
              if(Drupal.settings.extlink.extTarget == '_blank') {
                window.open(url);
              } else {
                window.location.href = url;
              }
            }
              $("#disclaimer-"+$(url).attr("id")).remove();
            });
          jQuery("#disclaimer-"+$(url).attr('id')+" input[id='cancel-button']").click(function( e2 ) {
              $("#disclaimer-"+$(url).attr("id")).remove();
            });
          jQuery('#disclaimer-'+$(url).attr("id")+' a[id="continue-image"]').click(function( e2 ) {
            if($(url).hasClass("addthis-siteexit")) {
                addthis_open(link, "", "[URL]", "[TITLE]");
            } else {
              if(Drupal.settings.extlink.extTarget == '_blank') {
                window.open(url);
              } else {
                window.location.href = url;
              }
            }
              $("#disclaimer-"+$(url).attr("id")).remove();
            });
          jQuery("#disclaimer-"+$(url).attr('id')+" a[id='cancel-image']").click(function( e2 ) {
              $("#disclaimer-"+$(url).attr("id")).remove();
            });


          // Handle the queue.
          setTimeout(function() {
            if ( selector.dequeue( queueName ) == 0 ) {
              $("#disclaimer-"+$(this).attr("id")).remove();
            }
            // Add new function to queue.
            selector.queue( queueName, function() {
              $("#disclaimer-"+$(this).attr("id")).remove();
            });
          }, Drupal.settings.extlink.extHoverTimeout * 1000);
      }
    });
  }
}