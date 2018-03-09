import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';

import {InMemoryDataService} from './in-memory-data.service';

import { AppComponent } from './app.component';
import { StarsComponent } from './stars/stars.component';
import { StarDetailComponent } from './star-detail/star-detail.component';
import {StarService} from './star.service';
import { MessagesComponent } from './messages/messages.component';
import { MessageService } from './message.service';
import { AppRoutingModule } from './app-routing.module';
import {RouterModule} from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import {HttpClientModule} from '@angular/common/http';
import { StarSearchComponent } from './star-search/star-search.component';

@NgModule({
  declarations: [
    AppComponent,
    StarsComponent,
    StarDetailComponent,
    MessagesComponent,
    DashboardComponent,
    StarSearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule
      .forRoot(InMemoryDataService, {dataEncapsulation: false})
  ],
  providers: [
    StarService,
    MessageService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
