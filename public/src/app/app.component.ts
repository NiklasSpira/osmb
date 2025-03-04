import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from './header/header.component';
import { MainPageContentComponent } from './main-page-content/main-page-content.component';
import { MainPageCarousselComponent } from './main-page-caroussel/main-page-caroussel.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatSlideToggleModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatIconModule,
    HeaderComponent,
    CommonModule,
    RouterModule,
    RouterOutlet,
    Toast,
  ],
  providers: [MessageService],
  template: ` <main>
    <p-toast />
    <app-header></app-header>
    <router-outlet></router-outlet>
  </main>`,

  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'OSMB';
  constructor(private messageService: MessageService) {}
}
