import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { PicturesService } from '../pictures.service';

@Component({
  selector: 'app-main-page-caroussel',
  imports: [ButtonModule, CarouselModule],
  templateUrl: './main-page-caroussel.component.html',
  styleUrl: './main-page-caroussel.component.scss',
})
export class MainPageCarousselComponent {
  arr: { id: number; name: string; url: string; description: string }[] = [];
  picturesService: PicturesService = inject(PicturesService);
  constructor() {
    this.arr = this.picturesService.getPictures();
  }
}
