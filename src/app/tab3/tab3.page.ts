import { Component, OnInit } from '@angular/core';
import { Lieu } from '../shared/Lieu';
import { LieuService } from './../shared/lieu.service';
import { Pays } from '../shared/Pays';
import { PaysService } from './../shared/pays.service';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { Map, tileLayer, marker, icon } from 'leaflet';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as  L from 'leaflet';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  Lieux: any = [];
  constructor(private lieuService: LieuService, public http: HttpClient,
    public plt: Platform,
    public router: Router) { }
  map: any;
  customMarkerIcon: any;
  popup: any;
  mymarker: any;

  ngOnInit() {
    this.map = new L.Map('lieu_map').setView([33.6396965, -84.4304574], 23);
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

    this.fetchLieux();
    let paysRes = this.lieuService.getLieuList();
    paysRes.snapshotChanges().subscribe((res: any) => {
      this.Lieux = [];
      res.forEach((item: any) => {

        let a: any = item.payload.toJSON();
        let restaurant = a;
        a['$key'] = item.key;
        this.Lieux.push(a as Lieu);
        var homemarker = L.marker([restaurant.lat, restaurant.lon], { draggable: true, icon: this.customMarkerIcon })
          .on('click', () => this.router.navigateByUrl('/pays/' + item.key))
          .bindPopup(`<b>${restaurant.name}</b>`, { autoClose: false, closeButton: true });
        homemarker.addTo(this.map).openPopup();
        setTimeout(() => {
          this.map.invalidateSize();
        }, 0);

      });
        setTimeout(() => {
          this.map.invalidateSize();
        }, 0);
    });
  }
  fetchLieux() {
    this.lieuService
      .getLieuList()
      .valueChanges()
      .subscribe((res: any) => {
        console.log(res);
      });
  }
  deleteLieu(id: any) {
    console.log(id);
    if (window.confirm('Do you really want to delete?')) {
      this.lieuService.deleteLieu(id);
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
    this.router.navigateByUrl('make-lieu');
  }

}
