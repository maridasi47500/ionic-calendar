import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormBuilder } from "@angular/forms";
import { AppointmentService } from './../shared/appointment.service';
import { PaysService } from './../shared/pays.service';
import { LieuService } from './../shared/lieu.service';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-show-appointment',
  templateUrl: './show-appointment.page.html',
  styleUrls: ['./show-appointment.page.scss'],
})
export class ShowAppointmentPage implements OnInit {

  updateBookingForm: FormGroup;
  id: any;
    rdv:any={};
  constructor(
    private aptService: AppointmentService,
    private paysService: PaysService,
    private lieuService: LieuService,
    private actRoute: ActivatedRoute,
    private router: Router

  ) {
   this.id = this.actRoute.snapshot.paramMap.get('id');

    this.aptService.getBooking(this.id).valueChanges().subscribe(res => {
	    console.log(res)
	    res.date=formatDate(new Date(res.date), 'yyy-MM-dd HH:mm', "fr-FR");
      this.rdv = res;
    this.paysService.getPays(res.pays_id).valueChanges().subscribe(myres => {
      this.rdv.nompays = myres.name;
    });
    this.lieuService.getLieu(res.lieu_id).valueChanges().subscribe(myres => {
      this.rdv.nomlieu = myres.name;
    });
    });
  }
  ngOnInit() {
  }
    deleteBooking(id: any) {
	        console.log(id);
		    if (window.confirm('Do you really want to delete?')) {
			          this.aptService.deleteBooking(id);
				      }
				        }
}
