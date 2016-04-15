
module.exports = function(controller, router) {
  //instead of writing this for four times for each router, this is a util function
  router.param('id', controller.params);

  //all requests to root
  router.route('/')
    .get(controller.get)
    .post(controller.post);

  //all requests for specific user
  router.route('/:id')
    .get(controller.getOne)
    .put(controller.put)
    .delete(controller.delete);
};
