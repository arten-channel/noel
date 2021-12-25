var currentTheme = 'plain';
document.body.style.background = '#856f60';
function switchTheme() {
  console.log(currentTheme);
  console.log(document.body.style.background);
  if (currentTheme === 'plain') {
    currentTheme = 'winter';
    if (document.getElementById('tree-wrapper').classList.contains('tree-wrapper-noshow')) {
      document.getElementById('tree-wrapper').classList.remove('tree-wrapper-noshow');
    }
    document.getElementById('tree-wrapper').classList.add('tree-wrapper-show');
    
    if (document.getElementById('merry-christmas').classList.contains('merry-christmas-noshow')) {
      document.getElementById('merry-christmas').classList.remove('merry-christmas-noshow');
    }
    document.getElementById('merry-christmas').classList.add('merry-christmas-show');
    
    if (document.getElementById('hat').classList.contains('hat-noshow')) {
      document.getElementById('hat').classList.remove('hat-noshow');
    }
    document.getElementById('hat').classList.add('hat-show');
    
  } else {
    currentTheme = 'plain';
    if (document.getElementById('tree-wrapper').classList.contains('tree-wrapper-show')) {
      document.getElementById('tree-wrapper').classList.remove('tree-wrapper-show');
    }
    document.getElementById('tree-wrapper').classList.add('tree-wrapper-noshow');
    
    if (document.getElementById('merry-christmas').classList.contains('merry-christmas-show')) {
      document.getElementById('merry-christmas').classList.remove('merry-christmas-show');
    }
    document.getElementById('merry-christmas').classList.add('merry-christmas-noshow');
    
    if (document.getElementById('hat').classList.contains('hat-show')) {
      document.getElementById('hat').classList.remove('hat-show');
    }
    document.getElementById('hat').classList.add('hat-noshow');
  }
}

function switchBackground() {
  if (document.body.style.background == 'rgb(160, 230, 236)') {
    document.body.style.background = 'rgb(133, 111, 96)';
  } else {
    document.body.style.background = 'rgb(160, 230, 236)';
  }
}