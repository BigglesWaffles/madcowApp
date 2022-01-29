'use strict';
var express = require('express');
var router = express.Router();
var app = express();
var path = require('path');

const fs = require('fs');


router.get('/', (req, res) => {

    let rawdata = fs.readFileSync('files/ftse100.json');
    var ftse100 = JSON.parse(rawdata);
/*
    let rawdata2 = fs.readFileSync('files/technicals.json');
    var technicals = JSON.parse(rawdata2);

    console.log("at very top");
    for (var index = 0; index < ftse100.length; ++index) {
        for (let index2 = 0; index2 < technicals.length; ++index2) {
            if (ftse100[index].tickerSymbol == technicals[index2].ticker) {
                ftse100[index].summary = technicals[index2].summary;
                ftse100[index].momentum = technicals[index2].momentum;
                ftse100[index].momentumText = technicals[index2].momentumText;
                ftse100[index].rsi = technicals[index2].rsi;
                ftse100[index].rsiText = technicals[index2].rsiText;
                ftse100[index].macd = technicals[index2].macd;
                ftse100[index].macdText = technicals[index2].macdText;
                break;
            }
        }

    }
    */
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(
       ftse100
    )

)
    //  return next();
});


module.exports = router;