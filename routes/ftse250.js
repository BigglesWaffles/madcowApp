'use strict';
var express = require('express');
var router = express.Router();
var app = express();
var path = require('path');
/* GET home page. */

const fs = require('fs');


router.get('/', (req, res) => {


    var query = require('url').parse(req.url, true).query;

    console.log("JOHN HAWTHORNE WAS HERE");
    let myInputIsin = query.x;
    if (myInputIsin == "err" || myInputIsin == "errNews" || myInputIsin == "errBull") {
        let rawdata = "";
        if (myInputIsin == "err") {
            rawdata = fs.readFileSync('files/ftse250ISIN-Errs.json');
        }
        if (myInputIsin == "errNews") {
            rawdata = fs.readFileSync('files/ftse250NEWS-Errs.json');
        }
        if (myInputIsin == "errBull") {
            rawdata = fs.readFileSync('files/ftse250BULL-Errs.json');
        }
        let ftse100 = JSON.parse(rawdata);

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(
            ftse100
        ));
    } else {

        let rawdata = fs.readFileSync('files/ftse250.json');
        let ftse250 = JSON.parse(rawdata);

        for (var index = 0; index < ftse250.length; ++index) {

            if ((ftse250[index].totalAssets - ftse250[index].totalLiabilities) != 0 && ftse250[index].marketCapitalisation != 0) {

                ftse250[index].navPercent = (ftse250[index].totalAssets - ftse250[index].totalLiabilities) / ftse250[index].marketCapitalisation;
                ftse250[index].navPercent = roundToTwo(ftse250[index].navPercent);

                if (ftse250[index].totalAssets - ftse250[index].totalLiabilities - ftse250[index].intangibleAssets != 0) {

                    ftse250[index].navPercentIt = (ftse250[index].totalAssets - ftse250[index].totalLiabilities - ftse250[index].intangibleAssets) / ftse250[index].marketCapitalisation;
                    ftse250[index].navPercentIt = roundToTwo(ftse250[index].navPercentIt);
                }
                if (ftse250[index].totalCurrentAssets != NaN && ftse250[index].totalCurrentAssets != null && ftse250[index].totalCurrentAssets != 0 && ftse250[index].totalCurrentAssets - ftse250[index].totalLiabilities != 0) {
                    ftse250[index].netNet = (ftse250[index].totalCurrentAssets - ftse250[index].totalLiabilities) / ftse250[index].marketCapitalisation;
                    ftse250[index].netNet = roundToTwo(ftse250[index].netNet);
                } else {
                    ftse250[index].netNet = 0;
                }
            }
            ftse250[index].nvv = roundToTwo(ftse250[index].nvv);
            if (ftse250[index].marketCapitalisation == 0) {
                ftse250[index].navPercentIt = 0;
                ftse250[index].navPercent = 0;
                ftse250[index].netNet = 0;
            }
        }

        var count = Object.keys(ftse250).length;
        var bish = {
            "count": count,
            "items": ftse250
        };

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(
            bish
        ))
        //  return next();
    }
});

function roundToTwo(num) {
    return +(Math.round(num + "e+2") + "e-2");
}

module.exports = router;