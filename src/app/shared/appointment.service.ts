import { Injectable } from '@angular/core';
import { Appointment } from '../shared/Appointment';
import {
	  AngularFireDatabase,
	    AngularFireList,
	      AngularFireObject,
} from '@angular/fire/compat/database';
@Injectable({
	  providedIn: 'root',
})
export class AppointmentService {
	  bookingListRef: AngularFireList<any>;
	    bookingRef: AngularFireObject<any>;
	      constructor(private db: AngularFireDatabase) {}
	      // Create
	         createBooking(apt: Appointment) {
	             return this.bookingListRef.push({
	                   name: apt.name,
	                   date: apt.date,
	                         email: apt.email,
	                               mobile: apt.mobile,
	                               pays_id: apt.pays_id,
	                               lieu_id: apt.lieu_id,
	                                                                                           lat: apt.lat,
	                                                                                           lon: apt.lon,
	                                   });
	                                     }
	                                       // Get Single
	                                         getBooking(id: string) {
	                                             this.bookingRef = this.db.object('/appointment/' + id);
	                                                 return this.bookingRef;
	                                                   }
	                                                     // Get List
	                                                       getBookingList() {
	                                                           this.bookingListRef = this.db.list('/appointment');
	                                                               return this.bookingListRef;
	                                                                 }
	                                                                   // Update
	                                                                     updateBooking(id: any, apt: Appointment) {
	                                                                         return this.bookingRef.update({
	                                                                               name: apt.name,
	                                                                                     email: apt.email,
	                                                                                           mobile: apt.mobile,
	                                                                                           date: apt.date,
	                               pays_id: apt.pays_id,
	                               lieu_id: apt.lieu_id,
	                                                                                           lat: apt.lat,
	                                                                                           lon: apt.lon,
	                                                                                               });
	                                                                                                 }
	                                                                                                   // Delete
	                                                                                                     deleteBooking(id: string) {
	                                                                                                         this.bookingRef = this.db.object('/appointment/' + id);
	                                                                                                             this.bookingRef.remove();
	                                                                                                               }
	                                                                                                               }
