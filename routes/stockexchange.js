'use strict';
var express = require('express');
var router = express.Router();
var app = express();
var path = require('path');




const fs = require('fs');


router.get('/', (req, res) => {



    // https://www.google.com/finance/quote/DAX:INDEXDB?window=1M

    //Percent up or down or same
    // //html/body/c-wiz[2]/div/div[4]/div/main/div[2]/div[1]/div[1]/c-wiz/div/div[1]/div/div[1]/div/div[2]/div/span[1]/div/div/text()


   //  /html/body / c - wiz[2] / div / div[4] / div / main / div[2] / div[1] / div[1] / c - wiz / div / div[1] / div / div[1] / div / div[2] / div / span[1] / div / div / text()

    // https://www.google.com/finance/quote/UKX:INDEXFTSE?window=6M
    // https://www.google.com/finance/quote/.DJI:INDEXDJX?window=1M
    // https://www.google.com/finance/quote/NDX:INDEXNASDAQ?window=6M
        var bish = {
            "hello": "world"
        };

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(
            bish
        ))
    
    //  return next();
});



module.exports = router;