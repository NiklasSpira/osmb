import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from './header/header.component'; // Importiere die Header-Komponente
import { MainPageContentComponent } from './main-page-content/main-page-content.component';
import { MainPageCarousselComponent } from './main-page-caroussel/main-page-caroussel.component';
import { CommonModule } from '@angular/common';

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
    MainPageContentComponent,
    MainPageCarousselComponent,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'OSMB';
}
