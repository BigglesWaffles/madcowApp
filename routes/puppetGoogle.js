'use strict';
var express = require('express');
var router = express.Router();
var app = express();
var path = require('path');
const fs = require('fs');
const url = require('url');

const axios = require('axios');

var https = require("https");


router.get('/:name', (req, res) => {


    var rawdata = "";
    var search = "";
    var fileToReadWrite = "";
    var maxNum = parseInt("0");
    var saveTicker = "";

    //router.post('/', (req, res) => {



    //  const page = await browser.newPage();

    var fileName = req.params.name;
    console.log("john " + req.params.name);

    fileToReadWrite = "files/" + fileName + ".json";
    rawdata = fs.readFileSync(fileToReadWrite);
    search = JSON.parse(rawdata);
    var search2 = search;
    var searchString = "";
    var specialData = "";
    var occurrence = "";

 
    var myFile = "";
    if (fileName.indexOf("100") >= 0) {
        myFile = "ExDividendFTSE100.txt";
    } else {
        myFile = "ExDividendFTSE250.txt";
    }
    fs.readFile('files/'+myFile, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return 0;
        }
    //    console.log(data);


        specialData = data;

       
        return 0;

    });
   
  //  console.log(ftse100Raw);

    
    //    search = [{ "tickerSymbol": "BA." }, { "tickerSymbol": "IAG" }];
    var ticker2 = "";

   // search = "";
   
    console.log("are we here");
    for (let index = 0; index < search.length; ++index) {
        try {
            var technical = new Object();
           //   console.log(search[index].tickerSymbol);
            technical.ticker = search[index].tickerSymbol;
            ticker2 = technical.ticker;

            var peRatio = "";
            var dividend = "";
            var exDividend = "";

            var eps = "0";
            var numberOfShares = "";



        //   if (ticker2 != "BYIT" ) {
       //        continue;
        //    }

            var obj = { "currentnews": "error" };

            axios.get("https://markets.ft.com/data/equities/tearsheet/summary?s=" + ticker2 + ":lse")

                .then(response => {

                    numberOfShares = "";
                    eps = "";
                    peRatio = "";
                    dividend = "";
                    exDividend = "0";

                    var bigblob = response.data;

                    search[index].numberOfShares = "0";

                    numberOfShares = bigblob.substring(bigblob.indexOf("Shares outstanding") + 27, bigblob.indexOf("Shares outstanding") + 50);
                    numberOfShares = numberOfShares.substring(0, numberOfShares.indexOf("<"));

                    numberOfShares = numberOfShares.replace("bn", 0);
                    numberOfShares = numberOfShares.replace("m", "");
                    search[index].numberOfShares = numberOfShares;

                    console.log(search[index].tickerSymbol);

                    console.log(numberOfShares);


                    eps = bigblob.substring(bigblob.indexOf("EPS ") + 52, bigblob.indexOf("EPS ") + 68);
                    eps = eps.substring(0, eps.indexOf("<"));
                    eps = eps.replace(" ", "");

                    search[index].eps = eps;
                  //  console.log(eps);

                    peRatio = bigblob.substring(bigblob.indexOf("P/E ") + 52, bigblob.indexOf("P/E ") + 66);
                    peRatio = peRatio.substring(0, peRatio.indexOf("<"));
                    if (peRatio == "--") {
                        peRatio = "0";
                    }
                    search[index].peRatio = peRatio;
                   // console.log(peRatio);

                    if (bigblob.indexOf("Annual div yield ") < 0) {
                        dividend = 0;
                    } else {
                        dividend = bigblob.substring(bigblob.indexOf("Annual div yield ") + 65, bigblob.indexOf("Annual div yield ") + 80);
                        dividend = dividend.substring(0, dividend.indexOf("<"));
                        dividend = dividend.replace("%", "");
                        if (dividend == "--") {
                            dividend = "0";
                        }
                        search[index].dividend = dividend;
                     //   console.log(dividend);

                        var myI = "";

                        searchString = "<td>";
                        occurrence = 1;
                        console.log("ticker before go in " + search[index].tickerSymbol);
                        var diviDate = GFG_Fun(search[index].tickerSymbol, specialData, searchString, occurrence);
                        if (diviDate != "") {
                            console.log("MY DIVIDEND DATE " + diviDate);
                            search[index].exDividend = diviDate;
                        }

                        if (bigblob.indexOf("<th>Div ex-date</th><td><span class=") < 0 && bigblob.indexOf("<th>Next div ex-date</th><td><span class=") < 0) {

                          //  search[index].exDividend = "2024-01-01";
                        } else {



                            if (bigblob.indexOf("<th>Next div ex-date</th><td><span class=") >= 0) {
                                exDividend = bigblob.substring(bigblob.indexOf("<th>Next div ex-date</th><td><span class=") + 50, bigblob.indexOf("<th>Next div ex-date</th><td><span class=") + 61);
                                //  console.log(exDividend + " " + exDividend.substring(0, 3) + " NEXT " + exDividend.substring(4, 6) + " NEXT " + exDividend.substring(7, 12));

                                const mths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                                var arrayLength = mths.length;
                                for (var i = 0; i < arrayLength; i++) {

                                    if (mths[i] == exDividend.substring(0, 3)) {
                                        if ((i + 1) < 10) {
                                            exDividend = exDividend.substring(7, 12) + "-0" + (i + 1) + "-" + exDividend.substring(4, 6);
                                        } else {
                                            exDividend = exDividend.substring(7, 12) + "-" + (i + 1) + "-" + exDividend.substring(4, 6);
                                        }
                                        //  console.log(exDividend);
                                    }
         
                                }
                            } else {

                                exDividend = bigblob.substring(bigblob.indexOf("<th>Div ex-date</th><td><span class=") + 45, bigblob.indexOf("<th>Div ex-date</th><td><span class=") + 56);
                                //  console.log(exDividend + " " + exDividend.substring(0, 3) + " NEXT " + exDividend.substring(4, 6) + " NEXT " + exDividend.substring(7, 12));


                                const mths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                                var arrayLength = mths.length;
                                for (var i = 0; i < arrayLength; i++) {

                                    if (mths[i] == exDividend.substring(0, 3)) {
                                        if ((i + 1) < 10) {
                                            exDividend = exDividend.substring(7, 12) + "-0" + (i + 1) + "-" + exDividend.substring(4, 6);
                                        } else {
                                            exDividend = exDividend.substring(7, 12) + "-" + (i + 1) + "-" + exDividend.substring(4, 6);
                                        }
                                        //  console.log(exDividend);
                                    }

                                }

                            }

                            search[index].exDividend = exDividend;


                        }


                     //   console.log("ticker " + ticker2);

                        const jsonString = JSON.stringify(search);

                        fs.writeFile(fileToReadWrite, jsonString, err => {
                            if (err) {
                                console.log('Error writing file', err)
                            }
                        })
                    }


                });


        } catch (error) {
            console.log("failing ticker: " + search[index].tickerSymbol);
            console.log(error);
            if (saveTicker == search[index].tickerSymbol) {
                maxNum = maxNum + 1;
            } else {
                maxNum = 0;
                saveTicker = search[index].tickerSymbol;
            }
            if (maxNum < 3) {
                console.log("maxNum " + maxNum);
                index = index - 1;
            } else {
                console.log("Failed maxNum " + maxNum);
                search[index].exDividend = "-";
                search[index].dividend = "0";
                search[index].peRatio = "0";
                search[index].numberOfShares = "0";
            }


            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(
                obj
            ));
            console.log(error);

        }
    }
    

    console.log("do we get here");

    var obj = { "currentnews": "error" };
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(
        obj
    ));

});

    
           
