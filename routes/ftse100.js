'use strict';
var express = require('express');
var router = express.Router();
var app = express();
var path = require('path');

const fs = require('fs');


router.get('/', (req, res) => {
    console.log("in here a");

    let rawdata = fs.readFileSync('files/ftse100.json');
    let ftse100 = JSON.parse(rawdata);
    console.log(ftse100);

    console.log(req.path);
    console.log(req.params);
    console.log(req.params.useridname);
    // app.use('/pthv/:useridname', pthv);
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(
       ftse100
    )

)
    //  return next();
});


module.exports = router;