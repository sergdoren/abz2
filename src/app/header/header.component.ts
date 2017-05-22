import { Component, OnInit } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  private Base;
  private urlLogo = '../../images/logo.png';
  private urlLogo2 = '../../images/logo2@.png 2x';

  constructor( ) { }

  ngOnInit() {
    this.Base = APP_BASE_HREF;
  }

}
