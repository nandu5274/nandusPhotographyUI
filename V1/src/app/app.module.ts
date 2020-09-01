import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';  

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { GalleryComponent } from './gallery/gallery.component';
import { HttpModule } from '@angular/http';
import { CommonHttpService } from './common/app.httpservice';
import{GallerryService} from './gallery/gallery.service';
import { FooterComponent } from './footer/footer.component';
import { UploadComponent } from './upload/upload.component';
import { UploadService } from './upload/upload.service';

import { FormsModule } from '@angular/forms';

const routes: Routes = [  
  { path: '', component: HomeComponent },   
  { path: 'collection', component: GalleryComponent }, 
  { path: 'upload', component: UploadComponent }, 
   
];  


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GalleryComponent,
    FooterComponent,
    UploadComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpModule,

  ],
  exports: [RouterModule] ,
  providers: [CommonHttpService,GallerryService,UploadService],

  bootstrap: [AppComponent]

})
export class AppModule { }
