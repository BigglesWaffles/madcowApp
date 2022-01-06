'use strict';
var express = require('express');
var router = express.Router();
var app = express();
var path = require('path');


const axios = require('axios');



    router.post('/', (req, res) => {


        axios.get('https://www.lse.co.uk/SharePrice.asp?shareprice=' + req.body.ticker)
            .then(response => {

                console.log(Object.keys(response));
              //  JSON.stringify(response);
                console.log(typeof response.data);
                console.log(response.data.substring(100,400));
              //  console.log(response.data.explanation);

                var tempLine = response.data.substring(response.data.indexOf("data-field=\"MID_PCT_CHG") + 43, response.data.indexOf("data-field=\"MID_PCT_CHG") + 47);
                console.log(tempLine);

                console.log("in here a");

                console.log(req.path);
                console.log(req.params);
                console.log(req.params.useridname);
                // app.use('/pthv/:useridname', pthv);
               // var obj = JSON.parse([{ "percentUp": tempLine }]);

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
