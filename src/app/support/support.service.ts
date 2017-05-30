import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import {observable} from "rxjs/symbol/observable";
import 'rxjs/operator/map';


@Injectable()
export class SupportService {
  private url = 'http://504080.com/api/v1/support';
  private getTypeUrl = 'http://504080.com/api/v1/directories/enquiry-types';
  constructor(private http: Http) {

  }

  getTypes(){
    return this.http
      .get(this.getTypeUrl)
      .map((res) => res.json().data);
  }

}
