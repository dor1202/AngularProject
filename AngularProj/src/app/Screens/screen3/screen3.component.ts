import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServerServiceService } from '../../Services/server-service.service';

@Component({
  selector: 'app-screen3',
  templateUrl: './screen3.component.html',
  styleUrls: ['./screen3.component.scss']
})
export class Screen3Component {

  // Data members
  selectPick: string = "list";

  constructor(private router: Router, private service: ServerServiceService) { }

  selectChangeHandler(event: any) {
    this.selectPick = event.target.value;
  }

  ChangeScreen() {
    let name = document.getElementById('libName') as HTMLInputElement;
    if (name.value == '') {
      let item1 = document.getElementById('alertDiv') as HTMLElement;
      item1.style.display = 'block';
      return;
    }
    let desc = document.getElementById('libDesc') as HTMLInputElement;
    let descFinal = '';
    if (desc.value != null || desc.value != undefined)
      descFinal = desc.value;

    this.service.createDir(name.value, descFinal, this.selectPick);
    this.router.navigate(['/screen4']);
  }
}
