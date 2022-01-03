'use strict';
var express = require('express');
var router = express.Router();
var app = express();
var pthv = require('./pthv');

/* GET home page. */

router.get('/pthv/:useridname',  (req, res) => {
    console.log("in here a");

    console.log(req.path);
    console.log(req.params);
    console.log(req.params.useridname);
   // app.use('/pthv/:useridname', pthv);
    res.send('respond with a resource a');
    return next();
});




router.get('/', function (req, res) {
    console.log("req.path = " + req.path);
    if (req.path != "/") {
        console.log("NOT SLASH");
        return next();
    } else {
        
        res.render('index', { title: 'Express' });
    }
});

module.exports = router;
