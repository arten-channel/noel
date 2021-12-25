var redWhiteImage= new Image(); 
var orangePurpleImage= new Image(); 

$(window).load(function(){ 

//Making the canvas

for (var i= 0; i < 7; i++){
var canvas = document.createElement('canvas'); 
canvas.id     = "ornament" + i;
canvas.className = "ornament"; 
canvas.width  = $("body").innerWidth()/20; 
canvas.height = $(document).height()/8;  
canvas.style.zIndex   = 8;
canvas.style.display = "inline"; 
canvas.style.position = "relative";
canvas.style.top = 1 + "rem"; 
$(".ornament-container").append(canvas); 


//Getting the context
var context = canvas.getContext('2d');

//Creating the patterns
var redWhite= context.createPattern(redWhiteImage, "repeat"); 
  
 
var orangePurple = context.createPattern(orangePurpleImage, "repeat"); 

//Drawing the circle
var centerX = canvas.width/3;
var centerY = canvas.height / 3;
var radius = canvas.width /4;
context.beginPath();
context.arc(centerX, centerY, radius, 0, 2 * Math.PI, true);
context.shadowBlur=5;
context.shadowOffsetX=1;
context.shadowOffsetY=1; 
context.shadowColor="black";

  if (i%2 === 0){
    context.fillStyle = redWhite;
  }else{
    context.fillStyle = orangePurple; 
  }
context.fill();
context.closePath();
context.beginPath();
context.moveTo((centerX), (-10));
context.lineTo(centerX, (centerY - radius));
context.strokeStyle= "#0F3038";
context.stroke();

}

dragDrop();
// $(".ornament-container").append("<span>Drag and drop these guys onto that tree.</span>");
}); 

//Generate the tree lights
function makeNewPosition(){
    
    var h = $("#treeLights").height();
    var w = $("#treeLights").innerWidth();
    
    var nh = Math.floor(Math.random() * (h * 2));
    var nw = Math.floor(Math.random() * (w/1.5));
    
    
    return [nh,nw];       
}

function makeLights(){
  
  for (var i= 0; i < 150; i++){
    var lightPosition = makeNewPosition();
    var newLight = $("<div>", {class: 'light'});
    newLight.css({
      "top": lightPosition[0] + "px", 
      "left": lightPosition[1] + "px"
    }); 
    if (i%2 === 0){ 
      newLight.addClass('pulse-red'); 
    }else{ 
      if (i%3 === 0){
        newLight.addClass('pulse-yellow'); 
      }else{
        newLight.addClass('pulse-blue'); 
      }
    }
    $("#treeLights").append(newLight); 
  }
 }

  //jQuery UI Draggable Stuff
function dragDrop(){ 
  $( ".ornament" ).draggable();
  $( "#treeLights").droppable({
    drop: function (event, ui){ 
        $(ui.draggable).animate({top: "+=10"});
      }
  }); 
}





$(document).ready(function(){ 
  

redWhiteImage.src= "https://s3-us-west-2.amazonaws.com/s.cdpn.io/95493/red_white_striped.png";

orangePurpleImage.src= "https://s3-us-west-2.amazonaws.com/s.cdpn.io/95493/orange_purple_stripe.png"; 
  
  makeLights();  
  
});