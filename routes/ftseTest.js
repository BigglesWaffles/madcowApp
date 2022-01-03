'use strict';
var express = require('express');
var router = express.Router();
var app = express();
var path = require('path');
//var pthv = require('./pthv');

/* GET home page. */

router.get('/', (req, res) => {
    console.log("in here a");

    console.log(req.path);
    console.log(req.params);
    console.log(req.params.useridname);
    // app.use('/pthv/:useridname', pthv);
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(


        { a: 1 }


    ));
    //  return next();
});


module.exports = router;