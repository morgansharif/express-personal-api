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
        location: "Petra", //city/monument/etc
        duration: 1, //number of days
        activity: "Visit the silk road and see the ruins of Petra.", //brief description of the activity
        tourism_type: "cultural", //from list of: recreational, cultural, nature, sports, religious, adventure"
        image: "http://israelgates.com/wp-content/uploads/2015/03/Petra2.jpg"
      }]
  },
  {
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


db.Trip.remove({}, function(err, trips) {
  console.log('removed all existing trips (', db.Trip.length ,' total).');
  db.Trip.create(trips_list, function(err, trips){
    if (err) {
      console.log(err);
      return;
    }
    console.log("Created new trip", trip._id);
    // console.log('recreated all trips');
    console.log("Complete: Created ", trips.length, " trips.");
  });
  process.exit(); // we're all done! Exit the program.
});
