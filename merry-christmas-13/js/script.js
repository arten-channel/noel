$(document).ready(function() {
    snowFall.snow($('section'), {
      minSize: 1,
      maxSize: 8,
      round: true,
      minSpeed: 1,
      maxSpeed: 2,
      flakeCount: 120,
    });
    
    $('body').hide();
    $('section').hide();
    $('h1').hide();
    $('p').hide();
    
    $('body').delay(300).fadeIn();
    $('section').delay(400).fadeIn();
    
    $('h1').delay(500).fadeIn(1000);
    
    $('p').delay(1500).fadeIn(250);
  });