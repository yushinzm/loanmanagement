import { AddLoanPage } from './../modals/add-loan/add-loan.page';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ApproveClientPage } from '../../admin/clients/approve-client/approve-client.page';

@Component({
  selector: 'app-loans',
  templateUrl: './loans.page.html',
  styleUrls: ['./loans.page.scss'],
})
export class LoansPage implements OnInit {

  path = "approved";
  constructor(private router: Router, public modalController: ModalController,
  ) { }

  ngOnInit() {
    this.path = this.router.url.split("/")[3];
  }

  change(path: string) {
    this.router.navigate(['client/loans/', path]);
    this.path = path;
  }

  async presentModal() {

    const modal = await this.modalController.create({
      component: AddLoanPage,
      cssClass: 'add_a_role',
      // componentProps: {  }
    });
    return await modal.present();

  }
}

