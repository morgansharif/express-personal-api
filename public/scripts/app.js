console.log("Sanity Check: JS is working!");
var template,         //global var to call handlbars compiler
    $tripsList,       //global var for target div in HTML to populate
    allTrips = [];    //global var list of trips

$(document).ready(function(){

//target div in HTML for trips list
$tripsList = $('#tripTarget');

//compile template for handlebars
var source = $('#trips-template').html();
template = Handlebars.compile(source);

$.ajax({
  method: "GET",
  url: "/api",
  success: handleSuccess,
  error: handleError
});



}); //END document.ready


function render () {
  // empty existing posts from view
  $tripsList.empty();
  // pass `allBooks` into the template function
  var tripsHtml = template({trips: allTrips});
  // append html to the view
  $booksList.append(tripsHtml);
}

function handleSuccess(json) {
  allBooks = json;
  render();
}

function handleError(err){
  console.log("Error: " + err);
}
