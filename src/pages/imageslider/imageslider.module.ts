import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ImagesliderPage } from './imageslider';

@NgModule({
  declarations: [
    ImagesliderPage,
  ],
  imports: [
    IonicPageModule.forChild(ImagesliderPage),
  ],
})
export class ImagesliderPageModule {}
