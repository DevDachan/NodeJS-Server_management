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
  db.query(`SELECT DISTINCT server_list.id, server_list.name, time, cpu_usage,user_num,state FROM server_list
            LEFT JOIN
            (SELECT * FROM history AS A , (SELECT id AS C_id, MAX(time) as max_time FROM history AS C GROUP BY id) AS B WHERE A.id = C_id AND A.time=B.max_time) AS K
            ON server_list.id=K.id;`, function(error,history){
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
    db.query(`SELECT * FROM history WHERE id=? ORDER BY time ASC`,[request.query.id],function(error,history){
      if(error){
        throw error;
      }
      if(history.length === 0){
        var err_html = `
          <!doctype html>
          <html>
          <head>
          <meta charset="utf-8">
          </head>
          <body>

          <script>
          alert('Please run the server program.');
          location.href = 'http://localhost:3000/';
          </script>
          </body>
          </html>`;
        response.writeHead(200);
        response.end(err_html);

      }else{
        var html = template_server.HTML_history(history);
        response.writeHead(200);
        response.end(html);
      }
      });
}


exports.login = function(request, response){
    var html = template_server.HTML_login();
    response.writeHead(200);
    response.end(html);
}
