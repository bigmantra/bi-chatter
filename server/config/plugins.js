module.exports = [
  {
    register: require("dogwater"),
    options: require("./dogwater")
  },
  {
    register: require("good"),
    options: {
      reporters: [{
        reporter: require('good-console'),
        events: [{
          request: '*',
          log: '*',
          error: '*',
          ops: '*'
        }]
      }]
    }
  },
  {
    register:require('inert')

  },
  {
    register: require('bedwetter')

  }
];
