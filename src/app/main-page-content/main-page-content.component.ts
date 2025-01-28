import { Component, inject } from '@angular/core';
import { PicturesService } from '../pictures.service';
import { MatGridListModule } from '@angular/material/grid-list';
import { MainPageCarousselComponent } from '../main-page-caroussel/main-page-caroussel.component';
@Component({
  selector: 'app-main-page-content',
  imports: [MatGridListModule, MainPageCarousselComponent],
  template: ` 
    <app-main-page-caroussel></app-main-page-carousselr>
    <app-main-page-contentt></app-main-page-content>
  `,
  templateUrl: './main-page-content.component.html',
  styleUrl: './main-page-content.component.scss',
})
export class MainPageContentComponent {
  arr: { id: number; name: string; url: string; description: string }[] = [];
  picturesService: PicturesService = inject(PicturesService);
  constructor() {
    this.arr = this.picturesService.getPictures();
  }
  openPicture() {
    console.log('open picture');
  }
}
