'use strict';
var express = require('express');
var router = express.Router();
var app = express();
var path = require('path');

const fs = require('fs');


router.get('/', (req, res) => {

    var query = require('url').parse(req.url, true).query;

    let myInputIsin = query.x;
    if (myInputIsin == "err" || myInputIsin == "errNews" || myInputIsin == "errBull") {
        let rawdata = "";
        if (myInputIsin == "err") {
            rawdata = fs.readFileSync('files/ftse100ISIN-Errs.json');
        }
        if (myInputIsin == "errNews") {
            rawdata = fs.readFileSync('files/ftse100NEWS-Errs.json');
        }
        if (myInputIsin == "errBull") {
            rawdata = fs.readFileSync('files/ftse100BULL-Errs.json');
        }
        let ftse100 = JSON.parse(rawdata);

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(
            ftse100
        ));
    } else {

        let rawdata = fs.readFileSync('files/ftse100.json');
        var ftse100 = JSON.parse(rawdata);

        for (var index = 0; index < ftse100.length; ++index) {

            if ((ftse100[index].totalAssets - ftse100[index].totalLiabilities) != 0 && ftse100[index].marketCapitalisation != 0) {

                ftse100[index].navPercent = (ftse100[index].totalAssets - ftse100[index].totalLiabilities) / ftse100[index].marketCapitalisation;
                ftse100[index].navPercent = roundToTwo(ftse100[index].navPercent);

                if (ftse100[index].totalAssets - ftse100[index].totalLiabilities - ftse100[index].intangibleAssets != 0) {

                    ftse100[index].navPercentIt = (ftse100[index].totalAssets - ftse100[index].totalLiabilities - ftse100[index].intangibleAssets) / ftse100[index].marketCapitalisation;
                    ftse100[index].navPercentIt = roundToTwo(ftse100[index].navPercentIt);
                }
                if (ftse100[index].totalCurrentAssets != NaN && ftse100[index].totalCurrentAssets != null && ftse100[index].totalCurrentAssets != 0 && ftse100[index].totalCurrentAssets - ftse100[index].totalLiabilities != 0) {
                    ftse100[index].netNet = (ftse100[index].totalCurrentAssets - ftse100[index].totalLiabilities) / ftse100[index].marketCapitalisation;
                    ftse100[index].netNet = roundToTwo(ftse100[index].netNet);
                } else {
                    ftse100[index].netNet = 0;
                }
            }
            ftse100[index].nvv = roundToTwo(ftse100[index].nvv);
            if (ftse100[index].marketCapitalisation == 0) {
                ftse100[index].navPercentIt = 0;
                ftse100[index].navPercent = 0;
                ftse100[index].netNet = 0;
            }
        }


        var count = Object.keys(ftse100).length;
        var bish = {
            "count": count,
            "items": ftse100
        };

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(
            bish
        ))
    }
    //  return next();
});


function roundToTwo(num) {
    return +(Math.round(num + "e+2") + "e-2");
}

module.exports = router;