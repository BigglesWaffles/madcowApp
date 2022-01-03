var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
//const mysql = require('mysql');

var routes = require('./routes/ftseTest');
var ftse100 = require('./routes/ftse100');
var ftse250 = require('./routes/ftse250');
var ftserst = require('./routes/ftserst');
var ftseaim = require('./routes/ftseaim');
var netnet = require('./routes/netnet');
var allSectors = require('./routes/allSectors');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/js', express.static(__dirname + '/js'));
app.use('/css', express.static(__dirname + '/css'));
app.use('/images', express.static(__dirname + '/images'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'routes')));



app.use('/routes/ftseTest', routes);
app.use('/routes/ftse100', ftse100);
app.use('/routes/ftse250', ftse250);
app.use('/routes/ftserst', ftserst);
app.use('/routes/ftseaim', ftseaim);
app.use('/routes/netnet', netnet);
app.use('/routes/allSectors', allSectors);


app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});



module.exports = app;

//app.listen(process.env.PORT || 3000);

