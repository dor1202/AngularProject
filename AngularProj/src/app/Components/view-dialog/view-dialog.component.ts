import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-view-dialog',
  templateUrl: './view-dialog.component.html',
  styleUrls: ['./view-dialog.component.scss']
})
export class ViewDialogComponent {

  //#region Data members
  @Input() name: string;
  @Input() caption: string;
  @Input() categories: any[];
  @Input() location: any;
  @Input() favorite: boolean;
  @Input() privateMode: boolean;
  @Input() imgSrc: string;

  display: boolean = false;
  //#endregion

  constructor() { }

}
