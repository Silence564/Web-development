let routes = require('../routes')

function generate_string(len){
    let chars = "jhnfdch899999";
    let result = ''
    for(let i = 0; i < len; i++){
        result += chars[Math.floor(Math.random()*chars.length)]
    }
    return result;
}

function generate_person(len){
    let users = []
    for(let i = 0; i < len; i++){
        users.push({ id:Math.floor(Math.random()*30), nameN:generate_string(20), email:generate_string(20) })
    }
    return users
}

test('get_id_by_mail test', () => { 
    let users = generate_person(20);
    let n = Math.floor(Math.random()*30);
    let user_tofind;
    for (let item of users){
        if(item.id == n){
            user_tofind = item.email;
        }
    }
    expect(routes.get_id_by_mail(user_tofind, users)).toBe(n)
});

test('is_value test', () => {
    let number1 = 'gddg@email.com';
    let number2 = 'ggdgd@email';
    let number3 = 'fc';
    let number4 = 'hdhh.com';
    expect(routes.isvalue(number1)).toBe(true);
    expect(routes.isvalue(number2)).toBe(false);
    expect(routes.isvalue(number3)).toBe(false);
    expect(routes.isvalue(number4)).toBe(false);
})