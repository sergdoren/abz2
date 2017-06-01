import { Component } from '@angular/core';
import { Route } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {

  navShow = true;

  close(){
    this.navShow = false
  }

}
