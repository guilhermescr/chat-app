import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'chat-app';
  isChatOpen: boolean = false;

  toggleChatView(): void {
    this.isChatOpen = !this.isChatOpen;
  }
}
