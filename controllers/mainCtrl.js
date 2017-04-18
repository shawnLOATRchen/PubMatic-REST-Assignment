const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect('mongodb://myself:5525231@ds133438.mlab.com:33438/mydb');
mongoose.Promise = global.Promise;
var PubMaticApi = require('../models/pubmaticApi');


module.exports = function(app){

  app.get('/', function(req, res, next){
    res.render('index');
  });

  app.get('/api', function(req, res, next){
    PubMaticApi.find({}, function(err, api){
      if (err) throw err;
      res.send(api);
    })
  });

  app.post('/api', bodyParser.json(), function(req, res, next){

    PubMaticApi.create(req.body).then(function(api){
      res.send(api);
    });
  });

}
