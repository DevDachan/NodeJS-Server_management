var http = require('http');
var template_server = require('./template_server.js');

var url = require('url');
var qs = require('querystring');
var fs = require('fs');
var db = require('./db.js');

var express = require('express');
var app = express();
app.use(express.static('public'));


exports.main = function(request, response){
  db.query(`SELECT * FROM history AS A,(SELECT id, MAX(time) as max_time FROM history GROUP BY id) AS B WHERE A.id = B.id AND A.time=B.max_time ORDER BY A.id`,function(error,history){
    if(error){
      throw error;
    }
      var html = template_server.HTML_main(history);
      response.writeHead(200);
      response.end(html);
  })
}

exports.register = function(request, response){
    var html = template_server.HTML_register();
    response.writeHead(200);
    response.end(html);
}

exports.history = function(request, response){
    db.query(`SELECT * FROM history WHERE id=?`,[request.query.id],function(error,history){
      var html = template_server.HTML_history(history);
      response.writeHead(200);
      response.end(html);
    });
}


exports.login = function(request, response){
    var html = template_server.HTML_login();
    response.writeHead(200);
    response.end(html);
}
