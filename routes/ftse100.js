'use strict';
var express = require('express');
var router = express.Router();
var app = express();
var path = require('path');

const fs = require('fs');


router.get('/', (req, res) => {

    let rawdata = fs.readFileSync('files/ftse100.json');
    let ftse100 = JSON.parse(rawdata);
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(
       ftse100
    )

)
    //  return next();
});


module.exports = router;