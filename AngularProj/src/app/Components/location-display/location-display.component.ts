import { Component, Input, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-location-display',
  templateUrl: './location-display.component.html',
  styleUrls: ['./location-display.component.scss']
})
export class LocationDisplayComponent implements OnInit, OnDestroy {

  //#region Data members
  @Input() currentLan: number;
  @Input() currentLat: number;
  lat = 51.678418;
  lng = 7.809007;
  destroyed: boolean = false;
  //#endregion

  constructor() { }

  ngOnDestroy(): void {
    this.destroyed = true;
  }

  ngOnInit(): void {
    if (this.currentLan != undefined && this.currentLat != undefined) {
      this.lat = this.currentLat;
      this.lng = this.currentLan;
    }
    this.getCurrentLocation();
  }

  getCurrentLocation() {
    // This if exist because the user can deny access to location
    if (navigator.geolocation) {
      //getting current latitude & longitude using web api
      if (this.currentLan == undefined && this.currentLat == undefined) {
        navigator.geolocation.getCurrentPosition(position => {
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
        });
      }
    }
  }
}
