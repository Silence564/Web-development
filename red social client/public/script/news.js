$(document).ready(function() {
    $('#id05').removeAttr("style").hide();
	if($('#id01').is(":visible")){
        $('#id01').show();
	    $('.close_window').click(function() {
		    return false;
	    });  
    }

    $(".button_block").click(function (event) {
        event.preventDefault();
        $("#myOverlay").fadeIn(297, function () {
            $("#id05")
                .css("display", "block")
                .animate({ opacity: 1 }, 198);
        });
    });
});     

function start_config1() {
    $('#main').prop("disabled", false);
    $('#friends').prop("disabled", false);
    $('#news').prop("disabled", true);
    $('#id01').removeAttr("style").hide();
    $("#id05").animate({ opacity: 0 }, 198, function () {
        $(this).css("display", "none");
        $("#myOverlay").fadeOut(297);
    });
};

function start_config() {
    $('#main').prop("disabled", false);
    $('#friends').prop("disabled", false);
    $('#news').prop("disabled", true);
    $('#id01').removeAttr("style").hide();
    $('#id05').removeAttr("style").hide();
};

function block(id) {
    $('#id05').show();
    $('form[name="nForm"]').attr('action', 'new/'+id);
}