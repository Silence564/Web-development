import {Component, OnInit} from '@angular/core';
import {MainService} from "../start.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit{
    constructor(private main_page_service: MainService) {setInterval(()=>{this.is_admin = sessionStorage["my-angular_is_admin"] === 'true'}, 500)}
    photo = ''
    is_admin = false;
    nameN = ""
    email = ""
    date = ""
    status = ""
    role = ""

  ngOnInit() {
    this.main_page_service.getPhoto(parseInt(sessionStorage["my-angular_id"]), (photo: string) => {this.photo = photo;})
    this.main_page_service.getInfo(parseInt(sessionStorage["my-angular_id"]), (nameN: string, email: string, date: string, status: string, role: string) => {this.nameN = nameN; this.email = email; this.date = date; this.status = status; this.role = role})
  }

}
