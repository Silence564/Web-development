//сохранение данных 
function store(event){
    var flag = 0;
    var pos;
    inputname = document.getElementById('windowtext');
    var obj = {id : inputname.value, score : 0, lines : 0, level : 1};
    for (let i = 0; i < localStorage.length; i++){
        var arr = JSON.parse(localStorage.getItem(String(i)));
        if (inputname.value === arr.id) {flag = 1; pos = i; break;}
    }
    if (flag == 1){
        for (let i = pos; i < localStorage.length-1; i++){
            var arr1 = JSON.parse(localStorage.getItem(String(i+1)));
            localStorage.setItem(String(pos), JSON.stringify(arr1));
        }
        localStorage.setItem(String(localStorage.length-1), JSON.stringify(arr));
    }
    else { 
        localStorage.setItem(String(localStorage.length), JSON.stringify(obj));
    }
}

input = document.getElementById('enter');
input.addEventListener('click', store);

//проверка формы
function checkform(){
    var f = document.forms["theform"].elements;
    var cansubmit = true;

    for (var i = 0; i< f.length; i++) {
        if (f[i].value.length == 0) { cansubmit = false};
    }
    if (cansubmit) {
        document.getElementById('enter').disabled = false;
    }
}

