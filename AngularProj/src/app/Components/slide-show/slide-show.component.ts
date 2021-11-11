import { Component, OnInit } from '@angular/core';
import { ServerServiceService } from 'src/app/Services/server-service.service';

@Component({
  selector: 'app-slide-show',
  templateUrl: './slide-show.component.html',
  styleUrls: ['./slide-show.component.scss']
})
export class SlideShowComponent implements OnInit {

  //#region Data members
  images: any[];
  imageElement: HTMLImageElement;
  currentIndex: any = 0;
  changeImageSpeed = 3000;
  imageObject: Array<any> = [];
  nonePrivateImages: any[];
  privateModeStatus: boolean;
  //#endregion

  constructor(private service: ServerServiceService) { }

  ngOnInit(): void {
    this.imageElement = document.getElementById('slideShowImg') as HTMLImageElement;
    // Recive the images, both privte and none private, private mode status (I don't like this option, had to do it in the time limit)
    // set an interval that refresh image source every 3 seconds
    this.service.getImages().subscribe(res => {
      this.images = [];
      for (let index = 0; index < res.length; index++) {
        if (index % 2 == 0) continue;
        else this.images.push(res[index]);
      }

      this.service.getImagesNonePrivate().subscribe(res => {
        this.nonePrivateImages = [];
        for (let index = 0; index < res.length; index++) {
          if (index % 2 == 0) continue;
          else this.nonePrivateImages.push(res[index]);
        }

        this.service.getPrivateModeStatus().subscribe(res => {
          this.privateModeStatus = res;
          if (res)
            this.imageObject = this.images;
          else
            this.imageObject = this.nonePrivateImages;
        });

        setInterval(() => {
          if (this.imageElement.style.display == 'block' || this.imageElement.style.display == '') {
            if (this.privateModeStatus) {
              if (this.currentIndex >= this.imageObject.length - 1)
                this.currentIndex = 0;
              else
                this.currentIndex = this.currentIndex + 1;
              this.imageElement.src = this.imageObject[this.currentIndex];
            }
            else {
              if (this.currentIndex >= this.imageObject.length - 1)
                this.currentIndex = 0;
              else
                this.currentIndex = this.currentIndex + 1;
              this.imageElement.src = this.imageObject[this.currentIndex];
            }
          }

        }, this.changeImageSpeed);
      });
    });
  }

  closeSlideShow() {
    let item = document.getElementById('slideShowElement') as HTMLElement;
    item.style.display = 'none';
  }
}
