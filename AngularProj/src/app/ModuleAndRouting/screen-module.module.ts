import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './screens-routing.module';
import { Screen1Component } from '../Screens/screen1/screen1.component';
import { Screen2Component } from '../Screens/screen2/screen2.component';
import { Screen3Component } from '../Screens/screen3/screen3.component';
import { Screen4Component } from '../Screens/screen4/screen4.component';
import { Screen5Component } from '../Screens/screen5/screen5.component';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
import { WebcamModule } from 'ngx-webcam';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { PageNotFoundComponent } from '../Screens/page-not-found/page-not-found.component';
import { SidebarModule } from 'primeng/sidebar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogModule } from 'primeng/dialog';
import { CameraUploadComponent } from '../Components/camera-upload/camera-upload.component';
import { FileUpComponent } from '../Components/file-up/file-up.component';
import { FormGroup } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WebUpComponent } from '../Components/web-up/web-up.component';
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { InputTextModule } from 'primeng/inputtext';
import { MatGridListModule } from '@angular/material/grid-list';
import { MultiSelectModule } from 'primeng/multiselect';
import { TagModule } from 'primeng/tag';
import { EditDialogComponent } from '../Components/edit-dialog/edit-dialog.component';
import { ViewDialogComponent } from '../Components/view-dialog/view-dialog.component';
import { LocationShowComponent } from '../Components/location-show/location-show.component';
import { AgmCoreModule } from '@agm/core';
import { LocationDisplayComponent } from '../Components/location-display/location-display.component';
import { EllipsisPipe } from '../Pipes/ellipsis.pipe';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  declarations: [
    Screen1Component,
    Screen2Component,
    Screen3Component,
    Screen4Component,
    Screen5Component,
    PageNotFoundComponent,
    CameraUploadComponent,
    FileUpComponent,
    WebUpComponent,
    EditDialogComponent,
    ViewDialogComponent,
    LocationShowComponent,
    LocationDisplayComponent,
    EllipsisPipe
  ],
  imports: [
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD7L7PeHjQvXfIkEWltFO8qii48KpbmJ0w'
    }),
    UsersRoutingModule,
    ButtonModule,
    CheckboxModule,
    MatTabsModule,
    WebcamModule,
    BrowserModule,
    MatIconModule,
    SidebarModule,
    BrowserAnimationsModule,
    DialogModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    VirtualScrollerModule,
    InputTextModule,
    MatGridListModule,
    MultiSelectModule,
    TagModule,
    DropdownModule
  ],
  providers: []
})
export class ScreenModuleModule { }
