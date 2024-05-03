function all_books(button) {
    let id = button.id;
    let title = "library";
    callAjax(id, (response) => {
        let id_s = JSON.parse(response);
        for (id of id_s){
            let temp  =document.getElementById(id);
            temp.style.visibility = "visible";
        }
    });
}

function in_lib(button) {
    let id = button.id;
    let title = "library";
    callAjax(id, (response) => {
        let array_id = JSON.parse(response);
        for(id of array_id) {
            let cur_th = document.getElementById(id);
            cur_th.style.visibility = "hidden";
        }
    });
}
function date_return(button) {
    let id = button.id;
    let title = "library";
    callAjax(id, (response)=>{
        console.log(response);
        let array_id = JSON.parse(response);
        for(id of array_id) {
            let cur_th = document.getElementById(id);
            cur_th.style.visibility = "hidden";
        }
    });
}

function callAjax(id, callback){
    let request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200){
            callback(this.responseText);
        }
    };
    request.open("GET", `/card/${id}`);
    request.send();
}