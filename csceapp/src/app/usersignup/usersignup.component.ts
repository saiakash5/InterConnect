/**
 * New typescript file
 */
import { AuthenticationService } from '../services/authentication.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-usersignup',
  templateUrl: 'usersignup.component.html'

})

export class UserSignupComponent {
  model: any = {};
  constructor(private authservice: AuthenticationService,
              private router:  Router) {};
  register() {
    this.authservice.usercreate(this.model).subscribe( data => {
        this.router.navigate(['/home']);
       });
  }

}
