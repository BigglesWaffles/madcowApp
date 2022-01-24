'use strict';
var express = require('express');
var router = express.Router();
var app = express();
var path = require('path');

const fs = require('fs');


router.get('/', (req, res) => {

    let rawdata = fs.readFileSync('files/ftseaim.json');
    let ftseaim = JSON.parse(rawdata);
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(
      ftseaim

    ));
    //  return next();
});


module.exports = router;