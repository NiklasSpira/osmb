import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-image-component',
  imports: [],
  templateUrl: './image.component.html',
  styleUrl: './image.component.scss',
})
export class ImageComponent implements OnInit {
  post = {
    imageUrl: 'https://picsum.photos/850/650?random=1', // Replace with actual image URL
    author: 'John Doe',
    authorProfile: 'https://picsum.photos/50/50?random=1',
    comments: [
      { author: 'Alice', text: 'Great post!' },
      { author: 'Bob', text: 'I agree with you!' },
      { author: 'Charlie', text: 'Amazing work, keep it up!' },
    ] as Array<{ author: string; text: string }>,
  };
  likeCount: number = 0;
  dislikeCount: number = 0;
  comments: Array<{ author: string; text: string }> = [];
  constructor() {
    this.post = this.post;
  }
  ngOnInit(): void {}

  likePost(): void {
    this.likeCount++;
  }

  dislikePost(): void {
    this.dislikeCount++;
  }
}
