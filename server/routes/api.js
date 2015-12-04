//controller for API routes
var controller = require('../controllers/api');
var json2html = require('node-json2html');
var jsonDocTransform = require('../utils/J2HTransform')
var jsonDocs=require('../utils/apiDocs');


module.exports = [

  //Returns an array of topics with an HTTP 200 OK response.
  //Example 1
  //'/topics?sort=id ASC&skip=1&limit=3&where={"id":[1,2]}'

  {
    method: 'GET',
    path: '/api/topics',
    config: {
      tags: ['api'], description: 'Get list of topics',
      notes: json2html.transform(jsonDocs.findTopics, jsonDocTransform),
      pre:[function(request,reply){

        console.log('Processing Pre');
        return reply();

      }]
      , handler: {
        bedwetter: {prefix: '/api', populate: true}
      }
    }
  },

  //Returns the integer number of topics matched with an HTTP 200 OK response.
  {
    method: 'GET',
    path: '/api/topics/count',
    handler: {
      bedwetter: {prefix: '/api'}
    }
  },


//  Returns topic id with an HTTP 200 OK response. Responds with an HTTP 404 Not Found response if the topic is not found.
  {
    method: 'GET',
    path: '/api/topics/{id}',
    handler: {
      bedwetter: {prefix: '/api', populate: true}
    }
  },

//  Returns an array of comments associated with topic id. Returns HTTP 200 OK if that topic is found. Returns an HTTP 404 Not Found response if that topic is not found.
  {
    method: 'GET',
    path: '/api/topics/{id}/comments',
    handler: {
      bedwetter: {prefix: '/api', populate: true}
    }
  },

//Returns the integer number of comments associated with topic id. Returns HTTP 200 OK if that topic is found. Returns an HTTP 404 Not Found response if that topic is not found.

  {
    method: 'GET',
    path: '/api/topics/{id}/comments/count',
    handler: {
      bedwetter: {prefix: '/api', populate: true}
    }
  },

//Returns HTTP 204 No Content if comment childId is associated with topic id. Returns an HTTP 404 Not Found response if that topic is not found or that comment is not associated with the topic.

  {
    method: 'GET',
    path: '/api/topics/{id}/comments/{childId}',
    handler: {
      bedwetter: {prefix: '/api', populate: true}
    }
  },

//Creates a new topic using the request payload and returns it with an HTTP 201 Created response.

  {
    method: 'POST',
    path: '/api/topics',
    handler: {
      bedwetter: {prefix: '/api'}
    }
  },

//  Creates a new comment using the request payload and associates that comment with topic id. Returns that comment with an HTTP 201 Created response. If that topic is not found, returns an HTTP 404 Not Found response.

  {
    method: 'POST',
    path: '/api/topics/{id}/comments',
    handler: {
      bedwetter: {prefix: '/api'}
    }
  },

  //Associates comment childId with topic id. Returns an HTTP 204 No Content response on success. If the topic or comment are not found, returns an HTTP 404 Not Found response.

  {
    method: 'PUT',
    path: '/api/topics/{id}/comments/{childId}',
    handler: {
      bedwetter: {prefix: '/api'}
    }
  },

  //Destroys topic id. Returns an HTTP 204 No Content response on success. If the topic doesn't exist, returns an HTTP 404 Not Found response.

  {
    method: 'DELETE',
    path: '/api/topics/{id}',
    handler: {
      bedwetter: {prefix: '/api'}
    }
  },

//Removes association between topic id and comment childId. Returns an HTTP 204 No Content response on success. If the topic or comment doesn't exist, returns an HTTP 404 Not Found response.

  {
    method: 'DELETE',
    path: '/api/topics/{id}/comment/{childId}',
    handler: {
      bedwetter: {prefix: '/api'}
    }
  },

//Updates topic id using the request payload (which will typically only contain the attributes to update) and responds with the updated topic. Returns an HTTP 200 OK response on success. If the topic doesn't exist, returns an HTTP 404 Not Found response
  {
    method: 'PATCH',
    path: '/api/topics/{id}',
    handler: {
      bedwetter: {prefix: '/api'}
    }
  },

//Using a non-bedwetter endpoint -  controller handler
  {
    method: 'GET',
    path: '/api/topic1/{id}',
    config: controller.getTopic
  }
]
