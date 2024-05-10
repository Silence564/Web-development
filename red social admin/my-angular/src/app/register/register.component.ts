import { Component } from '@angular/core';
import {LoginService} from "../login.service";

@Component({
  selector: 'app-login',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [ LoginService ]
})
export class RegisterComponent {
  constructor(private login_service: LoginService) {
  }
  email = ''
  nameN = ''
  date = ''
  password = ''
  reg_button() {
    this.login_service.register(this.email, this.nameN, this.date, this.password, ()=>{alert("Добро пожаловать в CHEETAH NETWORK"); window.location.href = "http://localhost:4200/main"}, ()=>{alert("Упс, что-то пошло не так! Повторите попытку")})
  }
}
