
This is a filter module to embed a Soundcloud track in your site using a simple tag.

Installation:
- enable the module
- configure the input format on this page: admin/settings/filters
- check and set the default player settings on the filter settings page

Usage:
- syntax: [soundcloud:URL] 

where URL is the full url of the track on Soundcloud, for example:
[soundcloud:http://soundcloud.com/blumarten/blu-mar-ten-she-moves-through-asc-remix]

You can set the default player look using filter settings
Player parameters:
- width
- height
- show comments
- auto play
- player color 

note: if the colorpicker module is installed and enabled (http://drupal.org/project/colorpicker), it's easier to pick a player color

You can also override these parameters in the filter code, for example:
[soundcloud:http://soundcloud.com/blumarten/blu-mar-ten-she-moves-through-asc-remix width=50 autoplay=true showcomments=true color=ff7700]

WYSIWYG support
You can use the filter via Wysiwyg module with the following editors:
 - TinyMCE

-------------------------------------
Update:
- fixed a bug, that caused all the page content to disappear in some cases
- when using both the soundcloud filter and the HTML filter, make sure you set the soundcloud filter weight higher than the HTML filters, when configuring the input format. Otherwise the soundcloud player won't show up.
