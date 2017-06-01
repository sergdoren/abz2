import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { RouterModule, Route } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MenuLeftComponent } from './menu-left/menu-left.component';
import { MenuRightComponent } from './menu-right/menu-right.component';
import { ContentComponent } from './content/content.component';
import { ServicesComponent } from './content/services/services.component';
import { AdvertisementComponent } from './shared-menu/advertisement/advertisement.component';
import { SupportComponent } from './support/support.component';
import { MainComponent } from './main/main.component';

const routers = [
  {path: '', component: MainComponent},
  {path: 'support', component: SupportComponent},
  {path: '**', component: MainComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuLeftComponent,
    MenuRightComponent,
    ContentComponent,
    ServicesComponent,
    AdvertisementComponent,
    SupportComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    JsonpModule,
    RouterModule.forRoot(routers)
  ],
  providers: [{provide: APP_BASE_HREF, useValue : '/' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
