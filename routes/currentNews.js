'use strict';
var express = require('express');
var router = express.Router();
var app = express();
var path = require('path');
const fs = require('fs');
const axios = require('axios');



    router.post('/', (req, res) => {

        const myArray = req.body.ticker.split("|");
        try {
            axios.get('https://api.londonstockexchange.com/api/gw/lse/instruments/alldata/' + myArray[0])
                .then(response => {

                    var dateBit = "";
                    if (response.data.datepreviousnews == null) {
                        if (response.data.presentnews == true) {
                            dateBit = new Date().toJSON().slice(0, 10);
                        }
                    } else {
                        dateBit = response.data.datepreviousnews;
                    }
                    var obj = { "currentnews": "https://www.londonstockexchange.com/stock/" + myArray[0] + "/xxx/analysis|" + dateBit.substring(0, 10) + " " + response.data.subjectnews };

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
                                search[index].news = "https://www.londonstockexchange.com/stock/" + myArray[0] + "/xxx/analysis|" + dateBit.substring(0, 10) + " " + response.data.subjectnews;
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
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify(
                        obj
                    ));

                })
                .catch(error => {
                    console.log("ticker not found "+myArray[0]);
                   // console.log(error);
                });
        } catch (error) {
            console.log("not found " + myArray[0])
        }
    });


    module.exports = router;
