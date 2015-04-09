function confirmation_msg() {
  var value = confirm('Do you really want to change the username?');
  if (value) {
    return true;
  }
  else {
    return false;
  }
}