import { Component, OnInit, NgZone, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from './../../service/crud.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import {
  onAuthUIStateChange,
  CognitoUserInterface,
  AuthState,
} from '@aws-amplify/ui-components';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css'],
})
export class AddEventComponent implements OnInit {
  eventForm: FormGroup;
  user: CognitoUserInterface | undefined;
  authState: AuthState = AuthState.SignedOut;
  userAddress: string = ''
  userLatitude: string = ''
  userLongitude: string = ''
  location:String=''
  coordinates:any

  constructor(
    private ref: ChangeDetectorRef,
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private crudService: CrudService
  ) {
    this.eventForm = this.formBuilder.group({
      title: [''],
      date: '',
      coordinates:[],
      location: [''],
    });
  }
  ngOnInit() {
    onAuthUIStateChange((authState, authData) => {
      this.authState = authState;
      this.user = authData as CognitoUserInterface;
      console.log(this.user);
      this.ref.detectChanges();
    });
  }

  ngOnDestroy() {
    return onAuthUIStateChange;
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
    this.crudService.AddEvent(this.eventForm.value).subscribe(
      () => {
        console.log('Data added successfully!');
        this.ngZone.run(() => this.router.navigateByUrl('/events'));
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
