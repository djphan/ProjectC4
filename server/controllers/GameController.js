var restful = require('node-restful');
module.exports = function(app, route) {

  //setup the controller for REST
  var rest = restful.model(
    'game',
    app.models.game
  ).methods(['get','put','post','delete']);

  //resgister with app
  rest.register(app, route);

  //Return middleware.
  return function(req,res,next) {
    next();
  };
};
