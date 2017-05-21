import { Injectable } from '@angular/core';
import { Http,Headers,RequestOptions } from "@angular/http";

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {observableToBeFn} from "rxjs/testing/TestScheduler";

@Injectable()
export class ServicesService {

  private services = ['asd','asd2','asd3'];

  private url = 'http://504080.com/api/v1/services/categories';

  constructor(public http: Http){}

  getServices(){
    let token = "219d17a637ec9ca4c062c4fc9fbecc61b968a2f0";
    let headers = new Headers({
      'Authorization': token
    });
    let options = new RequestOptions({ headers: headers });

    return this.http
      .get(this.url, options)
      .toPromise()
      .then(res => {let result = res.json().data;console.log(result);return result;})
  }

}
