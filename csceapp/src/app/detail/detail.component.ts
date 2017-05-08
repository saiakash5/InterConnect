/**
 * New typescript file
 */
import {Component, Input, Provider, OnInit} from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { Router } from '@angular/router';
import {HttpClient} from "selenium-webdriver/http";
import { Http, Headers, RequestOptions, Response } from '@angular/http';



@Component({
  selector: 'app-detail',
  templateUrl: 'detail.component.html'
})

export class DetailComponent implements OnInit {
  loginstatus = true;
  logoutstatus = false;
  filesarray: any;

  public uploader: FileUploader = new FileUploader({url: 'http://localhost:3000/upload'});

  ngOnInit() {
    const getlocalitem = JSON.parse(localStorage.getItem('currentUser'));

    if ( getlocalitem && getlocalitem[0]._id) {
        this.filesarray = getlocalitem[0].files;
        this.loginstatus = false;
        this.logoutstatus = true;

    }
  }

  filesSubmit() {
    console.log(this.uploader);
    this.uploader.uploadAll();
  }

  display(){

  }

}
