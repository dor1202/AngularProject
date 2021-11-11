import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServerServiceService {
  private baseUrl: string = 'http://localhost:5555';

  // unsplesh
  private API_KEY: string = 'client_id=1S0m84f56-CjFv41fyCmgioezrEil8sA4XDsz1QevTU';
  private UNSPLASH_API: string = 'https://api.unsplash.com';

  private privateCode: string = '';

  constructor(private http: HttpClient) {
  }

  savePrivateCode(code) {
    this.privateCode = code;
  }

  //  #region Themes requests
  // * Get:
  getDarkThemeCss(): Observable<any> {
    return this.http.get(`${this.baseUrl}/theme/getDarkTheme`, { responseType: 'text' });
  }

  getLightThemeCss(): Observable<any> {
    return this.http.get(`${this.baseUrl}/theme/getLightTheme`, { responseType: 'text' });
  }

  getThemeIsDarkStatus(): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/theme/getThemeStatus`);
  }

  toggelTheme(): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/theme/toggelThemeStatus`);
  }
  //#endregion

  // #region  Images requests
  // * Get:
  getImageData(imageData: string): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/image/getImageData/?name=${imageData}`);
  }

  getImages(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/image/getImages`);
  }

  getImagesNonePrivate(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/image/getImagesNonePrivate`);
  }

  getSearchedImages(searchInp): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/image/getSearchedImages?query=${searchInp}`);
  }

  getSearchedImagesNonePrivate(searchInp): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/image/getSearchedImagesNonePrivate?query=${searchInp}`);
  }

  getSearchedImagesNonePrivateCategory(searchInp): Observable<any[]> {
    return this.http.post<any[]>(`${this.baseUrl}/image/getImagesNonePrivateCategory`, { category: searchInp });
  }

  getSearchedImagesPrivateCategory(searchInp): Observable<any[]> {
    return this.http.post<any[]>(`${this.baseUrl}/image/getImagesPrivateCategory`, { category: searchInp });
  }

  // * Post:
  changTheImageData(id, name, caption, categories, location, favorite, privateMode) {
    return this.http.post(`${this.baseUrl}/image/changeImageData`, { id, name, caption, categories, location, favorite, privateMode }).subscribe((res) => {
      console.log(res);
    });;
  }
  //#endregion

  //#region  Uploads requests
  // * Post:
  createDir(nameFinal, descFinal, selectPick) {
    this.http.post(`${this.baseUrl}/upload/createDir`, { name: nameFinal, desc: descFinal, pick: selectPick, privatecode: this.privateCode })
      .subscribe((res) => {
        console.log(res);
      });
  }

  uploadWebCamImage(base64Image) {
    this.http
      .post(`${this.baseUrl}/upload/uploadWebCamPic`, { image: base64Image })
      .subscribe((res) => {
        console.log(res);
      });
  }

  uploadFile(formData) {
    this.http
      .post(`${this.baseUrl}/upload/uploadFilePic`, formData).subscribe((res) => {
        console.log(res);
      });;
  }

  uploadUnspleshImage(image) {
    this.http.post(`${this.baseUrl}/upload/uploadUnspleshPic`, image).subscribe((res) => {
      console.log(res);
    });;
  }
  //#endregion

  //#region Folder data requests
  // * Get:
  inEditMode(): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/folderData/getEditModeStatus`);
  }

  getPrivateModeStatus(): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/folderData/getPrivateModeStatus`);
  }

  getCategories(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/folderData/getCategories`);
  }

  getLayoutStatus(): Observable<string> {
    return this.http.get(`${this.baseUrl}/folderData/getLayoutPickStatus`, { responseType: 'text' });
  }

  privateModePassword(): Observable<any> {
    return this.http.get(`${this.baseUrl}/folderData/privateModePassword`);
  }

  checkFolderExist(): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/folderData/checkFolderExist`);
  }

  toggelEditMode(): Observable<string> {
    return this.http.get(`${this.baseUrl}/folderData/toggelEditMode`, { responseType: 'text' });
  }

  toggelListAndPortrait(): Observable<string> {
    return this.http.get(`${this.baseUrl}/folderData/toggelListAndPortrait`, { responseType: 'text' });
  }

  toggelPrivateMode(): Observable<string> {
    return this.http.get(`${this.baseUrl}/folderData/toggelPrivateMode`, { responseType: 'text' });
  }

  // * Post:
  updateCategories(UpdatedCategoryList): Observable<any[]> {
    return this.http.post<any[]>(`${this.baseUrl}/folderData/editCategories`, { UpdatedCategoryList: UpdatedCategoryList });
  }
  //#endregion

  //#region Unsplash requests
  // * get:
  getImagesFromUnsplesh(page): Observable<any[]> {
    return this.http.get<any[]>(`${this.UNSPLASH_API}/photos/?page=${page}&${this.API_KEY}`);
  }

  searchImagesFromUnsplesh(query, page): Observable<any> {
    // let workingURL = 'https://api.unsplash.com/search/photos?query=london&client_id=1S0m84f56-CjFv41fyCmgioezrEil8sA4XDsz1QevTU';
    return this.http.get<any[]>(`${this.UNSPLASH_API}/search/photos?page=${page}&query=${query}&${this.API_KEY}`);
  }
  //#endregion

}