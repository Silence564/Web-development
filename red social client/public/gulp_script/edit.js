"use strict";

$(document).ready(function () {
  start_config();
});
function start_config() {
  $('#id02').removeAttr("style").hide();
}
function edit(nameN, email, id, date, photo, status, role) {
  $('#id02').show();
  $('input[name="nameN"]').val(nameN);
  $('input[name="date"]').val(date);
  $('input[name="photo"]').val(photo);
  $('input[name="email"]').val(email);
  $('input[name="status"]').val(status);
  $('input[name="role"]').val(role);
  $('form[name="pForm"]').attr('action', 'edit/' + id);
}