import { Component, OnInit } from '@angular/core';
import { ServicesService } from './services.service'

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.sass'],
  providers: [ServicesService]
})

export class ServicesComponent implements OnInit {

  public services;

  constructor(private servicesData: ServicesService) {}

  ngOnInit() {
    this.servicesData.getServices()
      .then(data => {
        this.services = data;
      });
  }

}
