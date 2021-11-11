import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ServerServiceService } from '../../Services/server-service.service';

@Component({
  selector: 'app-file-up',
  templateUrl: './file-up.component.html',
  styleUrls: ['./file-up.component.scss']
})
export class FileUpComponent {

  myForm = new FormGroup({
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required]),
  });

  constructor(private service: ServerServiceService) { }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.myForm.patchValue({
        fileSource: file,
      });

      let img = document.getElementById('currentImg') as HTMLImageElement;
      this.getBase64(file).then(
        data => img.src = String(data)
      );
    }
  }

  getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  submit() {
    let img = document.getElementById('currentImg') as HTMLImageElement;
    if (img.src == '../../../assets/1200px-Unknown_person.jpg') return;

    const formData = new FormData();
    const val = this.myForm?.get('fileSource');
    formData.append('file', val?.value);
    if (!this.checkIfImage(val)) return;
    
    this.service.uploadFile(formData);
    img.src = '../../../assets/1200px-Unknown_person.jpg';
  }

  checkIfImage(val): boolean {
    if (val.value == '') return false;
    if (val.value.type == 'image/jpeg') return true;
    if (val.value.type == 'image/png') return true;
    return false;
  }
}
