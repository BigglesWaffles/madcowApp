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

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(
       ftse250
    //    [{"hello":"world"}]
    ));
    //  return next();
});

function roundToTwo(num) {
    return +(Math.round(num + "e+2") + "e-2");
}

module.exports = router;