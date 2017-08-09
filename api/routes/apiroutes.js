'use strict';
module.exports = function(app) {
  var trendingCtrl = require('../controllers/trendingController');

  // todoList Routes
  app.route('/welcome')
	.post(trendingCtrl.welcomemessage)
	.get(trendingCtrl.welcomemessage);
  
  app.route('/stories').post(trendingCtrl.trendingStories);
  app.route('/stories').get(trendingCtrl.trendingStories);
};
