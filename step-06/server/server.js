var express   = require('express');
var app       = express();
var apiRouter = require('./api/api.js'); //api router
var err       = require("./middleware/err.js")

// setup the app middlware
//________________________)function(    )
require('./middleware/appMiddlware')(app); //not returning b/c we don't need to it''s a function that just runs. In a big big app you might have a dozens of middleware, this is just storing that away somewhere else.
  /* above does this
  -----------------------
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());  */



// setup the api (mounting): any request to '/api' to go the api router
app.use('/api', apiRouter);



// set up global error handling
app.use(err);

// export the app for testing
module.exports = app;
