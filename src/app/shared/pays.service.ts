import { Injectable } from '@angular/core';
import { Pays } from '../shared/Pays';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';
@Injectable({
  providedIn: 'root',
})
export class PaysService {
  paysListRef: AngularFireList<any>;
  paysRef: AngularFireObject<any>;
  constructor(private db: AngularFireDatabase) { }
  // Create
  createPays(apt: Pays) {
    return this.paysListRef.push({
      name: apt.name,
      lat: apt.lat,
      lon: apt.lon,
    });
  }
  // Get Single
  getPays(id: string) {
    this.paysRef = this.db.object('/pays/' + id);
    return this.paysRef;
  }
  // Get List
  getPaysList() {
    this.paysListRef = this.db.list('/pays');
    return this.paysListRef;
  }
  // Update
  updatePays(id: any, apt: Pays) {
    return this.paysRef.update({
      name: apt.name,
      lat: apt.lat,
      lon: apt.lon,
    });
  }
  // Delete
  deletePays(id: string) {
    this.paysRef = this.db.object('/pays/' + id);
    this.paysRef.remove();
  }
}
