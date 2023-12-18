import { Component, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ChatService } from '../../services/chat.service';
import { Message } from '../../models/message.model';

@Component({
  selector: 'app-private-chat',
  templateUrl: './private-chat.component.html',
  styleUrls: ['./private-chat.component.scss'],
})
export class PrivateChatComponent {
  @Input() messages: Message[] = [];
  @Input() privateChatData: any;
  username: string = '';

  constructor(
    private authService: AuthService,
    private chatService: ChatService
  ) {
    this.authService.localUser.subscribe((userData) => {
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
