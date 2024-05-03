var express = require("express");
var router = express.Router();
var bodyParser = require('body-parser');
var session = require('express-session')
router.use(bodyParser.json());

var books = require('./public/books')

router.get('/', (req, res, next) => {
    res.render('input', {title: 'FOREVER BOOKS'});
});

router.get('/library', (req, res, next) => {
    const response = {
        "message" : "",
        "flag": false,
    }
    if (req.session.msg){
        response.message = req.session.msg;
        response.flag = true;
        req.session.msg = null;
        res.render('library', {title: 'Библиотека', books: books, if_msg: response.flag, msg: response.message})
    }
    else {
        res.render('library', {title: 'Библиотека', books: books, if_msg: response.flag})
    }
});

router.get('/add', (req, res, next) => {
    res.render('add', {title: 'Добавление книги'})
})

router.get('/card/:num', (req, res, next) => {
    const id = req.params.num;
    if (id === 'all_books') {
        let all_array = [];
        for (let value of books)
            all_array.push(value.id)
        res.end(JSON.stringify(all_array));
        return;
    }
    if (id === 'in_lib') {
        let id_array = [];
        books.forEach((v, i) => {
            if (v.in_library === "Нет в наличии")
                id_array.push(v.id)
        });
        res.end(JSON.stringify(id_array));
        return;
    }
    if (id === 'dateReturn') {
        let date_array = [];
        var cur_date = new Date();
        books.forEach((v, i) => {
            let v_date = new Date(v.date_return + 'T23:59:59.999Z')
            if (v_date > cur_date || v.in_library == "В наличии") {
                date_array.push(v.id);
            }
        });
        res.end(JSON.stringify(date_array));
        return;
    }

    const response = {
        "message" : "",
        "flag": false,
    }
    for (let value of books) {
        if (value.id == id) {
            if (req.session.msg === "Изменения успешно внесены" || req.session.msg ==="Читатель добавлен, приятного чтения!" || req.session.msg ==="Книга возвращена на полку"){
                response.message = req.session.msg;
                response.flag = true;
                req.session.msg = null;
                res.render('card', {
                    title: 'Страница книги', ID: `${value.id}`, name: `${value.name}`,
                    author: `${value.author}`, year: `${value.year}`, limitation: `${value.limitation}` , 
                    publishing_house: `${value.publishing_house}` , annotation: `${value.annotation}`,
                    in_library: `${value.in_library}`, photo: `${value.photo}`, person: `${value.person}`,
                    date_return: `${value.date_return}`, if_msg: response.flag, msg: response.message
            });} 
            else { 
                res.render('card', {
                    title: 'Страница книги', ID: `${value.id}`, name: `${value.name}`,
                    author: `${value.author}`, year: `${value.year}`, limitation: `${value.limitation}` , 
                    publishing_house: `${value.publishing_house}` , annotation: `${value.annotation}`,
                    in_library: `${value.in_library}`, photo: `${value.photo}`, person: `${value.person}`,
                    date_return: `${value.date_return}`, if_msg: response.flag
            });}
            return;
        }
    }
});

router.get('/card/editor/:num', (req, res, next) => {
    const id = req.params.num;

    for (let value of books) {
        if (value.id == id) {
            res.render('editor', {
                title: 'Редактирование', ID: `${value.id}`,name: `${value.name}`,
                author: `${value.author}`, year: `${value.year}`, limitation: `${value.limitation}` , 
                publishing_house: `${value.publishing_house}` , annotation: `${value.annotation}`, 
                photo: `${value.photo}`
            });
            return;
        }
    }
});

router.get("*", (req, res) => {
    res.status(404);
    res.end("Page not found");
});

router.post('/card/editor/:num', (req, res, next) => {
    let id = req.params.num;
    for (let value of books)
        if (value.id == id) {
            if (req.body.name)
                value.name = req.body.name;
            if (req.body.author)
                value.author = req.body.author;
            if (req.body.year)
                value.year = req.body.year;
            if (req.body.publishing_house)
                value.publishing_house = req.body.publishing_house;
            if (req.body.limitation)
                value.limitation = req.body.limitation;
            if (req.body.annotation)
                value.annotation = req.body.annotation;
        }
    req.session.msg = "Изменения успешно внесены";
    res.redirect('/card/'+id);
});

router.post('/card/:num', (req, res, next) => {
    let id = req.params.num;
    books.forEach((v, i) => {
        if (v.id == id) {
            books.splice(i, 1);
            req.session.msg = "Книга удалена";
            res.redirect('/library');
        }
    });
});

router.post('/new', (req, res, next) => {
    for (let value of books) {
        if (value.id == req.body.id) {
            req.session.msg = "Книга с таким id уже существует";
            res.redirect('/library');
            return;
        }
    }

    books.push({
        "photo": req.body.photo,
        "id": req.body.id,
        "name": req.body.name,
        "author": req.body.author,
        "year": req.body.date,
        "publishing_house": req.body.publishing_house,
        "limitation": req.body.limitation,
        "annotation": req.body.annotation,
        "in_library": "В наличии",
        "person": "-",
        "date_return": "-"
    });
    req.session.msg = "Книга успешно добавлена";
    res.redirect('/library');
});

router.post('/card/read/:num', (req, res, next) => {
    let id = req.params.num;
    for (let value of books) {
        if (value.id == id) {
            value.in_library = "Нет в наличии";
            value.person = req.body.name;
            value.date_return = req.body.date_return;
        }
    };
    req.session.msg = "Читатель добавлен, приятного чтения!";
    res.redirect('/card/'+id);
});

router.post('/card/back/:num', (req, res, next) => {
    let id = req.params.num;
    for (let value of books)
        if (value.id == id) {
            value.person = "-";
            value.date_return = "-";
            value.in_library = "В наличии"
        }
    req.session.msg = "Книга возвращена на полку";
    res.redirect('/card/'+id);
});

module.exports = router;
