import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import {observable} from "rxjs/symbol/observable";
import 'rxjs/operator/map';
import 'rxjs/operator/catch';
import {error} from "selenium-webdriver";


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
    let headers = new Headers({
      'Content-Type':'multipart/form-data'
    });

    let options = new RequestOptions({headers: headers});

    this.http.post(this.urlPostForm, data, options)
      .map(res => console.log(res.json())) // ...and calling .json() on the response to return data
      .subscribe();
  }

}
