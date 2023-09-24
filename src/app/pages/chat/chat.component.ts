import { Component } from '@angular/core';
import { Message } from 'src/app/shared/models/message.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ChatService } from 'src/app/shared/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent {
  username: string = '';
  isChatOpen: boolean = false;
  messages: Message[] = [];

  constructor(
    private authService: AuthService,
    private chatService: ChatService
  ) {
    this.authService.user.subscribe((userName) => {
      if (userName) {
        this.username = userName;
      }
    });

    this.chatService.globalChatRef
      .valueChanges()
      .subscribe((messagesData) => (this.messages = messagesData));
  }

  addNewMessage(newMessage: string): void {
    this.chatService.addMessageToGlobalChat({
      author: this.username,
      messageText: newMessage,
    });
  }

  toggleChatView(): void {
    this.isChatOpen = !this.isChatOpen;
  }
}
