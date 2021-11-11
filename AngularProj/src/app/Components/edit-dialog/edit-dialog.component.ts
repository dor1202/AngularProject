import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ServerServiceService } from 'src/app/Services/server-service.service';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss']
})
export class EditDialogComponent {

  //#region Data members
  @Output() newItemEvent = new EventEmitter<boolean>();

  @Input() name: string;
  @Input() caption: string;
  @Input() location: any;
  @Input() favorite: boolean;
  @Input() privateMode: boolean;
  @Input() imgSrc: string;
  @Input() imageId: string;
  @Input() images: any[];
  @Input() categoryList: any[] = [];
  @Input() selectedCategories: any[] = [];

  display: boolean = false;
  //#endregion

  constructor(private service: ServerServiceService) { }

  toggelprivate() {
    this.privateMode = !this.privateMode;
    let item = document.getElementById('private-input') as HTMLElement;
    item = item.childNodes[0] as HTMLElement;
    if (item.classList.contains('pi-lock-open')) {
      item.classList.remove('pi-lock-open');
      item.classList.add('pi-lock');
      return;
    }
    else {
      item.classList.remove('pi-lock');
      item.classList.add('pi-lock-open');
    }
  }

  toggelFavorite() {
    this.favorite = !this.favorite;
    let item = document.getElementById('favorite-input') as HTMLElement;
    item = item.childNodes[0] as HTMLElement;
    if (item.classList.contains('pi-star-o')) {
      item.classList.remove('pi-star-o');
      item.classList.add('pi-star');
    }
    else {
      item.classList.remove('pi-star');
      item.classList.add('pi-star-o');
    }
  }

  submitChanges() {
    let n = document.getElementById('name-float-input') as HTMLInputElement;
    let d = document.getElementById('desc-float-input') as HTMLInputElement;
    if (n.value == '') return;
    this.service.changTheImageData(this.imageId, n.value, d.value, this.selectedCategories, this.location, this.favorite, this.privateMode);
    this.service.getImages().subscribe(res => {
      this.images = [];
      for (let index = 0; index < res.length; index++) {
        if (index % 2 != 0)
          this.images.push(res[index]);
      }
    });
    // the output is for closing the popup
    this.newItemEvent.emit();
  }

  positionUpdate(param) {
    this.location.Lat = param[0];
    this.location.Lan = param[1];
  }
}
