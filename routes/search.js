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

        ftseSearch = createReturnJSON(req.params.name, company, ftseSearch, "ftse100");

    }

    rawdata = fs.readFileSync('files/ftse250.json');
    search = JSON.parse(rawdata);

    for (let index = 0; index < search.length; ++index) {

        let company = search[index];

        ftseSearch = createReturnJSON(req.params.name, company, ftseSearch, "ftse250");

    }

    rawdata = fs.readFileSync('files/ftserst.json');
    search = JSON.parse(rawdata);

    for (let index = 0; index < search.length; ++index) {

        let company = search[index];

        ftseSearch = createReturnJSON(req.params.name, company, ftseSearch,"ftserst");
    }

    rawdata = fs.readFileSync('files/ftseaim.json');
    search = JSON.parse(rawdata);

    for (let index = 0; index < search.length; ++index) {

        let company = search[index];

        ftseSearch = createReturnJSON(req.params.name, company, ftseSearch, "aim");
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

function createReturnJSON(parm, company,ftseSearch, indexType) {
    let expression = parm;

    if (parm.toLowerCase().includes("assets - liabilites")) {
        expression = "assets - liabilites";
    }
    if (parm.toLowerCase().includes("assets - intangibles")) {
        expression = "assets - intangibles";
    }
    if (parm.toLowerCase().includes("holding")) {
        expression = "holding";
    }
    if (parm.toLowerCase().includes("trading")) {
        expression = "trading";
    }
    if (parm.toLowerCase().includes("director")) {
        expression = "director";
    }
    if (parm.toLowerCase().includes("results")) {
        expression = "results";
    }
    if (parm.toLowerCase().includes("bank")) {
        expression = "bank";
    }
    if (parm.toLowerCase().includes("investment bank")) {
        expression = "investment bank";
    }
    if (parm.toLowerCase().includes("transaction in own")) {
        expression =  "transaction in own";
    }

    switch (expression) {
        case "assets - liabilites":
            if (company.navPercent > 1) {
                if (indexType == "aim") {
                    company.tickerSymbol = "aim" + company.tickerSymbol;
                }
                if (indexType == "ftserst") {
                    company.tickerSymbol = "ftserst" + company.tickerSymbol;
                }
                ftseSearch.push(company);
            }
            break;
        case "assets - intangibles":
            if (company.navPercentIt > 1) {
                if (indexType == "aim") {
                    company.tickerSymbol = "aim" + company.tickerSymbol;
                }
                if (indexType == "ftserst") {
                    company.tickerSymbol = "ftserst" + company.tickerSymbol;
                }
                ftseSearch.push(company);
            }
            break;
        case "holding":
            if (company.news.toLowerCase().includes(expression)) {
                if (indexType == "aim") {
                    company.tickerSymbol = "aim" + company.tickerSymbol;
                }
                if (indexType == "ftserst") {
                    company.tickerSymbol = "ftserst" + company.tickerSymbol;
                }
                ftseSearch.push(company);
            }
            break;
        case "director":
            if (company.news.toLowerCase().includes(expression)) {
                if (indexType == "aim") {
                    company.tickerSymbol = "aim" + company.tickerSymbol;
                }
                if (indexType == "ftserst") {
                    company.tickerSymbol = "ftserst" + company.tickerSymbol;
                }
                ftseSearch.push(company);
            }
            break;
        case "trading":
            if (company.news.toLowerCase().includes(expression)) {
                if (indexType == "aim") {
                    company.tickerSymbol = "aim" + company.tickerSymbol;
                }
                if (indexType == "ftserst") {
                    company.tickerSymbol = "ftserst" + company.tickerSymbol;
                }
                ftseSearch.push(company);
            }
            break;
        case "transaction in own":
            if (company.news.toLowerCase().includes(expression)
                || company.news.toLowerCase().includes("buyback")) {
                if (indexType == "aim") {
                    company.tickerSymbol = "aim" + company.tickerSymbol;
                }
                if (indexType == "ftserst") {
                    company.tickerSymbol = "ftserst" + company.tickerSymbol;
                }
                ftseSearch.push(company);
            }
            break;
        case "results":
            if (company.news.toLowerCase().includes(expression)
                && !company.news.toLowerCase().includes("notice")
                && !company.news.toLowerCase().includes("agm")
                && !company.news.toLowerCase().includes("general meet")
                && !company.news.toLowerCase().includes("of placing")
                && !company.news.toLowerCase().includes("confirmation of")
            ) {
                if (indexType == "aim") {
                    company.tickerSymbol = "aim" + company.tickerSymbol;
                }
                if (indexType == "ftserst") {
                    company.tickerSymbol = "ftserst" + company.tickerSymbol;
                }
                ftseSearch.push(company);
            }
            break;
        case "investment bank":
            if (company.sector.toLowerCase().includes("investment bank")
            ) {
                if (indexType == "aim") {
                    company.tickerSymbol = "aim" + company.tickerSymbol;
                }
                if (indexType == "ftserst") {
                    company.tickerSymbol = "ftserst" + company.tickerSymbol;
                }
                ftseSearch.push(company);
            }
            break;
        case "bank":
            if (company.sector.toLowerCase().includes("bank")
                && !company.sector.toLowerCase().includes("investment bank")
            ) {
                if (indexType == "aim") {
                    company.tickerSymbol = "aim" + company.tickerSymbol;
                }
                if (indexType == "ftserst") {
                    company.tickerSymbol = "ftserst" + company.tickerSymbol;
                }
                ftseSearch.push(company);
            }
            break;
        default:
            if (company.sector.toLowerCase().includes(expression.toLowerCase())) {
                if (indexType == "aim") {
                    company.tickerSymbol = "aim" + company.tickerSymbol;
                }
                if (indexType == "ftserst") {
                    company.tickerSymbol = "ftserst" + company.tickerSymbol;
                }
                ftseSearch.push(company);
            }
    }
    return ftseSearch;
}