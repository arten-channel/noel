var select = function(s) {
  return document.querySelector(s);
},
selectAll = function(s) {
  return document.querySelectorAll(s);
}, 
animationWindow = select('#animationWindow'),    
  animData = {
  wrapper: animationWindow,
  animType: 'svg',
  loop: true,
  prerender: true,
  autoplay: true,
  path: 'json/santa_stop_here.json',
rendererSettings: {
  
}   
}, anim;

anim = bodymovin.loadAnimation(animData);
anim.addEventListener('DOMLoaded', onDOMLoaded);
anim.setSpeed(1);
function onDOMLoaded(e){

anim.addEventListener('complete', function(){});
}
