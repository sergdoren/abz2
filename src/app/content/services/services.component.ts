import { Component, OnInit } from '@angular/core';
import { ServicesService } from './services.service'
import {isBoolean} from "util";

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.sass'],
  providers: [ServicesService]
})

export class ServicesComponent implements OnInit {

  private services;
  public BShowErr: boolean;

  constructor(private servicesData: ServicesService) {}

  ngOnInit() {
    this.BShowErr= false;
    this.servicesData.getServices()
      .subscribe(
        (data) => this.services = data,
        (err) => this.showError(err)
      )

  }


  private errStatus: string;
  private errStatusText: string;
  showError(err){
    this.BShowErr = true;
    console.log(err.status);
    this.errStatus = err.status;
    this.errStatusText = err.statusText;
  }

  close(){
    this.BShowErr = false;
  }

}
