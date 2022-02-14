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
            rawdata = fs.readFileSync('files/ftserstISIN-Errs.json');
        }
        if (myInputIsin == "errNews") {
            rawdata = fs.readFileSync('files/ftserstNEWS-Errs.json');
        }
        if (myInputIsin == "errBull") {
            rawdata = fs.readFileSync('files/ftserstBULL-Errs.json');
        }
        let ftse100 = JSON.parse(rawdata);

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(
            ftse100
        ));
    } else {

        let rawdata = fs.readFileSync('files/ftserst.json');
        let ftserst = JSON.parse(rawdata);

        for (var index = 0; index < ftserst.length; ++index) {

            if ((ftserst[index].totalAssets - ftserst[index].totalLiabilities) != 0 && ftserst[index].marketCapitalisation != 0) {

                ftserst[index].navPercent = (ftserst[index].totalAssets - ftserst[index].totalLiabilities) / ftserst[index].marketCapitalisation;
                ftserst[index].navPercent = roundToTwo(ftserst[index].navPercent);

                if (ftserst[index].totalAssets - ftserst[index].totalLiabilities - ftserst[index].intangibleAssets != 0) {

                    ftserst[index].navPercentIt = (ftserst[index].totalAssets - ftserst[index].totalLiabilities - ftserst[index].intangibleAssets) / ftserst[index].marketCapitalisation;
                    ftserst[index].navPercentIt = roundToTwo(ftserst[index].navPercentIt);
                }
                if (ftserst[index].totalCurrentAssets != NaN && ftserst[index].totalCurrentAssets != null && ftserst[index].totalCurrentAssets != 0 && ftserst[index].totalCurrentAssets - ftserst[index].totalLiabilities != 0) {
                    ftserst[index].netNet = (ftserst[index].totalCurrentAssets - ftserst[index].totalLiabilities) / ftserst[index].marketCapitalisation;
                    ftserst[index].netNet = roundToTwo(ftserst[index].netNet);
                } else {
                    ftserst[index].netNet = 0;
                }
            }
            ftserst[index].nvv = roundToTwo(ftserst[index].nvv);
            if (ftserst[index].marketCapitalisation == 0) {
                ftserst[index].navPercentIt = 0;
                ftserst[index].navPercent = 0;
                ftserst[index].netNet = 0;
            }
        }
        var count = Object.keys(ftserst).length;
        var bish = {
            "count": count,
            "items": ftserst
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