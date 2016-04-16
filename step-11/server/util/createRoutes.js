//FILE NOT USED IN THIS STEP BUT PREVIOUS INSTEAD TO DEMONSTRATE abstraction  patterns
//out controllers could also be a abstracted..since all but the one using populate are the same , we could even through in an options object..



//create routes
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
