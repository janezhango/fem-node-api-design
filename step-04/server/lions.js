var lionRouter = require('express').Router();
var _ = require('lodash');

var id = 0;
var lions = [
  {name: 'lion1', age: 1, pride: 'pride1', gender: 'male', id: '10'}
];

var updateId = function(req, res, next) {
  if (!req.body.id) {
    id++;
    req.body.id = id + '';
  }
  next();
};

//if id route param used find the lion first
lionRouter.param('id', function(req, res, next, id) {
  var lion = _.find(lions, {id: id});
  if (lion) {
    req.lion = lion;
    next();
  } else {
    res.send();
  }
});


//GET ROUTES
lionRouter.get('/', function(req, res){
  res.json(lions);
});

lionRouter.get('/:id', function(req, res){
  var lion = req.lion;
  res.json(lion || {});
});


//POST ROUTES
lionRouter.post('/', updateId, function(req, res) {
  var lion = req.body;
  lions.push(lion);
  res.json(lion);
});


//PUT ROUTES
lionRouter.put('/:id', function(req, res) {
  var update = req.body;
  if (update.id) delete update.id;

  var lion = _.findIndex(lions, {id: req.params.id});
  if (!lions[lion]) {
    res.send();
  } else {
    var updatedLion = _.assign(lions[lion], update);
    res.json(updatedLion);
  }
});


//DELETE ROUTES
lionRouter.delete(':id', function (req, res) {
  var lion = _.find(lion, {id: req.params.id});
  lions.splice(lion,1);
  res.json(req.lion);
})

module.exports = lionRouter;







/*
We an DRY up our code more (notice we have "/:id" on GET, DELETE & PUT)


lionRouter.route('/:id')
  //into the HTTP verbs, we're just passing our original callback functions
  .get(function (req, res) {
    var lion = req.lion;
    res.json(lion || {})
  })
  .put(function (req,res) {
    var update = req.body;
    if(update.id) delete update.id;

    var lion = _.findIndex(lions, {id: req.params.id});
    if(!lions[lion]){
      res.send('No lion found to update');
    } else {
      var updatedLion = _.assign(lions[lion], update);
      res.json(updatedLion);
    }
  })
  .delete(function (req, res) {
    var lion = _.find(lions, {id: req.params.id});
    lions.splice(lion,1);
    res.json(req.lion);
  })






or just "/"

lionRouter.route('/')
  .get(function(req,res){
    res.json(lions);
  })
  .post(updateId, function (req,res) {
    var lion = req.body;
    console.log('incoming POST', lion)
    lions.push(lion)
    res.json(lion);
  })

*/
