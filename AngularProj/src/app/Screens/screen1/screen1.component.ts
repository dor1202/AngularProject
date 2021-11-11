import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServerServiceService } from '../../Services/server-service.service';

@Component({
  selector: 'app-screen1',
  templateUrl: './screen1.component.html',
  styleUrls: ['./screen1.component.scss']
})
export class Screen1Component implements OnInit {

  constructor(private router: Router, private service: ServerServiceService) { }

  ngOnInit(): void {
    this.checkFolder();
  }

  ChangeScreen() {
    this.router.navigate(['/screen2']);
  }

  checkFolder() {
    this.service.checkFolderExist()
      .subscribe(res => {
        if (res == true) this.router.navigate(['/screen4']);
      });
  }
}
