// require express and other modules
var express = require('express'),
    app = express();

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));


//nathan's header code
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

/************
 * DATABASE *
 ************/

var db = require('./models');

/**********
 * ROUTES *
 **********/

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

/*
 * HTML Endpoints
 */

//index.html
app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

/*
 * JSON API Endpoints
 */

//GET '/api' -- document API endpoints
app.get('/api', function api_index(req, res) {
  // TODO: Document all your api endpoints below
  res.json({
    message: "Welcome to my personal api! Here's what you need to know!",
    documentation_url: "https://github.com/morgansharif/express-personal-api/blob/master/README.md",
    base_url: "https://lychee-custard-40835.herokuapp.com/",
    endpoints: [
      {method: "GET",  path: "/api",           description: "Describes all available endpoints (NOTE: If you are reading this, you are on this endpoint.)"}, //WORKING
      {method: "GET",  path: "/api/profile",   description: "Data about me"}, // WORKING
      {method: "GET",  path: "/api/trips",     description: "Get all trip data"}, //WORKING
      {method: "GET",  path: "/api/trips/:id", description: "Get one trip by Trip._id"}, //WORKING
      {method: "POST", path: "/api/trips",     description: "Create a new trip"}, //WORKING
      {method: "POST", path: "/api/trips/:trip_id/destinations",     description: "Create a new destination within a given trip"}, //testing
      {method: "DELETE",  path: "/api/trips/:id", description: "Delete trip by Trip._id"}, //WORKING
    ],
    about_trip_data: {
      name: "String - unique name for the trip",
      country: "String - country where ",
      duration: "Number - days spent on trip",
      destinations: [
        {
          location: "String - city/monument/etc",
          duration: "Number - days spent on specific activity",
          activity: "String - brief description of the activity",
          tourism_type: "String - from list of: 'recreational', 'cultural', 'nature', 'sports', 'religious', 'adventure'",
          image: "String - link to an image representing the activity"
        }]},
    example_trip_data: {
      name: "Hawaii Vacation",
      country: "United States",
      duration: 7,
      destinations: [
        {
          location: "Waikiki Beach, Honolulu, Oahu",//city/monument/etc
          duration: 5, //number of days
          activity: "Hang out, be lazy, and surf at the beach in Waikiki.", //brief description of the activity
          tourism_type: "recreational", //from list of: recreational, cultural, nature, sports, religious, adventure"
          image: "http://www.visualitineraries.com/img/locations/19303.jpg"
        },
        {
          location: "Diamond Head, Honolulu, Oahu", //city/monument/etc
          duration: 1, //number of days
          activity: "Hike to the top of Diamond Head volcano and enjoy the view.", //brief description of the activity
          tourism_type: "nature", //from list of: recreational, cultural, nature, sports, religious, adventure"
          image: "http://www.aloha-hawaii.com/wp-content/uploads/2009/11/diamond-head.jpg"
        },
        {
          location: "Hilo, Big Island", //city/monument/etc
          duration: 1, //number of days
          activity: "Helicopter tour of active volcanoes.", //brief description of the activity
          tourism_type: "nature", //from list of: recreational, cultural, nature, sports, religious, adventure"
          image: "http://static.reservedirect.com/media/optimized/Blue_Hawaiian_Hilo_Helicopter_Tours_(003).jpg"
        }]}
  });
});

// GET /api/profile  -- document personal profile
app.get('/api/profile', function api_index(req, res) {
  res.json({
    message: "Hello, and thank you for your interest in my profile!",
    name: "Morgan Allen Sharif",
    github_link: "https://github.com/morgansharif",
    github_profile_image: "https://avatars1.githubusercontent.com/u/17555529?v=3&s=460",
    current_city: "San Carlos",
    pets: [{name: "Sasha", type: "Dog", breed: "Pit bull"}]
  });
});

//GET /api/trips -- return ALL TRIPS
app.get('/api/trips', function (req, res){
  console.log("GET '/api/trips' TRIGGERED");
  console.log("--req: ");
  db.Trip.find( function(err, trips){
    if (err){return console.log("error: ", err);}
    console.log("--res: returned " + trips.length + " trips");
    res.json(trips);
  });
});

//GET /api/trips:id -- find & return ONE TRIP by _id
app.get('/api/trips/:id', function (req, res){
  console.log("GET '/api/trips/:id' TRIGGERED");
  console.log("--req: ",req.params.id);
  //search for matching _id
  db.Trip.findOne({_id: req.params.id}, function(err, trip){
    if (err){return console.log("error: ", err);}
    console.log("found matching trip: ", trip);
    console.log("--res: ",trip);
    res.json(trip);
  });
});

//POST /api/trips -- create NEW TRIP - return NEW TRIP
app.post('/api/trips', function (req, res) {
  console.log("POST '/api/trips' TRIGGERED");
  console.log("--req: "+req.body);
  // create new trip with form data
  var newTrip = new db.Trip({
    name: req.body.name,
    country: req.body.country,
    duration: parseInt(req.body.duration)
  });
  // SAVE new trip to db
  newTrip.save(function(err, trip){
    if (err) {return console.log("save error: " + err);}
    console.log("--res: " + trip.name);
    res.json(trip);
  });
});

//POST /api/trips:id -- find & return ONE TRIP by _id
app.post('/api/trips/:trip_id/destinations', function (req, res){
  console.log("POST '/api/trip/:trip_id/destinations' TRIGGERED");
  console.log("--req: ",req.params.trip_id);
  //search for matching _id
  db.Trip.findOne({_id: req.params.trip_id}, function(err, trip){
    if (err){return console.log("error: ", err);}
    console.log("--found matching trip: ", trip.name);
    //push destination data into trip's array
    console.log("--destinations: ", trip.destinations);
    trip.destinations.push(req.body);
    // save to db
    trip.save();
    console.log("--res: ",trip);
    res.json(trip);
  });
});



/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
