import { Component, inject } from '@angular/core';
import { Router } from '@angular/router'; // Import Router service
import { PicturesService } from '../pictures.service';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-profile',
  imports: [MatGridListModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  arr: { id: number; name: string; url: string; description: string }[] = [];
  picturesService: PicturesService = inject(PicturesService);
  constructor(private router: Router) {
    this.arr = this.picturesService.getPictures();
  }
  openPicture() {
    console.log('open picture');
  }
  navigateToImage(id: number) {
    this.router.navigate(['/image/' + id]);
  }
}
