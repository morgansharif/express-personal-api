var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var DestinationSchema = new Schema({
  location: String, //city/monument/etc
  duration: Number, //number of days
  activity: String, //brief description of the activity
  tourism_type: String, //from list of: recreational, cultural, nature, sports, religious, adventure"
  image: String, //related image to the activity/destination,
});

var TripSchema = new Schema({
  name: String,
  country: String,
  duration: Number,
  destinations: [DestinationSchema]
});

var Trip = mongoose.model('Trip', TripSchema);
module.exports = Trip;
