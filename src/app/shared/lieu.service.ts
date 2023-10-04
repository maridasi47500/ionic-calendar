import { Injectable } from '@angular/core';
import { Lieu } from '../shared/Lieu';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';
@Injectable({
  providedIn: 'root',
})
export class LieuService {
  lieuListRef: AngularFireList<any>;
  lieuRef: AngularFireObject<any>;
  constructor(private db: AngularFireDatabase) { }
  // Create
  createLieu(apt: Lieu) {
    return this.lieuListRef.push({
      name: apt.name,
      pays_id: apt.pays_id,
      lat: apt.lat,
      lon: apt.lon,
    });
  }
  // Get Single
  getLieu(id: string) {
    this.lieuRef = this.db.object('/lieu/' + id);
    return this.lieuRef;
  }
  // Get List
  getLieuList() {
    this.lieuListRef = this.db.list('/lieu');
    return this.lieuListRef;
  }
  // Update
  updateLieu(id: any, apt: Lieu) {
    return this.lieuRef.update({
      name: apt.name,
      pays_id: apt.pays_id,
      lat: apt.lat,
      lon: apt.lon,
    });
  }
  // Delete
  deleteLieu(id: string) {
    this.lieuRef = this.db.object('/lieu/' + id);
    this.lieuRef.remove();
  }
}
