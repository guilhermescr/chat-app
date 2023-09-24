import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss'],
})
export class ChatBoxComponent {
  @Output() addNewMessageEvent = new EventEmitter<string>();
  messageText: string = '';

  handleSubmit(): void {
    if (this.messageText) {
      this.addNewMessageEvent.emit(this.messageText);
      this.messageText = '';
    }
  }
}
