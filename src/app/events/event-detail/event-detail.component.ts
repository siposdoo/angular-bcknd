import { formatDate } from '@angular/common';
import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CrudService } from './../../service/crud.service';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css'],
})
export class EventDetailComponent implements OnInit {
  event: any
  eventForm: FormGroup
  userAddress: string = ''
  userLatitude: string = ''
  userLongitude: string = ''
  location:String=''
  coordinates:any

  constructor(
    private ref: ChangeDetectorRef,
    public formBuilder: FormBuilder,
    private ngZone: NgZone,
    private router: ActivatedRoute,
    private crudService: CrudService
  ) {
    this.eventForm = this.formBuilder.group({
      title: [''],
      date: '',
      location: [''],
      coordinates:[]
    });
  }
  ngOnInit(): void {
    this.router.params.subscribe((params) => {
      console.log(params); //log the entire params object
      console.log(params['id']); //log the value of id
      this.getEvent(params['id']);
    });
  }
  getEvent(id: any) {
    this.crudService.GetEvent(id).subscribe((res) => {
      console.log(res);
      this.event = res;
      this.event.date=formatDate(this.event.date, 'yyyy-MM-dd', 'en-US');

    });
  }
  handleAddressChange(address: any) {
    this.userAddress = address.formatted_address
    this.coordinates= [address.geometry.location.lat(),address.geometry.location.lng()]
    this.userLatitude = address.geometry.location.lat()
    this.userLongitude = address.geometry.location.lng()
    this.location= this.userAddress
     
  }
  onSubmit(): any {
    console.log(this.eventForm);
    this.crudService.updateEvent(this.event._id, this.eventForm.value).subscribe(
      () => {
        console.log('Data added successfully!');
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
