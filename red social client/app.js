var express = require("express");
var app =express();
const path = require('path');
var router = require("./routes");
var bodyParser = require('body-parser');
var session = require('express-session');

app.set('view engine','pug')
app.set('views',path.join(__dirname,'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));
app.use(session({
    secret: "message",
    resave: true,
    saveUninitialized: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', router);

app.listen(3000);

module.exports = app;