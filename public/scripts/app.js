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

  //PUT --update trip info
  $tripsList.on('submit', '.updateTripForm', function(event){
    event.preventDefault();
    console.log('clicked update button to /api/'+$(this).attr('data-id'));
    console.log('sending:'+$(this).serialize());
    $.ajax({
      method: "PUT",
      url: "/api/trips/"+$(this).attr('data-id'),
      success: updateTripSuccess,
      data: $(this).serialize(),
      error: handleError
    });
  });

  //DELETE trip
  $tripsList.on('click', '.deleteBtn', function(){
    console.log('clicked delete button to /api/'+$(this).attr('data-id'));
    $.ajax({
      method: "DELETE",
      url: "/api/trips/"+$(this).attr('data-id'),
      success: deleteTripSuccess,
      error: handleError
    });
  });

  // POST destination to trip by trip_id

  $tripsList.on('submit', '.addDestinationForm',function(event){
    event.preventDefault();
    console.log('clicked add destination button to /api/'+$(this).attr('data-id')+'/destinations');
    $.ajax({
      method: "POST",
      url: "/api/trips/"+$(this).attr('data-id')+"/destinations",
      data: $(this).serialize(),
      success: addDestinationSuccess,
      error: handleError
    });
  });


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



function updateTripSuccess(json) {
  var trip = json;
  console.log(json);
  var tripId = trip._id;
  console.log('delete trip', tripId);
  // find the trip by the correct ID and remove it from the allTrips array
  for(var index = 0; index < allTrips.length; index++) {
    if(allTrips[index]._id === tripId) {
      allTrips[index] = trip;
      break;
    }
  }
  render();
}

function addDestinationSuccess(json){
  var trip = json;
  var tripId = trip._id;
  for(var index = 0; index < allTrips.length; index++) {
    if(allTrips[index]._id === tripId) {
      allTrips[index] = trip;
      break;
    }
  }
  render();
}

function deleteTripSuccess(json) {
  var trip = json;
  console.log(json);
  var tripId = trip._id;
  console.log('delete book', tripId);
  // find the book with the correct ID and remove it from our allBooks array
  for(var index = 0; index < allTrips.length; index++) {
    if(allTrips[index]._id === tripId) {
      allTrips.splice(index, 1);
      break;  // we found our book - no reason to keep searching (this is why we didn't use forEach)
    }
  }
  render();
}


function handleError(err){
  console.log("Error: " + err);
}
