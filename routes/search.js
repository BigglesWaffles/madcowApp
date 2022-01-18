'use strict';
var express = require('express');
var router = express.Router();
var app = express();
var path = require('path');

const fs = require('fs');




router.post('/', (req, res) => {
    console.log(req.body.search)

    req.header("Content-Type", "application/json");

    let rawdata = fs.readFileSync('files/ftse100.json');
    let search = JSON.parse(rawdata);

    var ftseSearch = [];

    for (let index = 0; index < search.length; ++index) {

        let company = search[index];
        if (company.tickerSymbol == "888") {
            console.log("hh1")
        }

        if (company.sector.includes(req.body.search)) {
            ftseSearch.push(company);
        }
    }

    rawdata = fs.readFileSync('files/ftse250.json');
    search = JSON.parse(rawdata);

    for (let index = 0; index < search.length; ++index) {

        let company = search[index];
        if (company.tickerSymbol == "888") {
            console.log("hh2")
        }

        if (company.sector.includes(req.body.search)) {
            ftseSearch.push(company);
        }
    }

    rawdata = fs.readFileSync('files/ftserst.json');
    search = JSON.parse(rawdata);

    for (let index = 0; index < search.length; ++index) {

        let company = search[index];
        if (company.tickerSymbol == "888") {
            console.log("hh3")
        }

        if (company.sector.includes(req.body.search)) {
            ftseSearch.push(company);
        }
    }

    rawdata = fs.readFileSync('files/ftseaim.json');
    search = JSON.parse(rawdata);

    for (let index = 0; index < search.length; ++index) {

        let company = search[index];
        if (company.tickerSymbol == "888") {
            console.log("hh4")
        }

        if (company.sector.includes(req.body.search)) {
            ftseSearch.push(company);
        }
    }


    console.log(req.path);
    console.log(req.params);
    console.log(req.params.useridname);
    // app.use('/pthv/:useridname', pthv);
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(
        ftseSearch
    )

    )
    //  return next();
});


module.exports = router;