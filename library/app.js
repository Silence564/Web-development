var express = require("express");
var app = express();
var routes = require("./routes");
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
const path = require('path');

app.set("view engine", "pug");
app.set("views", path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname,'public')));
app.use(cookieParser());
app.use(session({
    secret: "message",
    resave: true,
    saveUninitialized: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
  


app.use("/", routes);

app.listen(3000);


module.exports = app;