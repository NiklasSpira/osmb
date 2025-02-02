import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { RegisterDialogComponent } from '../register-dialog/register-dialog.component';
import { UserService, User } from '../user.service';
import { Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { Router } from '@angular/router'; // Import Router service

@Component({
  selector: 'app-header',
  imports: [
    MatSlideToggleModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatIconModule,
    LoginDialogComponent,
    RegisterDialogComponent,
    CommonModule,
    AvatarModule,
    AvatarGroupModule,
    OverlayBadgeModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  user: any = null;
  constructor(
    @Inject(UserService) private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userService.user$.subscribe((user) => {
      this.user = user; // Update the local user object whenever the service updates
      console.log('user updated');
    });
  }
  navigateToOwnPage() {
    this.router.navigate(['/user/' + this.user.id]);
  }
  navigateToHome() {
    this.router.navigate(['/']);
  }
  onLogout() {
    this.userService.clearUser();
  }
  getCurrentUser() {
    const currentUser = this.userService.getUser();
  }
}
