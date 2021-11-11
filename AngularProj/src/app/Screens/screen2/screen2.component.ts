import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServerServiceService } from '../../Services/server-service.service';

@Component({
  selector: 'app-screen2',
  templateUrl: './screen2.component.html',
  styleUrls: ['./screen2.component.scss']
})
export class Screen2Component {

  constructor(private service: ServerServiceService,
    private router: Router) { }

  ChangeScreen() {
    let item = document.getElementById('priveModeInp') as HTMLInputElement;
    if (item.value == '') {
      let item1 = document.getElementById('alertDiv') as HTMLElement;
      item1.style.display = 'block';
      return;
    }
    let res = this.checkIfPasswordValid(item.value);
    if (res == false) {
      let item1 = document.getElementById('alertDiv') as HTMLElement;
      item1.style.display = 'block';
      return;
    }
    this.service.savePrivateCode(item.value);
    this.router.navigate(['/screen3']);
  }

  checkIfPasswordValid(val: string): boolean {
    let isnum = /^\d+$/.test(val);
    if (!isnum) return false;
    if (val.length < 5 || val.length > 10) return false;
    return true;
  }
}
