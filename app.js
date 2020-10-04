var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mysql = require("mysql2");

var indexRouter = require('./routes/index');
var studentsRouter = require('./routes/students');
var faculRouter = require('./routes/faculties');
var repRouter = require('./routes/report');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded());

app.get('/index', function(req, res) {
  res.render('index');
})

app.get('/stud', function(req, res) {
  const conn = mysql.createConnection({
    database: 'stud_db',
    host: "localhost",
    user: "root",
    password: "20_Mil1lkywaY_20"
  });

  const show = `SELECT * FROM all_students`;
  conn.query(show, function(err, results) {
      if(err) console.log(err);
      // сonsole.log(results);
      res.render('stud', {
        students: results
      });
  });
})

app.get('/facul', function(req, res) {
  const conn = mysql.createConnection({
    database: 'stud_db',
    host: "localhost",
    user: "root",
    password: "20_Mil1lkywaY_20"
  });

  const show = `SELECT * FROM all_students`;
  conn.query(show, function(err, results) {
      if(err) console.log(err);
      res.render('facul', {
        students: results
      });
  });
})

app.get('/report', function(req, res) {
  const conn = mysql.createConnection({
    database: 'stud_db',
    host: "localhost",
    user: "root",
    password: "20_Mil1lkywaY_20"
  });

  const show = `SELECT * FROM all_students`;
  conn.query(show, function(err, results) {
    if(err) console.log(err);
    let repRes = {
      full: [0, 0, 0, 0, 0, 0],
      grade1: [0, 0, 0, 0, 0, 0],
      grade2: [0, 0, 0, 0, 0, 0],
      grade3: [0, 0, 0, 0, 0, 0],
      grade4: [0, 0, 0, 0, 0, 0]
    }
    // results.forEach(function(obj, repRes) {
    for (let i = 0; i < results.length; i++) {
      let x = results[i].facul;
      switch(x) {
        case '1-ФКТИ' :
          repRes["full"][0]++;
          if (results[i].ege_full >= 280) {
            repRes["grade1"][0]++;
          } else if (results[i].ege_full < 280 && results[i].ege_full >= 250) {
            repRes["grade2"][0]++;
          } else if (results[i].ege_full < 250 && results[i].ege_full >= 210) {
            repRes["grade3"][0]++;
          } else if (results[i].ege_full < 210) {
            repRes["grade4"][0]++;
          }
          break;
        
        case '2-ФИБС' :
          repRes["full"][1]++;
          if (results[i].ege_full >= 280) {
            repRes["grade1"][1]++;
          } else if (results[i].ege_full < 280 && results[i].ege_full >= 250) {
            repRes["grade2"][1]++;
          } else if (results[i].ege_full < 250 && results[i].ege_full >= 210) {
            repRes["grade3"][1]++;
          } else if (results[i].ege_full < 210) {
            repRes["grade4"][1]++;
          }
          break;
        
        case '3-ФЭЛ' :
          repRes["full"][2]++;
          if (results[i].ege_full >= 280) {
            repRes["grade1"][2]++;
          } else if (results[i].ege_full < 280 && results[i].ege_full >= 250) {
            repRes["grade2"][2]++;
          } else if (results[i].ege_full < 250 && results[i].ege_full >= 210) {
            repRes["grade3"][2]++;
          } else if (results[i].ege_full < 210) {
            repRes["grade4"][2]++;
          }
          break;
        
        case '4-ФЭА' :
          repRes["full"][3]++;
          if (results[i].ege_full >= 280) {
            repRes["grade1"][3]++;
          } else if (results[i].ege_full < 280 && results[i].ege_full >= 250) {
            repRes["grade2"][3]++;
          } else if (results[i].ege_full < 250 && results[i].ege_full >= 210) {
            repRes["grade3"][3]++;
          } else if (results[i].ege_full < 210) {
            repRes["grade4"][3]++;
          }
          break;
        
        case '5-ФРТ' :
          repRes["full"][4]++;
          if (results[i].ege_full >= 280) {
            repRes["grade1"][4]++;
          } else if (results[i].ege_full < 280 && results[i].ege_full >= 250) {
            repRes["grade2"][4]++;
          } else if (results[i].ege_full < 250 && results[i].ege_full >= 210) {
            repRes["grade3"][4]++;
          } else if (results[i].ege_full < 210) {
            repRes["grade4"][4]++;
          }
          break;

        case '6-ГФ' :
          repRes["full"][5]++;
          if (results[i].ege_full >= 280) {
            repRes["grade1"][5]++;
          } else if (results[i].ege_full < 280 && results[i].ege_full >= 250) {
            repRes["grade2"][5]++;
          } else if (results[i].ege_full < 250 && results[i].ege_full >= 210) {
            repRes["grade3"][5]++;
          } else if (results[i].ege_full < 210) {
            repRes["grade4"][5]++;
          }
          break;
      }
    }
    res.render('report', {
      students: repRes
    });
  });
})

app.use('/', indexRouter);
app.use('/stud', studentsRouter);
app.use('/facul', faculRouter);
// app.use('/report', repRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;