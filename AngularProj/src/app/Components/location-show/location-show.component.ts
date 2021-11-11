import { ChangeDetectorRef, Component, OnDestroy, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-location-show',
  templateUrl: './location-show.component.html',
  styleUrls: ['./location-show.component.scss']
})
export class LocationShowComponent implements OnInit, OnDestroy {

  //#region Data members
  @Input() currentLan: number;
  @Input() currentLat: number;
  @Output() positionUpdated = new EventEmitter<number[]>();
  lat = 51.678418;
  lng = 7.809007;
  destroyed: boolean = false;
  //#endregion

  constructor(private ref: ChangeDetectorRef) { }

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
    // this if exist becurse the user can deny access to location
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

  placeMarkerAndPanTo(latLng: google.maps.LatLng, map: google.maps.Map) {
    // sets the location to where the user clicked
    this.lat = latLng.lat();
    this.lng = latLng.lng();

    // Send new marker to dialog
    const arr = [this.lat, this.lng];
    this.positionUpdated.emit(arr);

    // make sure to update component
    if (!this.destroyed)
      this.ref.detectChanges();
  }

  // on mao ready
  mapReady(map) {
    // add event listener to click on map
    map.addListener("click", (e) => {
      // pass clicked position and the map ref
      this.placeMarkerAndPanTo(e.latLng, map);
    });
  }
}
