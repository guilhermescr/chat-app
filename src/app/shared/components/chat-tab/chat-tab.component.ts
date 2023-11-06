import { Component, Input } from '@angular/core';
import { Message } from '../../models/message.model';
import { AuthService } from '../../services/auth.service';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat-tab',
  templateUrl: './chat-tab.component.html',
  styleUrls: ['./chat-tab.component.scss'],
})
export class ChatTabComponent {
  @Input() messages: Message[] = [];
  username: string = '';

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

  addNewMessage(newMessage: string): void {
    this.chatService.addMessageToGlobalChat({
      username: this.username,
      messageText: newMessage,
    });
  }
}
