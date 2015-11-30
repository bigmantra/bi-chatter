//controller for API routes
var controller = require('../controllers/api');

/*
 module.exports = [
 {
 method: 'GET',
 path: '/api/topics',
 config: controller.getTopics
 },
 {
 method: 'GET',
 path: '/api/topic/{id}',
 config: controller.getTopic
 },
 {
 method: 'POST',
 path: '/api/topics',
 config: controller.postTopic
 },
 ]
 */


module.exports = [
  {
    method: 'GET',
    path: '/api/topics',
    handler: {
      bedwetter: {prefix :'/api'}
    }
  },
  {
    method: 'GET',
    path: '/api/topics/{id}',
    handler: {
      bedwetter: {prefix :'/api'}
    }
  },
  {
    method: 'POST',
    path: '/api/topics',
    handler: {
      bedwetter: {prefix :'/api'}
    }
  },
]
