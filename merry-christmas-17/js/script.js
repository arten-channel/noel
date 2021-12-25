function openCard() {
  var button = document.getElementById('button');
  
  if(button.innerHTML == 'Open Card') {
    button.innerHTML = 'Close Card';
  } else {
    button.innerHTML = 'Open Card';
  }
  
  var cards = document.querySelectorAll('.card');
  for(var i = 0; i < cards.length; i++) {
    cards[i].classList.toggle('open');
  }
}