import { Component, EventEmitter, Output } from '@angular/core';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss'],
})
export class ChatListComponent {
  @Output() toggleChatViewEvent = new EventEmitter();
  friends: User[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    console.log(this.authService.getUsers());
    this.friends = this.authService.getUsers().filter(
      (user) => user.username !== localStorage.getItem('username')
    );
  }

  toggleChatView(): void {
    this.toggleChatViewEvent.emit();
  }
}
