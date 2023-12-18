import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ChatService } from '../../services/chat.service';
import { User } from '../../models/user.model';
import { Message } from '../../models/message.model';

@Component({
  selector: 'app-group-chat',
  templateUrl: './group-chat.component.html',
  styleUrls: ['./group-chat.component.scss'],
})
export class GroupChatComponent {
  user: User | null = null;
  messages: Message[] = [];

  constructor(
    private authService: AuthService,
    private chatService: ChatService
  ) {}

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

    this.authService.localUser.subscribe((userData) => {
      this.user = userData;
    });
  }

  addNewMessage(newMessage: string): void {
    this.chatService.addMessageToGlobalChat({
      username: this.user?.username || '',
      messageText: newMessage,
    });
  }
}
