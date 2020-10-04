var express = require('express');
var router = express.Router();

const mysql = require("mysql2");
const { check, validationResult } 
    = require('express-validator'); 

class Student {
  surname = null;
  name = null;
  midname = null;
  b_day = null;
  facul = null;
  specialty = null;
  mark1 = null;
  mark2 = null;
  mark3 = null;
  ege_full = null;

  constructor(obj) {
    this.surname = obj.surname;
    this.name = obj.name;
    this.midname = obj.midname;
    this.b_day = obj.b_day;
    this.facul = obj.facul;
    this.specialty = obj.specialty;
    this.mark1 = +obj.mark1;
    this.mark2 = +obj.mark2;
    this.mark3 = +obj.mark3;
    this.ege_full = +obj.mark1 + +obj.mark2 + +obj.mark3;
  }

  //-----------------------------------------------------
  addStudent (obj) {
    const conn = mysql.createConnection({
      database: 'stud_db',
      host: "localhost",
      user: "root",
      password: "20_Mil1lkywaY_20"
    });

    console.log('Get connection ...');

    const sql = `create table if not exists all_students(
      id INTEGER AUTO_INCREMENT PRIMARY KEY,
      surname VARCHAR(50),     
      name VARCHAR(30),     
      midname VARCHAR(30),     
      b_day VARCHAR(12),     
      facul VARCHAR(15),     
      specialty VARCHAR(30),     
      mark1 INTEGER DEFAULT 0,     
      mark2 INTEGER DEFAULT 0,     
      mark3 INTEGER DEFAULT 0, 
      ege_full INTEGER DEFAULT 0
    )`;

    conn.query(sql, function(err, results) {
      if(err) console.log(err);
      else console.log("Таблица создана");
    });

    var query = conn.query('INSERT INTO all_students SET ?', obj, function(err, result) {
      console.log(err);
      console.log(result);
    });

    conn.end(function(err) {
      if (err) {
        return console.log("Ошибка: " + err.message);
      }
      console.log("Подключение закрыто");
    });
  }
  //-----------------------------------------------------
  editStudent (findId, field,  obj_edit) {
    const conn = mysql.createConnection({
      database: 'stud_db',
      host: "localhost",
      user: "root",
      password: "20_Mil1lkywaY_20"
    });

    console.log('Get connection ...');

    if (field == 'ФИО') {
      var query = conn.query(`UPDATE all_students SET surname=?, name=?, midname=? WHERE id=?`, obj_edit, function(err, result) {
        console.log(err);
        console.log(result);
      });
    } else if (field == 'Дата рождения') {
      var query = conn.query(`UPDATE all_students SET b_day=? WHERE id=?`, obj_edit, function(err, result) {
        console.log(err);
        console.log(result);
      });
    } else if (field == 'Результаты ЕГЭ') {
      var query = conn.query(`UPDATE all_students SET mark1=?, mark2=?, mark3=? WHERE id=?`, obj_edit, function(err, result) {
        console.log(err);
        console.log(result);
      });
    }

    conn.end(function(err) {
      if (err) {
        return console.log("Ошибка: " + err.message);
      }
      console.log("Подключение закрыто");
    });
  }
  //-----------------------------------------------------
  delStudent (id) {
    const conn = mysql.createConnection({
      database: 'stud_db',
      host: "localhost",
      user: "root",
      password: "20_Mil1lkywaY_20"
    });

    console.log('Get connection ...');

    const sql = `DELETE FROM all_students WHERE id=?`;

    conn.query(sql, id, function(err, results) {
      if(err) console.log(err);
      console.log(results);
    });

    const show = `SELECT * FROM all_students`;
  
    conn.query(show, function(err, results) {
        if(err) console.log(err);
        console.log(results);
    });

    conn.end(function(err) {
      if (err) {
        return console.log("Ошибка: " + err.message);
      }
      console.log("Подключение закрыто");
    });
  }
  //----------------------------------------------
  findByFacul(reqFac) {
    const conn = mysql.createConnection({
      database: 'stud_db',
      host: "localhost",
      user: "root",
      password: "20_Mil1lkywaY_20"
    });

    console.log('Get connection ...');
    
    const sql = "SELECT id FROM all_students WHERE facul=?";
    conn.query(sql, reqFac, function(err, results) {
      if(err) console.log(err);
      console.log(results);
    });

    conn.end(function(err) {
      if (err) {
        return console.log("Ошибка: " + err.message);
      }
      console.log("Подключение закрыто");
    });  
  }
}

/* POST */
router.post('/', [ 
  check('surname', 'Surname must be specified') 
                  .isLength({ min: 1, max: 30 }), 
  check('name', 'Name must be specified') 
                  .isLength({ min: 1, max: 20 })
], function(req, res) {
    let student = new Student(req.body);
    let findId = req.body.fid;
    const errors = validationResult(req);

    if (req.body.actType == 'add') {
      if (!errors.isEmpty()) { 
        res.json(errors);
        res.render('stud', {students: null}); 
      } else {
      student.addStudent(student);
      }
      // edit
    } else if (req.body.actType == 'edit') {
      let field = req.body.fchange;
      // let id = 12;
        if (field == 'ФИО') {
          let stud_edit = [
            req.body.surname,
            req.body.name,
            req.body.midname,
            findId
          ];
          student.editStudent(findId, field, stud_edit);
        } else if (field == 'Дата рождения') {
          let stud_edit = [ 
            req.body.b_day,
            findId
          ];
        } else if (field == 'Результаты ЕГЭ') {
          let stud_edit = [
            req.body.mark1,
            req.body.mark2,
            req.body.mark3,
            findId
          ];
        }  
      // delete
    } else if (req.body.actType == 'delete') {
      console.log(findId);
      student.delStudent(findId);
    }
  
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
});

module.exports = router;