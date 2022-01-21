'use strict';
var express = require('express');
var router = express.Router();
var app = express();
var path = require('path');

const fs = require('fs');




router.get('/:name', (req, res) => {
    console.log("john "+req.params.name)

    req.header("Content-Type", "application/json");

    let rawdata = fs.readFileSync('files/ftse100.json');
    let search = JSON.parse(rawdata);

    var ftseSearch = [];

    for (let index = 0; index < search.length; ++index) {

        let company = search[index];
        if (company.tickerSymbol == "CRST") {
            console.log("hh1")
        }

        if (company.sector.includes(req.params.name)) {
            ftseSearch.push(company);
        }
    }

    rawdata = fs.readFileSync('files/ftse250.json');
    search = JSON.parse(rawdata);

    for (let index = 0; index < search.length; ++index) {

        let company = search[index];
        if (company.tickerSymbol == "CRST") {
            console.log("hh2")
        }

        if (company.sector.includes(req.params.name)) {
            ftseSearch.push(company);
        }
    }

    rawdata = fs.readFileSync('files/ftserst.json');
    search = JSON.parse(rawdata);

    for (let index = 0; index < search.length; ++index) {

        let company = search[index];


        if (company.sector.includes(req.params.name)) {
            ftseSearch.push(company);
        }
    }

    rawdata = fs.readFileSync('files/ftseaim.json');
    search = JSON.parse(rawdata);

    for (let index = 0; index < search.length; ++index) {

        let company = search[index];
        if (company.tickerSymbol == "CRST") {
            console.log("hh4")
        }

        if (company.sector.includes(req.params.name)) {
            ftseSearch.push(company);
        }
    }


    console.log(req.params);
    console.log(req.params.name);
    // app.use('/pthv/:useridname', pthv);
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(
        ftseSearch
    )

    )
    //  return next();
});


module.exports = router;