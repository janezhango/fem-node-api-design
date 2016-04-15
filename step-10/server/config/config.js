var _ = require('lodash');

// deafult config object for our api
var config = {
  /* just placing the name of our possible NODE_ENV values for later*/
  dev:  'development',
  test: 'testing',
  prod: 'production',
  port: process.env.PORT || 3000
  /* this get's added later*
  env: some value
  */

};



// check to see if the NODE_ENV was set, if not, the set it to dev
process.env.NODE_ENV = process.env.NODE_ENV || config.dev;


// set config.env to whatever the NODE_ENV is
config.env = process.env.NODE_ENV;



// TODO
/*envConfig is nothing right now, but it should be an object.

Depending on what ever config.env is, load up the appropriate file
& assign the value to envConfig so the merge at the bottom actually works.


What's happening?
We have a base config(config) in this file then we conditionally
load in another config file (development, production or testing.js ),
depending on what env we are in.

We then merge those objects with the env config overwriting
the default config if here. We then export that new object for our app to use
*/

var envConfig;
  //require could error out if the file doesn't exist so, let's
  //attempt to use a 'try' statement & fallback to an empty object
  //if it does error out
try {
  envConfig = require("./" + config.env); //a file
  //making sure require got something back
} catch(e) {
  envConfig = envConfig || {}
}

// console.log(`config.env --> ${config.env}`);
module.exports = _.merge(config, envConfig);
