// This is the base controller. Used for base routes, such as the default index/root path, 404 error pages, and others.
module.exports = {

  getTopics: {
    handler: function (request, reply) {

      // Grab the DB from dogwater
      var db = request.server.plugins['dogwater'];

      db.topic.find().then(function (topics) {
        reply({topics: topics});
      });

    }
  },

  getTopic: {
    handler: function (request, reply) {

      // Grab the DB from dogwater
      var db = request.server.plugins['dogwater'];

      db.topic.findOne(request.params.id)
        .then(function (topic) {
          reply({topic: topic});

        });
    }
  },


  postTopic: {
    handler: function (request, reply) {

      // Grab the DB from dogwater
      var db = request.server.plugins['dogwater'];


      const topic = {
        text: request.payload.text

      }

      db.topic.create(topic)
        .then(function (newtopic) {
          reply(newtopic).created('/api/topics/' + newtopic.id);

        });
    }
  }


}
