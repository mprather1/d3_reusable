var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    Entry = require("./db/models/Entry"),
    mongoose = require("mongoose");
    
mongoose.connect('mongodb://localhost/weather_data', function(err, res){
  if (err) {
    console.log("Error: " + err);
  } else {
    console.log("Connect to database...");
  }
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/app/static'));

var router = express.Router();

router.use(function(req, res, next){
  console.log("Loading....");
  next();
});

router.route('/entries')
  
  .post(function(req, res){
    var entry = new Entry();
    entry.temperature_low = req.body.temperature_low;
    entry.temperature_hi = req.body.temperature_hi;
    entry.dew_point = req.body.dew_point;
    entry.humidity = req.body.humidity;
    entry.dates = req.body.dates;
    entry.save(function(err){
      if(err){
        res.send(err);
      }
      res.json({ "message": "Entry created...", "success": entry });
    });
  })
  
  .get(function(req, res){
    Entry.find(function(err, response){
      if (err){
        res.send(err);
      } else {
        res.json(response);
      }
    });
  });
  
app.use('/api', router);

var server = app.listen(8000, function(){
  console.log("Listening on port 8000...");
});

module.exports = server;