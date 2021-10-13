//JQUERY Clase 11//

const { data } = require("jquery");

$(document).ready(function(){
  $("#hider").click(function(){
    alert("Usted ha sido suscrito correctamente.");
  });
});

//JQUERY Y AJAX//

function loadDoc() {
  let gengar = new XMLHttpRequest();
  gengar.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("gengarajax").innerHTML =
      this.responseText;
    }
  };
  gengar.open("GET", "ajaxdesafio.txt", true);
  gengar.send();
}