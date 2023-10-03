import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormBuilder } from "@angular/forms";
import { AppointmentService } from './../shared/appointment.service';
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
    private actRoute: ActivatedRoute,
    private router: Router

  ) {
    this.id = this.actRoute.snapshot.paramMap.get('id');
    this.aptService.getBooking(this.id).valueChanges().subscribe(res => {
      this.rdv = res;
    });
  }
  ngOnInit() {
  }
}
