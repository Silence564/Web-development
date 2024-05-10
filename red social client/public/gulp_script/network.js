"use strict";

$(document).ready(function () {
  $('#id04').removeAttr("style").hide();
  $('#id02').removeAttr("style").hide();
  if ($('#id01').is(":visible")) {
    $('#id01').show();
    $('.close_window').click(function () {
      return false;
    });
  }
  $(".button1").click(function (event) {
    event.preventDefault();
    $("#myOverlay").fadeIn(297, function () {
      $("#id04").css("display", "block").animate({
        opacity: 1
      }, 198);
    });
  });
  $(".button2").click(function (event) {
    event.preventDefault();
    $("#myOverlay").fadeIn(297, function () {
      $("#id02").css("display", "block").animate({
        opacity: 1
      }, 198);
    });
  });
});
function start_config() {
  $('#main').prop("disabled", true);
  $('#friends').prop("disabled", false);
  $('#news').prop("disabled", false);
  $('#id01').removeAttr("style").hide();
  $('#id02').removeAttr("style").hide();
  $('#id04').removeAttr("style").hide();
}
function edit(nameN, email, id, date, photo, status, role) {
  $('#id02').show();
  $('#id04').removeAttr("style").hide();
  $('input[name="nameN"]').val(nameN);
  $('input[name="date"]').val(date);
  $('input[name="photo"]').val(photo);
  $('input[name="email"]').val(email);
  $('input[name="status"]').val(status);
  $('input[name="role"]').val(role);
  $('form[name="pForm"]').attr('action', 'network/' + id);
}
function block(id) {
  $('#id04').show();
  $('#id02').removeAttr("style").hide();
  $('form[name="nForm"]').attr('action', '/block/' + id);
}
function start_config1() {
  $('#main').prop("disabled", true);
  $('#friends').prop("disabled", false);
  $('#news').prop("disabled", false);
  $('#id01').removeAttr("style").hide();
  $('#id02').removeAttr("style").hide();
  $("#id04").animate({
    opacity: 0
  }, 198, function () {
    $(this).css("display", "none");
    $("#myOverlay").fadeOut(297);
  });
  $("#id02").animate({
    opacity: 0
  }, 198, function () {
    $(this).css("display", "none");
    $("#myOverlay").fadeOut(297);
  });
}