'use strict';
var express = require('express');
var router = express.Router();
var app = express();
var path = require('path');


const https = require('https')

var obj = "";

const options = {
    hostname: 'www.lse.co.uk',
    path: '/SharePrice.asp?shareprice=' +"TRD" , //req.body.ticker,
    method: 'GET'
}



console.log("got into CURRENT");


router.post('/', (req, res, next) => {
    console.log("in here a           iiiii");

    var ticker = req.body.ticker;
    console.log(req.body.ticker);
    console.log(req.path);
    console.log(req.params);
    console.log(req.params.useridname);


    const req2 = https.request(options, (res2, req, next) => {


        console.log(`statusCode: ${res2.statusCode}`)

        var data = '';
        res2.on('data', function (chunk) {
            data += chunk;
        });
        res2.on('end', function (t) {
               console.log(data);
            var tempLine = data.substring(data.indexOf("data-field=\"MID_PCT_CHG") + 43, data.indexOf("data-field=\"MID_PCT_CHG") + 47);



            let text = '[{"percentUp":"0" }]';
            console.log("text is: " + text);
            obj = JSON.parse(text);
            obj[0].percentUp = tempLine;

            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(
                obj));


        });

        req2.on('error', error => {
            console.error(error)
        })


    }, function (req, res) {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(
            obj));
    })
    req2.end();
});



function fred(req, res, next) {

    console.log("do we get into here");


        const options = {
            hostname: 'www.lse.co.uk',
            path: '/SharePrice.asp?shareprice=' + req.body.ticker,
            method: 'GET'
        }


        const req2 = https.request(options, res2 => {
            console.log(`statusCode: ${res2.statusCode}`)

            var data = '';
            res2.on('data', function (chunk) {
                data += chunk;
            });
            res2.on('end', function () {
                //   console.log(data);
                var tempLine = data.substring(data.indexOf("data-field=\"MID_PCT_CHG") + 43, data.indexOf("data-field=\"MID_PCT_CHG") + 47);



                let text = '{[{"percentUp":"0" }]}';
                console.log("text is: " + text);
                const obj = JSON.parse(text);
                obj[0].percentUp = tempLine;
                res.setHeader('Content-Type', 'application/json');
               return  res.send(JSON.stringify(obj));

            });

            req2.on('error', error => {
                console.error(error)
            })

            req2.end()


        });


   
}


    // app.use('/pthv/:useridname', pthv)


module.exports = router;
