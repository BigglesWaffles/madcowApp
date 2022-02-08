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
    if (parm.toLowerCase().includes("pe ratio")) {
        expression = "peratio";
    }
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
    if (parm.toLowerCase().includes("funtech")) {
        expression = "funtech";
    }
    if (parm.toLowerCase().includes("badtech")) {
        expression = "badtech";
    }
    if (parm.toLowerCase().includes("capnavturn")) {
        expression = "capnavturn";
    }
    if (parm.toLowerCase().includes("itsgoingup")) {
        expression = "itsgoingup";
    }
    if (parm.toLowerCase().includes("capturn")) {
        expression = "capturn";
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
    if (parm.toLowerCase().includes("netnet")) {
        expression = "netnet";
    }
    if (parm.toLowerCase().includes("transaction in own")) {
        expression =  "transaction in own";
    }
    if (parm.toLowerCase().includes("good nav (excluding intangibles) relative to market cap, good pe and gives a dividend")) {
        expression = "good nav and good pe";
    }
    if (parm.toLowerCase().includes("strong buy")) {
        expression = "strong buy";
    }
    if (parm.toLowerCase().includes("buy rsi")) {
        expression = "buy rsi";
    }
    if (parm.toLowerCase().includes("rsi momentum buy")) {
        expression = "rsi momentum buy";
    }
    if (parm.toLowerCase().includes("buy momentum")) {
        expression = "buy momentum";
    }
    switch (expression) {
        case "strong buy":
            if (company.summary != null && company.summary.toLowerCase() == "strong buy") {
                if (indexType == "aim") {
                    company.tickerSymbol = "aim" + company.tickerSymbol;
                }
                if (indexType == "ftserst") {
                    company.tickerSymbol = "ftserst" + company.tickerSymbol;
                }
                ftseSearch.push(company);
            }
            break;
        case "buy rsi":
            if (company.rsiText != null && company.rsiText != undefined && company.rsiText.toLowerCase() == "buy") {
                if (indexType == "aim") {
                    company.tickerSymbol = "aim" + company.tickerSymbol;
                }
                if (indexType == "ftserst") {
                    company.tickerSymbol = "ftserst" + company.tickerSymbol;
                }
                ftseSearch.push(company);
            }
            break;
        case "itsgoingup":
            if (company.percentUp > 2.49) {
                if (indexType == "aim") {
                    company.tickerSymbol = "aim" + company.tickerSymbol;
                }
                if (indexType == "ftserst") {
                    company.tickerSymbol = "ftserst" + company.tickerSymbol;
                }
                ftseSearch.push(company);
            }
            break;
        case "capturn":
            if (company.marketCapitalisation > 0 && company.revenue > 0 && company.marketCapitalisation / company.revenue  < 0.3)
                 {
                if (indexType == "aim") {
                    company.tickerSymbol = "aim" + company.tickerSymbol;
                }
                if (indexType == "ftserst") {
                    company.tickerSymbol = "ftserst" + company.tickerSymbol;
                }
                ftseSearch.push(company);
            }
            break;
        case "capnavturn":
            if (company.marketCapitalisation > 0 && company.revenue > 0 && company.marketCapitalisation / company.revenue < 0.3 && company.navPercent > 0.9) {
                if (indexType == "aim") {
                    company.tickerSymbol = "aim" + company.tickerSymbol;
                }
                if (indexType == "ftserst") {
                    company.tickerSymbol = "ftserst" + company.tickerSymbol;
                }
                ftseSearch.push(company);
            }
            break;
        case "funtech":
            if (company.summary.toLowerCase().includes("buy")  && 
                company.peRatio < 18 && company.peRatio > 0 && company.naVPercentIt > 1 && company.dividend > 0) {
                if (indexType == "aim") {
                    company.tickerSymbol = "aim" + company.tickerSymbol;
                }
                if (indexType == "ftserst") {
                    company.tickerSymbol = "ftserst" + company.tickerSymbol;
                }
                ftseSearch.push(company);
            }
            break;
        case "badtech":
            if (company.rsiText.toLowerCase() == "buy" &&
                company.peRatio < 18 && company.peRatio > 0 && company.navPercent > 1 && company.dividend > 0) {
                if (indexType == "aim") {
                    company.tickerSymbol = "aim" + company.tickerSymbol;
                }
                if (indexType == "ftserst") {
                    company.tickerSymbol = "ftserst" + company.tickerSymbol;
                }
                ftseSearch.push(company);
            }
            break;
        case "buy momentum":
            if (company.momentumText != null && company.momentumText != undefined && company.momentumText.toLowerCase() == "buy") {
                if (indexType == "aim") {
                    company.tickerSymbol = "aim" + company.tickerSymbol;
                }
                if (indexType == "ftserst") {
                    company.tickerSymbol = "ftserst" + company.tickerSymbol;
                }
                ftseSearch.push(company);
            }
            break;
        case "rsi momentum buy":
            if (company.momentumText != null && company.momentumText != undefined && company.momentumText.toLowerCase() == "buy" && 
                company.rsiText.toLowerCase() == "buy"  ) {
                if (indexType == "aim") {
                    company.tickerSymbol = "aim" + company.tickerSymbol;
                }
                if (indexType == "ftserst") {
                    company.tickerSymbol = "ftserst" + company.tickerSymbol;
                }
                ftseSearch.push(company);
            }
            break;
        case "good nav and good pe":
            if (company.peRatio < 18 && company.peRatio > 0 && company.naVPercentIt > 1 && company.dividend > 0) {
                if (indexType == "aim") {
                    company.tickerSymbol = "aim" + company.tickerSymbol;
                }
                if (indexType == "ftserst") {
                    company.tickerSymbol = "ftserst" + company.tickerSymbol;
                }
                ftseSearch.push(company);
            }
            break;
        case "netnet":
            if (company.netNet > 0.8) {
                if (indexType == "aim") {
                    company.tickerSymbol = "aim" + company.tickerSymbol;
                }
                if (indexType == "ftserst") {
                    company.tickerSymbol = "ftserst" + company.tickerSymbol;
                }
                ftseSearch.push(company);
            }
            break;
        case "peratio":
            if (company.peRatio < 18 && company.peRatio > 0) {
                if (indexType == "aim") {
                    company.tickerSymbol = "aim" + company.tickerSymbol;
                }
                if (indexType == "ftserst") {
                    company.tickerSymbol = "ftserst" + company.tickerSymbol;
                }
                ftseSearch.push(company);
            }
            break;
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
            if (company.naVPercentIt > 1) {
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