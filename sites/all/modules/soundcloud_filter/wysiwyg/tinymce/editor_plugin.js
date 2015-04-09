(function() {
  tinymce.create('tinymce.plugins.soundcloudFilterPlugin', {
    /**
     * Initialize the plugin, executed after the plugin has been created.
     *
     * This call is done before the editor instance has finished it's
     * initialization so use the onInit event of the editor instance to
     * intercept that event.
     *
     * @param ed
     *   The tinymce.Editor instance the plugin is initialized in.
     * @param url
     *   The absolute URL of the plugin location.
     */
    init : function(ed, url) {
      // Register the wysiwygH2Plugin execCommand.
      ed.addCommand('soundcloudFilter', function() {
				ed.windowManager.open({
					file :Drupal.settings.basePath + 'soundcloud-filter/wysiwyg',
					width : 480,
					height : 320,
					inline : 1,
          scrollbars:1
				});
			});

      // Register button.
      ed.addButton('soundcloud_filter', {
        title : 'SoundCloud Filter',
        cmd : 'soundcloudFilter',
        image : url + '/img/soundcloud_icon.jpg'
      });
    },

    /**
     * Return information about the plugin as a name/value array.
     */
    getInfo : function() {
      return {
        longname : 'Wysiwyg H2 Popup Plugin',
        author : 'Kalman Hosszu',
        authorurl : 'http://www.kalman-hosszu.com',
        infourl : 'http://drupal.org/project/soundcloud_filter',
        version : "1.0"
      };
    }
  });

  // Register plugin.
  tinymce.PluginManager.add('soundcloud_filter', tinymce.plugins.soundcloudFilterPlugin);
})();

