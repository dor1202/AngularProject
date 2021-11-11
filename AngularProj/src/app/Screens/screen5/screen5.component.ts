import { Component, OnInit } from '@angular/core';
import { ServerServiceService } from '../../Services/server-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-screen5',
  templateUrl: './screen5.component.html',
  styleUrls: ['./screen5.component.scss']
})
export class Screen5Component implements OnInit {

  //#region Data members
  images: any[];
  imagesData: any[];
  editMode: boolean;
  inpValue: string = '';
  categoryList: any[] = [];
  selectedCategories: any[] = [];
  searchedCategories: string;
  displayDialog: boolean;
  name: string;
  caption: string;
  categories: any[];
  location: any;
  favorite: boolean;
  privateMode: boolean;
  imgSrc: string;
  imageId: string;
  layoutStatus: string;
  privateModeStatus: boolean;
  nonePrivateImages: any[];
  //#endregion

  constructor(private service: ServerServiceService, private router: Router) { }

  ngOnInit(): void {
    this.initializeDataMembers();
  }

  initializeDataMembers() {
    this.service.getCategories().subscribe(res => {
      for (let index = 0; index < res.length; index++) {
        this.categoryList[index] = { name: res[index].name, code: res[index].code };
      }
    });
    this.service.getPrivateModeStatus().subscribe(res => {
      this.privateModeStatus = res;
    });
    this.service.getLayoutStatus().subscribe(res => {
      this.layoutStatus = res;
    });
    this.service.inEditMode().subscribe(res => {
      this.editMode = res;
    });
    this.service.getImages().subscribe(res => {
      this.images = [];
      this.imagesData = [];
      for (let index = 0; index < res.length; index++) {
        if (index % 2 == 0) this.imagesData.push(res[index]);
        else this.images.push(res[index]);
      }
    });

    this.service.getImagesNonePrivate().subscribe(res => {
      this.nonePrivateImages = [];
      for (let index = 0; index < res.length; index++) {
        if (index % 2 != 0)
          this.nonePrivateImages.push(res[index]);
      }
    });
  }

  //#region General functions

  updateCategorys() {
    this.categoryList = [];
    this.service.getCategories().subscribe(res => {
      for (let index = 0; index < res.length; index++) {
        this.categoryList[index] = { name: res[index].name, code: res[index].code };
      }
    });
  }

  checkMessage(param) {
    // get categories after change without refresh the page, reset the category list first
    this.categoryList = [];
    this.service.getCategories().subscribe(res => {
      for (let index = 0; index < res.length; index++) {
        this.categoryList[index] = { name: res[index].name, code: res[index].code };
      }
    });

    this.service.inEditMode().subscribe(res => {
      this.editMode = res;
    });
    for (let index = 0; index < this.images.length; index++) {
      if (this.images[index] == param) {
        this.service.getImageData(this.imagesData[index]).subscribe(res => {
          this.imageId = res.id;
          this.imgSrc = param;
          this.name = res.name;
          this.caption = res.caption;
          this.categories = res.categories;
          this.selectedCategories = this.categories;
          this.location = res.location;
          this.favorite = res.favorite;
          this.privateMode = res.privateMode;
          this.displayDialog = true;
        });
        return;
      }
    }
  }

  changeScreen() {
    this.router.navigate(['/screen4']);
  }

  turnOffPopup() {
    // Dor output member in edit dialog component
    this.displayDialog = false;
  }
  //#endregion

  //#region Search functions

  searchFuncName() {
    if (this.privateModeStatus)
      this.searchNameInPrivateMode();
    else
      this.searchNameInNonePrivateMode();
  }

  searchFuncCategory() {
    if (this.privateModeStatus)
      this.searchCategoryInPrivateMode();
    else
      this.searchCategoryInNonePrivateMode();
  }

  searchCategoryInPrivateMode() {
    // Return all images
    if (this.searchedCategories == undefined) {
      this.service.getImages().subscribe(res => {
        this.images = [];
        this.imagesData = [];
        for (let index = 0; index < res.length; index++) {
          if (index % 2 == 0) this.imagesData.push(res[index]);
          else this.images.push(res[index]);
        }
      });
      return;
    }

    this.service.getSearchedImagesPrivateCategory(this.searchedCategories).subscribe((res) => {
      this.images = [];
      this.imagesData = [];
      for (let index = 0; index < res.length; index++) {
        if (index % 2 == 0) this.imagesData.push(res[index]);
        else this.images.push(res[index]);
      }
    });
  }

  searchCategoryInNonePrivateMode() {
    // Return all images
    if (this.searchedCategories == undefined) {
      this.service.getImagesNonePrivate().subscribe(res => {
        this.nonePrivateImages = [];
        for (let index = 0; index < res.length; index++) {
          if (index % 2 != 0)
            this.nonePrivateImages.push(res[index]);
        }
      });
    }

    this.service.getSearchedImagesNonePrivateCategory(this.searchedCategories).subscribe((res) => {
      this.nonePrivateImages = [];
      for (let index = 0; index < res.length; index++) {
        if (index % 2 != 0)
          this.nonePrivateImages.push(res[index]);
      }
    });
  }

  searchNameInPrivateMode() {
    // Return all images
    if (this.inpValue == '') {
      this.service.getImages().subscribe(res => {
        this.images = [];
        this.imagesData = [];
        for (let index = 0; index < res.length; index++) {
          if (index % 2 == 0) this.imagesData.push(res[index]);
          else this.images.push(res[index]);
        }
      });
      return;
    }

    this.service.getSearchedImages(this.inpValue).subscribe((res) => {
      this.images = [];
      this.imagesData = [];
      for (let index = 0; index < res.length; index++) {
        if (index % 2 == 0) this.imagesData.push(res[index]);
        else this.images.push(res[index]);
      }
    });
  }

  searchNameInNonePrivateMode() {
    // Return all images
    if (this.inpValue == '') {
      this.service.getImagesNonePrivate().subscribe(res => {
        this.nonePrivateImages = [];
        for (let index = 0; index < res.length; index++) {
          if (index % 2 != 0)
            this.nonePrivateImages.push(res[index]);
        }
      });
    }

    this.service.getSearchedImagesNonePrivate(this.inpValue).subscribe((res) => {
      this.nonePrivateImages = [];
      for (let index = 0; index < res.length; index++) {
        if (index % 2 != 0)
          this.nonePrivateImages.push(res[index]);
      }
    });
  }
  //#endregion

}
