var express     = require('express');
var bodyParser  = require('body-parser');
var app         = express();
var morgan      = require('morgan');
var _           = require('lodash');

var lionRouter  = require('./lions');
var tigerRouter = require('./tigers');

//Application wide middleware
app.use(morgan('dev'))
app.use(express.static('client'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// this is called mounting. when ever a req comes in for
// '/lion' we want to use this router
app.use('/lions', lionRouter);
app.use('/tigers', tigerRouter);

app.use(function(err, req, res, next) {
  if (err) {
    res.status(500).send(err);
  }
});



var port = 5000;
app.listen(port, function(){
  console.log(`Listening on port on: http://localhost:${port}`)
});


module.exports = app;
