/*
TODO: make this work.
- if you go to localhost:3000 the app there is expected crud to be working here
*/
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var _ = require('lodash');

//MIDDLEWARE: all incoming requests will run through MiddleWare first then routes
  // express.static will serve everything with in client as a static resource
  // also, it will server the index.html on the
  // root of that directory on a GET to '/'
app.use(express.static('client'));
  // body parser makes it possible to post JSON to the server
  // we can accss data we post on as req.body
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


//fake DB
var lions = [
  // {name: 'anne', pride: 'arrr', id: 1, age: 20, gender: 'female'},
  // {name: 'bob' , pride: 'rarr', id: 2, age: 20, gender: 'male'}
];
var id = 0;



// TODO: make the REST routes to perform CRUD on lions . . . See README


//GET ROUTES
app.get("/lions", function(req, res){
  res.status(200);
  res.type('application/json');
  res.json(lions);
})

app.get("/lions/:id", function(req, res){
  var requestedLionID =  parseInt(req.params.id);
  var lion = _.find(lions, {id: requestedLionID});

  res.status(200);
  res.type('application/json');
  res.json(lion || {});
})




//POST ROUTES
app.post("/lions", function(req, res){
  var newLion = req.body;
  id++;
  newLion.id = id;
  lions.push(newLion);
  res.status(200);
  res.json(newLion);
})


//PUT ROUTES
app.put("/lions/:id", function(req, res){
  var lionToUpdateID =  parseInt(req.params.id);
  var update = req.body;
  //if the user attempted to updateID & mess with us
  if(update.id) delete updateID;

  var lion = _.findIndex(lions, {id: lionToUpdateID})
  if(!lions[lion]) res.send({message: "no lion found"});
  else{
    var updatedLion =  _.assign(lions[lion], updated);
    res.json(updatedLion);
  }

  res.status(200);
  res.type('application/json');
  res.json(lionToUpdate);
})




//DELETE ROUTE
app.delete("/lions/:id", function (req, res) {
  var lion = _.findIndex(lions, {id: parseInt(req.params.id);})
  if(!lions[lion]{
    res.send({message: "no lion found"});
  }
  else{
    var deletedLion = lions.splice(lion,1);
    res.status(200);
    res.type('application/json');
    res.json(lionToDelete);
  }
})




//listen on port
var port = 3000;
app.listen(port, function(){
  console.log(`listening on http://localhost:${port}`);
})
