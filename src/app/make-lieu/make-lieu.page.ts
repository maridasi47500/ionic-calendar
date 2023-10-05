import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LieuService } from './../shared/lieu.service';
import { PaysService } from './../shared/pays.service';
import { Pays } from './../shared/Pays';
import * as  L from 'leaflet';
import { Map, tileLayer, marker, icon } from 'leaflet';
@Component({
  selector: 'app-make-lieu',
  templateUrl: './make-lieu.page.html',
  styleUrls: ['./make-lieu.page.scss'],
})
export class MakeLieuPage implements OnInit {
  lieuForm: FormGroup;
  Countries: any = [];
  constructor(
    private countryService: PaysService,
    private aptService: LieuService,
    private router: Router,
    public fb: FormBuilder
  ) { }
  map: any;
  customMarkerIcon: any;
  popup: any;
  mymarker: any;
  fetchCountries() {
    this.countryService
      .getPaysList()
      .valueChanges()
      .subscribe((res: any) => {
        console.log(res);
      });
  }



  toIsoString(date: any) {
    var tzo = -date.getTimezoneOffset(),
      dif = tzo >= 0 ? '+' : '-',
      pad = function(num: any) {
        return (num < 10 ? '0' : '') + num;
      };

    return date.getFullYear() +
      '-' + pad(date.getMonth() + 1) +
      '-' + pad(date.getDate()) +
      'T' + pad(date.getHours()) +
      ':' + pad(date.getMinutes()) +
      ':' + pad(date.getSeconds()) +
      dif + pad(Math.floor(Math.abs(tzo) / 60)) +
      ':' + pad(Math.abs(tzo) % 60);
  }
  ngOnInit() {
    this.lieuForm = this.fb.group({
      name: [''],
      lat: [''],
      lon: [''],
      pays_id: [''],
    });
    if (!this.map) {
      this.map = new L.Map('make_lieu_map').setView([33.6396965, -84.4304574], 23);
    }
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19
    }).addTo(this.map);
    setTimeout(() => {
      this.map.invalidateSize();
    }, 0);


    this.customMarkerIcon = icon({
      iconUrl: 'assets/images/custom-marker-icon.png',
      iconSize: [64, 64],
      iconAnchor: [32, 64],
      popupAnchor: [0, -64]
    });
    this.map.on('click', this.onclickmap);
    this.map.invalidateSize();
    this.fetchCountries();
    let paysRes = this.countryService.getPaysList();
    paysRes.snapshotChanges().subscribe((res: any) => {
      this.Countries = [];
      res.forEach((item: any) => {

        let a: any = item.payload.toJSON();
        let restaurant = a;
        a['$key'] = item.key;
        this.Countries.push(a as Pays);

      });
      setTimeout(() => {
        this.map.invalidateSize();
      }, 0);
    });
  }
  formSubmit() {
    if (!this.lieuForm.valid) {
      return false;
    } else {
      return this.aptService
        .createLieu(this.lieuForm.value)
        .then((res: any) => {
          console.log(res);
          this.lieuForm.reset();
          this.router.navigate(['/']);
        })
        .catch((error: any) => console.log(error));
    }
  }
  onclickmap = (e: any) => {

    var latitude = e.latlng.lat;

    var longitude = e.latlng.lng;

    console.log(e, e.latlng, latitude, longitude);

    this.lieuForm.controls['lat'].setValue(latitude);
    this.lieuForm.controls['lon'].setValue(longitude);
    this.lieuForm.enable();
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
    setTimeout(() => {
      this.map.invalidateSize();
    }, 0);

  }

}
