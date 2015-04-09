if (Drupal.jsEnabled) {
  $(document).ready(function() {
    // Strip the host name down, removing subdomains or www.
		$("div.textarea-identifier").hide();
		$("#edit-extlink-white-list").removeClass('resizable');
		$("#edit-extlink-white-list").removeClass('fckeditor');
		$("#edit-extlink-white-list").removeClass('fckeditor-processed');

    var host = window.location.host.replace(/^(([^\/]+?\.)*)([^\.]{4,})((\.[a-z]{1,4})*)$/, '$3$4');
    var subdomain = window.location.host.replace(/^(([^\/]+?\.)*)([^\.]{4,})((\.[a-z]{1,4})*)$/, '$1');

    // Determine what subdomains are considered internal.
    if (Drupal.settings.extlink.extSubdomains) {
      var subdomains = "([^/]*)?";
    }
    else if (subdomain == 'www.' || subdomain == '') {
      var subdomains = "(www\.)?";
    }
    else {
      var subdomains = subdomain.replace(".", "\.");
    }

    // Build regular expressions that define an internal link.
    var internal_link = new RegExp("^https?://" + subdomains + host, "i");

    // Find all links which are NOT internal and begin with http (as opposed
    // to ftp://, javascript:, etc. other kinds of links.
    // When operating on the 'this' variable, the host has been appended to
    // all links by the browser, even local ones.
    // In jQuery 1.1 and higher, we'd us a filter method here, but it is not
    // available in jQuery 1.0 (Drupal 5 default).
    var external_links = new Array();
    var mailto_links = new Array();
   
    var White_list = Drupal.settings.extlink.extWhiteList;
    if (White_list != '') 
    {
	  wlist = White_list;
	  White_list = '';
	  White_list_arr = wlist.split(",");
	  for (var i=0;i<White_list_arr.length;i++ )
	  {
		White_list_arr[i] += "/";
	  }
	  White_list = White_list_arr.join();
    }

    $("a").each(function(el) {
      try {
        var url = this.href.toLowerCase();
        White_list = White_list.toLowerCase();
        if (White_list != '') {
          if (White_list.indexOf(url) < 0 && (url.indexOf('http') == 0 && !url.match(internal_link))) {
            //alert('exter'+this);
            external_links.push(this);
          }
        }
		else {
		  if (url.indexOf('http') == 0 && !url.match(internal_link)) {
            external_links.push(this);
          }
		}
      }

      // IE7 throws errors often when dealing with irregular links, such as:
      // <a href="node/10"></a> Empty tags.
      // <a href="http://user:pass@example.com">example</a> User:pass syntax.
      catch(error) {
        return false;
      }
    });

    if (Drupal.settings.extlink.extClass) {
      // Apply the "ext" class to all links not containing images.
      if (parseFloat($().jquery) < 1.2) {
        $(external_links).not('[img]').addClass(Drupal.settings.extlink.extClass);
      }
      else {
        $(external_links).not($(external_links).find('img').parents('a')).addClass(Drupal.settings.extlink.extClass);
      }
    }
    $(external_links).click( function() {
      if (Drupal.settings.extlink.extPromptType == '0') {
        if (Drupal.settings.extlink.extTarget == '_blank')
        {
		  $(external_links).attr('target', Drupal.settings.extlink.extTarget);
        }
		confirmed = window.confirm(Drupal.settings.extlink.extTarget_Msg); if(!confirmed) { return false; }
      }
      else if (Drupal.settings.extlink.extPromptType == 1) {
        // Apply the target attribute to all links.
				dthmlWidth = Drupal.settings.extlink.extDhtmlWidth;
				dthmlHeight = Drupal.settings.extlink.extDhtmlHeight;
				extlink_window(Drupal.settings.extlink.path, this, Drupal.settings.extlink.extTarget, dthmlWidth, dthmlHeight);
				//$("select#edit-block-maxdistance").attr('z-index', -10);
        return false;
      }
      else {

          window.location.href = Drupal.settings.extlink.path+'&url='+this;
          return false;
      }
    } );

	// Code to display the configurations in Edit mode
	if (Drupal.settings.extlink.extPromptType == 0) {
	  $('#extlink-prompt-formats').hide();
	  $('#extlink-prompt-buttons').hide();
		$('#extlink-dhtml-width').hide();
		$('#extlink-dhtml-height').hide();
	}
	else if (Drupal.settings.extlink.extPromptType == "1")
	{ 
	  if (Drupal.settings.extlink.extPromptDhtml == 'dhtml_button') {
	    $('#extlink-prompt-buttons').hide();
		$('#extlink-dhtml-image').hide();
		$('#extlink-prompt-web').hide();
	  }
	  else
      {
	    $('#extlink-prompt-buttons').show();
		$('#extlink-prompt-web').hide();
		$('#extlink-dhtml-image').show();
		$('#extlink-web-image').hide();
	  }
		$('#extlink-dhtml-width').show();
		$('#extlink-dhtml-height').show();
	}
	else if (Drupal.settings.extlink.extPromptType == "2")
	{
	  if (Drupal.settings.extlink.extPromptWeb == 'web_button') {
	    $('#extlink-prompt-buttons').hide();
		$('#extlink-web-image').hide();
		$('#extlink-prompt-dhtml').hide();
	  }
	  else 
      {
	    $('#extlink-prompt-buttons').show();
		$('#extlink-web-image').show();
		$('#extlink-prompt-dhtml').hide();
		$('#extlink-dhtml-image').hide();
	  }
		$('#extlink-dhtml-width').hide();
		$('#extlink-dhtml-height').hide();
	}

	if (Drupal.settings.extlink.extPromptTypeTemp == "1")
	{ 
	  if (Drupal.settings.extlink.extPromptDhtmlTemp == 'dhtml_button') {
	    $('#extlink-prompt-buttons').hide();
		$('#extlink-dhtml-image').hide();
		$('#extlink-prompt-web').hide();
	  }
	  else
      {
	    $('#extlink-prompt-buttons').show();
		$('#extlink-prompt-dhtml').show();
		$('#extlink-prompt-web').hide();
		$('#extlink-dhtml-image').show();
		$('#extlink-web-image').hide();
	  }
	}
	if (Drupal.settings.extlink.extPromptTypeTemp == "2")
	{
	  if (Drupal.settings.extlink.extPromptWebTemp == 'web_button') {
	    $('#extlink-prompt-buttons').hide();
		$('#extlink-web-image').hide();
		$('#extlink-prompt-dhtml').hide();
	  }
	  else 
      {
	    $('#extlink-prompt-buttons').show();
		$('#extlink-prompt-web').show();
		$('#extlink-web-image').show();
		$('#extlink-prompt-dhtml').hide();
		$('#extlink-dhtml-image').hide();
	  }
	}
  });
}

