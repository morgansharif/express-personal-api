// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models');

var trips_list = [
  {
    name: "Visit Petra",
    country: "Jordan",
    duration: 2,
    destinations: [
      {
        location: "Petra",
        duration: 1,
        activity: "Visit the silk road and see the ruins of Petra.",
        tourism_type: "Cultural",
        image: "http://israelgates.com/wp-content/uploads/2015/03/Petra2.jpg"
      }]
  },
  {
    name: "Hawaii Vacation",
    country: "United States",
    duration: 7,
    destinations: [
      {
        location: "Waikiki Beach, Honolulu, Oahu",
        duration: 5,
        activity: "Hang out, be lazy, and surf at the beach in Waikiki.",
        tourism_type: "Recreational",
        image: "http://www.visualitineraries.com/img/locations/19303.jpg"
      },
      {
        location: "Diamond Head, Honolulu, Oahu",
        duration: 1,
        activity: "Hike to the top of Diamond Head volcano and enjoy the view.",
        tourism_type: "Nature",
        image: "http://www.aloha-hawaii.com/wp-content/uploads/2009/11/diamond-head.jpg"
      },
      {
        location: "Hilo, Big Island",
        duration: 1,
        activity: "Helicopter tour of active volcanoes.",
        tourism_type: "Nature",
        image: "http://static.reservedirect.com/media/optimized/Blue_Hawaiian_Hilo_Helicopter_Tours_(003).jpg"
      }]
  }
];



// db.Campsite.create(new_campsite, function(err, campsite){
//   if (err){
//     return console.log("Error:", err);
//   }
//
//   console.log("Created new campsite", campsite._id)
//   process.exit(); // we're all done! Exit the program.
// })

//CLEAR ALL EXISTING TRIPS
db.Trip.remove({}, function(err, trips) {
  console.log('removed all existing trips (', db.Trip.length ,' total).');
  // process.exit(); // we're all done! Exit the program.
});

//CREATE TRIPS FROM trips_list
db.Trip.create(trips_list, function(err, new_trip){
  if (err) {return console.log(" error", err);}
  console.log("Created new trip: "+ new_trip);
  // console.log('recreated all trips');
  console.log("Complete: Created ", db.Trip.length-1, " trips.");
  // console.log(db.Trip);
  process.exit(); // we're all done! Exit the program.

});
