import {Component, OnInit} from '@angular/core';
import {MainService} from "../start.service";
import {NewsService, News} from "../news.service";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit{
  photo = ""
  constructor(private news_service: NewsService, private main_page: MainService) {}
  news_list: News[] = [];
  news_text = ""
  news_photo = ""
  ngOnInit() {
    this.news_service.onGetNews(()=> this.ngOnInit())
    this.news_service.get_news(sessionStorage["my-angular_id"], (news: News[]) => {this.news_list = news;}, (msg: string) => {alert(msg)})
    this.main_page.getPhoto(parseInt(sessionStorage["my-angular_id"]), (photo: string) => {this.photo = photo;})
  }
  add_news(){
    this.news_service.add_news(sessionStorage["my-angular_id"], this.news_text, this.news_photo, () => {this.ngOnInit()}, (msg: string) => {alert(msg)})
  }
  go_to_main(){
    window.location.href = "http://localhost:4200/main";
  }
}
