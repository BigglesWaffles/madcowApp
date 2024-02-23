'use strict';
var express = require('express');
var router = express.Router();
var app = express();
var path = require('path');
const fs = require('fs');


const puppeteer = require('puppeteer');
 //const puppeteer = "";



router.get('/', (req, res) => {

    
    console.log("In correct file ");
    var rawdata = "";
    var search = "";
    var fileToReadWrite = "";

    var technicals = [];
   
    (async () => {


        fs.unlink("files/technicals.json", function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log("Successfully deleted the file.")
            }
        });
        console.log("in async");
        // const browser = await puppeteer.launch
        const browser = await puppeteer.launch({
            headless: false,
            args: [
                '--start-maximized',
            ],
            defaultViewport: null,
        });



        const page = await browser.newPage();

        fileToReadWrite = "files/tickers";
        rawdata = fs.readFileSync(fileToReadWrite);
        search = JSON.parse(rawdata);

        for (let index = 0; index < search.length; ++index) {
            try {
                var technical = new Object();
                console.log(search[index].ticker);
                technical.ticker = search[index].ticker;
               
                let summary_text = "Neutral";
               
                let summary_value = 0;
         


                try {
              
                    await page.goto('https://www.tradingview.com/symbols/LSE-' + technical.ticker + '/technicals');
                 
                    let ele = await page.$x('//html/body/div[3]/div[4]/div[2]/div[2]/div/section/div/div[2]/div/div/button[9]');
                    await ele[0].click();
                    console.log('before waiting');
                    await delay(1000);
                    console.log('after waiting');

                    let t3a = await page.$x('//html/body/div[3]/div[4]/div[2]/div[2]/div/section/div/div[4]/div[2]/div[2]/div[1]/span[2]');
                    let sell = await page.evaluate(el => el.textContent, t3a[0]);

                    let t3b = await page.$x('//html/body/div[3]/div[4]/div[2]/div[2]/div/section/div/div[4]/div[2]/div[2]/div[3]/span[2]');
                    let buy = await page.evaluate(el => el.textContent, t3b[0]);

                    buy = parseInt(buy);
                    sell = parseInt(sell);

                    if (buy > sell) {
                        summary_text = "Buy";
                    }
                    if (buy < sell) {
                        summary_text = "Sell";
                    }
                    console.log(technical.ticker + " buy " + buy + " sell " + sell);
                    summary_value = buy - sell;




                } catch {
                    technical.momentum = 0;
                }



                    technical.summaryText_w = summary_text;
                    technical.summary_w = summary_value;
                    technicals.push(technical);
                  //  break;
                    console.log(technical.ticker + " " + technical.summaryText_w );
                 //   break;
                } catch (error) {
                    console.log("failing ticker: " + search[index].ticker);
                    console.log(error);
                }
            }

            const jsonString = JSON.stringify(technicals);
            
            fs.writeFile("files/technicals.json", jsonString, err => {
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

function delay(time) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time)
    });
}

    module.exports = router;