//     });






// Function to get index of occurrence
function getPos(str, subStr, i) {
    //     return str.split(subStr, i).join(subStr).length;

    var fred = str.split(subStr, i).join(subStr).length;
    //   console.log(fred);
    // console.log( str.substring(fred + 4, fred + 8));
    return fred;
    // return str.substring(fred+15, fred+21);
}


function GFG_Fun(ticker, specialData, searchString, occurrence) {
    var DDD = "";
    let data2 = specialData;

    var john = 0;
    var testEoF = true;

    while (testEoF) {

        john = getPos(
            data2,
            searchString,
            occurrence
        );


        let localTicker = data2.substring(john + 4, john + 8);
        localTicker = localTicker.replace("<", "");
        // console.log("!"+localTicker+"!   ticker "+ticker);
        if (ticker == localTicker) {
            console.log("ticker " + ticker);

            john = getPos(
                data2,
                "<td class=",
                6
            );

            const mths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            var arrayLength = mths.length;

            for (var i = 0; i < arrayLength; i++) {

                //console.log(data2.substring(john + 15, john + 21).substring(3, data2.substring(john + 15, john + 21).length));

                if (mths[i] == data2.substring(john + 15, john + 21).substring(3, data2.substring(john + 15, john + 21).length)) {
                    if ((i + 1) < 10) {
                        DDD = "2024" + "-0" + (i + 1) + "-" + data2.substring(john + 15, john + 21).substring(0, 2);
                        break;
                    } else {
                        DDD = "2024" + "-" + (i + 1) + "-" + data2.substring(john + 15, john + 21).substring(0, 2);
                        break;
                    }
                    //  console.log(exDividend);
                }

            }

            console.log(DDD);

            testEoF = false;
            break;
        } else {
            if (john + 8 >= data2.length) {
                DDD = "";
                testEoF = false;
                //  console.log("end of file");
                break;
            } else {
                data2 = data2.substring(john + 8, data2.length);
                occurrence = 3;
                // testEoF = false;
                //  break
            }
        }


    }
    return DDD;

}


