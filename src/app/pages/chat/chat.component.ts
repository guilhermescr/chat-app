import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent {
  username: string = '';

  constructor(private authService: AuthService) {
    this.authService.user.subscribe((userName) => {
      if (userName) {
        this.username = userName;
      }
    });
  }
}
