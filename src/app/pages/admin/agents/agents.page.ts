import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agents',
  templateUrl: './agents.page.html',
  styleUrls: ['./agents.page.scss'],
})
export class AgentsPage implements OnInit {

  path = "approvedAgents";
  constructor(private router: Router) { }

  ngOnInit() {
    this.path = this.router.url.split("/")[3];
  }

  change(path: string) {
    this.router.navigate(['admin/agents/', path]);
    this.path = path;
  }
}
