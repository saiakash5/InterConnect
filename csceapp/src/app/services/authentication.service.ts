/**
 * New typescript file
 */
import { Injectable } from '@angular/core';
import { Http, Headers, Response, ResponseContentType } from '@angular/http';
import { Subscriber } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthenticationService {
    constructor(private http: Http) { }

  getalluser() {
  const  headers = new Headers();
  headers.append('Content-Type', 'application/json');
  return this.http.get('http://localhost:3000/users')
   .map(res => res.json());
  }


    login(email: string, password: string, admin: boolean) {
      const  headers = new Headers();
      headers.append('Content-Type', 'application/json');
      return this.http.post('http://localhost:3000/login',
            JSON.stringify({email: email, password: password, admin: admin}),
            { headers: headers })
                .map(response => {
                  // login successful if there's a jwt token in the response
                  let user = response.json();
                  if (user) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                  }
                }).catch(this.handleError);
    }

  usercreate(model: any) {
    const  headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/signup',
       JSON.stringify({email: model.email, name: model.name, password: model.password, admin: true}),
       { headers: headers })
      .map(response => {
        console.log(response);
      }).catch(this.handleError);
  }

  download(files: string) {
    const  headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/download')
      .map(response => {
      console.log(response);
      }).catch(this.handleError);
  }

    handleError (error: Response | any) {
      const errMsg = 'test';
      if (error instanceof Response) {
        if (error.status === 500) {
          alert ('some issue with credentials');
        }
      }
      return Promise.reject(errMsg);
  }



  export(location): Observable<Object[]> {
        return Observable.create(observer => {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', 'http://localhost:3000/download', true);
            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.responseType = 'blob';

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {

                        const contentType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
                        const blob = new Blob([xhr.response], { type: contentType });
                        observer.next(blob);
                        observer.complete();
                    } else {
                        observer.error(xhr.response);
                    }
                }
            };
            xhr.send();

        });
    }

}
