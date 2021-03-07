import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.page.html',
  styleUrls: ['./clients.page.scss'],
})
export class ClientsPage implements OnInit {

  path = "approvedClients";
  constructor(private router: Router) { }

  ngOnInit() {
    this.path = this.router.url.split("/")[3];
  }

  change(path: string) {
    this.router.navigate(['admin/clients/', path]);
    this.path = path;
  }
}
