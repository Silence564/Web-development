const express = require('express')
const app = express.Router()
let persons = require("../web3/public/json/person.json")
const fs = require('fs')
let news = require("../web3/public/json/news.json")
let friends = require("../web3/public/json/friend.json")

function save(fl, _json){
    fs.writeFile(fl, JSON.stringify(_json), (error) => {if(error) throw error})
}

function isvalue(email){
    var regex = /[a-zA-Z0-9]+[@]+[a-zA-Z0-9]+[.]+[A-Za-z0-9]/;
    return regex.test(email);
}
function get_id_by_mail(email, local = persons){
    for (let item of local){
        if(item.email == email) return item.id;
    }
}

app.get("/", (req, res, next)=>{
    res.end("Главная страница");
});

app.post("/login", (req, res) => {
    for (let item of persons){
        if (item.email === req.body.email){
            if(item.password === req.body.password) {
                res.end(JSON.stringify({id: item.id, is_admin: item.role == "администратор"}))
                return 
            }
        }
    }
    res.end(JSON.stringify({error: "Неверный пароль или логин"}));
})
app.post("/register", (req, res) => {
    if(get_id_by_mail(req.body.email) != undefined){res.end(JSON.stringify({error: "Пользователь уже зарегистрирован"})); return;}
    if(!isvalue(req.body.email)) {res.end(JSON.stringify({error: "Неверный почтовый адрес"})); return;}
    let ID = 1;
    for (let item of persons) {ID++;}
    save("../web3/public/json/person.json", persons)
    res.end(JSON.stringify({}))
});

app.post("/user_photo", (req, res) => {
    for (let item of persons){
        if (req.body.id == item.id){
            res.end(JSON.stringify({photo: item.photo}))
            return
        }
    }
    res.end(JSON.stringify({error: "Неверный id"}))
});
app.post("/user_info", (req, res) => {
    for (let item of persons){
        if (item.id == req.body.id){
            res.end(JSON.stringify({nameN: item.nameN, email: item.email, date: item.date, status: item.status, role: item.role}))
            return
        }
    }
    res.end(JSON.stringify({error: "Неверный id"}));
    
})

app.post("/add_news", (req, res) => {
    let ID = 1;
    let flag = 0;
    for (let item of news) {ID++;}
    for (let item of persons){
        if (req.body.id == item.id){
            flag = 1;
            if(item.status == 'заблокирован'){res.end(JSON.stringify({error: "Пользователь заблокирован"})); return;}
        }
    }
    if(flag == 0){res.end(JSON.stringify({error: "Wrong id"})); return;}
    news.push({id: req.body.id, number: ID, text: req.body.news_text, status: "активный", image:req.body.news_photo})
    save("../web3/public/json/news.json", news)
    global.server_io.sockets.emit('news') //создаем событие
    res.end(JSON.stringify({}))
})

app.post("/news", (req, res)=>{
    let news_massive = []
    let flag1 = 0;
    let flag2 = 0;
    let flag3 =0;
    for (let item of persons){
        if (req.body.id == item.id){
            for (let n of news){
                if(n.id == req.body.id){ 
                    if (n.text == 0) { flag1 = 1}
                    if (n.image == 0) { flag2 = 1}
                    if (flag1 == 1){
                        if (flag2 != 1){
                            news_massive.push({user_name: item.nameN, news_photo: n.image})
                            flag3 = 1;
                        }
                    } else{
                        if (flag2 == 1){ news_massive.push({user_name: item.nameN, news_text: n.text}); flag3 = 1;}
                    }
                    if(flag3 == 0) {news_massive.push({user_name: item.nameN, news_text: n.text, news_photo: n.image})}
                }
                flag1 =0;
                flag2 =0;
                flag3 =0;
            }
        }         
    }
    
    

    for (let fr of friends){
        if(req.body.id == fr.id){
            for(let item of fr.friends_id){
                for(let n of news){
                    if(item == n.id) { 
                        for (let user of persons){
                            if( user.id == item) {
                                if (n.text == 0) { flag1 = 1}
                                if (n.image == 0) { flag2 = 1}
                                if (flag1 == 1){
                                    if (flag2 != 1){
                                        news_massive.push({user_name: user.nameN, news_photo: n.image})
                                        flag3 = 1;
                                    }
                                } else{
                                    if (flag2 ==1){ news_massive.push({user_name: user.nameN, news_text: n.text}); flag3 = 1;}
                                }
                                if(flag3 == 0) {news_massive.push({user_name: user.nameN, news_text: n.text, news_photo: n.image})}
                            }
                            flag1 =0;
                            flag2 =0;
                            flag3 =0;
                        }
                    }
                }
            }
        }
    }
    res.end(JSON.stringify({news: news_massive}))
})

app.get("*", (req, res)=>{
    res.status(404);
    res.end("Page not found");
});

module.exports = {app, get_id_by_mail, isvalue};