/*
TODO:
- mount the tigers route with a a new router just for tigers (exactly like lions below)
*/
var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var morgan     = require('morgan');
var _          = require('lodash');


var lionRouter  = require('./lions');
var tigerRouter = require('./tigers');


//APPLICATION WIDE MIDDLEWARE STACK
app.use(morgan('dev'))
app.use(express.static('client'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());



//my own middle ware for displaying incoming body data
app.use(function (req,res,next) {
  console.log(`request.body -->
    ${JSON.stringify(req.body || req.lion || req.tiger, null, 6)}
  `);
  next()
  });


// Mounting a route. Whenever a req comes in for
// '/lion' we want to use this router
app.use('/lions', lionRouter);
app.use('/tigers', tigerRouter);



//Error handling middleware
app.use(function(err, req, res, next) {
  if (err) {
    console.log(err.message)
    res.status(500).send(err);
  }
});




var port = 3000;
app.listen(port, function () {
  console.log(`listening on http://localhost:${port}`);
});
