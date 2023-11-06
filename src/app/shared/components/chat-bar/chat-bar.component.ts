import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-chat-bar',
  templateUrl: './chat-bar.component.html',
  styleUrls: ['./chat-bar.component.scss'],
})
export class ChatBarComponent {
  @Output() addNewMessageEvent = new EventEmitter<string>();
  messageText: string = '';

  handleSubmit(): void {
    if (this.messageText) {
      this.addNewMessageEvent.emit(this.messageText);
      this.messageText = '';
    }
  }
}
