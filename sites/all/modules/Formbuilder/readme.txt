AJAX Form Builder

==============================================================================

This module lets users create a form through a GUI and also add, modify, delete
 various properties which are defined in Form API. The module was being done as
 a part of Google SoC but is now being improved.


Requirements
------------------------------------------------------------------------------
This module requires external libraries: JQuery, PEAR JSON->PHP converter and
Interface plugin for jQuery. The PEAR JSON-PHP converter can be downloaded from
here: http://sandbox.jodhpuriguy.com/files/JSON.zip 



Installation
------------------------------------------------------------------------------

Please see the directory structure:

[modules]
  [formbuilder]
    formbuilder.module, formbuilder.install
    [js]
      Various JS files included in Repo.
    [css]
      -firefox.css, ie.css
    [JSON]
      -JSON.php  -- to be downloaded from the link given above.
    [images]
      - various images.

Please put the files in the jar/zip/rar at appropriate positions.

NOTES
------------------------------------------------------------------------------
Please notify about any problems that you notice.

TODO:
------------------------------------------------------------------------------

1. Some Validation options for the form fields are required.
