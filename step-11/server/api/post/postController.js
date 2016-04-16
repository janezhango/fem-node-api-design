var Post   = require('./postModel');
var _      = require('lodash');
var logger = require('../../util/logger');




//Finding a post by an ID, if found attach it to the request object
//Like berfore, we are 'prequerying our' routes with unique id, this makes it easier to just grab things off the req object

exports.params = function(req, res, next, id) {
  Post.findById(id)
    //we don't have to populate here but it does make sense to populate the Post with category & user
    //so by the time we get to the "delete", "put" or 'getOne' it's already populated aswell
    .populate('author categories')
    .then(function(post) {
      if (!post) {
        next(new Error('No post with that id'));
      } else {
        req.post = post;
        next();
      }
    }, function(err) {
      next(err);
    });
};




exports.get = function(req, res, next) {
  Post.find({})
  //for our author & categories fields, go fetch their respect information
    //populate is for model relationships...like SQL, but only @ calltime & doesn't persist in DB
    //it's not like creating a join table in SQL
    .populate('author')
    .exec()//we have to call exec b/c populate doesn't return a promise
    .then(function (categories) {
      res.json(categories);
    }, function (err) {
      next(err)
    })
};




exports.getOne = function(req, res, next) {
  var post = req.post;
  res.json(post);
};





exports.put = function(req, res, next) {
  var post = req.post;
  var update = req.body;

  _.merge(post, update);

  post.save(function(err, saved) {
    if (err) {
      next(err);
    } else {
      res.json(saved);
    }
  })
};




exports.post = function(req, res, next) {
  var newpost = req.body;
  Post.create(newpost)
    .then(function(post) {
      res.json(post);
    }, function(err) {
      logger.error(err);
      next(err);
    });
};





exports.delete = function(req, res, next) {
  req.post.remove(function(err, removed) {
    if (err) {
      next(err);
    } else {
      res.json(removed);
    }
  });
};
