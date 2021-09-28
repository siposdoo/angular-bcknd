import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddEventComponent } from './events/add-event/add-event.component';
import { EventDetailComponent } from './events/event-detail/event-detail.component';
import { EventsListComponent } from './events/event-list/event-list.component';

const routes: Routes = [

   { path: '', component: DashboardComponent },
  { path: 'events', component: EventsListComponent },
  { path: 'add-event', component: AddEventComponent },
  { path: 'edit-event/:id', component: EventDetailComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
