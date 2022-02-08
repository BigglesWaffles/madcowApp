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
            rawdata = fs.readFileSync('files/ftseaimISIN-Errs.json');
        }
        if (myInputIsin == "errNews") {
            rawdata = fs.readFileSync('files/ftseaimNEWS-Errs.json');
        }
        if (myInputIsin == "errBull") {
            rawdata = fs.readFileSync('files/ftseaimBULL-Errs.json');
        }
        let ftse100 = JSON.parse(rawdata);

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(
            ftse100
        ));
    } else {
        let rawdata = fs.readFileSync('files/ftseaim.json');
        let ftseaim = JSON.parse(rawdata);

        for (var index = 0; index < ftseaim.length; ++index) {
      

            if ((ftseaim[index].totalAssets - ftseaim[index].totalLiabilities) != 0 && ftseaim[index].marketCapitalisation != 0) {

                ftseaim[index].navPercent = (ftseaim[index].totalAssets - ftseaim[index].totalLiabilities) / ftseaim[index].marketCapitalisation;
                ftseaim[index].navPercent = roundToTwo(ftseaim[index].navPercent);

                if (ftseaim[index].totalAssets - ftseaim[index].totalLiabilities - ftseaim[index].intangibleAssets != 0) {

                    ftseaim[index].navPercentIt = (ftseaim[index].totalAssets - ftseaim[index].totalLiabilities - ftseaim[index].intangibleAssets) / ftseaim[index].marketCapitalisation;
                    ftseaim[index].navPercentIt = roundToTwo(ftseaim[index].navPercentIt);
    
                }
                if (ftseaim[index].totalCurrentAssets != NaN && ftseaim[index].totalCurrentAssets != null && ftseaim[index].totalCurrentAssets != 0 && ftseaim[index].totalCurrentAssets - ftseaim[index].totalLiabilities != 0) {
                    ftseaim[index].netNet = (ftseaim[index].totalCurrentAssets - ftseaim[index].totalLiabilities) / ftseaim[index].marketCapitalisation;
                    ftseaim[index].netNet = roundToTwo(ftseaim[index].netNet);


                } else {
                    ftseaim[index].netNet = 0;
                }
            }
            ftseaim[index].nvv = roundToTwo(ftseaim[index].nvv);
            if (ftseaim[index].marketCapitalisation == 0) {
                ftseaim[index].navPercentIt = 0;
                ftseaim[index].navPercent = 0;
                ftseaim[index].netNet = 0;
            }
        }
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(
            ftseaim

        ));
    }
    //  return next();
});

function roundToTwo(num) {
    return +(Math.round(num + "e+2") + "e-2");
}


module.exports = router;