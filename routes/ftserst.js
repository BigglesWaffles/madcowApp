'use strict';
var express = require('express');
var router = express.Router();
var app = express();
var path = require('path');

const fs = require('fs');


router.get('/', (req, res) => {

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
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(
      ftserst
    ));
    //  return next();
});

function roundToTwo(num) {
    return +(Math.round(num + "e+2") + "e-2");
}

module.exports = router;