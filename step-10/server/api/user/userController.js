var User = require('./userModel');
var _ = require('lodash');


//Finding a user by an ID, if found attach it to the request object
//Like berfore, we are 'prequerying our' routes with unique id, this makes it easier to just grab things off the req object

exports.params = function(req, res, next, id) {
  User.findById(id)
    .then(function(user) {
      if (!user) {
        next(new Error('No user with that id'));
      } else {
        req.user = user;
        next();
      }
    }, function(err) {
      next(err);
    });
};




exports.get = function(req, res, next) {
  User.find({})
    .then(function(users) {
      res.json(users);
    }, function(err) {
      next(err);
    });
};




exports.getOne = function(req, res, next) {
  var post = req.user;
  res.json(category)
};




exports.put = function(req, res, next) {
  var user = req.user;

  var update = req.body;

  _.merge(user, update);

  user.save(function(err, saved) {
    if (err) {
      next(err);
    } else {
      res.json(saved);
    }
  });
};




exports.post = function(req, res, next) {
  var newUser = req.body;

  User.create(newUser)
    .then(function(user) {
      res.json(user);
    }, function(err) {
      next(err);
    });
};





exports.delete = function(req, res, next) {
  req.user.remove(function(err, removed) {
    if (err) {
      next(err);
    } else {
      res.json(removed);
    }
  });
};
