<template>
    <div class="block">
        <form inline>
            <div>
                <div v-if="isWrong" class="alert alert-danger" role="alert">
                    Неверный логин или пароль, повторитье попытку.
                </div>
            </div>
            <div class="block3">
                <div class="form-floating mb-3" style="width: 50%">
                    <input id="loginInput" type="text" class="form-control" placeholder="name" v-model="login">
                    <label for="floatingInput">Login</label>
                </div>
                <div class="form-floating" style="width: 50%">
                    <input id="passwordInput" type="password" class="form-control" placeholder="Password" v-model="password">
                    <label for="floatingPassword">Password</label>
                </div>
            </div>
            <button id="entryBtn" class="knop" v-on:click="submit_check">Войти</button>
        </form>
    </div>
</template>

<script>
import router from "../router.js";
    export default {
        name: 'LoginComponent',
        date () {
            return{
                login: "",
                password: "",
                isWrong:false
            }
        },
        methods: {
            submit_check() {
                fetch('http://localhost:4000/login', {
                    method: "PUT",
                    headers: { 'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        login: this.login,
                        password: this.password
                    })
                }).then((response) => response.json())
                .then((result) => {
                    if(result.status){
                        this.isWrong = false;
                        localStorage.setItem("user", this.login);
                        router.push({name: 'Home'});
                    }else{
                        this.isWrong = true;
                    }
                })               
            }
        }
    }
</script>

<style>
    .block{
        margin-top: 5%;
    }

    .block3{
        margin-left: 30%;
    }

    .knop{
        margin-left: 42%;
        margin-top: 1%;
        width: 10%;
        height: 15%;
        font-size: 45px;
        border-radius: 15px;
        background-color: #FFFFFF;
        cursor: pointer;
        border: 4px solid black;
    }

    .knop:hover{
        background-color: #CD5C5C;
    }
</style>