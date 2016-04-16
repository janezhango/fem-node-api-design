var router         = require('express').Router();
var userRouter     = require('./user/userRoutes.js')
var postRouter     = require('./post/postRoutes.js')
var categoryRouter = require('./category/categoryRoutes.js')

/*
api router will mount other routers for all our resources.
Each resource directory has a resourceRoutes.js file with
the router ready to go.

-  require them & mount them to their respective routes below
*/


router.use('/users', userRouter);
router.use('/categories', categoryRouter);
router.use('/posts', postRouter);

module.exports = router;
