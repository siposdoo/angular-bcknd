import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CrudService } from './../../service/crud.service';
import { FormsModule } from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

@Component({
  selector: 'event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css'],
})
export class EventsListComponent implements OnInit {
  allEvents: any = [];
  weather:any = [];
  eventcur:any = [];
  closeResult: string = '';


  constructor(
    private crudService: CrudService,
    private modalService: NgbModal) {}

  ngOnInit(): void {
    this.getAllEvents();
  }
  formatDate(value:any){
    return formatDate(value, 'yyyy-MM-dd', 'en-US')
  }
  getAllEvents() {
    this.crudService.GetEvents().subscribe((res) => {
      this.allEvents = res;
      console.log(res);
      console.log(this.allEvents);
     
    });
  }
  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  getWeather(lat:any,lng:any,event:any) {
    this.weather=[]
    this.crudService.GetWeather(lat,lng).subscribe((res) => {
    this.weather=res
    this.eventcur=event
      console.log(res);
      
    });
  }
  
  delete(id: any, i: any) {
    console.log(id);
    if (window.confirm('Do you want to delete Event?')) {
      this.crudService.deleteEvent(id).subscribe((res) => {
        this.allEvents.splice(i, 1);
      });
    }
  }
}
