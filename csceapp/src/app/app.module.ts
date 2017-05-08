import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ApproverComponent } from './approver/approver.component';
import { DetailComponent } from './detail/detail.component';
import { HomeComponent } from './home/home.component';
import { ApproverLoginComponent } from './login/approverlogin.component';
import { LoginComponent } from './login/login-component';
import { AuthenticationService } from './services/authentication.service';
import { UserSignupComponent } from './usersignup/usersignup.component';
import { RouterModule, Routes } from '@angular/router';
import { FileSelectDirective, FileDropDirective } from 'ng2-file-upload';
import { InterconnectComponent } from './InterConnect/interconnect/interconnect.component';

const appRoutes: Routes =  [
  {
    path : 'home',
    component : HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'detail',
    component: DetailComponent
  },
  {
    path: 'signup',
    component: UserSignupComponent
  },
  {
    path: 'approver',
    component: ApproverComponent
  },
  {
    path: 'approverlogin',
    component: ApproverLoginComponent
  },

  {
    path: 'HomePage',
    component: InterconnectComponent
  }

];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    DetailComponent,
    UserSignupComponent,
    ApproverComponent,
    ApproverLoginComponent,
    FileSelectDirective,
    InterconnectComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
