/**
 * New typescript file
 */
import { AuthenticationService } from '../services/authentication.service';
import {Component, Input} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector : 'app-login',
  templateUrl : 'login.component.html',
  styleUrls : [ 'login.component.css' ]
})

export class LoginComponent {
  model: any = {};
  loginstatus = true;
  logoutstatus = false;
  public s:string
 constructor(private router: Router,
 private authenticationService: AuthenticationService) {}

userlogin() {
  this.authenticationService.login(this.model.email, this.model.password, false)
    .subscribe(
      data => {
        this.s = this.model.email;
        this.loginstatus = false;
        this.logoutstatus = true;
        this.router.navigate(['/detail']);


       });
  }

  approverlogin() {

    this.authenticationService.login(this.model.email, this.model.password, true)
      .subscribe(data => {
      this.router.navigate(['/approver']);
      });
  }
}
