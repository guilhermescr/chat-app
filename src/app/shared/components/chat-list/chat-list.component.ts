import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss'],
})
export class ChatListComponent {
  @Output() toggleChatViewEvent = new EventEmitter();

  toggleChatView(): void {
    this.toggleChatViewEvent.emit();
  }
}
