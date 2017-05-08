/**
 * New typescript file
 */
import { AuthenticationService } from '../services/authentication.service';
import {Component, Input} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector : 'app-approverlogin',
  templateUrl : 'approverlogin.component.html',
  styleUrls : [ 'approverlogin.component.css' ]
})

export class ApproverLoginComponent {
  model: any = {};
  loginstatus = true;
  logoutstatus = false;
 constructor(private router: Router,
 private authenticationService: AuthenticationService) {}



  approverlogin() {
    this.authenticationService.login(this.model.email, this.model.password, true)
      .subscribe(data => {
      this.router.navigate(['/approver']);
      });
  }
}
