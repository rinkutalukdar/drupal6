/**
 * Works when Cancel button of DHTML popup clicked.
 */
function cancel_fn(url_id, admin_choice) {

  if (admin_choice == 1) {
		parent.ext_window.hide();
	}
  if (admin_choice == 3) {
		window.close();
	}
  if (admin_choice == 3) {
		window.close();
	}
  if (admin_choice == 4) {
	  $("#disclaimer-"+url_id).remove();
	}
}

/**
 * Redirecting pages based on the Popup selected (DHTML/Web) to continue the url in new/existing window.
 */
function ok_fn(url, admin_choice, target, url_id) {
	
	if (admin_choice == '1') {
		if (target == '_blank') {
			parent.ext_window.hide();
			window.open(url);
		} else {
			parent.ext_window.hide();
			parent.location.href = url;
		}
	} else if (admin_choice == '3') {
		if (target == '_blank') {
			window.close();
			window.open(url);
		} else {
			var parentWindow = window.opener;
			window.close();
			parentWindow.location.href = url;
		}
	} else if (admin_choice == '4') {
		
		if($("#"+url_id).hasClass("addthis-siteexit")) {
			var link = $("#"+url_id);
			addthis_open(link, "", "[URL]", "[TITLE]");
		} else {
			if (target == '_blank') {
				window.open(url);
			} else {
				window.location.href = url;
			}
		}
		$("#disclaimer-"+url_id).remove();
	} else {
		parent.history.back();
	}
}
