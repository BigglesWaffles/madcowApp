'use strict';
var express = require('express');
var router = express.Router();
var app = express();
var path = require('path');
const fs = require('fs');
const axios = require('axios');




    router.post('/', (req, res) => {

       

        const myArray = req.body.ticker.split("|");
        console.log("myArray0: " + myArray[0]);
        console.log("myArray0: " + myArray[1]);
    
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
                    var percentUp = "";


                    if (response.data.datepreviousnews == null) {
                        if (response.data.presentnews == true) {
                            dateBit = new Date().toJSON().slice(0, 10);
                            console.log("NEWS11 " + response.data.subjectnews);
                            console.log("NEW: " + dateBit);
                        }
                    } else {
                        dateBit = response.data.datepreviousnews;
                        console.log("NEWS11 " + response.data.subjectnews);
                        console.log("OLD: "+dateBit);
                    }
                    marketcapitalization = response.data.marketcapitalization;
                    bid = response.data.bid;
                    offer = response.data.offer;
                    volume = response.data.volume;
                    isin = response.data.isin;
                    sedol = response.data.sedol;
                    percentUp = response.data.percentualchange;

                    console.log(response.data.percentualchange)

                    obj = { "percentUp": response.data.percentualchange, "currentnews": "https://www.londonstockexchange.com/stock/" + myArray[0] + "/xxx/analysis|" + dateBit.substring(0, 10) + " " + response.data.subjectnews };


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

                          // search[index].cashPerCent = 0;
                            if (search[index].tickerSymbol == myArray[0]) {
                                search[index].cashPerCent = 0;
                                var localNews = null;
                                localNews = "https://www.londonstockexchange.com/stock/" + myArray[0] + "/xxx/analysis|" + dateBit.substring(0, 10) + " " + response.data.subjectnews;
                                if (response.data.subjectnews != null) { 
                                    search[index].news = localNews;
                                    console.log("this should only be news: "+response.data.subjectnews);
                                 }
                                search[index].marketCapitalisation = marketcapitalization;
                                if (search[index].marketCapitalisation != null && search[index].marketCapitalisation > 0) {
                                    search[index].marketCapitalisation = parseFloat((search[index].marketCapitalisation / 1000000) || "").toFixed(2);;

                                    if (search[index].cash != null && search[index].cash > 0) {
                                        search[index].cashPerCent = search[index].cash / search[index].marketCapitalisation * 100;
                                        search[index].cashPerCent = parseFloat(search[index].cashPerCent).toFixed(2);;
                                    } else {
                                        search[index].cashPerCent = 0;
                                    }

                                    /*    totalAssets
                                        totalLiabilities
                                       
                                        currentAssets
                                        navPercent
                                        navPercentIt*/

                                } else {
                                     search[index].cashPerCent = 0;
                                }


                                search[index].isin = isin;
                                search[index].sedol = sedol;
                                search[index].bid = bid;
                                search[index].ask = offer;
                                search[index].volume = volume;
                                search[index].percentUp = roundToTwo(percentUp);


                                if ((search[index].totalAssets - search[index].totalLiabilities) != 0 && search[index].marketCapitalisation != 0) {

                                    search[index].navPercent = (search[index].totalAssets - search[index].totalLiabilities) / search[index].marketCapitalisation;
                                    search[index].navPercent = roundToTwo(search[index].navPercent);

                                    if (search[index].totalAssets - search[index].totalLiabilities - search[index].intangibleAssets != 0) {

                                        search[index].navPercentIt = (search[index].totalAssets - search[index].totalLiabilities - search[index].intangibleAssets) / search[index].marketCapitalisation;
                                        search[index].navPercentIt = roundToTwo(search[index].navPercentIt);
                                    }
                                    if (search[index].totalCurrentAssets != NaN && search[index].totalCurrentAssets != null && search[index].totalCurrentAssets != 0 && search[index].totalCurrentAssets - search[index].totalLiabilities != 0) {
                                        search[index].netNet = (search[index].totalCurrentAssets - search[index].totalLiabilities) / search[index].marketCapitalisation;
                                        search[index].netNet = roundToTwo(search[index].netNet);
                                    } else {
                                        search[index].netNet = 0;
                                    }
                                }
                                search[index].nvv = roundToTwo(search[index].nvv);
                                if (search[index].marketCapitalisation == 0) {
                                    search[index].navPercentIt = 0;
                                    search[index].navPercent = 0;
                                    search[index].netNet = 0;
                                }



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
                    } else {

                        console.log("we are in search");

                    }
 

                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify(
                        obj
                    ));

                })
                .catch(error => {
                    console.log("ticker not found " + myArray[0] +" and file name is "+myArray[1]);


                    var myFileParsed2 = [];

                    try {
                        if (fs.existsSync("files/" + myArray[1] + "NEWS-Errs.json")) {
                            let rawdata2 = fs.readFileSync("files/" + myArray[1] + "NEWS-Errs.json");
                            myFileParsed2 = JSON.parse(rawdata2);
                            myFileParsed2.push({ "ticker": myArray[0] });

                            const jsonStringErr = JSON.stringify(myFileParsed2);

                            fs.writeFile("files/" + myArray[1] + "NEWS-Errs.json", jsonStringErr, err => {
                                if (err) {
                                    console.log('Error writing file', err)
                                }
                            })

                        } else {
                            myFileParsed2.push({ "ticker": myArray[0] });
                            const jsonStringErr = JSON.stringify(myFileParsed2);

                            fs.writeFile("files/" + myArray[1] + "NEWS-Errs.json", jsonStringErr, err => {
                                if (err) {
                                    console.log('Error writing file', err)
                                }
                            })
                        }
                    } catch (err) {
                        console.error(err)
                    }





                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify(
                        obj
                    ));
                    console.log(error);
                });
    });

module.exports = router;

function roundToTwo(num) {
    return +(Math.round(num + "e+2") + "e-2");
}

