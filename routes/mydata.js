'use strict';
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res) {
    res.json([{
        number: 1,
        name: 'John',
        gender: 'male'
    },
    {
        number: 2,
        name: 'Ashley',
        gender: 'female'
    }
    ]);
});

module.exports = router;