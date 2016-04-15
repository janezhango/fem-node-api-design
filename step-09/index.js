/*
"index.js" is the intro point for our server.

PRO-TIP: if you have an index.js file on the root of a folder in node
you can just require that folder & node will automatically require the
index.js on the root
*/


// setup config first before anything by requiring it
var config = require('./server/config/config.js');
var app    = require('./server/server.js');

// logger is a wrapper around console.log that adds color,
// logs objects as json & can be conditionally turned off
// so you don't have to erase all calls to it
var logger = require('./server/util/logger.js');



app.listen(config.port);
logger.log('listening on http://localhost:' + config.port);
