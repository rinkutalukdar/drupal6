<?php
/**
 * @file soundcloud-filter-wysiwyg-popup.tpl.php - 2010-10-17
 *
 * Available variables:
 *  - $path
 *  - $tinymce_path
 *  - $tinymce_js
 *
 *
 * @author Kálmán Hosszu - hosszu.kalman@gmail.com - http://kalman-hosszu.com
 */
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html>
  <head>
    <title>SoundCloud filter</title>
    <link type="text/css" rel="stylesheet" media="all" href="<?php echo $path ?>/wysiwyg/tinymce/popup.css" />
    <script type="text/javascript" src="<?php echo $tinymce_js ?>"></script>
    <script type="text/javascript" src="<?php echo $path ?>/wysiwyg/tinymce/popup.js"></script>
  </head>
  <body id="soundcloud_filter_popup">
    <form action="#" method="POST" onsubmit="insertSoundcloudFiltterCode();return false;" id="soundcloud_filter_popup_form">
      <div class="tabs">
        <ul>
          <li id="general_tab" class="current">
            <span><a onmousedown="return false;" href="javascript:mcTabs.displayTab('general_tab','general_panel');">Insert/edit SoundCloud track/set</a></span>
          </li>
        </ul>
      </div>
      <div class="panel_wrapper">
        <div id="general_panel" class="current">
          <table cellpadding="4" cellspacing="0" border="0">
            <tr>
              <td><label for="soundcloud_filter_url">URL:</label></td>
              <td><input type="text" id="soundcloud_filter_url" name="soundcloud_filter_url" value="" size="60" /></td>
            </tr>
            <tr>
              <td><label for="soundcloud_filter_width">Width:</label></td>
              <td><input type="text" id="soundcloud_filter_width" name="soundcloud_filter_width" value="" size="4" maxlength="4" /></td>
            </tr>
            <tr>
              <td><label for="soundcloud_filter_height">Height:</label></td>
              <td><input type="text" id="soundcloud_filter_height" name="soundcloud_filter_height" value="" size="4" maxlength="4" /></td>
            </tr>
            <tr>
              <td><label for="soundcloud_filter_setheight">Height for sets:</label></td>
              <td><input type="text" id="soundcloud_filter_setheight" name="soundcloud_filter_setheight" value="" size="4" maxlength="4" /></td>
            </tr>
            <tr>
              <td><label for="soundcloud_filter_showcomments">Show comments:</label></td>
              <td><input type="checkbox" id="soundcloud_filter_showcomments" name="soundcloud_filter_showcomments" /></td>
            </tr>
            <tr>
              <td><label for="soundcloud_filter_autoplay">Auto play:</label></td>
              <td><input type="checkbox" id="soundcloud_filter_autoplay" name="soundcloud_filter_autoplay" /></td>
            </tr>
            <tr>
              <td><label for="soundcloud_filter_showplaycount">Show playcount:</label></td>
              <td><input type="checkbox" id="soundcloud_filter_showplaycount" name="soundcloud_filter_showplaycount" /></td>
            </tr>
            <tr>
              <td><label for="soundcloud_filter_showartwork">Show artwork:</label></td>
              <td><input type="checkbox" id="soundcloud_filter_showartwork" name="soundcloud_filter_showartwork" /></td>
            </tr>
            <tr>
              <td><label for="soundcloud_filter_color">Color:</label></td>
              <td><input type="text" id="soundcloud_filter_color" name="soundcloud_filter_color" value="" size="6" maxlength="6" /></td>
            </tr>
          </table>
        </div>
      </div>
      <div class="mceActionPanel">
        <div style="float: left;"><input id="insert" type="submit" value="Insert" /></div>
        <div style="float: right;"><input type="button" onclick="tinyMCEPopup.close();" value="Cancel" name="cancel" id="cancel" /></div>
      </div>
    </form>
  </body>
</html>