var branch = 1;
var needles = "^";
var treeHTML = document.getElementById("tree");
var starHTML = document.getElementById("star");
var trunkHTML = document.getElementById("trunk");

treeHTML.innerHTML += "☆";
function addBranches () {

  for ( var i = 1; i <= 10; i++ ) {

    if (i > 1) {
      branch += 3;
      while (needles.length <= branch) {
        needles += "^";
      }
    }

    treeHTML.innerHTML += "<br />" + needles;
  }
}
addBranches();
trunkHTML.innerHTML += "|||";