$(document).ready(
    function(){
       if ($('#edit-password-level').val() == 1) {
           $('#edit-password-level-wrapper + div').hide('slow');
       }
       $('#edit-password-level').bind('change', function() {
            if($('#edit-password-level').val() == 1) {
                $('#edit-password-level-wrapper + div').hide('slow');
            } else {
                $('#edit-password-level-wrapper + div').show('slow');
            }
       });
});
