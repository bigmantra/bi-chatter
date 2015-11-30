// This is the assets controller. Goal is to serve css, js, partials, images, or bower packages.
var path = require('path'),
rootPath = path.normalize(__dirname + '/../..');

module.exports = {
    app: {
        handler: {
            directory: { path: rootPath + '/client/app/' }
        }
    },
    images: {
        handler: {
            directory: { path: rootPath + '/client/assets/images' }
        }
    },
    css: {
        handler: {
            directory: { path: rootPath + '/client/app/css' }
        }
    },
    js: {
        handler: {
            directory: { path: rootPath + '/client/app' }
        }
    },
    bower: {
        handler: {
            directory: { path: rootPath + '/client/bower_components' }
        }
    }
}
