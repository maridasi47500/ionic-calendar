import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AppointmentService } from './../shared/appointment.service';
import * as  L from 'leaflet';
import { Map, tileLayer, marker, icon } from 'leaflet';
@Component({
	  selector: 'app-make-appointment',
	    templateUrl: './make-appointment.page.html',
	      styleUrls: ['./make-appointment.page.scss'],
})
export class MakeAppointmentPage implements OnInit {
	  bookingForm: FormGroup;
	    constructor(
		        private aptService: AppointmentService,
			    private router: Router,
			        public fb: FormBuilder
				  ) {}
				                                      map:any;
								                                           customMarkerIcon:any;
													                                        popup:any;
																		                                     mymarker:any;
				    
																						     

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
					        this.bookingForm = this.fb.group({
							      name: [''],
							            email: [''],
								          mobile: [''],
								          date: [this.toIsoString(new Date())],
								          lat: [''],
								          lon: [''],
									      });
									      if (!this.map){
						                            this.map =  new L.Map('other_map').setView([33.6396965, -84.4304574], 23);
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
														                                                                                                                                                                                                                                                                                                                                                                                                    iconAnchor: [32,64],
														                                                                                                                                                                                                                                                                                                                                                                                                                                                                            popupAnchor: [0, -64]
														                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        });
														                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    this.map.on('click', this.onclickmap);
														                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                this.map.invalidateSize();
									        }
										  formSubmit() {
											      if (!this.bookingForm.valid) {
												            return false;
													        } else {
															      return this.aptService
															              .createBooking(this.bookingForm.value)
																              .then((res) => {
																		                console.log(res);
																				          this.bookingForm.reset();
																					            this.router.navigate(['/home']);
																						            })
																							            .catch((error) => console.log(error));
																								        }
																									  }
																									      onclickmap = (e: any)=>{

																										                   var latitude = e.latlng.lat;

																												                 var longitude = e.latlng.lng;

																														               console.log(e,latitude,longitude);
																															       
																															       this.bookingForm.controls['lat'].setValue(latitude);
																															       this.bookingForm.controls['lon'].setValue(longitude);
																															       this.bookingForm.enable();
																															                                   this.addpopup(e.latlng);
																															       
																															       
																															       
																															                                       }
																															       
																															                                           addpopup=(latlon: any)=>{
																															       
																															                                                       if (this.mymarker){
																															       
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
