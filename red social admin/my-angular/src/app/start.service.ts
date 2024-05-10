import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {HttpErrorResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MainService {
  constructor(private http: HttpClient) { }
  getPhoto(id: number, getting: (photo: string) => void){
    this.http.post<Photo>('http://localhost:4300/user_photo', {id}).subscribe(res => {
      if(!res.error || res.error.length == 0) getting(res.photo);
    }, (err: HttpErrorResponse) => {});
  }
  
  getInfo(id:number, gettingInfo: (nameN: string, email: string, date: string, status: string, role: string) => void){
    this.http.post<Info>("http://localhost:4300/user_info", {id}).subscribe(res =>{
      gettingInfo(res.nameN, res.email, res.date, res.status, res.role);
    });
  }
}

export interface Photo {
  error: string
  photo: string
}
export interface Info{
  nameN: string,
  email: string,
  date: string,
  role: string,
  status: string
}
