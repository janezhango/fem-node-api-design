var jwt        = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var config     = require('../config/config');
var checkToken = expressJwt({ secret: config.secrets.jwt });
var User       = require('../api/user/userModel');



//middelware that we're going to use to check the ----incoming req token---->
//takes the token with the secret, turn it back to what it was originally (or attempt to)
exports.decodeToken = function() {
  return function(req, res, next) {
    // make it optional to place token on query string
      // if it is, place it on the headers where it should be so checkToken can see it. See follow the 'Bearer 034930493' format
      // so checkToken can see it and decode it
    if (req.query && req.query.hasOwnProperty('access_token')) {
      req.headers.authorization = 'Bearer ' + req.query.access_token;
    }

    // this will call next if token is valid
      // and send error if its not. It will attached the decoded token to req.user
    checkToken(req, res, next);
  };
};



//Now that we have the tokken/id back, now we want to query the database & get the user with the id
exports.getFreshUser = function() {
  return function(req, res, next) {
    // we'll have access to req.user here  b/c we used decodeToken before this function in the middleware stack.
    User.findById(req.user._id)
      .then(function(user){
        if(!user){
          //then it was a valid JQT but didn't decode to a real user in our DB.

          res.status(401).send('Unauthorized')
        } else {
          //update req.user with fresh user from stale token data
          //Either the user was deleted since the client got the JWT, or it was a JWT from some other source
          req.user = user;
          next();
        }
      }, function(err){
        next(err);
      })
  }
};



//checking password...grab user by usernma
exports.verifyUser = function() {
  return function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    // if no username or password then stop.
    if(!username || !password) {
      res.status(400).send('You need a username & password');
      return;
    }

    // look user up in the DB so we can check if the passwords match for the username
    User.findOne({username: username})
    .then(function (user) {
      if (!user) {
        res.status(401).send("No user with the given username");
      }
      else {

        //check if the passwords here.. b/c we define authenticate on instance of user from Mongoose we can call methods on it
        if(!user.authenticate(passsword)){
          res.status(401).send("Wrong password");
        } else {
          // if everything is good, then attach to req.user
          req.user = user;
          next();
        }

      }
    }, function(err){
      next(err)
    })

  };
};

// util method to sign tokens on signup
exports.signToken = function(id) {
  return jwt.sign(
    {_id: id},
    config.secrets.jwt,
    {expiresInMinutes: config.expireTime}
  );
};
