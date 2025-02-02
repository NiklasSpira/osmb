import { Component } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UserService, User } from '../user.service';
import { Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Ripple } from 'primeng/ripple';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login-dialog',
  imports: [
    Dialog,
    ButtonModule,
    InputTextModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    FormsModule,

    Ripple,
  ],
  templateUrl: './login-dialog.component.html',
  styleUrl: './login-dialog.component.scss',
  providers: [MessageService],
  standalone: true,
})
export class LoginDialogComponent {
  visible: boolean = false;
  username: string = '';
  email: string = '';

  constructor(
    @Inject(UserService) private userService: UserService,
    private messageService: MessageService
  ) {}

  onLogin() {
    const user: User = { username: this.username, email: this.email, id: 1 };
    console.log(user);
    this.show();
    this.userService.setUser(user);
    this.visible = false;
  }
  show() {
    this.messageService.add({
      severity: 'info',
      summary: 'Info',
      detail: 'Message Content',
      life: 3000,
    });
    console.log('toast');
  }
  getCurrentUser() {
    const currentUser = this.userService.getUser();
    console.log(currentUser);
  }
  showDialog() {
    this.visible = true;
  }
  login() {
    // api call einbinden
  }
}
