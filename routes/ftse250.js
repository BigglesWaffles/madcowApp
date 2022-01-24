'use strict';
var express = require('express');
var router = express.Router();
var app = express();
var path = require('path');
/* GET home page. */

const fs = require('fs');


router.get('/', (req, res) => {

    let rawdata = fs.readFileSync('files/ftse250.json');
    let ftse250 = JSON.parse(rawdata);
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(
        ftse250
    ));
    //  return next();
});


module.exports = router;