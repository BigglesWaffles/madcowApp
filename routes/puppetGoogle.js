'use strict';
var express = require('express');
var router = express.Router();
var app = express();
var path = require('path');
const fs = require('fs');


//const puppeteer = require('puppeteer');
const puppeteer = "";

var myJsonString = "";



router.get('/', (req, res) => {

    
    console.log("In correct file ");
    var rawdata = "";
    var search = "";
    var fileToReadWrite = "";
    var maxNum = parseInt("0");
    var saveTicker = "";

    var technicals = [];
   
    (async () => {

       
            console.log("in async");
        const browser = await puppeteer.launch({
           headless: false
        });
     //   const browser = await puppeteer.launch();
            const page = await browser.newPage();

            fileToReadWrite = "files/ftserst.json";
            rawdata = fs.readFileSync(fileToReadWrite);
        search = JSON.parse(rawdata);
        search = [{ "tickerSymbol": "SHOE" }, { "tickerSymbol": "TRD" }, { "tickerSymbol": "BT.A" }, { "tickerSymbol": "ADV" }];
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

                    await page.goto("https://www.wsj.com/market-data/quotes/uk/"+ticker2);

                    await page.waitForTimeout(1000);

                    let t1 = await page.$x('//html/body / div[1] / div / div / div / div[2] / div / div / div[2] / div[1] / div[2] / div / div[2] / div[1] / ul / li[1] ');
                    if (typeof t1 === 'object') {

                        peRatio = await page.evaluate(el => el.textContent, t1[0]);
                        if (peRatio.includes("N/A")) {
                            peRatio = "0";
                        } else {
                            peRatio = peRatio.substring(peRatio.indexOf("TTM)") + 4, peRatio.length);
                            peRatio = peRatio.substring(0, peRatio.indexOf("("));

                        }
                        search[index].peRatio = peRatio;
                        console.log("peRatio " + peRatio);
                    }
                    let t2 = await page.$x('//html/body / div[1] / div / div / div / div[2] / div / div / div[2] / div[1] / div[2] / div / div[2] / div[1] / ul / li[6] ');
                    if (typeof t2 === 'object') {
                        dividend = await page.evaluate(el => el.textContent, t2[0]);
                        if (dividend.includes("not currently paying")) {
                            dividend = "0";
                        } else {
                            dividend = dividend.substring(dividend.indexOf("is Yield") + 6, dividend.length);
                            dividend = dividend.substring(0, dividend.indexOf("%"));
                        }
                        search[index].dividend = dividend;
                        console.log("dividend is " + dividend);
                    }
                    // 08/12/21  2022-12-08
                    let t3 = await page.$x('//html/body / div[1] / div / div / div / div[2] / div / div / div[2] / div[1] / div[2] / div / div[2] / div[1] / ul / li[8] ');
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
                        console.log("exDividend is " + exDividend);
                    }

                    let t4 = await page.$x('//html/body / div[1] / div / div / div / div[2] / div / div / div[2] / div[1] / div[2] / div / div[2] / div[1] / ul / li[2]');
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
                        console.log("eps is " + eps + " length: "+eps.length);
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

    module.exports = router;
