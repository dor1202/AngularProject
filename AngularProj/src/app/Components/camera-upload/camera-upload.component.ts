import { Component, ElementRef, ViewChild } from '@angular/core';
import { ServerServiceService } from '../../Services/server-service.service';

@Component({
  selector: 'app-camera-upload',
  templateUrl: './camera-upload.component.html',
  styleUrls: ['./camera-upload.component.scss']
})
export class CameraUploadComponent {

  // Data members
  IsVisible: boolean;

  @ViewChild('video')
  public video: ElementRef;

  @ViewChild('canvas')
  public canvas: ElementRef;

  public constructor(private service: ServerServiceService) { }

  public ngAfterViewInit() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        this.video.nativeElement.srcObject = stream;
        this.video.nativeElement.play();
      });
    }
  }

  public capture() {
    this.canvas.nativeElement.getContext('2d').drawImage(this.video.nativeElement, 0, 0, 640, 480);
    this.IsVisible = true;
  }

  savePic() {
    this.service.uploadWebCamImage(this.canvas.nativeElement.toDataURL('image/png'));
    this.newPic();
  }

  newPic() {
    this.IsVisible = false;
  }
}
