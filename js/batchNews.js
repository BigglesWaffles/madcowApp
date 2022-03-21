'use strict';
var express = require('express');
var router = express.Router();
var app = express();
var path = require('path');
const fs = require('fs');
const axios = require('axios');



async function getNewsData(indexVal, timeOut) {


    await new Promise(resolve => setTimeout(resolve, timeOut));


    console.log("what happens");

    var fileToReadWrite = "files/" + indexVal + "tickers.json";
    var rawdata = fs.readFileSync(fileToReadWrite);
    var search = JSON.parse(rawdata);
    var fileToWrite = 'files/' + indexVal + '.json';
    console.log(fileToWrite);

    var obj = { "currentnews": "error" };

    var saveTicker = "";
    var maxNum = 0;

    var rawdata2 = "";
    var search2 = "";
   // console.log(fileToWrite);
    var index2 = 0;

    
    for (let index = 0; index < search.length; ++index) {

        await new Promise(resolve => setTimeout(resolve, 1000));

        axios.get('https://api.londonstockexchange.com/api/gw/lse/instruments/alldata/' + search[index].ticker)

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
                    }
                } else {
                    dateBit = response.data.datepreviousnews;
                }
                marketcapitalization = response.data.marketcapitalization;
                bid = response.data.bid;
                offer = response.data.offer;
                volume = response.data.volume;
                isin = response.data.isin;
                sedol = response.data.sedol;
                percentUp = response.data.percentualchange;

                console.log(response.data.percentualchange)

                obj = { "currentnews": "https://www.londonstockexchange.com/stock/" + search[index].ticker + "/xxx/analysis|" + dateBit.substring(0, 10) + " " + response.data.subjectnews };


                rawdata2 = fs.readFileSync(fileToWrite);
                search2 = JSON.parse(rawdata2);
                console.log(search[index].ticker);
                for (index2 = 0; index2 < search2.length; ++index2) {

                    if (search2[index2].tickerSymbol == search[index].ticker) {
                        search2[index2].news = "https://www.londonstockexchange.com/stock/" + search2[index2].tickerSymbol + "/xxx/analysis|" + dateBit.substring(0, 10) + " " + response.data.subjectnews;
                        search2[index2].marketCapitalisation = marketcapitalization;
                        if (search2[index2].marketCapitalisation != null && search2[index2].marketCapitalisation > 0) {
                            search2[index2].marketCapitalisation = parseFloat((search2[index2].marketCapitalisation / 1000000) || "").toFixed(2);
                        }
                        search2[index2].isin = isin;
                        search2[index2].sedol = sedol;
                        search2[index2].bid = bid;
                        search2[index2].ask = offer;
                        search2[index2].volume = volume;
                        search2[index2].percentUp = roundToTwo(percentUp);

                        if ((search2[index2].totalAssets - search2[index2].totalLiabilities) != 0 && search2[index2].marketCapitalisation != 0) {
                            search2[index2].navPercent = (search2[index2].totalAssets - search2[index2].totalLiabilities) / search2[index2].marketCapitalisation;
                            search2[index2].navPercent = roundToTwo(search2[index2].navPercent);

                            if (search2[index2].totalAssets - search2[index2].totalLiabilities - search2[index2].intangibleAssets != 0) {
                                search2[index2].navPercentIt = (search2[index2].totalAssets - search2[index2].totalLiabilities - search2[index2].intangibleAssets) / search2[index2].marketCapitalisation;
                                search2[index2].navPercentIt = roundToTwo(search2[index2].navPercentIt);
                            }
                            if (search2[index2].totalCurrentAssets != NaN && search2[index2].totalCurrentAssets != null && search2[index2].totalCurrentAssets != 0 && search2[index2].totalCurrentAssets - search2[index2].totalLiabilities != 0) {
                                search2[index2].netNet = (search2[index2].totalCurrentAssets - search2[index2].totalLiabilities) / search2[index2].marketCapitalisation;
                                search2[index2].netNet = roundToTwo(search2[index2].netNet);
                            } else {
                                search2[index2].netNet = 0
                            }
                        }
                        search2[index2].nvv = roundToTwo(search2[index2].nvv);
                        if (search2[index2].marketCapitalisation == 0) {
                            search2[index2].navPercentIt = 0;
                            search2[index2].navPercent = 0;
                            search2[index2].netNet = 0;
                        }
                        console.log("this is what it thinks it is: " + search2[index2].marketCapitalisation + " " + "for ticker " + search2[index2].tickerSymbol);

                        //  break;
                    } //if found
                } //looping (inner)

                console.log("after loop");
                const jsonString2 = JSON.stringify(search2);

                fs.writeFile(fileToWrite, jsonString2, err => {
                    if (err) {
                        console.log('Error writing file', err)
                    }
                });
                console.log("afer write ");

            }).catch(error => {
                console.log("failing ticker: " + search[index].ticker);
                console.log(error);
                if (saveTicker == search[index].ticker) {
                    maxNum = maxNum + 1;
                } else {
                    maxNum = 0;
                    saveTicker = search[index].ticker;
                }
                if (maxNum < 3) {
                    console.log("maxNum " + maxNum);
                    index2 = index2 - 1;
                } else {
                    console.log("Failed maxNum " + maxNum);

                    for (index2 = 0; index2 < search2.length; ++index2) {

                        if (search2[index2].tickerSymbol == search[index].ticker) {
                            search2[index2].exDividend = "-";
                            search2[index2].dividend = "0";
                            search2[index2].peRatio = "0";
                            search2[index2].numberOfShares = "0";
                        }
                    }
                    //   search2[index2].exDividend = "-";
                    //  search2[index2].dividend = "0";
                    //   search2[index2].peRatio = "0";
                    //  search2[index2].numberOfShares = "0";
                }
            });

        console.log("after then of call");
    }
}


function roundToTwo(num) {
    return +(Math.round(num + "e+2") + "e-2");
}

module.exports = { getNewsData };
