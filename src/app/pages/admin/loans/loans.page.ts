import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loans',
  templateUrl: './loans.page.html',
  styleUrls: ['./loans.page.scss'],
})
export class LoansPage implements OnInit {


  path = "approvedLoans";
  constructor(private router: Router) { }

  ngOnInit() {
    this.path = this.router.url.split("/")[3];
  }

  change(path: string) {
    this.router.navigate(['admin/loans/', path]);
    this.path = path;
  }
}
