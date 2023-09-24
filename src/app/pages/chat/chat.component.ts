import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent {
  username: string = '';
  messages = [
    {
      author: 'jão',
      messageText: 'Hello! How are you doing?',
    },
    {
      author: 'gui',
      messageText: "Hey! I'm doing well. Let's head the streets tomorrow?",
    },
    {
      author: 'jão',
      messageText: 'Sure. See you there!',
    },
  ];

  constructor(private authService: AuthService) {
    this.authService.user.subscribe((userName) => {
      if (userName) {
        this.username = userName;
      }
    });
  }

  addNewMessage(newMessage: string): void {
    this.messages.push({
      author: this.username,
      messageText: newMessage,
    });
  }
}
