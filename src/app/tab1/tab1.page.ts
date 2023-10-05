import { Component, OnInit } from '@angular/core';
import { Appointment } from '../shared/Appointment';
import { AppointmentService } from './../shared/appointment.service';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { Map, tileLayer, marker, icon } from 'leaflet';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as  L from 'leaflet';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  Bookings: any = [];
  constructor(private aptService: AppointmentService, public http: HttpClient,
    public plt: Platform,
    public router: Router) { }
  map: any;
  customMarkerIcon: any;
  popup: any;
  mymarker: any;




  ngOnInit() {
    this.map = new L.Map('map').setView([33.6396965, -84.4304574], 23);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19
    }).addTo(this.map);

    this.customMarkerIcon = icon({
      iconUrl: 'assets/images/custom-marker-icon.png',
      iconSize: [64, 64],
      iconAnchor: [32, 64],
      popupAnchor: [0, -64]
    });
    //this.map.on('click', this.onclickmap);
    this.map.invalidateSize();

    this.fetchBookings();
    let bookingRes = this.aptService.getBookingList();
    bookingRes.snapshotChanges().subscribe((res) => {
      this.Bookings = [];
      res.forEach((item) => {

        let a: any = item.payload.toJSON();
        let restaurant = a;
        a['$key'] = item.key;
        this.Bookings.push(a as Appointment);
        var homemarker = L.marker([restaurant.lat, restaurant.lon], { draggable: true, icon: this.customMarkerIcon })
          .on('click', () => this.router.navigateByUrl('/appointments/' + item.key))
          .bindPopup(`<b>${restaurant.name}</b>`, { autoClose: false, closeButton: true });
        homemarker.addTo(this.map).openPopup();
        setTimeout(() => {
          this.map.invalidateSize();
        }, 0);

      });
      var d = new Date();
      d.setHours(0,0,0,0);
      this.Bookings=this.Bookings.filter((x:any)=>new Date(x.date) > d)
        setTimeout(() => {
          this.map.invalidateSize();
        }, 0);
    });
  }
  fetchBookings() {
    this.aptService
      .getBookingList()
      .valueChanges()
      .subscribe((res) => {
        console.log(res);
      });
  }
  deleteBooking(id: any) {
    console.log(id);
    if (window.confirm('Do you really want to delete?')) {
      this.aptService.deleteBooking(id);
    }
  }
  onclickmap = (e: any) => {
    var latitude = e.latlng.lat;
    var longitude = e.latlng.lng;
    console.log(e, latitude, longitude);
    //this.map =  new L.Map('map').setView([33.6396965, -84.4304574], 23);

    this.addpopup(e.latlng);


  }
  addpopup = (latlon: any) => {
    if (this.mymarker) {
      this.map.removeLayer(this.mymarker)
    }
    this.mymarker = new L.Marker(latlon, {
      icon: this.customMarkerIcon,
      draggable: true
    }).addTo(this.map);
    this.mymarker.bindPopup('<p>You are here </p>').openPopup();
  }
  createapt() {
    this.router.navigateByUrl('make-appointment');
  }
}
