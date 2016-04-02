var mongoose = require("mongoose");
mongoose.connect( process.env.MONGOLAB_URI ||
                  process.env.MONGOHQ_URL ||
                  "mongodb://localhost/personal-api");  //"YOUR CURRENT LOCALHOST DB CONNECTION STRING HERE"

// module.exports.Campsite = require("./campsite.js.example");
 
