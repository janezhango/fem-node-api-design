/*
TODO:
- use app.params to find the lion using the id
- next attach the lion to the req object & call next.
- Then in '/lion/:id' just send back req.lion

- create a middleware function to catch & handle errors, register it as the last middleware on app
- create a route middleware for POST /lions that will increment & add an id to the incoming new lion object on req.body
*/

var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var _          = require('lodash');
var morgan     = require('morgan');
//Fake DB
var lions = [
  {name: 'anne', pride: 'arrr', id: 1, age: 20, gender: 'female'},
  // {name: 'bob' , pride: 'barr', id: 2, age: 20, gender: 'male'}
];
var id = 0;

var updateId = function(req, res, next) {
  // fill this out. this is the route middleware for the ids
};

/*
var middlewareCallbacks = ['morgan', expressStatic, bp,bp, [...routes], error]
*/



//MIDDLEWARE - client requests route through here first then individual routes
app.use(morgan('dev'))
app.use(express.static('client'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());



//notice we had to find the ID in each of our routes. Here we're going to create middleware to do that for us first.
//this function will run if it detects that we hit a URL with a query param
app.param('id', function(req, res, next, id) {
  var lion = _.find( lions, {id:id} );
  if(lion){
    req.lion = lion;
    next();
  }
  else {
    res.send("didnt find the lion")
  }
});

//middleWare Function
var updateId = function(req, res, next) {
  // fill this out. this is the route middleware for the ids
  id++;
  req.body.id = id + "";
  req.id = id;
  next();
};



//GET ROUTES
app.get('/lions', function(req, res){
  res.json(lions);
});

app.get('/lions/:id', function(req, res){
  res.json(req.lion);
});


//POST ROUTES
//when this route get's hit, updateId will be called, which grabs the incoming body adds + increments lion, then run the next cb
app.post('/lions', updateId, function(req, res) {
  var newLion = req.body;
  lions.push(newLion);
  res.json(newLion);
});







//PUT ROUTES
app.put('/lions/:id', function(req, res) {
  var updatedLion = req.lion;
  if (updateLion.id) delete update.id;

  var lion = _.findIndex(lions, {id: update.id});
  if (!lions[lion]) {
    res.send("nothing found");
  } else {
    var updatedLion = _.assign(lions[lion], update);
    res.json(updatedLion);
  }
});


//middleware for catching & handling errors, error handling middleware has 4 args!
app.use(function(err, req, res, next){
  if(err){
    res.status(500).send(err)
  }
});




//listen on port
var port = 3000;
app.listen(port, function () {
  console.log(`listening on http://localhost:${port}`);
});
