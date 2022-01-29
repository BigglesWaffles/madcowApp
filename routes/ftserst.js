'use strict';
var express = require('express');
var router = express.Router();
var app = express();
var path = require('path');

const fs = require('fs');


router.get('/', (req, res) => {

    let rawdata = fs.readFileSync('files/ftserst.json');
    let ftserst = JSON.parse(rawdata);
    /*
    let rawdata2 = fs.readFileSync('files/technicals.json');
    var technicals = JSON.parse(rawdata2);

    console.log("at very top");
    for (var index = 0; index < ftserst.length; ++index) {
        for (let index2 = 0; index2 < technicals.length; ++index2) {
            if (ftserst[index].tickerSymbol == technicals[index2].ticker) {
                ftserst[index].summary = technicals[index2].summary;
                ftserst[index].momentum = technicals[index2].momentum;
                ftserst[index].momentumText = technicals[index2].momentumText;
                ftserst[index].rsi = technicals[index2].rsi;
                ftserst[index].rsiText = technicals[index2].rsiText;
                ftserst[index].macd = technicals[index2].macd;
                ftserst[index].macdText = technicals[index2].macdText;
                break;
            }
        }

    }

*/
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(
      ftserst
    ));
    //  return next();
});


module.exports = router;