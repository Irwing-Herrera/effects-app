import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styles: [``]
})
export class NavBarComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  irUsuario(id: string) {
    if (!id) return;
    else {
      this.router.navigate([`usuario/${id}`]);
    }
  }
}
