//controller for static resources
var controller = require('../controllers/static');

module.exports = [
    {
        method: 'GET',
        path: '/app/{path*}',
        config: controller.app
    },
    {
        method: 'GET',
        path: '/images/{path*}',
        config: controller.images
    }
]
