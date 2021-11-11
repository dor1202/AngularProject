import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ServerServiceService } from '../../Services/server-service.service';

@Component({
  selector: 'app-web-up',
  templateUrl: './web-up.component.html',
  styleUrls: ['./web-up.component.scss']
})
export class WebUpComponent implements OnInit, AfterViewInit {

  //#region Data members
  unspleshData: any[];
  inpValue: string = '';
  page: number = 1;
  searchStatus: boolean;
  addImageDialog: boolean;
  picName: string;
  pickedImage;
  lastSearch: string;
  currentImage: any;
  //#endregion

  constructor(private service: ServerServiceService) { }

  ngAfterViewInit(): void {
    // for removing the scroller
    let item = document.getElementsByClassName('mat-tab-body-content')[0] as HTMLElement;
    item.style.overflow = 'unset';
  }

  ngOnInit(): void {
    this.service.getImagesFromUnsplesh(this.page).subscribe(res => {
      this.searchStatus = false;
      this.page++;
      this.unspleshData = res;
    });
  }

  checkMessage(param) {
    this.currentImage = param;
    this.picName = param.alt_description;
    if (param.alt_description == null || param.alt_description == '')
      this.picName = "This image don't have description";
    this.pickedImage = param;
    this.addImageDialog = true;
  }

  searchFunc() {
    if (this.inpValue == '') return;
    this.page = 1;
    this.lastSearch = this.inpValue;
    this.service.searchImagesFromUnsplesh(this.lastSearch, this.page).subscribe(res => {
      this.searchStatus = true;
      this.page++;
      this.unspleshData = res.results;
    });
  }

  submitImage() {
    let item = document.getElementById(this.currentImage.alt_description) as HTMLElement;
    item.style.display = 'none';
    this.service.uploadUnspleshImage(this.pickedImage);
    this.addImageDialog = false;
  }

  nextPage() {
    if (this.searchStatus == true) {
      this.service.searchImagesFromUnsplesh(this.lastSearch, this.page).subscribe(res => {
        this.page++;
        this.unspleshData = res.results;
      });
    }
    else {
      this.service.getImagesFromUnsplesh(this.page).subscribe(res => {
        this.page++;
        this.unspleshData = res;
      });
    }
  }

  returnToRandomSearch() {
    this.page = 1;
    this.service.getImagesFromUnsplesh(this.page).subscribe(res => {
      this.searchStatus = false;
      this.page++;
      this.unspleshData = res;
    });
  }
}
