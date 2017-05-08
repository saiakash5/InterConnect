import { HomeComponent } from './home/home.component';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Hello world';
  loginstatus = true;
  logoutstatus = false;
  constructor(private router: Router) {  }
  ngOnInit() {
    let session = JSON.parse(localStorage.getItem('currentUser'));
    if ( session && session[0]._id ) {
      this.loginstatus = false;
      this.logoutstatus = true;
      if ( session[0].admin === true ) {
        this.router.navigate(['/approver']);
      } else {
      this.router.navigate(['/detail']);
    }
  }
  }

  logout() {
    this.loginstatus = true;
    this.logoutstatus = false;
    localStorage.removeItem('currentUser');
    this.router.navigate(['/home']);
  }

}
