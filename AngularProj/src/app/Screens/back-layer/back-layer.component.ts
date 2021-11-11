import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { Router } from '@angular/router';
import { ServerServiceService } from '../../Services/server-service.service';

@Component({
  selector: 'app-back-layer',
  templateUrl: './back-layer.component.html',
  styleUrls: ['./back-layer.component.scss']
})
export class BackLayerComponent implements OnInit {

  //#region Data members
  visibleSideNav;
  visibleUserSideNav;
  sideNavButtonsAreValid: boolean;
  displayAboutDialog: boolean;
  displayEditCategoriesDialog: boolean;
  displayPrivateModeDialog: boolean;
  SlideShowAvilable: boolean;
  categoryList: any[] = [];
  selectedCategories: any[] = [];
  inpValue: string = '';
  privateModePassword: number;
  privateModeStatus: boolean;
  //#endregion

  constructor(private primengConfig: PrimeNGConfig, public router: Router,
    private service: ServerServiceService) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.initializeDataMembers();
    // Disable navbar buttons
    this.checkIfNavBarButtonsShouldBeDisables();
  }

  initializeDataMembers() {
    // Display theme, get the sstate and then add the style,rewriteing the first style element
    this.service.getThemeIsDarkStatus().subscribe(res => {
      this.enebleTheme(res);
    });
    this.service.privateModePassword().subscribe(res => {
      if (res.errorMessage != undefined) {
        console.log(res.errorMessage);
        return;
      }
      this.privateModePassword = res;
    });
    this.service.getCategories().subscribe(res => {
      if (res.errorMessage != undefined) {
        console.log(res.errorMessage);
        return;
      }
      for (let index = 0; index < res.length; index++) {
        this.categoryList[index] = { name: res[index].name, code: res[index].code };
      }
    });
    this.service.inEditMode().subscribe((res) => {
      if (res == true) {
        this.toggelPrimeNgButtonColor('editModeBtn');
      }
    });
    this.service.getLayoutStatus().subscribe(res => {
      if (res == 'grid') {
        let item = document.getElementById('displayModeBtn') as HTMLElement;
        item = item.childNodes[0] as HTMLElement;
        item.classList.add('p-button-help');
      }
    });
    this.service.getPrivateModeStatus().subscribe(res => {
      this.privateModeStatus = res;
      if (res == true) {
        this.toggelPrimeNgButtonColor('privateModeBtn');
      }
    });
  }

  //#region General NavBar functions
  checkIfNavBarButtonsShouldBeDisables() {
    switch (window.location.pathname) {
      case '/screen4':
        this.sideNavButtonsAreValid = true;
        this.SlideShowAvilable = true;
        break;

      case '/screen5':
        this.sideNavButtonsAreValid = true;
        this.SlideShowAvilable = true;
        break;

      default:
        this.sideNavButtonsAreValid = false;
        this.SlideShowAvilable = false;
        break;
    }
  }

  toggelPrimeNgButtonColor(btnId: string) {
    let item = document.getElementById(btnId) as HTMLElement;
    item = item.childNodes[0] as HTMLElement;
    if (item.classList.contains('p-button-help')) {
      item.classList.remove('p-button-help');
    }
    else {
      item.classList.add('p-button-help');
    }
  }

  exitBtn() {
    this.visibleSideNav = false;
    // the window.close() function hs been blocked from modern browsers
    window.location.replace("http://www.w3schools.com");
  }

  aboutBtn() {
    this.visibleSideNav = false;
    this.displayAboutDialog = true;
  }

  toggelEditMode() {
    try {
      this.service.toggelEditMode().subscribe(res => {
        let item = document.getElementById('editModeBtn') as HTMLElement;
        item = item.childNodes[0] as HTMLElement;
        if (item.classList.contains('p-button-help')) {
          item.classList.remove('p-button-help');
        }
        else {
          item.classList.add('p-button-help');
        }
      });
    }
    catch (err) {

    }
    this.visibleSideNav = false
  }

  toggelListAndPortrait() {
    try {
      this.service.toggelListAndPortrait().subscribe(res => {
        let item = document.getElementById('displayModeBtn') as HTMLElement;
        item = item.childNodes[0] as HTMLElement;
        if (item.classList.contains('p-button-help')) {
          item.classList.remove('p-button-help');
        }
        else {
          item.classList.add('p-button-help');
        }
        if (this.router.url == '/screen5')
          window.location.reload();
      });

    }
    catch (err) {

    }
    this.visibleUserSideNav = false
  }

  displaySlideShow() {
    let item = document.getElementById('slideShowElement') as HTMLElement;
    item.style.display = 'block';
    this.visibleUserSideNav = false;
  }
  //#endregion

  //#region Private mode functions
  openPrivatePasworDialog() {
    let item = document.getElementById('privateModeBtn') as HTMLElement;
    item = item.childNodes[0] as HTMLElement;
    if (item.classList.contains('p-button-help'))
      this.toggelPrivateMode();
    else
      this.displayPrivateModeDialog = true;
  }

  checkIfPasswordValid() {
    let resault = this.inpValue;

    if (this.privateModePassword.toString() == resault) {
      this.displayPrivateModeDialog = false;
      this.toggelPrivateMode();
    }
    else {
      let item = document.getElementById('wrondPasswordDiv') as HTMLElement;
      item.style.display = 'block';

      // Remove the alert div after 3 seconds
      setTimeout(() => { item.style.display = 'none'; }, 3000);
      return;
    }
  }

  toggelPrivateMode() {
    try {
      this.service.toggelPrivateMode().subscribe(res => {
        let item = document.getElementById('privateModeBtn') as HTMLElement;
        item = item.childNodes[0] as HTMLElement;
        if (item.classList.contains('p-button-help')) {
          item.classList.remove('p-button-help');
        }
        else {
          item.classList.add('p-button-help');
        }

        this.privateModeStatus = !this.privateModeStatus;

        // Load site after changes
        if (this.router.url == '/screen5')
          window.location.reload();
      });
    }
    catch (err) {
      console.log(err);
    }
    this.visibleSideNav = false;
  }
  //#endregion

  //#region Categories functions
  openEditCategoriesDialog() {
    this.displayEditCategoriesDialog = true;
    this.visibleSideNav = false;
  }

  updateCategories() {
    let data = { name: this.inpValue, code: this.inpValue };
    this.inpValue = '';
    this.categoryList.push(data);
  }

  submitUpdatedCategories() {
    let updatedList = this.returnUpdatedList(this.categoryList, this.selectedCategories);

    this.service.updateCategories(updatedList).subscribe(res => {
      for (let index = 0; index < res.length; index++) {
        this.categoryList[index] = { name: res[index].name, code: res[index].code };
        // Clear the combo box
        this.selectedCategories = [];
      }
      this.displayEditCategoriesDialog = false;
    });
  }

  returnUpdatedList(categoryList: any[], selectedCategories: any[]) {
    // Take the full category list with the new categories and delete the picked list from it
    for (let i = 0; i < categoryList.length; i++) {
      for (let j = 0; j < selectedCategories.length; j++) {
        if (categoryList[i].name == selectedCategories[j].name) {
          categoryList.splice(i, 1);
          selectedCategories.splice(j, 1);
          i--;
          j--;
        }
      }
    }
    return categoryList;
  }
  //#endregion

  //#region Themes functions
  enebleTheme(isDarkTheme: boolean) {
    if (isDarkTheme) {
      this.service.getDarkThemeCss().subscribe(res => {
        let x = document.getElementsByTagName("STYLE")[0];
        x.innerHTML = res;
      });
    }
    else {
      this.service.getLightThemeCss().subscribe(res => {
        let x = document.getElementsByTagName("STYLE")[0];
        x.innerHTML = res;
      });
    }
  }

  toggelTheme() {
    this.service.toggelTheme().subscribe(res => {
      this.service.getThemeIsDarkStatus().subscribe(res => {
        this.enebleTheme(res);
        this.visibleSideNav = false;
      });
    });
  }
  //#endregion
}