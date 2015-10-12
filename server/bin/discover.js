/*jslint node: true */


var loopback = require('loopback');

var path = require('path');
var fs = require('fs');
var app = require(path.resolve(__dirname, '../server'));
var outputPath = path.resolve(__dirname, '../../common/models');



var ds =  loopback.createDataSource('oracle',{
  "tns": "sampleapp", // The tns property can be a tns name or LDAP service name
  "username": "bichatter",
  "password": "Admin123"
});

function schemaCB(err, schema) {
  'use strict';
  if(schema) {
    console.log("Auto discovery success: " + schema.name);
    var outputName = outputPath + '/' +schema.name + '.json';
    fs.writeFile(outputName, JSON.stringify(schema, null, 2), function(err) {
      if(err) {
        console.log(err);
      } else {
        console.log("JSON saved to " + outputName);
      }
    });
  }
  if(err) {
    console.error(err);
    return;
  }
  return;
}


ds.discoverSchema('CHATTER_TOPIC',{schema:'BICHATTER',views: true, all: true, relations: true},schemaCB);
ds.discoverSchema('CHATTER_TOPIC_COMMENT',{schema:'BICHATTER',views: true, all: true, relations: true},schemaCB);
ds.discoverSchema('CHATTER_TOPIC_TAG',{schema:'BICHATTER',views: true, all: true, relations: true},schemaCB);

