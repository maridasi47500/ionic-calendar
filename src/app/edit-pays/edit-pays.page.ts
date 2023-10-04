import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormBuilder } from "@angular/forms";
import { PaysService } from './../shared/pays.service';
import * as  L from 'leaflet';
import { Map, tileLayer, marker, icon } from 'leaflet';
@Component({
  selector: 'app-edit-pays',
  templateUrl: './edit-pays.page.html',
  styleUrls: ['./edit-pays.page.scss'],
})
export class EditPaysPage implements OnInit {
  updatePaysForm: FormGroup;
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
    private paysService: PaysService,
    private actRoute: ActivatedRoute,
    private router: Router,
    public fb: FormBuilder
  ) {
    this.id = this.actRoute.snapshot.paramMap.get('id');
    this.paysService.getPays(this.id).valueChanges().subscribe((res: any) => {
      this.updatePaysForm.setValue(res);

      console.log({ lat: res.lat, lng: res.lon });
      this.addpopup({ lat: res.lat, lng: res.lon });
    });
  }
  ngOnInit() {
    this.updatePaysForm = this.fb.group({
      name: [''],
      lat: [''],
      lon: ['']
    })
    console.log(this.updatePaysForm.value)
    if (!this.map) {
      this.map = new L.Map('this_map').setView([33.6396965, -84.4304574], 23);
    }
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19
    }).addTo(this.map);
    if (!this.mymarker && !this.myapt) {
      this.addpopup({ lat: this.updatePaysForm.value.lat, lng: this.updatePaysForm.value.lon });
    }
    setTimeout(() => {
      this.map.invalidateSize();
    }, 0);



    this.map.on('click', this.onclickmap);
    this.map.invalidateSize();
  }
  updateForm() {
    this.paysService.updatePays(this.id, this.updatePaysForm.value)
      .then(() => {
        this.router.navigate(['/tabs/tab2']);
      })
      .catch(error => console.log(error));
  }
  onclickmap = (e: any) => {

    var latitude = e.latlng.lat;

    var longitude = e.latlng.lng;

    console.log(e, e.latlng, latitude, longitude);

    this.updatePaysForm.controls['lat'].setValue(latitude);
    this.updatePaysForm.controls['lon'].setValue(longitude);
    this.updatePaysForm.enable();
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

    this.mymarker.bindPopup('<pC\'est ici </p>').openPopup();
    setTimeout(() => {
      this.map.invalidateSize();
    }, 0);

  }
}
