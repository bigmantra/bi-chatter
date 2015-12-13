'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');
var jsonfile = require('jsonfile')
var util = require('util')
var fs = require('fs')

var browserSync = require('browser-sync');

var $ = require('gulp-load-plugins')();


//This gulp task is meant to produce the includes file that will be used to load all required files when the app is bootstrapped from inside OBIEE
gulp.task('includes', function () {


  var wireDepDataJS = require('wiredep')({
    //exclude: [/bootstrap.js$/, /bootstrap-sass-official\/.*\.js/, /bootstrap\.css/, /\/.*\.css/, /\/.*\.scss/],
    exclude: [/bootstrap.js$/, /bootstrap-sass-official\/.*\.js/, /\/.*\.scss/, /\/.*\.less/],
    directory: 'bower_components'
  })

  //Log wiredep data
  fs.writeFileSync(path.join(conf.paths.src, '/bootstrap/wiredep.json'), JSON.stringify(wireDepDataJS), 'utf8');


  var packageObjects = wireDepDataJS.packages;

  var requireConf = {
    baseUrl: 'http://localhost:3000',
    paths: {},
    shim: {}
  }
  var requireLoadArray = [];

  for (var packageItem in packageObjects) {
    if (packageObjects.hasOwnProperty(packageItem)) {

      //Insert RequireJS Paths

      packageObjects[packageItem].main.forEach(function (element, index, array) {

        if (wireDepDataJS.js.indexOf(packageObjects[packageItem].main[index]) > -1) {
          requireLoadArray.push(packageItem);
          requireConf.paths[packageItem] = packageObjects[packageItem].main[index].replace('.js', '').replace(/\\/g, '/');

        }

        //Only CSS will be needed in the LoadArray. To be used by the CSSLoader RQjs plugin
        if (wireDepDataJS.css.indexOf(packageObjects[packageItem].main[index]) > 0) {

          console.log('pushing css item: ' + packageObjects[packageItem].main[index]);
          requireLoadArray.push('css!' + (packageObjects[packageItem].main[index]).replace(/\\/g, '/'));
        }

      });
      //Insert RequireJS Shims
      var depObjects = packageObjects[packageItem].dependencies;
      var depArray = [];
      for (var depItem in depObjects) {
        if (depObjects.hasOwnProperty(depItem)) {
          depArray.push(depItem);
        }
      }

      //Force a jquery dependency on Angular so that it uses full-jquery instead of jqlite
      if (packageItem == "angular") {
        depArray.push("jquery");
        requireConf.shim[packageItem] = {deps: depArray, exports: 'angular'}
      } else {
        requireConf.shim[packageItem] = {deps: depArray}
      }
      if (packageItem == "socket.io.client") {
        requireConf.shim[packageItem] = {exports: 'io'}
      }


    }
  }
  //Push app.css into the css array before injection
  requireLoadArray.push('css!app/app.css');

  var data = fs.readFileSync(path.join(conf.paths.src, '/bootstrap/bootstrap.FileInjector.js'), 'utf8');

  //Add Placeholder strings into the JSON objects. These will later be replaced with start and end tags in the injection transform
  requireConf.paths['PLACEHOLDER_APP_DEPS'] = "AWAIT";
  requireConf.shim['PLACEHOLDER_APP_SHIM'] = "AWAIT";


  //relace all Config Placeholder strings with Start and End tags as the inject plugin requires it
  var result1 = data.replace(/'PLACEHOLDER_CONF'/g, JSON.stringify(requireConf).replace('"PLACEHOLDER_APP_DEPS":"AWAIT"', '/*BEGIN_APPDEPS*/ /*END_APPDEPS*/').replace('"PLACEHOLDER_APP_SHIM":"AWAIT"', '/*BEGIN_APPSHIM*/ /*END_APPSHIM*/'));
  var result2 = result1.replace(/'PLACEHOLDER_LOAD'/g, "'" + requireLoadArray.join("','") + "' " + ',/*BEGIN_APPARRDEPS*/ /*END_APPARRDEPS*/');

  //TODO change to PIPE for efficiency
  fs.writeFileSync(path.join(conf.paths.tmp, '/tmp.chatter.Bootstrap.js'), result2, 'utf8');

  return gulp.src(path.join(conf.paths.tmp, '/tmp.chatter.Bootstrap.js'))
    .pipe($.rename(path.join(conf.paths.src, '/chatter.Bootstrap.js')))
    .pipe($.inject(gulp.src([path.join(conf.paths.src, '/app/**/*.js')], {read: false}), {
      starttag: '/*BEGIN_APPDEPS*/',
      endtag: '/*END_APPDEPS*/',
      transform: function (filepath, file, i, length) {
        //Extract filename and use it as the itemname for app dependencies
        var filename = filepath.replace(/^.*[\\\/]/, '')
        filename = filename.replace(filename.substr(filename.lastIndexOf('.')), '')
        return '"' + filename + '":  "' + filepath.replace('.js', '').replace('/app/', 'app/') + '"' + (i + 1 < length ? ',' : '');
      }
    }))
    .pipe($.inject(gulp.src([path.join(conf.paths.src, '/app/**/*.js')], {read: false}), {
      starttag: '/*BEGIN_APPSHIM*/',
      endtag: '/*END_APPSHIM*/',
      transform: function (filepath, file, i, length) {
        //Extract filename and use it as the itemname for app dependencies
        var filename = filepath.replace(/^.*[\\\/]/, '')
        filename = filename.replace(filename.substr(filename.lastIndexOf('.')), '')

        return '"' + filename + '": {"deps": ["angular"]}' + (i + 1 < length ? ',' : '');
      }
    }))
    .pipe($.inject(gulp.src([path.join(conf.paths.src, '/app/**/*.js'), path.join(conf.paths.src, '/app/**/*.css'), '!' + path.join(conf.paths.src, '/app/chatter/chatter.Bootstrap.js')])/*.pipe($.angularFilesort())*/, {
      starttag: '/*BEGIN_APPARRDEPS*/',
      endtag: '/*END_APPARRDEPS*/',
      transform: function (filepath, file, i, length) {


        console.log('file:' + filepath)
        //use the css loader requirejs plugin syntax for all non-js files
        if ((/(?:\.([^.]+))?$/).exec(filepath)[1] == 'js') {

          //Extract filename and use it as the itemname for app dependencies
          var filename = filepath.replace(/^.*[\\\/]/, '')
          filename = filename.replace(filename.substr(filename.lastIndexOf('.')), '')

          return '"' + filename + '"' + (i + 1 < length ? ',' : '');
        } else {
          return '"css!' + filepath.replace('/app/', 'app/') + '"' + (i + 1 < length ? ',' : '');
        }

      }
    }))
    .pipe(gulp.dest(path.join(conf.paths.src, '/app/chatter')));

});


gulp.task('scripts', ['includes'], function () {
  return gulp.src(path.join(conf.paths.src, '/app/**/*.js'))
    //.pipe($.jshint())
    //.pipe($.jshint.reporter('jshint-stylish'))
    .pipe(browserSync.reload({stream: true}))
    .pipe($.size())
});



