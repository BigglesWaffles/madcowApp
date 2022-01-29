'use strict';
var express = require('express');
var router = express.Router();
var app = express();
var path = require('path');
const fs = require('fs');

router.get('/', (req, res) => {

    
    console.log("In correct file ");


    loadData('files/ftse100.json');
    loadData('files/ftse250.json');
    loadData('files/ftserst.json');
    loadData('files/ftseaim.json');
                var tempLine = "carrort";
                var obj = { "percentUp": tempLine };
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(
                    obj
                ))
            
    });

function loadData(myFile) {

    var rawdata2 = fs.readFileSync("files/technicals.json");
    console.log("fred:" + rawdata2.toString().substring(0, 2));
    var techie = JSON.parse(rawdata2);

    var rawdata = fs.readFileSync(myFile);
    var myFileParsed = JSON.parse(rawdata);

    var nothingFound = true;
 
    for (var index = 0; index < myFileParsed.length; ++index) {

        for (let index2 = 0; index2 < techie.length; ++index2) {
       //     console.log("xx" + myFileParsed[index].tickerSymbol + "xx" + techie[index2].ticker + "xx");
            if (myFileParsed[index].tickerSymbol == techie[index2].ticker) {
                    myFileParsed[index].momentum = techie[index2].momentum;
                    myFileParsed[index].momentumText = techie[index2].momentumText;
                    myFileParsed[index].rsi = techie[index2].rsi;
                    myFileParsed[index].rsiText = techie[index2].rsiText;
                    myFileParsed[index].macd = techie[index2].macd;
                    myFileParsed[index].macdText = techie[index2].macdText;
                    myFileParsed[index].summary = techie[index2].summary;
                    nothingFound = false;
                    break;
             }
        }

    }

    if (nothingFound == false) {
        console.log("found file " + myFile);
        const jsonString = JSON.stringify(myFileParsed);

        fs.writeFile(myFile, jsonString, err => {
            if (err) {
                console.log('Error writing file', err)
            }
        });
    }

}

    module.exports = router;
