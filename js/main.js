$(document).ready(function () {
    $("#btn-submit").click(function () {
        $("#nav").slideToggle("slow");
        $(this).toggleClass("active");
    });
});