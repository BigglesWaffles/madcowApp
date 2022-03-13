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
            const browser = await puppeteer.launch();
            const page = await browser.newPage();

            fileToReadWrite = "files/tickers";
            rawdata = fs.readFileSync(fileToReadWrite);
            search = JSON.parse(rawdata);

            for (let index = 0; index < search.length; ++index) {
                try {
                     var technical = new Object();
                    console.log(search[index].ticker);
                    technical.ticker = search[index].ticker;
                    await page.goto('https://www.tradingview.com/symbols/LSE-' + technical.ticker+'/technicals');
                    let t3 = await page.$x('//html/body/div[2]/div[4]/div[3]/div/div/div/div/div/div/div[2]/div/div[2]/div/div/div[2]/div[2]/span[2]');
                    let summary = await page.evaluate(el => el.textContent, t3[0]);
                   

                    let t4 = await page.$x('//html/body/div[2]/div[4]/div[3]/div/div/div/div/div/div/div[2]/div/div[2]/div/div/div[3]/div[1]/div[2]/table/tbody/tr[2]/td[2]');
                    let rsi_value = await page.evaluate(el => el.textContent, t4[0]);
                    let t5 = await page.$x('//html/body/div[2]/div[4]/div[3]/div/div/div/div/div/div/div[2]/div/div[2]/div/div/div[3]/div[1]/div[2]/table/tbody/tr[2]/td[3]');
                    let rsi_text = await page.evaluate(el => el.textContent, t5[0]);


                    let t6 = await page.$x('//html/body/div[2]/div[4]/div[3]/div/div/div/div/div/div/div[2]/div/div[2]/div/div/div[3]/div[1]/div[2]/table/tbody/tr[7]/td[2]');
                    let momentum_value = await page.evaluate(el => el.textContent, t6[0]);
                    let t7 = await page.$x('/html/body/div[2]/div[4]/div[3]/div/div/div/div/div/div/div[2]/div/div[2]/div/div/div[3]/div[1]/div[2]/table/tbody/tr[7]/td[3]');
                    let momentum_text = await page.evaluate(el => el.textContent, t7[0]);


                    let t8 = await page.$x('//html/body/div[2]/div[4]/div[3]/div/div/div/div/div/div/div[2]/div/div[2]/div/div/div[3]/div[1]/div[2]/table/tbody/tr[8]/td[2]');
                    let macd_value = await page.evaluate(el => el.textContent, t8[0]);
                    let t9 = await page.$x('/html/body/div[2]/div[4]/div[3]/div/div/div/div/div/div/div[2]/div/div[2]/div/div/div[3]/div[1]/div[2]/table/tbody/tr[8]/td[3]');
                    let macd_text = await page.evaluate(el => el.textContent, t9[0]);

                    let t10 = await page.$x('//html/body/div[2]/div[4]/div[3]/div/div/div/div/div/div/div[2]/div/div[2]/div/div/div[3]/div[2]/div[2]/table/tbody/tr[14]/td[2]');
                    let ichimoku_value = await page.evaluate(el => el.textContent, t10[0]);
                    let t11 = await page.$x('//html/body/div[2]/div[4]/div[3]/div/div/div/div/div/div/div[2]/div/div[2]/div/div/div[3]/div[2]/div[2]/table/tbody/tr[14]/td[3]');
                    let ichimoku_text = await page.evaluate(el => el.textContent, t11[0]);

                    let t12 = await page.$x('//html/body/div[2]/div[4]/div[3]/div/div/div/div/div/div/div[2]/div/div[2]/div/div/div[3]/div[1]/div[2]/table/tbody/tr[3]/td[2]');
                    let stochastic_value = await page.evaluate(el => el.textContent, t12[0]);
                    let t13 = await page.$x('//html/body/div[2]/div[4]/div[3]/div/div/div/div/div/div/div[2]/div/div[2]/div/div/div[3]/div[1]/div[2]/table/tbody/tr[3]/td[3]');
                    let stochastic_text = await page.evaluate(el => el.textContent, t13[0]);


                    technical.ichimoku = ichimoku_value;
                    technical.ichimokuText = ichimoku_text

                   
                    technical.stochasticText = stochastic_text;
                    technical.stochastic = stochastic_value;

                    technical.momentum = momentum_value;
                    technical.momentumText = momentum_text;
                    technical.rsi = rsi_value;
                    technical.rsiText = rsi_text;
                    technical.macd = macd_value;
                    technical.macdText = macd_text;
                    technical.summary = summary;
                    technicals.push(technical);
                  //  break;
                    console.log(technical.ticker + " " + technical.summary + " " + technical.rsi + " " + technical.rsiText + " " + technical.momentum + " " + technical.momentumText + " " + technical.macd + " " + technical.macdText + " " + technical.ichimoku+ " " + technical.ichimokuText);
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

    module.exports = router;
