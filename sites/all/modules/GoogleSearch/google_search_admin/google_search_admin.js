if (Drupal.jsEnabled) {
  $(document).ready(function() {
    if (Drupal.settings.google_search_admin.autoComplete == 1) {
	  $('#search-auto-complete-location').show();
	}
	if (Drupal.settings.google_search_admin.autoComplete == 0) {
	  $('#search-auto-complete-location').hide();
	}
	if (Drupal.settings.google_search_admin.autoCompleteTemp == 1) {
	  $('#search-auto-complete-location').show();
	}
	
  });
}

/**
 * Show/hide location of the auto-complete web service.
 */
Drupal.behaviors.google_search_admin = function() {
  jQuery("input#edit-search-auto-complete").click(function() {
	if (this.checked == true)	{
	  $('#search-auto-complete-location').show('slow');
	}
	else {
	  $('#search-auto-complete-location').hide('slow');
	}
	
  });

  $("input#edit-google-search-admin-submit").click(function() {
	  if ($("input[@name='search_auto_complete']:checked").val())
	  {
		return true;
	  }
	  else {
		if ($("#edit-search-auto-complete-location").val().length == 0) {
	      $('input#edit-search-auto-complete-location').attr("value", "http://");
	    }
	  }
  });
};
