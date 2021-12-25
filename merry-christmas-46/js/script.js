width = $(window).width() + 100;

for(i = 0; i < 100; i ++){
present = $('<div/>', {
  class: 'present',
})
$('<div/>', {class: 'ribbon'}).appendTo(present);

w = String(Math.floor(Math.random()*100) + 20) + 'px';
l = String(Math.floor(Math.random()*width - 60)) + 'px';
z = Math.floor(400 - parseInt(w));
present.css({
  width: w,
  height: w,
  left: l,
  'z-index': z
})

present.appendTo('body');
}