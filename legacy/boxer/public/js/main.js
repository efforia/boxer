$(document).ready(function(){
  // Footer offsetting
  var height = $(document).height();
  var offset = height - $(window).height();
  if(offset > 0) $('footer').css({'margin-bottom':'0px'});
  else $('footer').css({'bottom':'0px'});
});
