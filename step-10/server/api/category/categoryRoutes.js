var router       = require('express').Router();
var logger       = require('../../util/logger.js');
var controller   = require('./categoryController.js');
var createRoutes = require('../../util/createRoutes.js');
createRoutes(controller, router);

module.exports = router;
