'use strict';
var express = require('express');
var router = express.Router();
var app = express();
var path = require('path');

const fs = require('fs');




router.get('/:name', (req, res) => {
   
    console.log("HELLO WORLD " + req.params.name);
    let tickers = req.params.name;
    tickers = tickers.replace("%7C", "|");

    console.log("HELLO WORLD " + tickers);
    tickers = tickers.split("|");


    req.header("Content-Type", "application/json");


    let rawdata = fs.readFileSync('files/ftse100.json');
    let search = JSON.parse(rawdata);

    var ftseSearch = [];

    for (let index = 0; index < search.length; ++index) {

        for (let j = 0; j < tickers.length; ++j) {
            if ((tickers[j]).toUpperCase() == search[index].tickerSymbol.toUpperCase()) {
                search[index].watchlist = "watch1";
            }
        }

    }

    let jsonString = JSON.stringify(search);

    fs.writeFile('files/ftse100.json', jsonString, err => {
        if (err) {
            console.log('Error writing file', err)
        }
    });

    rawdata = fs.readFileSync('files/ftse250.json');
    search = JSON.parse(rawdata);

    for (let index = 0; index < search.length; ++index) {

        for (let j = 0; j < tickers.length; ++j) {
            if (tickers[j].toUpperCase() == search[index].tickerSymbol.toUpperCase()) {
                search[index].watchlist = "watch1";
            }
        }

    }

    jsonString = JSON.stringify(search);

    fs.writeFile('files/ftse250.json', jsonString, err => {
        if (err) {
            console.log('Error writing file', err)
        }
    });

    rawdata = fs.readFileSync('files/ftserst.json');
    search = JSON.parse(rawdata);

    for (let index = 0; index < search.length; ++index) {
        for (let j = 0; j < tickers.length; ++j) {
            if (tickers[j].toUpperCase() == search[index].tickerSymbol.toUpperCase()) {
                search[index].watchlist = "watch1";
            }
        }
    }

    jsonString = JSON.stringify(search);

    fs.writeFile('files/ftserst.json', jsonString, err => {
        if (err) {
            console.log('Error writing file', err)
        }
    });

    rawdata = fs.readFileSync('files/ftseaim.json');
    search = JSON.parse(rawdata);


    for (let index = 0; index < search.length; ++index) {
        for (let j = 0; j < tickers.length; ++j) {
            if (tickers[j].toUpperCase() == search[index].tickerSymbol.toUpperCase()) {
                search[index].watchlist = "watch1";
            }
        }
    }

    jsonString = JSON.stringify(search);

    fs.writeFile('files/ftseaim.json', jsonString, err => {
        if (err) {
            console.log('Error writing file', err)
        }
    });


    console.log(req.params);
    console.log(req.params.name);


    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(
        null
    ) )
    //  return next();
});


module.exports = router;
