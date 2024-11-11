'use strict';
var express = require('express');
var router = express.Router();
var app = express();
var path = require('path');
const fs = require('fs');


const puppeteer = require('puppeteer');
 //const puppeteer = "";


var myJsonString = "";



    router.get('/:name', (req, res) => {

    
    console.log("In correct file ");
    var rawdata = "";
    var search = "";
        var fileToReadWrite = "";


        var fileName = req.params.name;
        console.log("john " + req.params.name);

        fileToReadWrite = "files/" + fileName + ".json";
        rawdata = fs.readFileSync(fileToReadWrite);
        search = JSON.parse(rawdata);
        var search2 = search;
        var searchString = "";
        var specialData = "";
        var occurrence = "";


   
    (async () => {


     
            console.log("in async");
       // const browser = await puppeteer.launch
        const browser = await puppeteer.launch({
            headless: false
        });


            const page = await browser.newPage();

            for (let index = 0; index < search.length; ++index) {
                try {


                 //   console.log(search[index].tickerSymbol);
              /*      
                    if (search[index].tickerSymbol != 'WTB' && search[index].tickerSymbol !="GSK") {
                        continue;
                    }
                    */
               //     console.log("ticker " + search[index].tickerSymbol);

                    var urlFirstPart = search[index].investingName;
                    var urlSecondPart = "";

                    if (typeof (search[index].investingNameEnd) != "undefined") {
                        console.log("SHOULD NOT BE DOWN HERE");
                        urlSecondPart = search[index].investingNameEnd;
                    }

              //      if (search[index].tickerSymbol != "UU.") {
              //          continue;
              //      }

                    console.log(search[index].tickerSymbol);


                    var day5 = 0;
                    var day2 = 0;
                    var day3 = 0;
                    var day10 = 0;
                    var day21 = 0;
                    var dayCount = 0;
                    var totalCount = 0;
                    var pos = false;


                    console.log('https://uk.investing.com/equities/' + urlFirstPart +'-historical-data'+ urlSecondPart);

                    await page.goto('https://uk.investing.com/equities/' + urlFirstPart + '-historical-data' + urlSecondPart);


        




               //     const frame = await elementHandle.contentFrame();


                //    let bodyHTML = await page.evaluate(() => document.documentElement.outerHTML);

                   // console.log(bodyHTML);

                    for (let j = 1; j <= 20; ++j) {
                    //    console.log('//html/body/div[1]/div[2]/div[2]/div[2]/div[1]/div[2]/div[3]/table/tbody/tr['+j+']/td[7]');
                     //   let t3 = await page.$x('//html/body/div[1]/div[2]/div[2]/div[2]/div[1]/div[2]/div[3]/table/tbody/tr[' + j + ']/td[7]');

                        let t3 = await page.$x('//html/body/div[1]/div[2]/div[2]/div[2]/div[1]/div[2]/div[3]/table/tbody/tr['+j+']/td[7]');
                        let summary = await page.evaluate(el => el.textContent, t3[0]);
                   //     console.log(summary);

                        if (summary.indexOf("-")==0 ) {
                            pos = true;
                            console.log("found a negative");
                        } else {
                            console.log("not negative " + summary);

                            totalCount = totalCount + 1;
                        }
                        if (!pos) {
                            console.log("not negative (A) " + summary);
                            dayCount = dayCount + 1;
                        }
                    }

                    day21 = totalCount;
                    if (dayCount < 6) {
                        day5 = dayCount;
                    }
                    if (dayCount < 3) {
                        day2 = dayCount;
                    }
                    if (dayCount < 4) {
                        day3 = dayCount;
                    }
                    if (dayCount < 11) {
                        day10 = dayCount;
                    }
                    
                    console.log("day21 " + day21 + " day5 " + day5);

                    search[index].day5 = day5;
                    search[index].day21 = day21;
                    search[index].day2 = day2;
                    search[index].day3 = day3;
                    search[index].day10 = day10;

                 //   break;
                } catch (error) {
                    console.log("failing ticker: " + search[index].tickerSymbol);
                    console.log(error);
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
