import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import {observable} from "rxjs/symbol/observable";
import 'rxjs/operator/map';
import 'rxjs/operator/catch';


@Injectable()
export class SupportService {
  private urlPostForm = 'http://504080.com/api/v1/support';
  private getTypeUrl = 'http://504080.com/api/v1/directories/enquiry-types';
  constructor(private http: Http) {

  }

  getTypes(){
    return this.http
      .get(this.getTypeUrl)
      .map((res) => res.json().data);
  }

  sendForm(data){
    //v  'multipart/form-data'
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({headers: headers});

    return this.http
      .post(this.urlPostForm, data, options);
  }

}
