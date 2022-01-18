'use strict';
var express = require('express');
var router = express.Router();
var app = express();
var path = require('path');


const fs = require('fs');

router.get('/', (req, res) => {


    let rawdata = fs.readFileSync('files/ftseaim.json');
    let shares = JSON.parse(rawdata);
    //console.log(ftseaim);

    console.log(req.path);
    console.log(req.params);
    console.log(req.params.useridname);


    var ftseSearch = [];

    for (var index = 0; index < shares.length; ++index) {

        var company = shares[index];

        if (Number(company.netNet) > 0.69) {
            ftseSearch.push(company);
        }
    }

    console.log(req.path);
    console.log(req.params);
    console.log(req.params.useridname);

    rawdata = fs.readFileSync('files/ftserst.json');
    shares = JSON.parse(rawdata);

    for (var index = 0; index < shares.length; ++index) {

        var company = shares[index];

        if (Number(company.netNet) > 0.69) {
            ftseSearch.push(company);
            console.log("ftseRST " + company.tickerSymbol + " " + company.stockName);
        }
    }

    rawdata = fs.readFileSync('files/ftse250.json');
    shares = JSON.parse(rawdata);

    for (var index = 0; index < shares.length; ++index) {

        var company = shares[index];

        if (Number(company.netNet) > 0.69) {
            ftseSearch.push(company);
            console.log("ftse250 " + company.tickerSymbol + " " + company.stockName);
        }
    }


    rawdata = fs.readFileSync('files/ftse100.json');
    shares = JSON.parse(rawdata);

    for (var index = 0; index < shares.length; ++index) {

        var company = shares[index];

        if (Number(company.netNet) > 0.69) {
            ftseSearch.push(company);
            console.log("ftse100 "+company.tickerSymbol+" "+company.stockName);
        }
    }




    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(
        ftseSearch
    )

  )
    //  return next();
});


module.exports = router;