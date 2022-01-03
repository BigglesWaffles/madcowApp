'use strict';
var express = require('express');
var router = express.Router();

/* GET home page. */
console.log("got here PTHV PTHV PTHV");

router.get('/pthv/john', function (req, res) {
    console.log("req.path = " + req.path + " " + res.path);
    if (req.path != "/") {
        console.log("NOT SLASHxxxxxx");
        return next();
    } else {
        console.log("WELLLLLxxxxxxL req.path = " + req.path + " " + res.path);
        res.render('index', { title: 'Express' });
    }
});

router.get('/', function (req, res) {
    console.log("req.path = " + req.path+ " "+res.path);
    if (req.path != "/") {
        console.log("NOT SLASH");
        return next();
    } else {
        console.log("WELLLLLL req.path = " + req.path + " " + res.path);
        res.render('index', { title: 'Express' });
    }
});


module.exports = router;

//return next();