var http = require('http');
var template_server = require('./template_server.js');
var url = require('url');
var qs = require('querystring');
var fs = require('fs');


var express = require('express');
var app = express();
app.use(express.static('public'));


exports.main = function(request, response){
    var html = template_server.HTML_main();
    response.writeHead(200);
    response.end(html);
}

exports.register = function(request, response){
    var html = template_server.HTML_register();
    response.writeHead(200);
    response.end(html);
}

exports.history = function(request, response){
    var html = template_server.HTML_history();
    response.writeHead(200);
    response.end(html);
}


exports.login = function(request, response){
    var html = template_server.HTML_login();
    response.writeHead(200);
    response.end(html);
}
