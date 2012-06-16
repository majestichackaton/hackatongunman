/*
  WILD GUNMAN - Hackaton Toronto 2012
*/

var centerWrapper = function(){

  // Center wrapper
  $('#wrapper').css({
    position: 'absolute',
    left: Math.floor(($(window).width() / 2) - ($('#wrapper').width() / 2)),
    top: Math.floor(($(window).height() / 2) - ($('#wrapper').height() / 2))
  });

};

$(function() {

  centerWrapper();
  window.addEventListener("deviceorientation", centerWrapper, true);
  
  $('.clickable').click(function(){
    var href = $(this).attr('data-href');
    if (!href) return false;
    window.location = href;
  });
  
});