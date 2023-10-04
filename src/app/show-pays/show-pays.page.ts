import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormBuilder } from "@angular/forms";
import { PaysService } from './../shared/pays.service';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-show-pays',
  templateUrl: './show-pays.page.html',
  styleUrls: ['./show-pays.page.scss'],
})
export class ShowPaysPage implements OnInit {

  updatePaysForm: FormGroup;
  id: any;
    rdv:any={};
  constructor(
    private paysService: PaysService,
    private actRoute: ActivatedRoute,
    private router: Router

  ) {
    this.id = this.actRoute.snapshot.paramMap.get('id');
    this.paysService.getPays(this.id).valueChanges().subscribe(res => {
	    console.log(res)
	    res.date=formatDate(new Date(res.date), 'yyy-MM-dd HH:mm', "fr-FR");
      this.rdv = res;
    });
  }
  ngOnInit() {
  }
    deletePays(id: any) {
	        console.log(id);
		    if (window.confirm('Do you really want to delete?')) {
			          this.paysService.deletePays(id);
				      }
				        }
}
