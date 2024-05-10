import {Component, OnInit} from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  email = ""
  is_admin = false;
  constructor(private titleService: Title) {
  }
  ngOnInit() {
    this.titleService.setTitle('CHEETAH NETWORK');
  }
}
