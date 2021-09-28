import { Injectable } from '@angular/core';
import { Event } from './Event';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class CrudService {

  // Node/Express API
  REST_API: string = 'http://localhost:3000';
  FORECAST_API: string = 'http://api.openweathermap.org/data/2.5/onecall?exclude=hourly,minutely&id=524901&cnt=7&appid=e7327d45e48101b6178e3793c47b4544&units=metric';

  // Http Header
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) { }

  // Add
  AddEvent(data: Event): Observable<any> {
    let API_URL = `${this.REST_API}/events`;
    return this.httpClient.post(API_URL, data)
      .pipe(
        catchError(this.handleError)
      )
  }

  // Get all objects
  GetWeather(lat:any,lng:any){
    return this.httpClient.get(this.FORECAST_API+'&lat='+lat+'&lon='+lng)
  }
  GetEvents() {
    return this.httpClient.get(`${this.REST_API}/events`);
  }

  // Get single object
  GetEvent(id:any): Observable<any> {
    let API_URL = `${this.REST_API}/event/${id}`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders })
      .pipe(map((res: any) => {
          return res || {}
        }),
        catchError(this.handleError)
      )
  }

  // Update
  updateEvent(id:any, data:any): Observable<any> {
    let API_URL = `${this.REST_API}/event/${id}`;
    return this.httpClient.put(API_URL, data, { headers: this.httpHeaders })
      .pipe(
        catchError(this.handleError)
      )
  }

  // Delete
  deleteEvent(id:any): Observable<any> {
    let API_URL = `${this.REST_API}/event/${id}`;
    return this.httpClient.delete(API_URL, { headers: this.httpHeaders}).pipe(
        catchError(this.handleError)
      )
  }


  // Error 
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Handle client error
      errorMessage = error.error.message;
    } else {
      // Handle server error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}