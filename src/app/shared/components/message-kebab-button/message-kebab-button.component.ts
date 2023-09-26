import { Component, HostListener, Input } from '@angular/core';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-message-kebab-button',
  templateUrl: './message-kebab-button.component.html',
  styleUrls: ['./message-kebab-button.component.scss'],
})
export class MessageKebabButtonComponent {
  @Input() messageKey: string = '';
  isKebabMenuOpen: boolean = false;

  constructor(private chatService: ChatService) {}

  openKebabMenu(): void {
    this.isKebabMenuOpen = true;
  }

  closeKebabMenu(): void {
    this.isKebabMenuOpen = false;
  }

  deleteMessage(): void {
    this.chatService.deleteMessageFromGlobalChat(this.messageKey);
    this.closeKebabMenu();
  }
}