/*

const puppeteer = require('puppeteer');
//const puppeteer = "";

var myJsonString = "";



router.get('/:name', (req, res) => {

    
    console.log("In correct file ");
    var rawdata = "";
    var search = "";
    var fileToReadWrite = "";
    var maxNum = parseInt("0");
    var saveTicker = "";

    var fileName = req.params.name;

   
    (async () => {


            const proxyServer = '192.168.0.4:3000';

       
            console.log("in async");
        const browser = await puppeteer.launch({
            headless: false 
         //   args: [`--proxy-server=${proxyServer}`]
        });
     //   const browser = await puppeteer.launch();
            const page = await browser.newPage();

        var fileName = req.params.name;
            console.log("john " + req.params.name);

            fileToReadWrite = "files/"+fileName+".json";
            rawdata = fs.readFileSync(fileToReadWrite);
        search = JSON.parse(rawdata);
    //    search = [{ "tickerSymbol": "BA." }, { "tickerSymbol": "IAG" }];
        var ticker2 = "";
            for (let index = 0; index < search.length; ++index) {
                try {
                    var technical = new Object();
                    console.log(search[index].tickerSymbol);
                    technical.ticker = search[index].tickerSymbol;
                    ticker2 = technical.ticker;
                    if (ticker2.endsWith(".")) {
                        ticker2 = ticker2.replace(".", "");
                    }
                    var peRatio = "";
                    var dividend = "";
                    var exDividend = "";

                    var eps = "";
                    var numberOfShares = "";
                    //
                    // ALTERNATIVE SOURCE: https://markets.ft.com/data/equities/tearsheet/summary?s=trd:lse
                    //
                    await page.goto("https://www.wsj.com/market-data/quotes/uk/xlon/"+ticker2);

                    await page.waitForTimeout(1000);

                //                         /html/body / div[1] / div / div / div / div[3] / div / div / div[2] / div / div[1] / div[1] / div[2] / div / div[2] / div[1] / ul / li[1] / div / span
                
                    let t1 = await page.$x('//html/body / div[1] / div / div / div / div[3] / div / div / div[2] / div / div[1] / div[2] / div / div[2] / div[1] / ul / li[1] ');
                    if (typeof t1 === 'object') {
                      //  console.log(JSON.stringify(t1));
                        peRatio = await page.evaluate(el => el.textContent, t1[0]);
                   //     console.log(peRatio);
                        if (peRatio.includes("N/A")) {
                            peRatio = "0";
                        } else {
                            peRatio = peRatio.substring(peRatio.indexOf("TTM)") + 4, peRatio.length);
                            peRatio = peRatio.substring(0, peRatio.indexOf("("));

                        }
                        search[index].peRatio = peRatio;
                      // console.log("peRatio " + peRatio);
                    }                        //html/body / div[1] / div / div / div / div[3] / div / div / div[2] / div / div[1] / div[2] / div / div[2] / div[1] / ul / li[1]
                    let t2 = await page.$x('//html/body / div[1] / div / div / div / div[3] / div / div / div[2] / div / div[1] / div[2] / div / div[2] / div[1] / ul / li[6] ');
                    if (typeof t2 === 'object') {
                        dividend = await page.evaluate(el => el.textContent, t2[0]);
                        if (dividend.includes("not currently paying")) {
                            dividend = "0";
                        } else {
                            dividend = dividend.substring(dividend.indexOf("is Yield") + 6, dividend.length);
                            dividend = dividend.substring(0, dividend.indexOf("%"));
                        }
                        if (dividend < 0.1 && dividend != 0) {
                            dividend = dividend * 100;
                        }
                        if (dividend == 7.000000000000001) {
                            dividend = "7.00";
                        }
                        search[index].dividend = dividend;
                //        console.log("dividend is " + dividend);
                    }
                    // 08/12/21  2022-12-08
                    let t3 = await page.$x('//html/body / div[1] / div / div / div / div[3] / div / div / div[2] / div / div[1] / div[2] / div / div[2] / div[1] / ul / li[8] ');
                                 //            /html/body / div[1] / div / div / div / div[2] / div / div / div[2] / div / div[1] / div[1] / div[2] / div / div[2] / div[1] / ul / li[8]
                    if (typeof t3 === 'object') {
                        exDividend = await page.evaluate(el => el.textContent, t3[0]);
                    //    console.log("exdiv: " + exDividend);
                        if (exDividend.includes("N/A")) {
                            exDividend = "-";
                        } else {
                            exDividend = "20" + exDividend.substring(22, 25) + "-" + exDividend.substring(16, 18) + "-" + exDividend.substring(19, 21);
                        }
                        search[index].exDividend = exDividend;
                 //      console.log("exDividend is " + exDividend);
                    }

                    let t4 = await page.$x('//html/body / div[1] / div / div / div / div[3] / div / div / div[2] / div / div[1] / div[2] / div / div[2] / div[1] / ul / li[2]');
                    if (typeof t4 === 'object') {
                        eps = await page.evaluate(el => el.textContent, t4[0]);
                        eps = eps.replace("EPS (TTM)", "");
  
                        if (eps.includes("N/A")) {
                            eps = "0";
                        } else {
                            if (eps.length > 1) {
                                eps = eps.substring(1, eps.length);
                            }
                        }
                        search[index].eps = eps;
                 //       console.log("eps is " + eps + " length: "+eps.length);
                    }

                    let t5 = await page.$x('//html/body / div[1] / div / div / div / div[3] / div / div / div[2] / div / div[1] / div[2] / div / div[2] / div[1] / ul / li[4]');
                    if (typeof t5 === 'object') {
                        numberOfShares = await page.evaluate(el => el.textContent, t5[0]);
                        numberOfShares = numberOfShares.replace("Shares Outstanding", "");

                        if (numberOfShares.includes(" M")) {
                            numberOfShares = numberOfShares.replace(" M","");
                        } else {
                            if (numberOfShares.includes(" B")) {
                                numberOfShares = numberOfShares.replace(" B", "0").replace("\.", "");;
                            } else {
                                let t6 = await page.$x('//html/body / div[1] / div / div / div / div[3] / div / div / div[2] / div / div[1] / div[2] / div / div[2] / div[1]/ ul / li[5]');
                                if (typeof t6 === 'object') {
                                    numberOfShares = await page.evaluate(el => el.textContent, t6[0]);
                                    numberOfShares = numberOfShares.replace("Public Float", "");

                                    if (numberOfShares.includes(" M")) {
                                        numberOfShares = numberOfShares.replace(" M", "");
                                    } else {
                                        if (numberOfShares.includes(" B")) {
                                            numberOfShares = numberOfShares.replace(" B", "0").replace("\.","");
                                        }
                                    }
                                }
                            }
                        }
                        search[index].numberOfShares = numberOfShares;
                    //    console.log("numberOfShares is " + numberOfShares + " length: " + numberOfShares.length);
                    }

                } catch (error) {
                    console.log("failing ticker: " + search[index].tickerSymbol);
                    console.log(error);
                    if (saveTicker == search[index].tickerSymbol) {
                        maxNum = maxNum + 1;
                    } else {
                        maxNum = 0;
                        saveTicker = search[index].tickerSymbol;
                    }
                    if (maxNum < 3) {
                        console.log("maxNum " + maxNum);
                        index = index - 1;
                    } else {
                        console.log("Failed maxNum " + maxNum);
                        search[index].exDividend = "-";
                        search[index].dividend = "0";
                        search[index].peRatio = "0";
                        search[index].numberOfShares = "0";
                    }
               
                }
            }

        const jsonString = JSON.stringify(search);
            
        fs.writeFile(fileToReadWrite, jsonString, err => {
                if (err) {
                    console.log('Error writing file', err)
                }
            })
    

           await browser.close();
        })();

                var tempLine = "carrort";
                var obj = { "percentUp": tempLine };
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(
                    obj
                ))
            
    });
    */
module.exports = router;

function roundToTwo(num) {
    return +(Math.round(num + "e+2") + "e-2");
}
