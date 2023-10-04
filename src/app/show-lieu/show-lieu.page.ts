import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormBuilder } from "@angular/forms";
import { LieuService } from './../shared/lieu.service';
import { PaysService } from './../shared/pays.service';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-show-lieu',
  templateUrl: './show-lieu.page.html',
  styleUrls: ['./show-lieu.page.scss'],
})
export class ShowLieuPage implements OnInit {

  updateLieuForm: FormGroup;
  id: any;
    rdv:any={};
  constructor(
    private lieuService: LieuService,
    private paysService: PaysService,
    private actRoute: ActivatedRoute,
    private router: Router

  ) {
   this.id = this.actRoute.snapshot.paramMap.get('id');

    this.lieuService.getLieu(this.id).valueChanges().subscribe(res => {
	    console.log(res)
      this.rdv = res;
    this.paysService.getPays(res.pays_id).valueChanges().subscribe(myres => {
      this.rdv.nompays = myres.name;
    });
    });
  }
  ngOnInit() {
  }
    deleteLieu(id: any) {
	        console.log(id);
		    if (window.confirm('Do you really want to delete?')) {
			          this.lieuService.deleteLieu(id);
				      }
				        }
}
