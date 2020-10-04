var express = require('express');
var router = express.Router();

const mysql = require("mysql2");

// router.get('/', function(req, res, next) {
    //let facul = req.body.facul;
    // const conn = mysql.createConnection({
    //     database: 'stud_db',
    //     host: "localhost",
    //     user: "root",
    //     password: "20_Mil1lkywaY_20"
    // });

    // const show = `SELECT facul COUNT(*) FROM all_students GROUP BY facul`;
    // conn.query(show, function(err, results) {
    //     if(err) console.log(err);
    //     res.render('facul', {
    //         students: results
    //     });
    //     console.log(results)
    // });
    // }
    // else {
    //     const show = `SELECT * FROM all_students WHERE facul=?`;
    //     conn.query(show, facul, function(err, results) {
    //         if(err) console.log(err);
    //         // сonsole.log(results);
    //         res.render('facul', {
    //             students: results
    //         });
    //     });
    // }

// });

module.exports = router;