$(function () {
  $(".hamburger-button").removeClass("open");
  $(".hamburger-button").click(function () {
    var $hbtn = $(this).find(".hamburger-button-text");
    if ($(this).hasClass("open")) {
      $hbtn.text("≡");
      $(this).removeClass("open");
      $(".hamburger-menu").fadeOut();
      $(".hamburger-button").css("background-color", "#ed588b");
    } else {
      $hbtn.text("×");
      $(this).addClass("open");
      $(".hamburger-menu").fadeIn();
      $(".hamburger-button").css("background-color", "white");
    }
  });
});
