'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');
var jsonfile = require('jsonfile')
var util = require('util')

var browserSync = require('browser-sync');

var $ = require('gulp-load-plugins')();



//This gulp task is meant to produce the includes file that will be used to load all required files when the app is bootstrapped from inside OBIEE
gulp.task('includes', function () {


  var wireDepDataJS = require('wiredep')({

    src: ['*.js'],
    exclude: [/bootstrap.js$/, /bootstrap-sass-official\/.*\.js/, /bootstrap\.css/, /\/.*\.css/, /\/.*\.scss/],
    directory: 'bower_components'
  })

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
        if (wireDepDataJS.js.indexOf(packageObjects[packageItem].main[index]) > 0) {
          requireLoadArray.push(packageItem);
          requireConf.paths[packageItem] = packageObjects[packageItem].main[index].replace('.js', '').replace(/\\/g, '/');

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
      requireConf.shim[packageItem] = {deps: depArray}

    }
  }

  var fs = require('fs')
  var data = fs.readFileSync(path.join(conf.paths.src, '/biApp/includefile.js'), 'utf8');

  //Add Placeholder strings into the JSON objects. These will later be replaced with start and end tags in the injection transform
  requireConf.paths['PLACEHOLDER_APP_DEPS'] = "AWAIT";
  requireConf.shim['PLACEHOLDER_APP_SHIM'] = "AWAIT";


  //relace all Config Placeholder strings with Start and End tags as the inject plugin requires it
  var result1 = data.replace(/'PLACEHOLDER_CONF'/g, JSON.stringify(requireConf).replace('"PLACEHOLDER_APP_DEPS":"AWAIT"', '/*BEGIN_APPDEPS*/ /*END_APPDEPS*/').replace('"PLACEHOLDER_APP_SHIM":"AWAIT"', '/*BEGIN_APPSHIM*/ /*END_APPSHIM*/'));
  var result2 = result1.replace(/'PLACEHOLDER_LOAD'/g, "'" + requireLoadArray.join("','") + "' " + ',/*BEGIN_APPARRDEPS*/ /*END_APPARRDEPS*/');

  fs.writeFileSync(path.join(conf.paths.src, '/biApp/includefileReplaced.js'), result2, 'utf8');


  return gulp.src(path.join(conf.paths.src, '/biApp/includefileReplaced.js'))
    .pipe($.inject(gulp.src([path.join(conf.paths.src, '/app/**/*.js'), path.join(conf.paths.src, '/app/**/*.css'), path.join(conf.paths.src, '/app/**/*.html')], {read: false}), {
      starttag: '/*BEGIN_APPDEPS*/',
      endtag: '/*END_APPDEPS*/',
      transform: function (filepath, file, i, length) {
        return '"appDep' + i + '":  "' + filepath.replace('.js','').replace('/app/','app/') + '"' + (i + 1 < length ? ',' : '');
      }
    }))
    .pipe($.inject(gulp.src([path.join(conf.paths.src, '/app/**/*.js'), path.join(conf.paths.src, '/app/**/*.css'), path.join(conf.paths.src, '/app/**/*.html')], {read: false}), {
      starttag: '/*BEGIN_APPSHIM*/',
      endtag: '/*END_APPSHIM*/',
      transform: function (filepath, file, i, length) {
        return '"appDep' + i + '": {"deps": ["angular"]}' + (i + 1 < length ? ',' : '');
      }
    }))
    .pipe($.inject(gulp.src([path.join(conf.paths.src, '/app/**/*.js'), path.join(conf.paths.src, '/app/**/*.css'), path.join(conf.paths.src, '/app/**/*.html')], {read: false}), {
      starttag: '/*BEGIN_APPARRDEPS*/',
      endtag: '/*END_APPARRDEPS*/',
      transform: function (filepath, file, i, length) {
        return '"appDep' + i + '"' + (i + 1 < length ? ',' : '');
      }
    }))
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve')));

});


gulp.task('scripts', ['includes'], function () {
  return gulp.src(path.join(conf.paths.src, '/app/**/*.js'))
    //.pipe($.jshint())
    //.pipe($.jshint.reporter('jshint-stylish'))
    .pipe(browserSync.reload({stream: true}))
    .pipe($.size())
});



