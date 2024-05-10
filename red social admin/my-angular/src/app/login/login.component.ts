import { Component } from '@angular/core';
import {LoginService} from "../login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ LoginService ]
})
export class LoginComponent {
  constructor(private login_service: LoginService) {
  }
  email = ''
  password = ''
  log_button() {
    this.login_service.login(this.email, this.password, ()=>{alert("С возвращением в CHEETAH NETWORK"); window.location.href = "http://localhost:4200/main"}, ()=>{alert("Неверный пароль или логин, повторите попытку")})
  }
}
