var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var path = require('path');
var swig = require('swig');

var router = require('./routes/routes');
var app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'));



app.set('view',__dirname+"/views");
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
  res.render(
    // ... fill in this part
  );
});



app.listen(3001,function(){
	console.log('Listening on port 3001');
});
