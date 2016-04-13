/*
TODO:
- make a new router for the tigers resource
- make some REST routes for it, exactly like for lions
- make a middleware that just logs the word 'tiger' to the console when a request comes in to the server
*/
var tigerRouter = require('express').Router();
var _           = require('lodash');


var id = 0;
var tigers = [
  // {name: 'tiger1', age: 1, pride: 'pride1', gender: 'male', id:'10'}
];


//middleWare that get's called when user sends a POST to tiger
var updateId = function(req, res, next){
  if(!req.body.id){
    id++;
    req.body.id = id + "";
  }
  next();
}

//NOTE: we can all say: tigerRouter.use("specificRoute", otherRouter)

//if id route param used find the tiger first
tigerRouter.param('id', function(req, res, next, id){
  var tiger = _.find(tigers, {id: id});
  // console.log('tiger param', id)
  if (tiger) {
    req.tiger = tiger;
    next();
  } else {
    res.send();
  }
});



//GET ROUTES
tigerRouter.get('/', function(req,res){
  res.json(tigers);
});

tigerRouter.get('/:id', function (req, res) {
  var tiger = req.tiger;
  res.json(tiger || {})
});



//POST ROUTES
tigerRouter.post('/', updateId, function (req,res) {
  var tiger = req.body;
  tigers.push(tiger)
  console.log('new database', tigers)
  res.json(tiger);
});


//PUT ROUTES
tigerRouter.put('/:id',function (req,res) {
  var update = req.tiger;
  if(update.id) delete update.id;

  var tiger = _.findIndex(lions, {id: req.params.id});
  if(!tigers[tiger]){
    res.send('No tiger found to update');
  } else {
    var updatedLion = _.assign(lions[lion], update);
    res.json(updatedLion);
  }
});


//DELETE ROUTES
tigerRouter.delete(':id', function (req, res) {
  var tiger = _.find(tigers, {id: req.params.id});
  tigers.splice(tiger,1);
  res.json(req.tiger);
})


module.exports = tigerRouter;








/*
We an DRY up our code more (notice we have "/:id" on GET, DELETE & PUT)


tigerRouter.route('/:id')
  //into the HTTP verbs, we're just passing our original callback functions
  .get(function (req, res) {
    var tiger = req.tiger;
    res.json(tiger || {})
  })
  .put(function (req,res) {
    var update = req.body;
    if(update.id) delete update.id;

    var tiger = _.findIndex(lions, {id: req.params.id});
    if(!tigers[tiger]){
      res.send('No tiger found to update');
    } else {
      var updatedLion = _.assign(lions[lion], update);
      res.json(updatedLion);
    }
  })
  .delete(function (req, res) {
    var tiger = _.find(tigers, {id: req.params.id});
    tigers.splice(tiger,1);
    res.json(req.tiger);
  })






or just "/"

tigerRouter.route('/')
  .get(function(req,res){
    res.json(tigers);
  })
  .post(updateId, function (req,res) {
    var tiger = req.body;
    console.log('incoming POST', tiger)
    tigers.push(tiger)
    res.json(tiger);
  })

*/
