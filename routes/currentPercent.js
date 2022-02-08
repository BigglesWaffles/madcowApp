'use strict';
var express = require('express');
var router = express.Router();
var app = express();
var path = require('path');
const fs = require('fs');

const axios = require('axios');



    router.post('/', (req, res) => {


        var newTicker = req.body.ticker.trim();

        const myArray = req.body.ticker.split("|");


        newTicker = myArray[0];
      //  newTicker = newTicker.replace(/\./g, "");
        console.log("SO WHAT IS NEW TICKER " + newTicker);


        axios.get('https://www.lse.co.uk/SharePrice.asp?shareprice=' + newTicker)
            .then(response => {

             //   console.log(Object.keys(response));
              //  JSON.stringify(response);
           //     console.log(typeof response.data);
           //     console.log(response.data.substring(100,400));
              //  console.log(response.data.explanation);

                var tempLine = response.data.substring(response.data.indexOf("data-field=\"MID_PCT_CHG") + 43, response.data.indexOf("data-field=\"MID_PCT_CHG") + 47);
                console.log(tempLine);



                console.log("updating ticker " + myArray[0]);
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

                    for (let index = 0; index < search.length; ++index) {

                        if (search[index].tickerSymbol == myArray[0]) {
                            search[index].percentUp = tempLine;
                            break;
                        }
                    }

                    const jsonString = JSON.stringify(search);

                    fs.writeFile(fileToReadWrite, jsonString, err => {
                        if (err) {
                            console.log('Error writing file', err)
                        }
                    })
                }

                var obj = { "percentUp": tempLine };

                console.log(JSON.stringify(obj));


                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(
                    obj
                ))

            })
            .catch(error => {
                console.log(error);
            });




       // )
        //  return next();
    });


    module.exports = router;
