import { Component, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ChatService } from '../../services/chat.service';
import { Message } from '../../models/message.model';

@Component({
  selector: 'app-group-chat',
  templateUrl: './group-chat.component.html',
  styleUrls: ['./group-chat.component.scss'],
})
export class GroupChatComponent {
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
