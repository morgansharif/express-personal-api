console.log("Sanity Check: JS is working!");
var template,         //global var to call handlbars compiler
    $tripsList,       //global var for target div in HTML to populate
    allTrips = [],    //global var list of trips
    profileData;
$(document).ready(function(){

// target div in HTML for trips list
$tripsList = $('#trips-target');

//compile template for handlebars
var source = $('#trips-template').html();
template = Handlebars.compile(source);

//GET all trips (i.e., populate page)
$.ajax({
  method: "GET",
  url: "/api/trips",
  success: handleSuccess,
  error: handleError
});

//GET profile info
$.ajax({
  method: "GET",
  url: "/api/profile",
  success: buildProfile,
  error: handleError
});


//POST destination to trip by trip_id
// $.ajax({
//   method: "POST",
//   url: "/api/trips/**[TRIP_ID]**/destinations",
//   data: {
//       activity: "SEE MECCA",
//       location: "SOME PLACE",
//       duration: "100",
//       tourism_type: "cultural",
//       image: "image.html"
//       },
// success: onSuccess
// });

function onSuccess(json){
console.log('returned', json);
}

}); //END document.ready


function render () {
  // empty existing posts from view
  $tripsList.empty();
  // pass `allBooks` into the template function
  var tripsHtml = template({trips: allTrips});
  // append html to the view
  $tripsList.append(tripsHtml);
}

function handleSuccess(json) {
  allTrips = json;
  render();
}

function buildProfile(json) {
  console.log(json);
  profileData = json;
  var profileSource = $('#profile-template').html();
  var profileTemplate = Handlebars.compile(profileSource);
  profileHtml = profileTemplate(profileData);
  $('#profile-target').append(profileHtml);
}

function showProfileError(err){
  console.log("Error: " + err);
}


function handleError(err){
  console.log("Error: " + err);
}
