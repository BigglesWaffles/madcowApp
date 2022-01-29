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
    /*
    let rawdata2 = fs.readFileSync('files/technicals.json');
    var technicals = JSON.parse(rawdata2);

    console.log("at very top");
    for (var index = 0; index < ftse250.length; ++index) {
        for (let index2 = 0; index2 < technicals.length; ++index2) {
            if (ftse250[index].tickerSymbol == technicals[index2].ticker) {
                ftse250[index].summary = technicals[index2].summary;
                ftse250[index].momentum = technicals[index2].momentum;
                ftse250[index].momentumText = technicals[index2].momentumText;
                ftse250[index].rsi = technicals[index2].rsi;
                ftse250[index].rsiText = technicals[index2].rsiText;
                ftse250[index].macd = technicals[index2].macd;
                ftse250[index].macdText = technicals[index2].macdText;
                break;
            }
        }

    }
    */

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(
        ftse250
    ));
    //  return next();
});


module.exports = router;