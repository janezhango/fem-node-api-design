// no var needed here, colors will attached colors to String.prototype
require('colors');
var _      = require('lodash');
var config = require('../config/config');


// create a noop (no operation) function for when loggin is disabled
var noop = function() {};
// check if loggin is enabled in the config
// if it is, then use console.log
// if not then noop
var consoleLog = config.logging ? console.log.bind(console) : noop;


var logger = {
  log: function() {
    var args = _.toArray(arguments)
      .map(function(arg) {
        if (typeof arg === 'object') {
          // turn the object to a string so we can log all the properties & color it
          var string = JSON.stringify(arg, 2);
          return string.magenta;
        } else {
          arg += '';// coerce to string to color
          return arg.magenta;
        }
      });

    // call either console.log or noop here
    // with the console object as the context
    // and the new colored args :)
    consoleLog.apply(console, args);
  }
};

module.exports = logger;
