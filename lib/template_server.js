
var template_chart = require('./template_chart.js');


module.exports = {

  chart_bar:function(temp,data_col,data_row){
      var col ='';
      for(var i = 0; i<data_col.length; i++){
         col += `"${data_col[i]}"`;
         if(i+1 !== data_col.length){
           col += ' , ';
         }
      }
      col = `[${col}]`;

      var row ='';
      for(var i = 0; i<data_row.length; i++){
         row += `"${data_row[i]}"`;
         if(i+1 !== data_row.length){
           row += ' , ';
         }
      }
      row = `[${row}]`;

      return `
        Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
        Chart.defaults.global.defaultFontColor = '#292b2c';

        // Bar Chart Example
        var ctx = document.getElementById('userchart_'+'${temp}');
        var myLineChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels:${col},
          datasets: [{
            label: "Revenue",
            backgroundColor: "rgba(2,117,216,1)",
            borderColor: "rgba(2,117,216,1)",
            data:${row},
          }],
        },
        options: {
          scales: {
            xAxes: [{
              time: {
                unit: 'day'
              },
              gridLines: {
                display: false
              },
              ticks: {
                maxTicksLimit: 6
              }
            }],
            yAxes: [{
              ticks: {
                min: 0,
                max: 200,
                maxTicksLimit: 5
              },
              gridLines: {
                display: true
              }
            }],
          },
          legend: {
            display: false
          }
        }
        });`
        ;
    }
    ,
  history_make_list:function(history){
    var temp = '';
    for(var i = 0; i<history.length; i++){
      temp += `
      <tr>
        <th>${history[i].time}</th>
        <th>${history[i].state}</th>
        <th>${history[i].cpu_usage}</th>
        <th>${history[i].user_num}</th>
        <tb>duration ex</th>
      </tr>`;

    }
    return temp;
  },
  main_make_list:function(history){
    var temp = '';
    for(var i = 0; i<history.length; i++){
      if(history[i].time === null){
        temp += `
          <tr>
            <th>${history[i].name}</th>
            <th>${history[i].id}</th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
          </tr>`;

      }else{
      temp += `
        <tr>
          <th>${history[i].name}</th>
          <th>${history[i].id}</th>
          <th>${history[i].user_num}</th>
          <th>${history[i].cpu_usage}</th>
          <th>${history[i].state}</th>
          <th>${history[i].time}</th>
        </tr>`;
      }
    }
    return temp;
  },
  chart_area:function(temp,data_col,data_row){

    var col ='';
    for(var i = 0; i<data_col.length; i++){
       col += `"${data_col[i]}"`;
       if(i+1 !== data_col.length){
         col += ' , ';
       }
    }
    col = `[${col}]`;

    var row ='';
    var buf = [];
    for(var i = 0; i<data_row.length; i++){
       buf = data_row[i].split('%');

       row += ` ${buf[0]} `;
       if(i+1 !== data_row.length){
         row += ' , ';
       }
    }
    row = `[${row}]`;
    return `
    Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
    Chart.defaults.global.defaultFontColor = '#292b2c';
      var ctx = document.getElementById('chart_'+'${temp}');
      var chart_${temp} = new Chart(ctx, {
          type: 'line',
          data: {
            labels: ${col},
            datasets: [{
              label: "%",
              lineTension: 0.3,
              backgroundColor: "rgba(2,117,216,0.2)",
              borderColor: "rgba(2,117,216,1)",
              pointRadius: 5,
              pointBackgroundColor: "rgba(2,117,216,1)",
              pointBorderColor: "rgba(255,255,255,0.8)",
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "rgba(2,117,216,1)",
              pointHitRadius: 50,
              pointBorderWidth: 2,
              data: ${row},
            }],
          },
          options: {
            scales: {
              xAxes: [{
                time: {
                  unit: 'date'
                },
                gridLines: {
                  display: false
                },
                ticks: {
                  maxTicksLimit: 7,
                  fontSize : 0
                }
              }],
              yAxes: [{
                ticks: {
                  min: 0,
                  max: 100,
                  maxTicksLimit: 5,
                  fontSize : 0
                },
                gridLines: {
                  display: false
                }
              }],
            },
            legend: {
              display: false
            }
          }
        });
    `;

  }
  ,
  main_make_block:function(history){
    var temp = ``;
    var block_list = '';
    for(var i = 0 ; i<history.length; i++){
      if(history[i].state === null){
        temp += `
        <div class="col-xl-3 col-md-6">
            <div class="card bg-primary text-white mb-4" style="background-color:#E94560; height:93%;">
                <div class="card-body" style="margin:auto;"><h3 id="block_title" >${history[i].name}</h3></div>
                <!--Body-->
                <div style="">

                  <p id="block_text_title" style= "text-align:center; font-weight:bold;">
                    Data is empty
                  </p>

                  <p id="block_text" style="font-weight:bold; text-align:center; ">  Please run the server program</p>
                  <br />


                  </div>
                <div class="card-footer d-flex align-items-center justify-content-between">
                    <a class="small text-white stretched-link" style=" text-decoration-line: none; padding-bottom:5px; font-weight:bold; font-size:1.2vw" href="http://localhost:3000/server_history?id=${history[i].id}">Server History</a>
                    <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                </div>
            </div>
        </div>
        `;
      }
      else if(history[i].state === "off"){
        temp += `
        <div class="col-xl-3 col-md-6">
            <div class="card bg-primary text-white mb-4" style="background-color:#E94560; height:93%;">
                <div class="card-body" style="margin:auto;"><h3 id="block_title">${history[i].name}</h3></div>
                <!--Body-->
                <div style="">

                  <p id="block_text_title" style= "text-align:center; font-weight:bold;">
                    Server state
                  </p>

                  <p id="block_text" style="font-weight:bold; text-align:center; ">OFF</p>
                  <br />


                  </div>
                <div class="card-footer d-flex align-items-center justify-content-between">
                    <a class="small text-white stretched-link" style=" text-decoration-line: none; padding-bottom:5px; font-weight:bold; font-size:1.2vw" href="http://localhost:3000/server_history?id=${history[i].id}">Server History</a>
                    <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                </div>
            </div>
        </div>
        `;
      }else{
        temp += `
        <div class="col-xl-3 col-md-6">
            <div class="card bg-primary text-white mb-4">
                <div class="card-body" style="margin:auto;"><h3 id="block_title"">${history[i].name}</h3></div>
                <!--Body-->
                <div>
                  <table id="block_table">
                    <tr id="block_tr">
                      <td id="block_td" >CPU USAGE</td>
                      <td id="block_td">${history[i].cpu_usage}</td>
                    </tr>
                    <tr>
                      <td id="block_td">USER NUM</td>
                      <td id="block_td">${history[i].user_num}</td>
                    </tr>
                  </table>
                  <div class="donut" id="donut_${i}" data-percent="85.4"></div>
                    <script>
                      const donut_${i} = document.getElementById("donut_${i}");
                      donut_${i}.dataset.percent = '${history[i].cpu_usage}';

                      donut_${i}.style.background = 'conic-gradient(#3F8BC9 0% ${history[i].cpu_usage}, #F2F2F2 ${history[i].cpu_usage} 100%)';


                    </script>

                </div>
                <div class="card-footer d-flex align-items-center justify-content-between">
                    <a class="small text-white stretched-link" style=" text-decoration-line: none; font-weight:bold; font-size:1.2vw" href="http://localhost:3000/server_history?id=${history[i].id}">Server History</a>
                    <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                </div>
            </div>
        </div>
        `;

      }
      if((i+1)%4 === 0 ){
        block_list += `
        <div class="row">
        ${temp}
        </div>
        `;
        temp = '';
      }else if(i+1 === history.length){
        block_list += `
        <div class="row">
        ${temp}
        </div>
        `;
        temp = '';
      }
    }

    return block_list;
  },
  HTML_main:function(history){
    return `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="utf-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
            <meta name="description" content="" />
            <meta name="author" content="" />
            <title>Dashboard - SB Admin</title>
            <link href="https://cdn.jsdelivr.net/npm/simple-datatables@latest/dist/style.css" rel="stylesheet" />
            <link href="/css/styles.css" rel="stylesheet" />
            <script src="https://use.fontawesome.com/releases/v6.1.0/js/all.js" crossorigin="anonymous"></script>
        </head>
        <body class="sb-nav-fixed">
            <nav class="sb-topnav navbar navbar-expand navbar-dark bg-dark">
                <!-- Navbar Brand-->
                <a class="navbar-brand ps-3" href="http://localhost:3000/">HGU Server</a>
                <!-- Sidebar Toggle-->
                <button class="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" href="#!"><i class="fas fa-bars"></i></button>
            </nav>
            <div id="layoutSidenav">
                <div id="layoutSidenav_nav">
                    <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                        <div class="sb-sidenav-menu">
                            <div class="nav">
                                <div class="sb-sidenav-menu-heading">Core</div>
                                <a class="nav-link" href="http://localhost:3000/">
                                    <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                                    Dashboard
                                </a>

                                <div class="sb-sidenav-menu-heading">Interface</div>

                                <a class="nav-link" href="http://localhost:3000/server_register">
                                    <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                                    Add Server
                                </a>
                            </div>
                        </div>
                    </nav>
                </div>
                <div id="layoutSidenav_content">
                    <main>
                        <div class="container-fluid px-4">
                            <h1 class="mt-4">Dashboard</h1>
                            <ol class="breadcrumb mb-4">
                                <li class="breadcrumb-item active">Main</li>
                            </ol>


                          ${this.main_make_block(history)}

                            <div class="card mb-4">
                                <div class="card-header">
                                    <i class="fas fa-table me-1"></i>
                                    SERVER LIST
                                </div>
                                <div class="card-body">
                                    <table id="datatablesSimple">
                                        <thead>
                                            <tr>
                                                <th>NAME</th>
                                                <th>KEY</th>
                                                <th>USER NUM</th>
                                                <th>CPU USAGE</th>
                                                <th>STATE</th>
                                                <th>LAST UPDATE</th>
                                            </tr>
                                        </thead>
                                        <tfoot>
                                            <tr>
                                            <th>NAME</th>
                                            <th>KEY</th>
                                            <th>USER NUM</th>
                                            <th>CPU USAGE</th>
                                            <th>STATE</th>
                                            <th>LAST UPDATE</th>
                                            </tr>
                                        </tfoot>
                                        <tbody>
                                        ${this.main_make_list(history)}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </main>
                    <footer class="py-4 bg-light mt-auto">
                        <div class="container-fluid px-4">
                            <div class="d-flex align-items-center justify-content-between small">
                                <div class="text-muted">Copyright &copy; Your Website 2022</div>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>
            <script src="/js/scripts.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.min.js" crossorigin="anonymous"></script>
            <script src="/assets/demo/chart-area-demo.js"></script>
            <script src="/assets/demo/chart-bar-demo.js"></script>
            <script src="https://cdn.jsdelivr.net/npm/simple-datatables@latest" crossorigin="anonymous"></script>
            <script src="/js/datatables-simple-demo.js"></script>
        </body>
    </html>
    `;
  },
  HTML_login:function(title,body){
    return ``
  },
  HTML_register:function(title,body){
    return `<!DOCTYPE html>
      <html lang="en">
          <head>
              <meta charset="utf-8" />
              <meta http-equiv="X-UA-Compatible" content="IE=edge" />
              <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
              <meta name="description" content="" />
              <meta name="author" content="" />
              <title>Register - SB Admin</title>
              <link href="/css/styles.css" rel="stylesheet" />
              <script src="https://use.fontawesome.com/releases/v6.1.0/js/all.js" crossorigin="anonymous"></script>
          </head>

          <body class="bg-primary">
          <br style="margin:20px;"/>
          <a class="navbar-brand ps-3" href="http://localhost:3000/" style="background:#323232; padding:15px; border:3px solid;  color:white; font-weight: bold; width:200px; margin:20px; border-radius:100px;">HGU Server</a>

              <div id="layoutAuthentication">
                  <div id="layoutAuthentication_content">
                      <main>
                          <div class="container">
                              <div class="row justify-content-center">
                                  <div class="col-lg-7">
                                      <div class="card shadow-lg border-0 rounded-lg mt-5">
                                          <div class="card-header"><h3 class="text-center font-weight-light my-4">Add Server</h3></div>
                                          <div class="card-body">
                                              <form method="post" action="/create_state"  >
                                                  <div class="form-floating mb-3">
                                                      <input class="form-control" name="ip_server_name" id="ip_server_name" type="text" required/>
                                                      <label for="ip_server_name">Server Name</label>
                                                  </div>
                                                  <div class="form-floating mb-3">
                                                      <input class="form-control" name="ip_key" id="ip_key" type="text" required />
                                                      <label for="ip_key">Key value</label>
                                                  </div>
                                                  <div class="mt-4 mb-0">
                                                      <input type="submit" class="btn btn-primary btn-block" style="width:100%;" value="Create Sever"></input>
                                                  </div>
                                              </form>
                                          </div>
                                          <div class="card-footer text-center py-3">
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </main>
                  </div>
                  <div id="layoutAuthentication_footer">
                      <footer class="py-4 bg-light mt-auto">
                          <div class="container-fluid px-4">
                              <div class="d-flex align-items-center justify-content-between small">
                                  <div class="text-muted">Copyright &copy; Your Website 2022</div>
                              </div>
                          </div>
                      </footer>
                  </div>
              </div>
              <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>
              <script src="/js/scripts.js"></script>
          </body>
      </html>
    `;
  },
  HTML_history:function(history){
    var cpu_usage_label = [];// chart column data
    var cpu_percent= [];  // chart row data
    var server_user_label = [];
    var server_usernum= [];

    for(var i = 0 ; i<history.length; i++){
          cpu_usage_label.push(history[i].time);
          cpu_percent.push(history[i].cpu_usage);
          server_user_label.push(history[i].time);
          server_usernum.push(history[i].user_num);
    }

    return `<!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="utf-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
            <meta name="description" content="" />
            <meta name="author" content="" />
            <title>Dashboard - SB Admin</title>
            <link href="https://cdn.jsdelivr.net/npm/simple-datatables@latest/dist/style.css" rel="stylesheet" />
            <link href="/css/styles.css" rel="stylesheet" />
            <script src="https://use.fontawesome.com/releases/v6.1.0/js/all.js" crossorigin="anonymous"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.4.0/Chart.min.js"></script>
        </head>
        <body class="sb-nav-fixed">
            <nav class="sb-topnav navbar navbar-expand navbar-dark bg-dark">
                <!-- Navbar Brand-->
                <a class="navbar-brand ps-3" href="http://localhost:3000/">HGU Server</a>
                <!-- Sidebar Toggle-->
                <button class="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" href="#!"><i class="fas fa-bars"></i></button>

            </nav>
            <div id="layoutSidenav">
                <div id="layoutSidenav_nav">
                    <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                                <div class="sb-sidenav-menu">
                                    <div class="nav">
                                        <div class="sb-sidenav-menu-heading">Core</div>
                                        <a class="nav-link" href="http://localhost:3000/">
                                            <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                                            Dashboard
                                        </a>

                                        <div class="sb-sidenav-menu-heading">Interface</div>
                                        <a class="nav-link" href="http://localhost:3000/server_register">
                                            <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                                            Add Server
                                        </a>
                                    </div>
                                </div>
                    </nav>
                </div>
                <div id="layoutSidenav_content">
                    <main>
                        <div class="container-fluid px-4">
                            <ol class="breadcrumb mb-4">
                                <h1 class="mt-4">${history[0].name} SERVER</1>
                            </ol>
                                <div class="col-xl-10">
                                    <div class="card mb-4">
                                        <div class="card-header">
                                            <div style="font-weight:bold;">
                                              <i class="fas fa-chart-area me-1"></i>
                                              CPU HISTORY
                                            </div>
                                        </div>
                                        <div class="card-body">
                                          <canvas id="chart_${history[0].name}" width="100%" height="40"></canvas>
                                        </div>
                                        <script>
                                            ${this.chart_area(history[0].name,cpu_usage_label,cpu_percent)}
                                        </script>
                                    </div>
                                </div>

                                <div class="col-lg-6">
                                    <div class="card mb-4">
                                        <div class="card-header">
                                            <i class="fas fa-chart-bar me-1"></i>
                                            Num of Users
                                        </div>
                                        <div class="card-body"><canvas id="userchart_${history[0].name}" width="100%" height="50"></canvas></div>
                                        <script>
                                        ${this.chart_bar(history[0].name,server_user_label,server_usernum)}
                                        </script>
                                        <div class="card-footer small text-muted">Updated yesterday at 11:59 PM</div>
                                    </div>
                                </div>

                            <div class="card mb-4">
                                <div class="card-header">
                                    <i class="fas fa-table me-1"></i>
                                    History of Server-1
                                </div>
                                <div class="card-body">
                                    <table id="datatablesSimple">
                                        <thead>
                                            <tr>
                                                <th>On/Off</th>
                                                <th>Usage</th>
                                                <th>Started</th>
                                                <th>Completed</th>
                                                <th>Duration</th>


                                            </tr>
                                        </thead>
                                        <tfoot>
                                            <tr>
                                                <th>Name</th>
                                                <th>Position</th>
                                                <th>Office</th>
                                                <th>Age</th>
                                                <th>Start date</th>
                                            </tr>
                                        </tfoot>
                                        <tbody>
                                            <tr>
                                                <td>ON</td>
                                                <td>2800Wh</td>
                                                <td>2011/04/25 21:09:20</td>
                                                <td>ing</td>
                                                <td>12.7h</td>
                                            </tr>
                                            <tr>
                                                <td>OFF</td>
                                                <td>8000Wh</td>
                                                <td>2022/04/22 21:09:20</td>
                                                <td>2022/04/23 21:09:20</td>
                                                <td>24.3h</td>
                                            </tr>
                                            <tr>
                                                <td>OFF</td>
                                                <td>17752Wh</td>
                                                <td>2022/03/22 18:09:20</td>
                                                <td>2022/03/23 03:09:20</td>
                                                <td>92.3h</td>
                                            </tr>
                                            <tr>
                                                <td>OFF</td>
                                                <td>37000Wh</td>
                                                <td>2022/02/18 03:09:20</td>
                                                <td>2022/02/21 08:09:20</td>
                                                <td>6.3h</td>
                                            </tr>
                                            <tr>
                                                <td>OFF</td>
                                                <td>43000Wh</td>
                                                <td>2022/01/06 03:09:20</td>
                                                <td>2022/01/14 21:09:20</td>
                                                <td>133.3h</td>
                                            </tr>
                                            <tr>
                                                <td>OFF</td>
                                                <td>67000Wh</td>
                                                <td>2021/12/25 21:09:20</td>
                                                <td>2021/12/31 21:09:20</td>
                                                <td>24.3h</td>
                                            </tr>
                                            <tr>
                                                <td>OFF</td>
                                                <td>58000Wh</td>
                                                <td>2021/12/25 21:09:20</td>
                                                <td>2021/12/26 21:09:20</td>
                                                <td>24.3h</td>
                                            </tr>
                                            <tr>
                                                <td>OFF</td>
                                                <td>65000Wh</td>
                                                <td>2021/12/22 21:09:20</td>
                                                <td>2021/12/25 21:09:20</td>
                                                <td>83.3h</td>
                                            </tr>

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </main>
                    <footer class="py-4 bg-light mt-auto">
                        <div class="container-fluid px-4">
                            <div class="d-flex align-items-center justify-content-between small">
                                <div class="text-muted">Copyright &copy; Your Website 2022</div>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>
            <script src="/js/scripts.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.min.js" crossorigin="anonymous"></script>
            <script src="/assets/demo/chart-area-demo.js"></script>
            <script src="/assets/demo/chart-bar-demo.js"></script>
            <script src="https://cdn.jsdelivr.net/npm/simple-datatables@latest" crossorigin="anonymous"></script>
            <script src="/js/datatables-simple-demo.js"></script>
        </body>
    </html>`;

  }



}
