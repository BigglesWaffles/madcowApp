'use strict';
var express = require('express');
var router = express.Router();
var app = express();
var path = require('path');
const fs = require('fs');
const axios = require('axios');




    router.post('/', (req, res) => {

       

        const myArray = req.body.ticker.split("|");
    
        var obj = { "currentnews": "error" };


            axios.get('https://api.londonstockexchange.com/api/gw/lse/instruments/alldata/' + myArray[0])

                .then(response => {

                    var dateBit = "";
                    var marketcapitalization = "";
                    var bid = "";
                    var offer = "";
                    var volume = "";
                    var isin = "";
                    var sedol = "";


                    if (response.data.datepreviousnews == null) {
                        if (response.data.presentnews == true) {
                            dateBit = new Date().toJSON().slice(0, 10);
                        }
                    } else {
                        dateBit = response.data.datepreviousnews;
                    }
                    marketcapitalization = response.data.marketcapitalization;
                    bid = response.data.bid;
                    offer = response.data.offer;
                    volume = response.data.volume;
                    isin = response.data.isin;
                    sedol= response.data.sedol;

                    obj = { "currentnews": "https://www.londonstockexchange.com/stock/" + myArray[0] + "/xxx/analysis|" + dateBit.substring(0, 10) + " " + response.data.subjectnews };


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
                        console.log(myArray[0]);
                        for (let index = 0; index < search.length; ++index) {

                            if (search[index].tickerSymbol == myArray[0]) {
                                search[index].news = "https://www.londonstockexchange.com/stock/" + myArray[0] + "/xxx/analysis|" + dateBit.substring(0, 10) + " " + response.data.subjectnews;
                                search[index].marketCapitalisation = marketcapitalization;
                                if (search[index].marketCapitalisation != null && search[index].marketCapitalisation > 0) {
                                    search[index].marketCapitalisation = parseFloat((search[index].marketCapitalisation / 1000000)||"").toFixed(2);;

                              

                                /*    totalAssets
                                    totalLiabilities
                                   
                                    currentAssets
                                    navPercent
                                    navPercentIt*/

                                }


                                search[index].isin = isin;
                                search[index].sedol = sedol;
                                search[index].bid = bid;
                                search[index].ask = offer;
                                search[index].volume = volume;
                                console.log("this is what it thinks it is: " + search[index].marketCapitalisation + " " + "for ticker " + search[index].tickerSymbol);
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
 

                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify(
                        obj
                    ));

                })
                .catch(error => {
                    console.log("ticker not found " + myArray[0]);
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify(
                        obj
                    ));
                    console.log(error);
                });
    });


    module.exports = router;
