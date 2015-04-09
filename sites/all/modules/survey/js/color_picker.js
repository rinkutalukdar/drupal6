var  last_opened_color_box;
function load_color_picker(id) {
  $(document).ready(function() {
            //$('#demo').hide();
            //alert('last_opened_color_box:'+last_opened_color_box);
            if (last_opened_color_box != 'undefined')$('#picker_'+last_opened_color_box).hide();
            $('#picker_'+id).show();
            $('#picker_'+id).farbtastic('#chart_color_option_'+id);
            last_opened_color_box = id;
  });
}