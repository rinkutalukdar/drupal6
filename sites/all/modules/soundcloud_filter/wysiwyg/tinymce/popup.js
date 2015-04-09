
/**
 * Insert function.
 *
 * Generate the filter code and inster to the textarea.
 */
function insertSoundcloudFiltterCode() {
  var ed = tinyMCEPopup.editor, f = document.forms[0], nl = f.elements, v, args = {}, el;
  var elm = ed.selection.getNode().innerHTML;
  tinyMCEPopup.restoreSelection();

  // Delete original content
  if (elm != null && elm.match(/\[soundcloud:[^\]]*\]/)) {
    ed.selection.getNode().innerHTML = ed.selection.getNode().innerHTML.replace(/\[soundcloud:[^\]]*\]/, '');
  }

  if (nl.soundcloud_filter_url.value === '') {
    ed.execCommand('mceRepaint');
    tinyMCEPopup.close();
    return;
  }
  else {
    var filter_string = '[soundcloud:' + nl.soundcloud_filter_url.value;

    if (nl.soundcloud_filter_width.value !== '') {
      filter_string += ' width=' + nl.soundcloud_filter_width.value;
    }

    if (nl.soundcloud_filter_height.value !== '') {
      filter_string += ' height=' + nl.soundcloud_filter_height.value;
    }

    if (nl.soundcloud_filter_setheight.value !== '') {
      filter_string += ' setheight=' + nl.soundcloud_filter_setheight.value;
    }

    if (nl.soundcloud_filter_showcomments.checked) {
      filter_string += ' showcomments=true';
    }

    if (nl.soundcloud_filter_autoplay.checked) {
      filter_string += ' autoplay=true';
    }

    if (nl.soundcloud_filter_showplaycount.checked) {
      filter_string += ' showplaycount=true';
    }

    if (nl.soundcloud_filter_showartwork.checked) {
      filter_string += ' showartwork=true';
    }

    if (nl.soundcloud_filter_color.value !== '') {
      filter_string += ' color=' + nl.soundcloud_filter_color.value;
    }    

    filter_string += ']';

    ed.execCommand('mceInsertContent', false, filter_string);
    ed.undoManager.add();

    tinyMCEPopup.close();
    return;
  }
}

/**
 * Init function.
 *
 * Set the form values in edit process.
 */
function init() {
  // The selected text
	var elm = tinyMCEPopup.editor.selection.getNode().innerHTML;
  // Form elements
  var elements = document.forms[0].elements;
  // Regular result
  var reg_res;

  // If found soundcloud filter
  if (elm != null && elm.match(/\[soundcloud:[^\]]*\]/)) {
    // Set url value
    reg_res = elm.match(/\[soundcloud:([^ \]]*).*\]/);
    elements['soundcloud_filter_url'].value = reg_res[1];

    // If width found
    reg_res = elm.match(/ width=([^ \]]*).*\]/);
    if (reg_res !== null) {
      elements['soundcloud_filter_width'].value = reg_res[1];
    }

    // If height found
    reg_res = elm.match(/ height=([^ \]]*).*\]/);
    if (reg_res !== null) {
      elements['soundcloud_filter_height'].value = reg_res[1];
    }

    // If setheight found
    reg_res = elm.match(/ setheight=([^ \]]*).*\]/);
    if (reg_res !== null) {
      elements['soundcloud_filter_setheight'].value = reg_res[1];
    }    

    // If show comments is true
    if (elm.match(/ showcomments=true.*\]/)) {
      elements['soundcloud_filter_showcomments'].checked = 1;
    }

    // If autoplay is true
    if (elm.match(/ autoplay=true.*\]/)) {
      elements['soundcloud_filter_autoplay'].checked = 1;
    }

    // If show playcount is true
    if (elm.match(/ showplaycount=true.*\]/)) {
      elements['soundcloud_filter_showplaycount'].checked = 1;
    }

    // If show artwork is true
    if (elm.match(/ showartwork=true.*\]/)) {
      elements['soundcloud_filter_showartwork'].checked = 1;
    }

    // If color found
    reg_res = elm.match(/ color=([^ \]]*).*\]/);
    if (reg_res !== null) {
      elements['soundcloud_filter_color'].value = reg_res[1];
    }

  }
}

// Add init function
tinyMCEPopup.onInit.add(init);