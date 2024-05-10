var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');
var session = require('express-session')
var router = express.Router();
router.use(bodyParser.json());

var person_json = require('./public/json/person.json');
var friend_json = require('./public/json/friend.json');
var news_json = require('./public/json/news.json');


router.get('/', (req, res, next) => {
    const response = {
        "message" : "",
        "flag": false,
    }
        if (req.session.msg === "Изменения успешно внесены" || req.session.msg === "Пользователь заблокирован"){
            response.message = req.session.msg;
            response.flag = true;
            req.session.msg = null;
            res.render('index', {title: 'Главная страница', persons: person_json, if_msg: response.flag, msg: response.message});
        }else{
            res.render('index', {title: 'Главная страница', persons: person_json, if_msg: response.flag});
        }
});

router.get('/friends', function(req,res,next) {
    res.render('friends', {title:'Друзья', friend: friend_json, persons: person_json});
});

router.get('/new', function(req,res,next) {
    const response = {
        "message" : "",
        "flag": false,
    }
    if (req.session.msg === "Новость заблокирована"){
        response.message = req.session.msg;
        response.flag = true;
        req.session.msg = null;
        res.render('news', {title:'Новости', news: news_json,
        friend: friend_json, persons: person_json, if_msg: response.flag, msg: response.message});
    }else{
        res.render('news', {title:'Новости', news: news_json, friend: friend_json, persons: person_json, if_msg: response.flag});
    }
});

router.post('/network_signup/', (req, res, next) => {
    var id = 0;
    person_json.forEach((v, i) => {
        id = i + 1;
    });
    if (req.body.password == req.body.replay){
        person_json.push({
            "id": id,
            "photo": "https://crewservices.ru/upload/iblock/e98/ov10lepf1whmnzux1s4aw31z0sqll560/bodin_anton_yurevich.jpg",
            "nameN": req.body.name,
            "email": req.body.email,
            "date": req.body.date,
            "password": req.body.password,
            "status": "пользователь",
            "role": "активный"
        });

        Object.keys(person).forEach(k => delete person[k]);
        person.id = id;
        person.nameN = req.body.name;
        person.date = req.body.date;
        person.email = req.body.email;
        person.password = req.body.password;
        person.status = "пользователь";
        person.role = "активный";

        req.session.msg = "Вы зарегистрированы в CHEETAH NETWORK";
        res.redirect('/network');
    } else {
        req.session.msg = "Неверный пароль, повторите попытку";
        res.redirect('/');
    }
});



router.post('/network/:num', (req, res, next) => {
    let id = req.params.num;
    for (let value of person_json)
        if (value.id == id) {
            if (req.body.nameN)
                value.nameN = req.body.nameN;
            if (req.body.email)
                value.email= req.body.email;
            if (req.body.date)
                value.date = req.body.date;
            if (req.body.photo)
                value.photo = req.body.photo;
            if (req.body.status)
                value.status = req.body.status;
            if (req.body.role)
                value.role = req.body.role;
        }
    req.session.msg = "Изменения успешно внесены";
    res.redirect('/');
});

router.post('/new/:num', (req, res, next) => {
    let id = req.params.num;
    for (let value of news_json)
        if (value.number == id) {
                value.status = "заблокирован";
        }
    req.session.msg = "Новость заблокирована";
    res.redirect('/new');
});

router.post('/block/:num', (req, res, next) => {
    let id = req.params.num;
    for (let value of person_json)
        if (value.id == id) {
                value.status = "заблокирован";
        }
    req.session.msg = "Пользователь заблокирован";
    res.redirect('/');
});

module.exports = router;