/**
 * Works when Cancel button of DHTML popup clicked.
 */
function cancel_fn(admin_choice) {
  if (admin_choice == 1) {
		parent.ext_window.hide();
	}
}

/**
 * Redirecting pages based on the Popup selected (DHTML/Web) to continue the url in new/existing window.
 */
function ok_fn(url, admin_choice, target) {
  if (admin_choice == '1') {
    if (target == '_blank') {
			parent.ext_window.hide();
			window.open(url);
		}
		else {
			parent.ext_window.hide();
			parent.location.href = url;
		}
  }
  else {
    parent.history.back();
  }
}