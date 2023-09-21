import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ChatService } from 'src/app/shared/services/chat.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  usernameInput: string = '';

  constructor(private authService: AuthService, private router: Router) {
    if (localStorage.getItem('username')) {
      if (confirm('You are already logged in. Do you want to log out?')) {
        this.authService.logOutUser();
      } else {
        alert('Ok. I will send you to the chat page.');
        this.router.navigateByUrl('/chat');
      }
    }
  }

  submitUsername(): void {
    if (this.usernameInput) {
      this.authService.joinUser(this.usernameInput);
    }
  }
}
