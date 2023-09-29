import { Component, OnInit } from '@angular/core';
import { Appointment } from '../shared/Appointment';
import { AppointmentService } from './../shared/appointment.service';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { Map, tileLayer, marker, icon } from 'leaflet';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';

@Component({
	  selector: 'app-tab1',
	    templateUrl: 'tab1.page.html',
	      styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
	  Bookings: any = [];
	    constructor(private aptService: AppointmentService,public http: Http,
		                     public plt: Platform,
		                     public router: Router) {}
		initMap() {
			    const map = new Map('map').setView([33.6396965, -84.4304574], 23);

			        tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
					      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					          }).addTo(map);
					
					              const customMarkerIcon = icon({
					                    iconUrl: 'assets/images/custom-marker-icon.png',
					                          iconSize: [64, 64], 
					                                popupAnchor: [0, -20]
					                                    });
					
					                                                                      }
					
	      ngOnInit() {
		      this.initMap();
		          this.fetchBookings();
			      let bookingRes = this.aptService.getBookingList();
			          bookingRes.snapshotChanges().subscribe((res) => {
					        this.Bookings = [];
						      res.forEach((item) => {
							      let restaurant=item;
							              let a: any = item.payload.toJSON();
								              a['$key'] = item.key;
									              this.Bookings.push(a as Appointment);
	                                              marker([restaurant.lat, restaurant.lon], {icon: customMarkerIcon})
					                                                    .bindPopup(`<b>${restaurant.name}</b>`, { autoClose: false })
					                                                          .on('click', () => this.router.navigateByUrl('/appointments/'+restaurant.key))
					                                                                .addTo(map).openPopup();
					
										            });
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
																								onclickmap($e: any){
																									 var latitude = $e.latlng.lat; 
																									  var longitude = $e.latlng.lng;     
																									  alert(latitude);

																								}
																								createapt(){
																									this.router.navigateByUrl('create-appointment');
																								}
}
