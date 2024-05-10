import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable({
    providedIn: "root"
})

export class LoginService {
    constructor(private http: HttpClient) {};
    login(email: string, password: string, on_login: () => void, on_error: (msg: string) => void) {
        this.http.post<id_Response>("http://localhost:4300/login", {email, password})
        .subscribe(res => {
            if(!res.error || res.error.length == 0){
                sessionStorage["my-angular_id"] = res.id;
                sessionStorage["my-angular_is_admin"] = res.is_admin;
                on_login();
            }
            else{
                on_error(res.error);
            }
        });
    }

    register(email: string, nameN:string, date: string, password: string, on_register: () => void, on_error: (msg: string) => void) {
        this.http.post<id_Response>("http://localhost:4300/register", {email, password, nameN, date})
          .subscribe(res => {
            if(res.error && res.error.length != 0)
              on_error(res.error);
            else
              on_register();
          });
      }
}

export interface id_Response {
    id: number
    error: string
    is_admin: boolean
}
