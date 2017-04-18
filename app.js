var express = require('express');
var app = express();
var mainCtrl = require('./controllers/mainCtrl');
var port = 3000;


// set up template engin
app.set('view engine', 'ejs');

// redirect static files
app.use('/assets', express.static('./assets'));


// fire controllers
mainCtrl(app);

// listen to port
app.listen(port);
console.log('new listening to port:'+port);
