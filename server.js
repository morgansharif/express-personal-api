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
      {method: "GET", path: "/api", description: "Describes all available endpoints (NOTE: If you are reading this, you are on this endpoint.)"},
      {method: "GET", path: "/api/profile", description: "Data about me"}, // CHANGE ME
      {method: "POST", path: "/api/campsites", description: "E.g. Create a new campsite"} // CHANGE ME
    ]
  });
});

// GET profile  -- document personal profile
app.get('/api/profile', function api_index(req, res) {
  res.json({
    message: "Hello, and thank you for your interest in my profile!",
    name: "Morgan Allen Sharif",
    gitHub_link: "https://github.com/morgansharif",
    github_profile_image: "https://avatars1.githubusercontent.com/u/17555529?v=3&s=460",
    current_city: "San Carlos",
    pets: [{name: "Sasha Fierce", type: "Dog", breed: "Pit bull"}]
  });
});



/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
