var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var DestinationSchema = new Schema({
  location: String,
  duration: Number, //number of days
  activity: String,
  tourism_type: String, //from list of: recreational, cultural, nature, sports, religious, adventure"
  image: String
});

var TripSchema = new Schema({
     country: String,
     trip_length: Number,
     destinations: [DestinationSchema]
});

var Trip = mongoose.model('Trip', TripSchema);
module.exports = Trip;
