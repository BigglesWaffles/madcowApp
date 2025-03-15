'use strict';
var express = require('express');
var router = express.Router();
var app = express();
var path = require('path');
const fs = require('fs');
const url = require('url')
var fileToReadWrite = "";

var biggles = "";
const axios = require('axios');

router.get('/:name', (req, res) => {


    var rawdata = "";
    var search = "";
    var maxNum = parseInt("0");
    var saveTicker = "";


    //router.post('/', (req, res) => {



    //  const page = await browser.newPage();

    var fileName = req.params.name;
    console.log("john " + req.params.name);

    fileToReadWrite = "files/" + fileName + ".json";
    rawdata = fs.readFileSync(fileToReadWrite);
    search = JSON.parse(rawdata);


    search = loopSearch(search);

   console.log("empty: "+search);


    /*
 
    console.log("myCo: " + myCo);
    if (myInputIsin == "GB00BD8HBD32"
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
        
       // IMPORTANT  UNCOMMENT if want to mage again.
        //let myCo = makeid(10) +"-"+ makeid(5);
        // END IMPORTANT
    //    console.log("myCo: " + myCo);
        axios.get('https://www.fidelity.co.uk/factsheet-data/factsheet/' + myInputIsin + '-' + myCo + '/financials')
            .then(response => {


                //  <h1 class="mb-8 h3 detail__name">BT Group PLC (BT.A)</h1>

                var fidelityName = response.data;
                fidelityName = fidelityName.substring(fidelityName.indexOf("mb-8 h3 detail__name") + 22, fidelityName.length);
                console.log(fidelityName.substring(0, 50));
                if (fidelityName.indexOf(" PLC") > 0) {
                    fidelityName = fidelityName.substring(0, fidelityName.indexOf(" PLC"));
                } else {
                    fidelityName = fidelityName.substring(0, fidelityName.indexOf(" ("));
                }
                fidelityName = fidelityName.toLowerCase().replaceAll(".", "").replace(" (", "").replace(")", "").replaceAll(" ", "-").replace("&amp;", "");
                if (fidelityName.indexOf("<") > 0) {
                    fidelityName = fidelityName.substring(0, fidelityName.indexOf("<"));
                }

                console.log("final fidelityName " + fidelityName);

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
                var cash = 0;
                var nvv = "0"; /* nav */
                /*
                cash = myProfit.props.pageProps.initialState.fund
                    .financials.yearData[0].cashPeriodEnd;

                if (cash != null && cash != "" && cash != 0) {
                    cash = cash / 1000000;
                    cash = roundToTwo(cash);
                } else { cash = 0; }

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
                    .financials.yearData[0].currentAsset;

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
                            myFileParsed[p].cash = roundToTwo(cash);
                            console.log("myFinalProfit " + myFinalProfit);
                            console.log("nvv " + nvv);
                            console.log("totalAssets " + totalAssets);
                            console.log("totalLiabilities " + totalLiabilities);
               

                            myFileParsed[p].revenue = roundToTwo(revenue);
                            myFileParsed[p].fidelityName = fidelityName;


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

                var myFileParsed2 = [];

                try {
                    if (fs.existsSync("files/" + myFileName + "ISIN-Errs.json" )) {
                        let rawdata2 = fs.readFileSync("files/" + myFileName + "ISIN-Errs.json");
                        myFileParsed2 = JSON.parse(rawdata2);
                        myFileParsed2.push({ "isin": myInputIsin });

                        const jsonStringErr = JSON.stringify(myFileParsed2);

                        fs.writeFile("files/" +myFileName + "ISIN-Errs.json", jsonStringErr, err => {
                            if (err) {
                                console.log('Error writing file', err)
                            }
                        })

                    } else {
                        myFileParsed2.push({ "isin": myInputIsin });
                        const jsonStringErr = JSON.stringify(myFileParsed2);

                        fs.writeFile("files/" +myFileName + "ISIN-Errs.json", jsonStringErr, err => {
                            if (err) {
                                console.log('Error writing file', err)
                            }
                        })
                    }
                } catch (err) {
                    console.error(err)
                }

            })


    }

    */

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


async function fetchData(search, index) {

    try {

        var isin = search[index].isin;
        var company = search[index].fidelityName;

        const response = await axios.get(`https://www.fidelity.co.uk/factsheet-data/factsheet/${isin}-${company}/financials`);
        //  console.log(`Data for ${isin}:`, response.data);

        var fidelityName = response.data;
        fidelityName = fidelityName.substring(fidelityName.indexOf("mb-8 h3 detail__name") + 22, fidelityName.length);
        //   console.log(fidelityName.substring(0, 50));
        if (fidelityName.indexOf(" PLC") > 0) {
            fidelityName = fidelityName.substring(0, fidelityName.indexOf(" PLC"));
        } else {
            fidelityName = fidelityName.substring(0, fidelityName.indexOf(" ("));
        }
        fidelityName = fidelityName.toLowerCase().replaceAll(".", "").replace(" (", "").replace(")", "").replaceAll(" ", "-").replace("&amp;", "");
        if (fidelityName.indexOf("<") > 0) {
            fidelityName = fidelityName.substring(0, fidelityName.indexOf("<"));
        }

        console.log("final fidelityName " + fidelityName);


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
        var cash = 0;
        var nvv = "0"; /* nav */

        cash = myProfit.props.pageProps.initialState.fund
            .financials.yearData[0].cashPeriodEnd;

        if (cash != null && cash != "" && cash != 0) {
            cash = cash / 1000000;
            cash = roundToTwo(cash);
        } else { cash = 0; }

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
            .financials.yearData[0].currentAsset;

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


        let myFinalProfit = myProfit.props.pageProps.initialState.fund
            .financials.yearData[0].netIncomeShareHolders;

        if (myFinalProfit != null && myFinalProfit != "" && myFinalProfit != 0) {
            myFinalProfit = myFinalProfit / 1000000;
            myFinalProfit = roundToTwo(myFinalProfit)






            if (totalCurrentAssets != 0 && search[index].marketCapitalisation != 0) {
                netNet = ((totalCurrentAssets - totalLiabilities) / search[index].marketCapitalisation).toFixed(2);
            }

            if (totalAssets != 0 && totalLiabilities != 0 && search[index].marketCapitalisation != 0) {
                navPercent = ((totalAssets - totalLiabilities) / search[index].marketCapitalisation).toFixed(2);
            }

            search[index].profit = myFinalProfit;
           // search[index].profit = 999;
            search[index].afterTaxProfit = myFinalProfit;
            search[index].netNet = roundToTwo(netNet);
            search[index].navPercent = roundToTwo(navPercent);
            search[index].nvv = roundToTwo(nvv);
            search[index].totalCurrentAssets = roundToTwo(totalCurrentAssets);
            search[index].totalAssets = roundToTwo(totalAssets);
            search[index].totalLiabilities = roundToTwo(totalLiabilities);
            search[index].cash = roundToTwo(cash);
          //  console.log("myFinalProfit " + myFinalProfit);
            console.log("profit " + search[index].profit);
            console.log("nvv " + nvv);
            console.log("totalAssets " + totalAssets);
            console.log("totalLiabilities " + totalLiabilities);


            search[index].revenue = roundToTwo(revenue);
            search[index].fidelityName = fidelityName;


            console.log(search[index].isin + " success " + myFinalProfit);

            const jsonString = JSON.stringify(search);
            console.log("I AM HERE");
          //  console.log("interesting: " + jsonString);

             fs.writeFile(fileToReadWrite, jsonString, err => {
                 if (err) {
                     console.log('Error writing file', err)
                 }
              })

            //  const jsonString = JSON.stringify(myFileParsed);



        }

    } catch (error) {
        console.error(`Error fetching data for ${isin}:`, error.message);
    }

    return search;
}
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function loopSearch(search) {

    for (let index = 0; index < search.length; ++index) {
        try {

         //   if (index == 3) break;

            fetchData(search, index)
            await delay(1000);  // delay one second

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
            }


            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(
                obj
            ));
            console.log(error);
        }
        
    };

    console.log("end of loop"); 

    return search;
}


    
  
    


function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

module.exports = router;