import { Component, inject } from '@angular/core';
import { PicturesService } from '../pictures.service';
import { MatGridListModule } from '@angular/material/grid-list';
@Component({
  selector: 'app-main-page-content',
  imports: [MatGridListModule],
  templateUrl: './main-page-content.component.html',
  styleUrl: './main-page-content.component.scss',
})
export class MainPageContentComponent {
  arr: { id: number; name: string; url: string; description: string }[] = [];
  picturesService: PicturesService = inject(PicturesService);
  constructor() {
    this.arr = this.picturesService.getPictures();
  }
}
