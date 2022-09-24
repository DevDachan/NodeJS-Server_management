
var template_chart = require('./template_chart.js');


module.exports = {
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
          <th>${history[i].cpu_usage}%</th>
          <th>${history[i].state}</th>
          <th>${history[i].time}</th>
        </tr>`;
      }
    }
    return temp;
  },
  main_make_chart_area:function(temp,data_col,data_row){
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
      if(history[i].time === null){
        temp += `
        <div class="col-xl-3 col-md-6">
            <div class="card bg-primary text-white mb-4" style="background-color:#E94560; height:93%;">
                <div class="card-body"><h3 style="font-size:1.5vw;">${history[i].name}</h3></div>
                <!--Body-->
                <div>
                  <p style= "text-align:center; font-weight:bold; font-size:1.5vw;">
                    DATA is Empty
                  </p>

                  <p style="font-weight:bold; text-align:center; font-size:1.2vw;">Please run the server program</p>
                  <div class="donut" id="donut_${i}" data-percent="85.4"></div>
                    <script>
                      const donut_${i} = document.getElementById("donut_${i}");
                      donut_${i}.dataset.percent = '0';
                      donut_${i}.style.background = 'conic-gradient(#3F8BC9 0% 0%, #F2F2F2 0% 100%)';
                    </script>
                  </div>
                <div class="card-footer d-flex align-items-center justify-content-between">
                    <a class="small text-white stretched-link" style="color:#F5EFE6; text-decoration-line: none; font-weight:bold; font-size:1.2vw" href="http://localhost:3000/server_history?id=${history[i].id}">Server History</a>
                    <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                </div>
            </div>
        </div>
        `;
      }
      else if(history[i].state === "off"){
        temp += `
        <div class="col-xl-3 col-md-6">
            <div class="card bg-primary text-white mb-4" style="background-color:#E94560;">
                <div class="card-body"><h3 style="font-size:1.5vw;">${history[i].name}</h3></div>
                <!--Body-->
                <div>
                  <table id="block_table">
                    <tr id="block_tr">
                      <td id="block_td" style="font-size:0.9vw;"> LAST CPU USAGE</td>
                      <td id="block_td">${history[i].cpu_usage}</td>
                    </tr>
                    <tr>
                      <td id="block_td" style="font-size:0.9vw;">LAST USER NUM</td>
                      <td id="block_td">${history[i].user_num}</td>
                    </tr>
                  </table>
                  <div class="donut" id="donut_${i}" data-percent="85.4"></div>
                    <script>
                      const donut_${i} = document.getElementById("donut_${i}");
                      donut_${i}.dataset.percent = '${history[i].cpu_usage}';
                      donut_${i}.style.background = 'conic-gradient(#3F8BC9 0% 0% ${history[i].cpu_usage}%, #F2F2F2 ${history[i].cpu_usage}% 100%)';
                    </script>
                  </div>
                <div class="card-footer d-flex align-items-center justify-content-between">
                    <a class="small text-white stretched-link" style="color:#F5EFE6; text-decoration-line: none; font-weight:bold; font-size:1.2vw" href="http://localhost:3000/server_history?id=${history[i].id}">Server History</a>
                    <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                </div>
            </div>
        </div>
        `;
      }else{
        temp += `
        <div class="col-xl-3 col-md-6">
            <div class="card bg-primary text-white mb-4">
                <div class="card-body"><h3 style="font-size:1.5vw;">${history[i].name}</h3></div>
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

                      donut_${i}.style.background = 'conic-gradient(#3F8BC9 0% ${history[i].cpu_usage}%, #F2F2F2 ${history[i].cpu_usage}% 100%)';


                    </script>

                </div>
                <div class="card-footer d-flex align-items-center justify-content-between">
                    <a class="small text-white stretched-link" style="color:#F5EFE6; text-decoration-line: none; font-weight:bold; font-size:1.2vw" href="http://localhost:3000/server_history?id=${history[i].id}">Server History</a>
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
                <!-- Navbar Search-->
                <form class="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
                    <div class="input-group">
                        <input class="form-control" type="text" placeholder="Search for..." aria-label="Search for..." aria-describedby="btnNavbarSearch" />
                        <button class="btn btn-primary" id="btnNavbarSearch" type="button"><i class="fas fa-search"></i></button>
                    </div>
                </form>
                <!-- Navbar-->
                <ul class="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i class="fas fa-user fa-fw"></i></a>
                        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                            <li><a class="dropdown-item" href="#!">Settings</a></li>
                            <li><a class="dropdown-item" href="#!">Activity Log</a></li>
                            <li><hr class="dropdown-divider" /></li>
                            <li><a class="dropdown-item" href="#!">Logout</a></li>
                        </ul>
                    </li>
                </ul>
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
                        <div class="sb-sidenav-footer">
                            <div class="small">Logged in as:</div>
                            Dachan
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
                                <div>
                                    <a href="#">Privacy Policy</a>
                                    &middot;
                                    <a href="#">Terms &amp; Conditions</a>
                                </div>
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
        <a class="navbar-brand ps-3" href="http://localhost:3000/" style="background:#988DB3; padding:15px;  color:white; font-weight: bold; width:200px; margin:20px; border-radius:100px;">HGU Server</a>

            <div id="layoutAuthentication">
                <div id="layoutAuthentication_content">
                    <main>
                        <div class="container">
                            <div class="row justify-content-center">
                                <div class="col-lg-7">
                                    <div class="card shadow-lg border-0 rounded-lg mt-5">
                                        <div class="card-header"><h3 class="text-center font-weight-light my-4">Add Server</h3></div>
                                        <div class="card-body">
                                            <form>
                                                <div class="form-floating mb-3">
                                                    <input class="form-control" id="inputEmail" type="email" placeholder="name@example.com" />
                                                    <label for="inputEmail">Server Name</label>
                                                </div>
                                                <div class="form-floating mb-3">
                                                    <input class="form-control" id="inputEmail" type="email" placeholder="name@example.com" />
                                                    <label for="inputEmail">Email address</label>
                                                </div>
                                                <div class="row mb-3">
                                                    <div class="col-md-6">
                                                        <div class="form-floating mb-3 mb-md-0">
                                                            <input class="form-control" id="inputPassword" type="password" placeholder="Create a password" />
                                                            <label for="inputPassword">Password</label>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="form-floating mb-3 mb-md-0">
                                                            <input class="form-control" id="inputPasswordConfirm" type="password" placeholder="Confirm password" />
                                                            <label for="inputPasswordConfirm">Confirm Password</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="mt-4 mb-0">
                                                    <div class="d-grid"><a class="btn btn-primary btn-block" href="login.html">Create Sever</a></div>
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
                                <div>
                                    <a href="#">Privacy Policy</a>
                                    &middot;
                                    <a href="#">Terms &amp; Conditions</a>
                                </div>
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
    var a = ["09:50","09:60"];   // chart column data
    var b = ["35","90"];   // chart row data

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
                <!-- Navbar Search-->
                <form class="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
                    <div class="input-group">
                        <input class="form-control" type="text" placeholder="Search for..." aria-label="Search for..." aria-describedby="btnNavbarSearch" />
                        <button class="btn btn-primary" id="btnNavbarSearch" type="button"><i class="fas fa-search"></i></button>
                    </div>
                </form>
                <!-- Navbar-->
                <ul class="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i class="fas fa-user fa-fw"></i></a>
                        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                            <li><a class="dropdown-item" href="#!">Settings</a></li>
                            <li><a class="dropdown-item" href="#!">Activity Log</a></li>
                            <li><hr class="dropdown-divider" /></li>
                            <li><a class="dropdown-item" href="#!">Logout</a></li>
                        </ul>
                    </li>
                </ul>
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
                                          ${this.main_make_chart_area(history[0].name,a,b)}
                                        </script>
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
                                <div>
                                    <a href="#">Privacy Policy</a>
                                    &middot;
                                    <a href="#">Terms &amp; Conditions</a>
                                </div>
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
