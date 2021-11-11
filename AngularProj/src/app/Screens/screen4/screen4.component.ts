import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-screen4',
  templateUrl: './screen4.component.html',
  styleUrls: ['./screen4.component.scss']
})
export class Screen4Component implements OnInit {

  constructor(private router: Router) {

  }
  ngOnInit(): void {
    let item = document.getElementsByClassName('mat-tab-body-wrapper')[0] as HTMLElement;
    item.style.height = "486px";
  }

  ChangeScreen() {
    this.router.navigate(['/screen5']);
  }
}
