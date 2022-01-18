'use strict';
var express = require('express');
var router = express.Router();
var app = express();
var path = require('path');

const fs = require('fs');


router.get('/', (req, res) => {
    console.log("in here a");

    let rawdata = fs.readFileSync('files/ftserst.json');
    let ftserst = JSON.parse(rawdata);
    console.log(ftserst);

    console.log(req.path);
    console.log(req.params);
    console.log(req.params.useridname);
    // app.use('/pthv/:useridname', pthv);
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(
      ftserst
    ));
    //  return next();
});


module.exports = router;