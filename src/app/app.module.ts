import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AmplifyUIAngularModule } from '@aws-amplify/ui-angular';
import { AddEventComponent } from './events/add-event/add-event.component';
import { EventDetailComponent } from './events/event-detail/event-detail.component';
import { EventsListComponent } from './events/event-list/event-list.component';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    AppComponent,
 
    DashboardComponent,
      AddEventComponent,
      EventDetailComponent,
      EventsListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AmplifyUIAngularModule,
    ReactiveFormsModule,
    GooglePlaceModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