/**
 * Show/hide System Prompt options.
 */
Drupal.behaviors.extlink = function() {
  $("div.textarea-identifier").hide();
	$("#edit-extlink-white-list").removeClass('resizable');
	$("#edit-extlink-white-list").removeClass('fckeditor');
	$("#edit-extlink-white-list").removeClass('fckeditor-processed');

	$("input[name='extlink_prompt_type'][value=2]").click(function() {
		$('#extlink-prompt-formats').show('slow');
		$('#extlink-prompt-web').show('slow');
		$('#extlink-prompt-dhtml').hide('slow');
		$('#extlink-prompt-buttons').hide('slow');
		$('#extlink-dhtml-width').hide();
		$('#extlink-dhtml-height').hide();
	
  });

  $("input[name='extlink_prompt_type_web'][value='web_button']").click(function() {
    $('#extlink-prompt-buttons').hide('slow');
  });

  $("input[name='extlink_prompt_type_web'][value='web_image']").click(function() {
    $('#extlink-prompt-buttons').show('slow');
		$('#extlink-web-image').show('slow');
    $('#extlink-dhtml-image').hide('slow');
  });

  $("input[name='extlink_prompt_type'][value=1]").click(function() {
		$('#extlink-prompt-formats').show('slow');
		$('#extlink-prompt-web').hide('slow');
		$('#extlink-prompt-dhtml').show('slow');
		$('#extlink-prompt-buttons').hide('slow');
		
		$('#extlink-dhtml-width').show();
		$('#extlink-dhtml-height').show();
  });

  $("input[name='extlink_prompt_type_dhtml'][value='dhtml_button']").click(function() {
    $('#extlink-prompt-buttons').hide('slow');
  });

  $("input[name='extlink_prompt_type_dhtml'][value='dhtml_image']").click(function() { 
    $('#extlink-prompt-buttons').show('slow');
		$('#extlink-dhtml-image').show('slow');
    $('#extlink-web-image').hide('slow');
  });

  $("input[name='extlink_prompt_type'][value=0]").click(function() {
		$('#extlink-prompt-formats').hide('slow');
		$('#extlink-prompt-buttons').hide('slow');
		$('#extlink-dhtml-width').hide();
		$('#extlink-dhtml-height').hide();
  });

  $("input#edit-extlink-submit").click(function() {
    if ($("#edit-extlink-dhtml-image-ok").val().length == 0) {
			$('input#edit-extlink-dhtml-image-ok').attr("value", "http://");
    }
    if ($("#edit-extlink-dhtml-image-cancel").val().length == 0) {
			$('input#edit-extlink-dhtml-image-cancel').attr("value", "http://");
    }
    if ($("#edit-extlink-web-image-ok").val().length == 0) {
			$('input#edit-extlink-web-image-ok').attr("value", "http://");
    }
    if ($("#edit-extlink-web-image-cancel").val().length == 0) {
			$('input#edit-extlink-web-image-cancel').attr("value", "http://");
    }

		if ($("#edit-extlink-dhtml-width").val() == '' || $("#edit-extlink-dhtml-width").val() == 0) {
			$('input#edit-extlink-dhtml-width').attr("value", "500");
    }
		if ($("#edit-extlink-dhtml-height").val() == '' || $("#edit-extlink-dhtml-height").val() == 0) {
			$('input#edit-extlink-dhtml-height').attr("value", "240");
    }
  });

$('input[id="edit-extlink-web-ok"]').click(function() {
  var src = Drupal.settings.extlink.externalLink;
  if (Drupal.settings.extlink.extTarget == '_blank')
  {
		window.open(src, Drupal.settings.extlink.extTarget);
		parent.history.back();
  }
  else 
    parent.location.href = src;
	return false;
})

$("input#edit-internet-button").click(function() {
	var host = window.location.host.replace(/^(([^\/]+?\.)*)([^\.]{4,})((\.[a-z]{1,4})*)$/, '$3$4');
    var subdomain = window.location.host.replace(/^(([^\/]+?\.)*)([^\.]{4,})((\.[a-z]{1,4})*)$/, '$1');

    // Determine what subdomains are considered internal.
    if (Drupal.settings.extlink.extSubdomains) {
      var subdomains = "([^/]*)?";
    }
    else if (subdomain == 'www.' || subdomain == '') {
      var subdomains = "(www\.)?";
    }
    else {
      var subdomains = subdomain.replace(".", "\.");
    }

    // Build regular expressions that define an internal link.
    var internal_link = new RegExp("^https?://" + subdomains + host, "i");

    var external_links = new Array();
    var mailto_links = new Array();
    var White_list = Drupal.settings.extlink.extWhiteList;
    if (White_list != '') 
    {
	  wlist = White_list;
	  White_list = '';
	  White_list_arr = wlist.split(",");
	  for (var i=0;i<White_list_arr.length;i++ )
	  {
		White_list_arr[i] += "/";
	  }
	  White_list = White_list_arr.join();
    }

    $("a").each(function(el) {
      try {
        var url = this.href.toLowerCase();
        White_list = White_list.toLowerCase();
        if (White_list != '') {
          if (White_list.indexOf(url) < 0 && (url.indexOf('http') == 0 && !url.match(internal_link))) {
            //alert('exter'+this);
            external_links.push(this);
          }
        }
		else {
		  if (url.indexOf('http') == 0 && !url.match(internal_link)) {
            external_links.push(this);
          }
		}
      }

      catch(error) {
        return false;
      }
    });

    if (Drupal.settings.extlink.extClass) {
      // Apply the "ext" class to all links not containing images.
      if (parseFloat($().jquery) < 1.2) {
        $("a.internetsearch").not('[img]').addClass(Drupal.settings.extlink.extClass);
      }
      else {
        $("a.internetsearch").not($("a.internetsearch").find('img').parents('a')).addClass(Drupal.settings.extlink.extClass);
      }
    }

    if ($("a.internetsearch").attr('href') != Drupal.settings.extlink.basePath && $("a.internetsearch").attr('href') != '')
    {
     
      if (Drupal.settings.extlink.extPromptType == '0') {
		confirmed = window.confirm(Drupal.settings.extlink.extTarget_Msg); if(!confirmed) { return false; }
		if (confirmed && Drupal.settings.extlink.extTarget == '_blank')
		{
			window.open($("a.internetsearch").attr('href'));
			return false;
		}
      }
      else if (Drupal.settings.extlink.extPromptType == 1) {
        // Apply the target attribute to all links.
        extlink_window(Drupal.settings.extlink.path, $("a.internetsearch").attr('href'), Drupal.settings.extlink.extTarget);
        return false;
      }
      else {
          window.location.href = Drupal.settings.extlink.path+'&url='+$("a.internetsearch").attr('href');
          return false;
      }
	}
  });
}
