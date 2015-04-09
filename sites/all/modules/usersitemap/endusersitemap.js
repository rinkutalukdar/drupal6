/**
 * Confirmation to reset the sitemap contents.
 */
Drupal.behaviors.endusersitemap = function() {
  $("input#edit-enduser-cancel").click(function() {
    confirmed = window.confirm(Drupal.settings.endusersitemap.resetMsg); if(!confirmed) { return false; }
  })
};