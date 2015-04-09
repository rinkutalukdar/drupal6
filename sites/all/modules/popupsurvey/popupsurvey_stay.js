function popupsurvey_stay() {
 $('#overlay').hide();
 $('#lightbox').hide();
 //remove the cookie
 window.open("http://" + $('#stayinsurvey') . val(),'mywindow');
}

function popupsurvey_stayno() {
  var stay = 2;
  location.href=Drupal.settings.basePath + 'remove-survey-cookie/' + stay;
}
function popupsurvey_continue() {
location.href=Drupal.settings.basePath + 'contactus/'
  //drupal_goto('contactus');
}