import { Routes } from '@angular/router';
import { ImageComponent } from './image/image.component';
import { ProfileComponent } from './profile/profile.component';

import { MainPageContentComponent } from './main-page-content/main-page-content.component';
export const routes: Routes = [
  {
    path: 'image/:id',
    component: ImageComponent,
    title: 'Image display',
  },
  {
    path: 'user/:id',
    component: ProfileComponent,
    title: 'User Page',
  },
  {
    path: '',
    component: MainPageContentComponent,
    title: 'Image display',
  },
];
