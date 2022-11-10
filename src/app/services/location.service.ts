/* eslint-disable no-var */
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';


declare var google;

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor() { }

  geocode(latitude: number, longitude: number): Observable<any>{
    return new Observable<any>(observer => {
      console.log(latitude, longitude);

      const geocoder = new google.maps.Geocoder();
      const latlng = new google.maps.LatLng(latitude, longitude);
      console.log(latlng);

      geocoder.geocode({location: latlng}, (results, status) => {
        console.log(results, status);
        if(status === google.maps.GeocoderStatus.OK){
          observer.next(results[0]);
        }else{
          observer.error(status);
        }
        observer.complete();
      });
    });
  }
}
