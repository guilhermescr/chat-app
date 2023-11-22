import { Component } from '@angular/core';

import { AuthService } from 'src/app/shared/services/auth.service';
import { ChatService } from 'src/app/shared/services/chat.service';
import { Message } from 'src/app/shared/models/message.model';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  user: User | null = null;
  username: string = '';
  messages: Message[] = [];

  constructor(
    private authService: AuthService,
    private chatService: ChatService
  ) {
    this.authService.user.subscribe((userData) => {
      if (userData) {
        this.username = userData.username;
      }
    });
  }

  ngOnInit(): void {
    this.chatService.globalChatRef.snapshotChanges().subscribe((data) => {
      this.messages = [];

      data.forEach((item) => {
        const messageData = item.payload.toJSON()!;

        if ('username' in messageData && 'messageText' in messageData) {
          const username = messageData.username as string;
          const messageText = messageData.messageText as string;

          const userFound = this.authService
            .getUsers()
            .find((user) => user.username === username);

          const message: Message = {
            username,
            messageText,
          };

          if (userFound) {
            message.usernameHeadingColor = userFound.usernameHeadingColor;
          }

          if (item.key) {
            message.key = item.key;
          }

          this.messages.push(message);
        }
      });

      const CHAT_CONTAINER = document.querySelector('.chat-messages');

      setTimeout(() => {
        CHAT_CONTAINER?.scrollTo(0, CHAT_CONTAINER.scrollHeight);
      }, 50);
    });

    setTimeout(() => {
      this.user = this.authService.getLocalUser();
    }, 1000);
  }
}
