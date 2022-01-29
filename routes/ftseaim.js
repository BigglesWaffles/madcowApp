'use strict';
var express = require('express');
var router = express.Router();
var app = express();
var path = require('path');

const fs = require('fs');


router.get('/', (req, res) => {

    let rawdata = fs.readFileSync('files/ftseaim.json');
    let ftseaim = JSON.parse(rawdata);
    /*
    let rawdata2 = fs.readFileSync('files/technicals.json');
    var technicals = JSON.parse(rawdata2);

    console.log("at very top");
    for (var index = 0; index < ftseaim.length; ++index) {
        for (let index2 = 0; index2 < technicals.length; ++index2) {
            if (ftseaim[index].tickerSymbol == technicals[index2].ticker) {
                ftseaim[index].summary = technicals[index2].summary;
                ftseaim[index].momentum = technicals[index2].momentum;
                ftseaim[index].momentumText = technicals[index2].momentumText;
                ftseaim[index].rsi = technicals[index2].rsi;
                ftseaim[index].rsiText = technicals[index2].rsiText;
                ftseaim[index].macd = technicals[index2].macd;
                ftseaim[index].macdText = technicals[index2].macdText;
                break;
            }
        }

    }
    */
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(
      ftseaim

    ));
    //  return next();
});


module.exports = router;