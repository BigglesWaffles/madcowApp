'use strict';
var express = require('express');
var router = express.Router();
var app = express();
var path = require('path');

const fs = require('fs');

var a1 = { "aimCount": 0, "rstCount": 0 };




router.get('/:name', (req, res) => {
    console.log("john "+req.params.name)

    req.header("Content-Type", "application/json");


    let rawdata = fs.readFileSync('files/ftse100.json');
    let search = JSON.parse(rawdata);

    var ftseSearch = [];

    for (let index = 0; index < search.length; ++index) {

        let company = search[index];

        ftseSearch = createReturnJSON(req.params.name, company, ftseSearch, "ftse100", a1);

    }

    rawdata = fs.readFileSync('files/ftse250.json');
    search = JSON.parse(rawdata);

    for (let index = 0; index < search.length; ++index) {

        let company = search[index];

        ftseSearch = createReturnJSON(req.params.name, company, ftseSearch, "ftse250", a1);

    }

    rawdata = fs.readFileSync('files/ftserst.json');
    search = JSON.parse(rawdata);

    for (let index = 0; index < search.length; ++index) {

        let company = search[index];

        ftseSearch = createReturnJSON(req.params.name, company, ftseSearch,"ftserst", a1);
    }

    rawdata = fs.readFileSync('files/ftseaim.json');
    search = JSON.parse(rawdata);


    for (let index = 0; index < search.length; ++index) {

        let company = search[index];

        ftseSearch = createReturnJSON(req.params.name, company, ftseSearch, "aim", a1);
    }


    console.log(req.params);
    console.log(req.params.name);
    // app.use('/pthv/:useridname', pthv);
    console.log("a1" + a1.aimCount+" "+a1.rstCount);
    var count = Object.keys(ftseSearch).length;
    var bish = {
        "aimCount": a1.aimCount,
        "rstCount":a1.rstCount,
        "count": count,
        "items": ftseSearch
    };

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(
        bish
    ) )
    //  return next();
});


module.exports = router;

