'use strict';
var express = require('express');
var router = express.Router();
var app = express();
var path = require('path');
const fs = require('fs');

var myJsonString = "";

const axios = require('axios');

router.post('/', (req, res) => {



    const myArray = req.body.ticker.split("|");
    var obj = { "currentPercent": "error" };


 //   console.log("In correct file ");
    var rawdata = "";

    var fileToReadWrite = "";


  //  console.log("in async");

    fileToReadWrite = "files/tickers";
    rawdata = fs.readFileSync(fileToReadWrite);
    var search = "";

    var myPrice = "";
    var percentUp = "";

    var tempLine = "carrort";

    axios.get('https://www.youinvest.co.uk/market-research/LSE%3A' +  myArray[0])
        .then(response => {

            myPrice = response.data.substring(response.data.indexOf("Col0PriceDetail"), response.data.length);
            myPrice = myPrice.substring(myPrice.indexOf("|")+1, myPrice.length);
            myPrice = myPrice.substring(0, myPrice.indexOf("<span"));

            percentUp = myPrice.trim();

            tempLine = percentUp;

            var rawdata = fs.readFileSync('files/ftse100.json');
            var search = JSON.parse(rawdata);
            var found = false;
            var jsonString = "";

            for (let index = 0; index < search.length; ++index) {

                    if (myArray[0].toUpperCase() == search[index].tickerSymbol.toUpperCase()) {
                        search[index].percentUp = percentUp;
                        found = true;
                    }


            }

            if (found) {
                jsonString = JSON.stringify(search);

                fs.writeFile('files/ftse100.json', jsonString, err => {
                    if (err) {
                        console.log('Error writing file', err)
                    }
                });
            }


            if (!found) {
                rawdata = fs.readFileSync('files/ftse250.json');
                search = JSON.parse(rawdata);

                for (let index = 0; index < search.length; ++index) {

                    if (myArray[0].toUpperCase() == search[index].tickerSymbol.toUpperCase()) {
                        search[index].percentUp = percentUp;
                        found = true;
                    }

                }
                if (found) {
                    jsonString = JSON.stringify(search);

                     fs.writeFile('files/ftse250.json', jsonString, err => {
                        if (err) {
                        console.log('Error writing file', err)
                     }
                    });
                 }

            }


            if (!found) {
                rawdata = fs.readFileSync('files/ftserst.json');
                search = JSON.parse(rawdata);

                for (let index = 0; index < search.length; ++index) {
                    if (myArray[0].toUpperCase() == search[index].tickerSymbol.toUpperCase()) {
                        search[index].percentUp = percentUp;
                        found = true;
                    }
                }

                if (found) {
                    jsonString = JSON.stringify(search);

                    fs.writeFile('files/ftserst.json', jsonString, err => {
                        if (err) {
                            console.log('Error writing file', err)
                        }
                    });
                }
            }
            if (!found) {
                rawdata = fs.readFileSync('files/ftseaim.json');
                search = JSON.parse(rawdata);


                for (let index = 0; index < search.length; ++index) {
                    if (myArray[0].toUpperCase() == search[index].tickerSymbol.toUpperCase()) {
                        search[index].percentUp = percentUp;
                        found = true;
                    }
                }

                if (found) {
                    jsonString = JSON.stringify(search);

                    fs.writeFile('files/ftseaim.json', jsonString, err => {
                        if (err) {
                            console.log('Error writing file', err)
                        }
                    });
                }
            }

            var obj = { "percentUp": tempLine };


            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(
                obj
            ))

        })
        .catch(error => {
            console.log(error);

            var myFileParsed2 = [];

            try {
                if (fs.existsSync("files/" + myArray[1] + "CURR-Errs.json")) {
                    let rawdata2 = fs.readFileSync("files/" + myArray[1] + "CURRL-Errs.json");
                    myFileParsed2 = JSON.parse(rawdata2);
                    myFileParsed2.push({ "ticker": myArray[0] });

                    const jsonStringErr = JSON.stringify(myFileParsed2);

                    fs.writeFile("files/" + myArray[1] + "CURR-Errs.json", jsonStringErr, err => {
                        if (err) {
                            console.log('Error writing file', err)
                        }
                    })

                } else {
                    myFileParsed2.push({ "ticker": myArray[0] });
                    const jsonStringErr = JSON.stringify(myFileParsed2);

                    fs.writeFile("files/" + myArray[1] + "BULL-Errs.json", jsonStringErr, err => {
                        if (err) {
                            console.log('Error writing file', err)
                        }
                    })
                }
            } catch (err) {
                console.error(err)
            }



        });




});

module.exports = router;
