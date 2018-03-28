var xhttp = new XMLHttpRequest();
if (window.localStorage.vodka == undefined){
  window.localStorage.vodka = +new Date();
}
var timeout = true;
var valitukset = ['Elä spämmi homo!', 'Älä ole kuin Lätti, lopeta spämmi', 'arvasin että teet noin.', 'Syy numero 1 miksi tämä on parempi kuin telegram, ei tarra spämmiä'];

function loadPoints(){
  $.getJSON( "https://kddzbbgrt8.execute-api.eu-west-1.amazonaws.com/prod/api", function( data ) {
    $(".topBox").empty();
    var items = [];
    data.sort(function(a,b){return a.points - b.points});
    data.reverse();
    $.each( data, function( i, item) {
      items.push( "<li><div " + "' class='foo' data-id='" + data[i].name + "' style='width: " + 100 * data[i].points / data[0].points + "%;' >" + data[i].points + "</div><div>" + data[i].name + "</div></li>" );
      console.log(data[i].points + " / " + data[1].points + " * " + 100 + " = " + (data[i].points / data[1].points * 100));
    });
    $( "<ul/>", {
      "class": "votes-list",
      html: items.join( "" )
      }).appendTo( ".topBox" );
      $('.foo').click (voteClicked);
  });
};


function voteClicked(event){
  if (!timeout){
    valueToUse = valitukset[Math.floor(Math.random() * valitukset.length)];
    alert(valueToUse);
    return;
  }
  console.log(event.target.dataset.id);
  console.log($("#name").val());
  xhttp.open("POST", "https://kddzbbgrt8.execute-api.eu-west-1.amazonaws.com/prod/api", true);
  xhttp.setRequestHeader("Content-type", "application/json");
  var newEvent = event;
  xhttp.onreadystatechange = function(){
    if (this.readyState == 4 && this.status == 200) {
      loadPoints();
    }
    if (this.readyState == 4 && this.status == 400) {
      $(newEvent.target).addClass('error');
      setTimeout(function(){$(newEvent.target).removeClass('error');},500);
    }
  }
  var object = {"name" : event.target.dataset.id};
  var myjson = JSON.stringify(object);
  xhttp.send(myjson);
  timeout = false;
  setTimeout(function () {
    timeout = true;
  }, 60000);
};
function newUserClicked(){
  if (!timeout){
    alert("Elä spämmi homo!");
    return;
  }
  console.log($("#name").val());
  xhttp.open("POST", "https://kddzbbgrt8.execute-api.eu-west-1.amazonaws.com/prod/api/create", true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.onreadystatechange = function(){
  if (this.readyState == 4 && this.status == 200) {
    loadPoints();
    }
  }
  console.log($("#name").val());
  var object = {"name" : $("#name").val().toLowerCase()};
  var myjson = JSON.stringify(object);
  xhttp.send(myjson);
  $("#name").val('');
  timeout = false;
  setTimeout(function () {
    timeout = true;
  }, 60000);
};

function keyPress(e){
  if (e.keycode == 13 || e.which == 13) {
    newUserClicked();
    console.log("vittua");
    return false;
  }
  console.log("mitäs!!!!!!");
  return true;
};

window.onload = loadPoints;
