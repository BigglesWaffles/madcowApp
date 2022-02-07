'use strict';
var express = require('express');
var router = express.Router();
var app = express();
var path = require('path');
const fs = require('fs');

const axios = require('axios');

router.get('/', (req, res) => {


    console.log("In correct file ");

    var query = require('url').parse(req.url, true).query;


  //  console.log(query);
  //  console.log(query.x);
  //  console.log(query.y);
  //  console.log(query.z);

    let myInputIsin = query.x;
    let myFileName = query.y;
   // let myLength = query.z;

   
    var myFile = "files/"+myFileName+".json";
  

  /*  let endpoints = [];
    var rawdata = fs.readFileSync(myFile);
    var myFileParsed = JSON.parse(rawdata);
    console.log("number of tickers: " + myFileParsed.length);

    let toLength = 0;
    if (myLength == "length") {
        toLength = myFileParsed.length
    } else {
        toLength = parseInt(myLoopStart) + 50;
        console.log("to length: " + toLength);
    }
    
  //  endpoints.push('https://www.fidelity.co.uk/factsheet-data/factsheet/GB00B63H8491/financials');
 //   endpoints.push('https://www.fidelity.co.uk/factsheet-data/factsheet/NL0012650360/financials');
  //  endpoints.push('https://www.fidelity.co.uk/factsheet-data/factsheet/GB00BFZNLB60-/financials');
   
    for (let i = myLoopStart; i < toLength; i++) {
        if (myFileParsed[i].isin != "GB00BD8HBD32"
            && myInputIsin != "GB0002318888"
            && myInputIsin != "GG00B4ZPCJ00"
            && myInputIsin != "GB00BYQ46T41"
            && myInputIsin != "GB00B19Z2J52"
            && myInputIsin != "GB00BG49KP99"
            && myInputIsin != "GB00B1YW4409"
            && myInputIsin != "GB00BDVK7088"
            && myInputIsin != "GB00BD9PXH49"
            && myInputIsin != "GB00BWD24154"
            && myInputIsin != "GB00B13VDP26"
            && myInputIsin != "GG00BMZQ5R81"
            && myInputIsin != "GB00B012T521"
            && myInputIsin != "GB0000510205"
            && myInputIsin != "GG00B3Z62522"
            && myInputIsin != "JE00BDG12N48"
            && myInputIsin != "GG00B92LHN58"
            && myInputIsin != "GB00BNGMZB68"
            && myInputIsin != "GB00BJFLFT45"
            && myInputIsin != "JE00BF0D1M25"
            && myInputIsin != "GB00BYXVMJ03"
            && myInputIsin != "GB00BMBSCV12"
            && myInputIsin != "GB0006546898"
            && myInputIsin != "GB00BF01NH51"
            && myInputIsin != "JE00B248KJ21"
            && myInputIsin != "GB00BYSX1508"
            && myInputIsin != "GB00B0HW5366"
            && myInputIsin != "GG00BYV2ZQ34"
            && myInputIsin != "GB00BMDQ2T15"
            && myInputIsin != "GB00BY7R8K77"
            && myInputIsin != "GB00B01HM147"
            && myInputIsin != "GB00BF345X11"
            && myInputIsin != "GB00BP094P47"
            && myInputIsin != "GB00BF0P7H59"
            && myInputIsin != "GG00BZ3C3B94"
            && myInputIsin != "GB0033875286"
            && myInputIsin != "GB00BJGTLF51"
            && myInputIsin != "GB00BG382L74"
            && myInputIsin != "GB0008484718"
            && myInputIsin != "GB00BVG6X439"
            && myInputIsin != "IM00B986V543"
            && myInputIsin != "GB00BP4BSM10"
            && myInputIsin != "JE00B1NNWQ21"
            && myInputIsin != "GB00BLD3C518"
            && myInputIsin != "GB00BYWK1Q82"
            && myInputIsin != "GB00BP5X4Q29"
            && myInputIsin != "IM00B1G3MS12"
            && myInputIsin != "GB00BKKD0862"
            && myInputIsin != "GB00BD2NCM38"
            && myInputIsin != "GB00BNVVH568"
            && myInputIsin != "GB00BYV8MN78"
            && myInputIsin != "GB00BMBVGQ36"
        ) {
            endpoints.push('https://www.fidelity.co.uk/factsheet-data/factsheet/' + myFileParsed[i].isin + '-beazley-plc-uk/financials');
        }
    }
   
    
    // Return our response in the allData variable as an array




    Promise.all(endpoints.map((endpoint) =>
    */



    if (myInputIsin != "GB00BD8HBD32"
        && myInputIsin != "GB0002318888"
        && myInputIsin != "GG00B4ZPCJ00"
        && myInputIsin != "GB00BYQ46T41"
        && myInputIsin != "GB00B19Z2J52"
        && myInputIsin != "GB00BG49KP99"
        && myInputIsin != "GB00B1YW4409"
        && myInputIsin != "GB00BDVK7088"
        && myInputIsin != "GB00BD9PXH49"
        && myInputIsin != "GB00BWD24154"
        && myInputIsin != "GB00B13VDP26"
        && myInputIsin != "GG00BMZQ5R81"
        && myInputIsin != "GB00B012T521"
        && myInputIsin != "GB0000510205"
        && myInputIsin != "GG00B3Z62522"
        && myInputIsin != "JE00BDG12N48"
        && myInputIsin != "GG00B92LHN58"
        && myInputIsin != "GB00BNGMZB68"
        && myInputIsin != "GB00BJFLFT45"
        && myInputIsin != "JE00BF0D1M25"
        && myInputIsin != "GB00BYXVMJ03"
        && myInputIsin != "GB00BMBSCV12"
        && myInputIsin != "GB0006546898"
        && myInputIsin != "GB00BF01NH51"
        && myInputIsin != "JE00B248KJ21"
        && myInputIsin != "GB00BYSX1508"
        && myInputIsin != "GB00B0HW5366"
        && myInputIsin != "GG00BYV2ZQ34"
        && myInputIsin != "GB00BMDQ2T15"
        && myInputIsin != "GB00BY7R8K77"
        && myInputIsin != "GB00B01HM147"
        && myInputIsin != "GB00BF345X11"
        && myInputIsin != "GB00BP094P47"
        && myInputIsin != "GB00BF0P7H59"
        && myInputIsin != "GG00BZ3C3B94"
        && myInputIsin != "GB0033875286"
        && myInputIsin != "GB00BJGTLF51"
        && myInputIsin != "GB00BG382L74"
        && myInputIsin != "GB0008484718"
        && myInputIsin != "GB00BVG6X439"
        && myInputIsin != "IM00B986V543"
        && myInputIsin != "GB00BP4BSM10"
        && myInputIsin != "JE00B1NNWQ21"
        && myInputIsin != "GB00BLD3C518"
        && myInputIsin != "GB00BYWK1Q82"
        && myInputIsin != "GB00BP5X4Q29"
        && myInputIsin != "IM00B1G3MS12"
        && myInputIsin != "GB00BKKD0862"
        && myInputIsin != "GB00BD2NCM38"
        && myInputIsin != "GB00BNVVH568"
        && myInputIsin != "GB00BYV8MN78"
        && myInputIsin != "GB00BMBVGQ36") {
        axios.get('https://www.fidelity.co.uk/factsheet-data/factsheet/' + myInputIsin + '-beazley-plc-uk/financials')
            .then(response => {


                let myProfit = response.data;
                let myStart = myProfit.indexOf("application\/json") + 18;
                myProfit = myProfit.substring(myStart);
                myProfit = myProfit.substring(0, myProfit.indexOf("script>") - 2);
                //   console.log(myProfit);
                myProfit = JSON.parse(myProfit);

           //     console.log(myProfit.props.pageProps.initialState.fund
           //         .financials.yearData[0]);

                var revenue = "0";
                var totalAssets = "0";
                var totalCurrentAssets = "0";
                var totalLiabilities = "0";
                var navPercent = "0";
                var netNet = 0;
                var nvv = "0"; /* nav */

                revenue = myProfit.props.pageProps.initialState.fund
                    .financials.yearData[0].revenue;

                if (revenue != null && revenue != "" && revenue != 0) {
                    revenue = revenue / 1000000;
                    revenue = roundToTwo(revenue);
                }

                totalAssets = myProfit.props.pageProps.initialState.fund
                    .financials.yearData[0].totalAsset;

                if (totalAssets != null && totalAssets != "" && totalAssets != 0) {
                    totalAssets = totalAssets / 1000000;
                    totalAssets = roundToTwo(totalAssets);
                }

                totalCurrentAssets = myProfit.props.pageProps.initialState.fund
                    .financials.yearData[0].totalCurrentAsset;

                if (totalCurrentAssets != null && totalCurrentAssets != "" && totalCurrentAssets != 0) {
                    totalCurrentAssets = totalCurrentAssets / 1000000;
                    totalCurrentAssets = roundToTwo(totalCurrentAssets);
                }

                totalLiabilities = myProfit.props.pageProps.initialState.fund
                    .financials.yearData[0].totalAsset -
                    myProfit.props.pageProps.initialState.fund
                        .financials.yearData[0].totalEquity;

                if (totalLiabilities != null && totalLiabilities != "" && totalLiabilities != 0) {
                    totalLiabilities = totalLiabilities / 1000000;
                    totalLiabilities = roundToTwo(totalLiabilities);
                }

                nvv = myProfit.props.pageProps.initialState.fund
                    .financials.yearData[0].totalEquity;

                if (nvv != null && nvv != "" && nvv != 0) {
                    nvv = nvv / 1000000;
                    nvv = roundToTwo(nvv);
                }

                navPercent 

                let myFinalProfit = myProfit.props.pageProps.initialState.fund
                    .financials.yearData[0].netIncomeShareHolders;

                if (myFinalProfit != null && myFinalProfit != "" && myFinalProfit != 0) {
                    myFinalProfit = myFinalProfit / 1000000;
                    myFinalProfit = roundToTwo(myFinalProfit)



                    var rawdata = fs.readFileSync(myFile);
                    var myFileParsed = JSON.parse(rawdata);


                    for (let p = 0; p < myFileParsed.length; p++) {
                        if (myInputIsin == myFileParsed[p].isin) {

                            if (totalCurrentAssets != 0 && myFileParsed[p].marketCapitalisation != 0) {
                                netNet = ((totalCurrentAssets - totalLiabilities) / myFileParsed[p].marketCapitalisation).toFixed(2);
                            }

                            if (totalAssets != 0 && totalLiabilities != 0 && myFileParsed[p].marketCapitalisation != 0) {
                                navPercent = ((totalAssets - totalLiabilities) / myFileParsed[p].marketCapitalisation).toFixed(2);
                            }

                            myFileParsed[p].profit = myFinalProfit;
                            myFileParsed[p].afterTaxProfit = myFinalProfit;
                            myFileParsed[p].netNet = roundToTwo(netNet);
                            myFileParsed[p].navPercent = roundToTwo(navPercent);
                            myFileParsed[p].nvv = roundToTwo(nvv);
                            myFileParsed[p].totalCurrentAssets = roundToTwo(totalCurrentAssets);
                            myFileParsed[p].totalAssets = roundToTwo(totalAssets);
                            myFileParsed[p].totalLiabilities = roundToTwo(totalLiabilities);
                            myFileParsed[p].revenue = roundToTwo(revenue);


                            console.log(myInputIsin + " success " + myFinalProfit);

                            const jsonString = JSON.stringify(myFileParsed);

                            fs.writeFile(myFile, jsonString, err => {
                                if (err) {
                                    console.log('Error writing file', err)
                                }
                            })
                            break;
                        }
                    }






                }


            }).catch(error => {
                //  endpoints.push(endpoint);
                //   console.log(error);
                console.log(error);
                console.log("my error isin: " + myInputIsin);

            })


    }
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