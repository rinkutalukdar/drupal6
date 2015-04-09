Drupal.behaviors.jnjContentWorkflowPublishNodes = function(context) {
  $('div.view-moderated-content td.views-field-nid', context).each(function() {
    var id = $.trim($(this).text());
    $(this).html('<input type="checkbox" class="publishNid" value="' + id + '"/>');
  });

  $('div.view-moderated-content').append('<div class="publishForm"><input value="Publish selected items" type="button"/></div>');

  $('div.view-moderated-content div.publishForm :button').click(function() {

    var nids = [];

    $('div.view-moderated-content td.views-field-nid :checkbox:checked').each(function() {
      nids.push($(this).val());
    });

    if (nids.length > 0) {
      $.ajax({
        url: Drupal.settings.basePath + 'jnj-content-workflow/publishContent',
        dataType: 'json',
        data: {
          'nids[]': nids,
          'redirect': window.location.pathname.substr(Drupal.settings.basePath.length)
        },
        success: function(data) {
          if (data.batch) {
            window.location = data.go_to;
          } else {
            $('div.view-moderated-content form.views-processed').submit();
          }
        },
        type: 'POST'
      });
    }
  });
  
  
  
  
  

}
