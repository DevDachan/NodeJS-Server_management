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
    db.query(`SELECT * FROM history JOIN server_list USING(id) WHERE id=? ORDER BY time DESC`,[request.query.id],function(error,history){
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



exports.create_state = function(request, response){
  var body = '';
  request.on('data', function(data){
      body = body + data;
  });
  request.on('end', function(){
      var post = qs.parse(body);
    db.query(`SELECT * FROM server_list WHERE id=?`,[post.ip_key],function(error1,ex_id){
      if(error1){
        throw error1;
      }
      db.query(`SELECT * FROM server_list WHERE name=?`,[post.ip_server_name],function(error2,ex_name){
        if(error2){
          throw error2;
        }

        if(ex_id.length !== 0){
          var err_html = `
            <!doctype html>
            <html>
            <head>
            <meta charset="utf-8">
            </head>
            <body>
            <h1>ERROR</h1>
            <script>
            alert('이미 존재하는 key 값 입니다.');
            location.href = 'http://localhost:3000/server_register';
            </script>
            </body>
            </html>`;
          response.writeHead(200);
          response.end(err_html);
        }
        else if(ex_name.length !== 0){
          var err_html = `
            <!doctype html>
            <html>
            <head>
            <meta charset="utf-8">
            </head>
            <body>
            <h1>ERROR</h1>
            <script>
            alert('이미 존재하는 server name');
            location.href = 'http://localhost:3000/server_register';
            </script>
            </body>
            </html>`;
          response.writeHead(200);
          response.end(err_html);
        }
        else{
          db.query("INSERT INTO server_list VALUE(?,?,null)",[post.ip_key, post.ip_server_name],function(error3,result){
            if(error3){
              throw error3;
            }

            response.writeHead(302,{Location:`/`});
            response.end();
          })
        }
    });
  });
});
}
