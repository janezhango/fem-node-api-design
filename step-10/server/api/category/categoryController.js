var Category = require('./categoryModel');
var _        = require('lodash');




//Finding a category by an ID, if found attach it to the request object
//Like berfore, we are 'prequerying our' routes with unique id, this makes it easier to just grab things off the req object
exports.params = function(req, res, next, id) {
  // use the id and attach the category to req
  Post.findById(id)
  .then(function (category) {
    if(!category){
      next(new Error("No category with that Id"))
    } else {
      req.category = category; //
      next();
    }
  }, function (err){
    next(err)
  })
};




exports.get = function(req, res, next) {
  //need to populate here.
  Category.find({})
    .then(function(categories){
      res.json(categories);
    }, function(err){
      next(err)
    })
};




exports.getOne = function(req, res, next) {
  var category = req.category;
  res.json(category);
};





exports.put = function(req, res, next) {
  var category = req.category;
  var update = req.body;

  _.merge(category, update);

  category.save(function(err, saved) {
    if (err) {
      next(err);
    } else {
      res.json(saved);
    }
  })
};




exports.post = function(req, res, next) {
  console.log('req ->', req.body)
  var newcategory = req.body;
  //this creates with new & saves.. then....
  Category.create(newcategory)
    .then(function(category) {
      res.json(category);
    }, function(err) {
      next(err);
    });
};






exports.delete = function(req, res, next) {
  req.category.remove(function(err, removed) {
    if (err) {
      next(err);
    } else {
      res.json(removed);
    }
  });
};