function createReturnJSON(parm, company, ftseSearch, indexType, a1) {
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
    if (parm.toLowerCase().includes("mcdonalds")) {
        expression = "mcdonalds";
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
    if (parm.toLowerCase().includes("pediv")) {
        expression = "pediv";
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
        expression = "transaction in own";
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
        case "watch1":
            if (company.watchlist != null && company.watchlist.toLowerCase() == expression) {
                ftseSearch = aimRst(company, ftseSearch, a1, indexType);
            }
            break;
        case "strong buy":
            if (company.summary != null && company.summary.toLowerCase() == "strong buy") {
                ftseSearch = aimRst(company, ftseSearch, a1, indexType);
            }
            break;
        case "buy rsi":
            if (company.rsiText != null && company.rsiText != undefined && company.rsiText.toLowerCase.includes("buy")) {
                ftseSearch = aimRst(company, ftseSearch, a1, indexType);
            }
            break;
        case "itsgoingup":
            if (company.percentUp > 2.49) {
                ftseSearch = aimRst(company, ftseSearch, a1, indexType);
            }
            break;
        case "capturn":
            if (company.marketCapitalisation > 0 && company.revenue > 0 && company.marketCapitalisation / company.revenue < 0.3) {
                ftseSearch = aimRst(company, ftseSearch, a1, indexType);
            }
            break;
        case "capnavturn":
            if (company.marketCapitalisation > 0 && company.revenue > 0 && company.marketCapitalisation / company.revenue < 0.3 && company.navPercent > 0.9) {
                ftseSearch = aimRst(company, ftseSearch, a1, indexType);
            }
            break;
        case "funtech":
            if (company.summary.toLowerCase().includes("buy") &&
                company.peRatio < 18 && company.peRatio > 0 && company.naVPercentIt > 1 && company.dividend > 2) {
                ftseSearch = aimRst(company, ftseSearch, a1, indexType);
            }
            break;
        case "badtech":
            if (company.rsiText.toLowerCase().includes("buy") &&
                company.peRatio < 18 && company.peRatio > 0 && company.navPercent > 1 && company.dividend > 2) {
                ftseSearch = aimRst(company, ftseSearch, a1, indexType);
            }
            break;
        case "pediv":
            if (company.peRatio < 14 && company.peRatio > 1 && company.dividend > 2) {
                ftseSearch = aimRst(company, ftseSearch, a1, indexType);
            }
            break;
        case "mcdonalds":
            if (company.macdText.toLowerCase().includes("buy") &&
                company.peRatio < 18 && company.peRatio > 0 && company.navPercent > 1 && company.dividend > 2) {
                ftseSearch = aimRst(company, ftseSearch, a1, indexType);
            }
            break;
        case "buy momentum":
            if (company.momentumText != null && company.momentumText != undefined && company.momentumText.toLowerCase() == "buy") {
                ftseSearch = aimRst(company, ftseSearch, a1, indexType);
            }
            break;
        case "rsi momentum buy":
            if (company.momentumText != null && company.momentumText != undefined && company.momentumText.toLowerCase() == "buy" &&
                company.rsiText.toLowerCase() == "buy") {
                ftseSearch = aimRst(company, ftseSearch, a1, indexType);
            }
            break;
        case "good nav and good pe":
            if (company.peRatio < 18 && company.peRatio > 0 && company.naVPercentIt > 1 && company.dividend > 2) {
                ftseSearch = aimRst(company, ftseSearch, a1, indexType);
            }
            break;
        case "netnet":
            if (company.netNet > 0.8) {
                ftseSearch = aimRst(company, ftseSearch, a1, indexType);
            }
            break;
        case "peratio":
            if (company.peRatio < 18 && company.peRatio > 0) {
                ftseSearch = aimRst(company, ftseSearch, a1, indexType);
            }
            break;
        case "assets - liabilites":
            if (company.navPercent > 1) {
                ftseSearch = aimRst(company, ftseSearch, a1, indexType);
            }
            break;
        case "assets - intangibles":
            if (company.naVPercentIt > 1) {
                ftseSearch = aimRst(company, ftseSearch, a1, indexType);
            }
            break;
        case "holding":
            if (company.news.toLowerCase().includes(expression)) {
                ftseSearch = aimRst(company, ftseSearch, a1, indexType);
            }
            break;
        case "director":
            if (company.news.toLowerCase().includes(expression)) {
                ftseSearch = aimRst(company, ftseSearch, a1, indexType);
            }
            break;
        case "trading":
            if (company.news.toLowerCase().includes(expression)) {
                ftseSearch = aimRst(company, ftseSearch, a1, indexType);
            }
            break;
        case "transaction in own":
            if (company.news.toLowerCase().includes(expression)
                || company.news.toLowerCase().includes("buyback")) {
                ftseSearch = aimRst(company, ftseSearch, a1, indexType);
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
                ftseSearch = aimRst(company, ftseSearch, a1, indexType);
            }
            break;
        case "investment bank":
            if (company.sector.toLowerCase().includes("investment bank")
            ) {
                ftseSearch = aimRst(company, ftseSearch, a1, indexType);
            }
            break;
        case "bank":
            if (company.sector.toLowerCase().includes("bank")
                && !company.sector.toLowerCase().includes("investment bank")
            ) {
                ftseSearch = aimRst(company, ftseSearch, a1, indexType);
            }
            break;
        default:
            if (company.sector.toLowerCase().includes(expression.toLowerCase())) {
                ftseSearch = aimRst(company, ftseSearch, a1, indexType);
            }
    }
    return ftseSearch;
}
    function aimRst(company, ftseSearch, a1, indexType) {
        if (indexType == "aim") {
            a1.aimCount = a1.aimCount + 1;
            company.tickerSymbol = "aim" + company.tickerSymbol;
        }
        if (indexType == "ftserst") {
            a1.rstCount = a1.rstCount + 1;
            company.tickerSymbol = "ftserst" + company.tickerSymbol;
        }
        ftseSearch.push(company);
        return ftseSearch;
    }
