import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ScreenModuleModule } from './ModuleAndRouting/screen-module.module';
import { DialogModule } from 'primeng/dialog';
import { MatIconModule } from '@angular/material/icon';
import { BackLayerComponent } from './Screens/back-layer/back-layer.component';
import { StepsModule } from 'primeng/steps';
import { ToastModule } from 'primeng/toast';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SlideShowComponent } from './Components/slide-show/slide-show.component';
import { AgmCoreModule } from '@agm/core';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  declarations: [
    AppComponent,
    BackLayerComponent,
    SlideShowComponent
  ],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD7L7PeHjQvXfIkEWltFO8qii48KpbmJ0w'
    }),
    HttpClientModule,
    AppRoutingModule,
    ButtonModule,
    SidebarModule,
    BrowserAnimationsModule,
    ScreenModuleModule,
    DialogModule,
    MatIconModule,
    StepsModule,
    ToastModule,
    FormsModule,
    ReactiveFormsModule,
    MultiSelectModule,
    InputTextModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
