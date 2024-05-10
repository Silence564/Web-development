import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { NewsComponent } from './news/news.component';
import { MainComponent } from './main/main.component';
import {LoginComponent} from './login/login.component';

export const routes: Routes = [{path: 'login', component: LoginComponent}, {path: 'register', component: RegisterComponent}, {path: 'news', component: NewsComponent}, {path: 'main', component: MainComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
