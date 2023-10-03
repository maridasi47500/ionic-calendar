import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormBuilder } from "@angular/forms";
import { AppointmentService } from './../shared/appointment.service';
import * as  L from 'leaflet';
import { Map, tileLayer, marker, icon } from 'leaflet';
@Component({
  selector: 'app-edit-appointment',
  templateUrl: './edit-appointment.page.html',
  styleUrls: ['./edit-appointment.page.scss'],
})
export class EditAppointmentPage implements OnInit {
  updateBookingForm: FormGroup;
  id: any;
  map: any;
  customMarkerIcon: any = icon({
        iconUrl: 'assets/images/custom-marker-icon.png',
        iconSize: [64, 64],
        iconAnchor: [32, 64],
        popupAnchor: [0, -64]
      });
  popup: any;
  mymarker: any;
  myapt: boolean = false;
  constructor(
    private aptService: AppointmentService,
    private actRoute: ActivatedRoute,
    private router: Router,
    public fb: FormBuilder
  ) {
    this.id = this.actRoute.snapshot.paramMap.get('id');
    this.aptService.getBooking(this.id).valueChanges().subscribe(res => {
      this.updateBookingForm.setValue(res);

      console.log({ lat: res.lat, lng: res.lon });
      this.addpopup({ lat: res.lat, lng: res.lon });
    });
  }
  ngOnInit() {
    this.updateBookingForm = this.fb.group({
      name: [''],
      email: [''],
      date: [''],
      lat: [''],
      lon: [''],
      mobile: ['']
    })
    console.log(this.updateBookingForm.value)
    if (!this.map) {
      this.map = new L.Map('my_map').setView([33.6396965, -84.4304574], 23);
    }
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19
    }).addTo(this.map);
    if (!this.mymarker && !this.myapt) {
      this.addpopup({ lat: this.updateBookingForm.value.lat, lng: this.updateBookingForm.value.lon });
    }
    setTimeout(() => {
      this.map.invalidateSize();
    }, 0);



    this.map.on('click', this.onclickmap);
    this.map.invalidateSize();
  }
  updateForm() {
    this.aptService.updateBooking(this.id, this.updateBookingForm.value)
      .then(() => {
        this.router.navigate(['/']);
      })
      .catch(error => console.log(error));
  }
  onclickmap = (e: any) => {

    var latitude = e.latlng.lat;

    var longitude = e.latlng.lng;

    console.log(e, e.latlng, latitude, longitude);

    this.updateBookingForm.controls['lat'].setValue(latitude);
    this.updateBookingForm.controls['lon'].setValue(longitude);
    this.updateBookingForm.enable();
    this.addpopup(e.latlng);



  }

  addpopup = (latlon: any) => {
    this.myapt = true;

    if (this.mymarker) {

      this.map.removeLayer(this.mymarker)

    }

    this.mymarker = new L.Marker(latlon, {

      icon: this.customMarkerIcon,

      draggable: true
    }).addTo(this.map);

    this.mymarker.bindPopup('<p>Votre rendez-vous est ici </p>').openPopup();
    setTimeout(() => {
      this.map.invalidateSize();
    }, 0);

  }
}
