var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var path = require('path');
var swig = require('swig');
var router = require('./routes/routes');
var app = express();

var models = require('./models/models.js');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


var pathToPublic = path.join(__dirname, "./public");
var pathToViews = path.join(__dirname, "./views");

//console.log('=---------------------------',pathToPublic,pathToViews)


app.use('/bootstrap', express.static(path.join(__dirname, "./node_modules/bootstrap/dist")));
app.use('/jquery', express.static(path.join(__dirname, "./node_modules/jquery/dist")));

app.set('views',pathToViews );
app.set('view engine','html');
app.engine('html',swig.renderFile);
swig.setDefaults({cache: false});





app.use('/',router);


// catch 404 (i.e., no route was hit) and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// handle all errors (anything passed into `next()`)
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  console.error(err);
 
});


// models.Hotel.sync().then(function(){

app.listen(3001,function(){
	console.log('Listening on port 3001');
});

// })
// .catch(console.error);
