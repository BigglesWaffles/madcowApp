'use strict';
var express = require('express');
var router = express.Router();
var app = express();
var path = require('path');
const fs = require('fs');


const puppeteer = require('puppeteer');


var myJsonString = "";



router.get('/', (req, res) => {

    
    console.log("In correct file ");
    var rawdata = "";
    var search = "";
    var fileToReadWrite = "";

    
    (async () => {


        console.log("in async");
      //  const browser = await puppeteer.launch();
        const browser = await puppeteer.launch({
            headless: false
        });

    //    await page.setDefaultNavigationTimeout(10000);
   //     await page.setDefaultTimeout(19000);

        const page = await browser.newPage();

        fileToReadWrite = "files/ftseaim.json";
        rawdata = fs.readFileSync(fileToReadWrite);
        search = JSON.parse(rawdata);
     //     search = [{ "tickerSymbol": "TRD", "marketCapitalisation": 100000 }, { "tickerSymbol": "SHOE", "marketCapitalisation": 100000 }];

    //    search.unshift({ "tickerSymbol": "XXX", "marketCapitalisation": 100000 });
        var switch1 = false;
        var maxNum = 0;
        var savedTicker = "";

        for (let index = 0; index < search.length; ++index) {
            try {

                var ticker2 = search[index].tickerSymbol;

                if (ticker2.endsWith(".")) {
                    ticker2 = ticker2.replace(".", "");
                }
                if (ticker2.endsWith(".A")) {
                    ticker2 = ticker2.replace(".A", "A");
                }

                console.log("current ticker: " + ticker2);

          //      await page.goto('url' + tableCell04Val, { waitUntil: 'load', timeout: 0 });

                await page.goto("https://www.wsj.com/market-data/quotes/UK/" + ticker2 + "/financials/annual/income-statement");

                await page.goto("https://www.wsj.com/market-data/quotes/UK/" + ticker2 + "/financials/annual/balance-sheet");

              //  await page.waitForTimeout(4000);


            ///    /html/body / div[2] / section[2] / div / div[2] / div / span  ===== NO DATA FOUND
        
             
                 await page.waitForSelector('#cr_cashflow > div.expanded > div.cr_cashflow_table > table > thead > tr > th.fiscalYr');



                let t1 = await page.$x('//html/body/div[2]/section[2]/div/div[2]/div/div[2]/div[2]/table/thead/tr/th[1]');
                let millionsOrThousands = await page.evaluate(el => el.textContent, t1[0]);

                if (millionsOrThousands.includes("Thousands")) {
                    millionsOrThousands = 1000;
                } else {
                    millionsOrThousands = 1;
                }

                var t3 = await page.$x("//html/body/div[2]/section[2]/div/div[2]/div/div[2]/div[2]/table/tbody/tr[not(@class='hide')]");

                const data = await page.evaluate(() => {

                    const tds = Array.from(document.querySelectorAll('#cr_cashflow > div.expanded > div.cr_cashflow_table > table > tbody > tr > td'))
                    return tds.map(td => td.innerText)
                });

                var totalAssets = "0";
                var currentCash = "0";
                var totalCurrentAssets = "0";
                var totalCurrentAssets = "0";
                var intangibleAssets = "0";
                var totalLiabilities = "0";
                var navPercentIt = "0";
                var navPercent = "0";
                var netNet = 0;
                var nvv = "0"; /* nav */

                for (let i = 0; i < data.length; i++) {
             /*       if (data[i] == "Total Assets") {
                        totalAssets = data[i + 1].replace(/,/g, "");
                        if (totalAssets == "-") {
                            totalAssets = "0";
                        }
                        if (totalAssets != "0") {
                            totalAssets = (totalAssets / millionsOrThousands).toFixed(2);
                        }
                    }
                    if (data[i] == "Cash & Short Term Investments" || data[i] == "Total Cash & Due from Banks" ||
                        data[i] == "Cash Only") {
                        currentCash = data[i + 1].replace(/,/g, "");
                        if (currentCash == "-") {
                            currentCash = "0";
                        }
                        if (currentCash != "0") {
                            currentCash = (currentCash / millionsOrThousands).toFixed(2);
                        }
                    }
                    if (data[i] == "Total Current Assets") {
                        totalCurrentAssets = data[i + 1].replace(/,/g, "");
                        if (totalCurrentAssets == "-") {
                            totalCurrentAssets = "0";
                        }
                        if (totalCurrentAssets != "0") {
                            totalCurrentAssets = (totalCurrentAssets / millionsOrThousands).toFixed(2);
                        }
                    }*/
                    if (data[i] == "Intangible Assets") {
                        intangibleAssets = data[i + 1].replace(/,/g, "");
                        if (intangibleAssets == "-") {
                            intangibleAssets = "0";
                        }
                        if (intangibleAssets != "0") {
                            intangibleAssets = (intangibleAssets / millionsOrThousands).toFixed(2);
                        }
                    }

                }

               console.log("intangible values " +  intangibleAssets);

         /*       const data2 = await page.evaluate(() => {

                    const tds = Array.from(document.querySelectorAll('#cr_cashflow > div.collapsed > div.cr_cashflow_table > table > tbody > tr > td'))
                    return tds.map(td => td.innerText)
                });*/

/*
                for (let i = 0; i < data2.length; i++) {
                    if (data2[i] == "Total Liabilities") {
                        totalLiabilities = data2[i + 1].replace(/,/g, "");
                        if (totalLiabilities == "-") {
                            totalLiabilities = "0";
                        }
                        if (totalLiabilities != "0") {
                            totalLiabilities = (totalLiabilities / millionsOrThousands).toFixed(2);
                        }
                        break;
                    }
                }
                */

             /*   console.log("totalLiabilities " + totalLiabilities);

                nvv = (totalAssets - totalLiabilities).toFixed(2);*/

                if (search[index].totalAssets != 0 && search[index].totalLiabilities != 0 && search[index].marketCapitalisation != 0) {
                //    navPercent = ((totalAssets - totalLiabilities) / search[index].marketCapitalisation).toFixed(2);
                    navPercentIt = ((search[index].totalAssets - search[index].totalLiabilities - intangibleAssets) / search[index].marketCapitalisation).toFixed(2);
                }

            /*    if (totalCurrentAssets != 0 && search[index].marketCapitalisation != 0) {
                    netNet = ((totalCurrentAssets - totalLiabilities) / search[index].marketCapitalisation).toFixed(2);
                }
                */

            //    search[index].navPercent = roundToTwo(navPercent);
                search[index].navPercentIt = roundToTwo(navPercentIt);
            //    search[index].nvv = roundToTwo(nvv);
             //   search[index].netNet = roundToTwo(netNet);
                search[index].intangibleAssets = roundToTwo(intangibleAssets);
            //   search[index].totalCurrentAssets = roundToTwo(totalCurrentAssets);
            //    search[index].cash = roundToTwo(currentCash);
             //   search[index].totalAssets = roundToTwo(totalAssets);
             //   search[index].totalLiabilities = roundToTwo(totalLiabilities);


    
            } catch (e) {
                switch1 = true;
                if (savedTicker != search[index].tickerSymbol) {
                    savedTicker = search[index].tickerSymbol
                    maxNum = 0;
                } 
                maxNum = maxNum + 1;
                if (maxNum < 3) {
                    index = index - 1;
                }
                console.log(e);
               // await browser.close();
            }
        }

        await browser.close();

        
        const jsonString = JSON.stringify(search);

        fs.writeFile(fileToReadWrite, jsonString, err => {
            if (err) {
                console.log('Error writing file', err)
            }
        });
        

        })();
    console.log("end of job");
                var tempLine = "carrort";
                var obj = { "percentUp": tempLine };
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(
                    obj
                ))
            
});

function roundToTwo(num) {
    return +(Math.round(num + "e+2") + "e-2");
}

    module.exports = router;
