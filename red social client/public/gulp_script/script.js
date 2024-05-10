"use strict";

$(document).ready(function () {
  if ($('#id01').is(":visible")) {
    $('#id01').show();
    $('.close_window').click(function () {
      return false;
    });
  }
});
$(".signup-box").hide();
$(".login").addClass("active");
$(".signup").click(function () {
  $(this).addClass("active");
  $(".login").removeClass("active");
  $(".signup-box").show();
  $(".login-box").hide();
});
$(".login").click(function () {
  $(this).addClass("active");
  $(".signup").removeClass("active");
  $(".login-box").show();
  $(".signup-box").hide();
});
function start_config() {
  $('#id01').removeAttr("style").hide();
}