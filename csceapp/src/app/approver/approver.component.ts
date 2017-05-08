/**
 * New typescript file
 */
import { AuthenticationService } from '../services/authentication.service';
import {Component, Input, Provider, OnInit} from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-approver',
  templateUrl: 'approver.component.html'
})

export class ApproverComponent implements OnInit {
  loginstatus = true;
  logoutstatus = false;
  filesarray: any;
  userData: any;

constructor(private authService:  AuthenticationService) {}

  ngOnInit() {
    const getlocalitem = JSON.parse(localStorage.getItem('currentUser'));
    this.authService.getalluser().subscribe(
      data => this.userData = JSON.parse(JSON.stringify(data)),
      error => alert(error)
    );

//    if ( getlocalitem && getlocalitem[0]._id) {
//        this.filesarray = getlocalitem[0].files;
//        this.loginstatus = false;
//        this.logoutstatus = true;
//    }
  }

  download(filename: string) {
     this.authService.export("test")
      .subscribe(blob =>  {

                /*
                 var downloadUrl= URL.createObjectURL(blob)
                 window.open(downloadUrl, "_blank");
                 */

                // Doing it this way allows you to name the file
                const link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = "Report.xlsx";
                link.click();
            },
                  error => console.log('Error downloading the file.'),
                  () => console.log('Completed file download.'));



//    this.authService.download(filename).subscribe(
//      data => {console.log(data);
//      } );
  }

}


