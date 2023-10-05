import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormBuilder } from "@angular/forms";
import { LieuService } from './../shared/lieu.service';
import { PaysService } from './../shared/pays.service';
import { Pays } from './../shared/Pays';
import * as  L from 'leaflet';
import { Map, tileLayer, marker, icon } from 'leaflet';
@Component({
  selector: 'app-edit-lieu',
  templateUrl: './edit-lieu.page.html',
  styleUrls: ['./edit-lieu.page.scss'],
})
export class EditLieuPage implements OnInit {
  Countries: any = [];
  updateLieuForm: FormGroup;
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
    private lieuService: LieuService,
    private actRoute: ActivatedRoute,
    private router: Router,
    public fb: FormBuilder
  ) {
    this.id = this.actRoute.snapshot.paramMap.get('id');
    this.lieuService.getLieu(this.id).valueChanges().subscribe(res => {
      this.updateLieuForm.setValue(res);

      console.log({ lat: res.lat, lng: res.lon });
      this.addpopup({ lat: res.lat, lng: res.lon });
    });
  }
  fetchCountries() {
	      this.paysService
	            .getPaysList()
		          .valueChanges()
			        .subscribe((res: any) => {
					        console.log(res);
						      });
						        }

  ngOnInit() {
    this.updateLieuForm = this.fb.group({
      name: [''],
      pays_id: [''],
      lat: [''],
      lon: [''],
    })
    console.log(this.updateLieuForm.value)
    if (!this.map) {
      this.map = new L.Map('edit_lieu_map').setView([33.6396965, -84.4304574], 23);
    }
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19
    }).addTo(this.map);
    if (!this.mymarker && !this.myapt) {
      this.addpopup({ lat: this.updateLieuForm.value.lat, lng: this.updateLieuForm.value.lon });
    }
    setTimeout(() => {
      this.map.invalidateSize();
    }, 0);
      this.fetchCountries();
          let paysRes = this.paysService.getPaysList();
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



    this.map.on('click', this.onclickmap);
    this.map.invalidateSize();
  }
  updateForm() {
    this.lieuService.updateLieu(this.id, this.updateLieuForm.value)
      .then(() => {
        this.router.navigate(['/']);
      })
      .catch(error => console.log(error));
  }
  onclickmap = (e: any) => {

    var latitude = e.latlng.lat;

    var longitude = e.latlng.lng;

    console.log(e, e.latlng, latitude, longitude);

    this.updateLieuForm.controls['lat'].setValue(latitude);
    this.updateLieuForm.controls['lon'].setValue(longitude);
    this.updateLieuForm.enable();
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
