'use strict';
var express = require('express');
var router = express.Router();
var app = express();
var path = require('path');
const fs = require('fs');


const axios = require('axios');



    router.post('/', (req, res) => {

        console.log("HA HA");
        var newTicker = req.body.ticker.trim();

        const myArray = req.body.ticker.split("|");


        newTicker = myArray[0].replace(".A", "-A");
        newTicker = newTicker.replace(/\./g,"");
        console.log("SO WHAT IS NEW TICKER "+newTicker);

        axios.get('https://www.britishbulls.com/SignalPage.aspx?lang=en&Ticker=' + newTicker + ".L")
            .then(response => {

                var splitted = response.data.split("\n");
                var j = 0;
                var buySell = "";
                var buySellDate = "";

                console.log("in here");
                for (let i = 0; i < splitted.length; i++) {
                    if (j == 1) {
                        if (splitted[i].includes("SELL")) {
                            buySell = "SELL";
                        } else {
                            if (splitted[i].includes("SHORT")) {
                                buySell = "SHORT";

                            } else {
                                buySell = "BUY";
                            }
                        }

                        splitted[i] = splitted[i].substring(splitted[i].indexOf(";\">") + 3, splitted[i].length -1);
                        splitted[i] = splitted[i].substring(0, splitted[i].indexOf("</td>"));
                        console.log(splitted[i]);
                        splitted[i] = splitted[i].substring(splitted[i].indexOf(">") + 1, splitted[i].length - 1);
                        splitted[i] = splitted[i].substring(0, splitted[i].indexOf("</fo"));

                        splitted[i] = splitted[i].substring(6, splitted[i].length) + "-" +
                            splitted[i].substring(3, 5) + "-" +
                            splitted[i].substring(0, 2);
                        buySellDate = splitted[i];
                        console.log(splitted[i]);
                        j = 0;
                        break;
                    }
                    if (splitted[i].includes("MainContent_signalpagehistory_PatternHistory12_DXDataRow0")) {
                        j = 1;
                    }
                }

                console.log("buysell " + buySell+"77")


                if (buySell == "BUY" || buySell == "SELL" || buySell == "SHORT") {
                    console.log("updating ticker " + myArray[0]);
                    var rawdata = "";
                    var search = "";
                    var fileToReadWrite = "";
                    if (myArray[1] != "search") {

                        if (myArray[1] == "ftseaim") {
                            fileToReadWrite = 'files/ftseaim.json';
                        }
                        if (myArray[1] == "ftse100") {
                            fileToReadWrite = 'files/ftse100.json';
                        }
                        if (myArray[1] == "ftse250") {
                            fileToReadWrite = 'files/ftse250.json';
                        }
                        if (myArray[1] == "ftserst") {
                            fileToReadWrite = 'files/ftserst.json';
                        }
                        rawdata = fs.readFileSync(fileToReadWrite);
                        search = JSON.parse(rawdata);

                        for (let index = 0; index < search.length; ++index) {

                            if (search[index].tickerSymbol == myArray[0]) {
                                search[index].bullAdvice = buySellDate + " " + buySell;
                                break;
                            }
                        }

                        const jsonString = JSON.stringify(search);

                        fs.writeFile(fileToReadWrite, jsonString, err => {
                            if (err) {
                                console.log('Error writing file', err)
                            }
                        })
                    }

                }

                var tempLine = "carrort";


                var obj = { "percentUp": tempLine };


                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(
                    obj
                ))

            })
            .catch(error => {
                console.log(error);
            });




       // )
        //  return next();
    });


    module.exports = router;
