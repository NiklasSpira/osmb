import { Routes } from '@angular/router';
import { ImageComponent } from './image/image.component';

import { MainPageContentComponent } from './main-page-content/main-page-content.component';
export const routes: Routes = [
  {
    path: 'image',
    component: ImageComponent,
    title: 'Image display',
  },
  {
    path: '',
    component: MainPageContentComponent,
    title: 'Image display',
  },
];
