import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss'],
})
export class ChatListComponent {
  friends: User[] = [];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.users.subscribe(() => {
      const localUserData = this.authService.getLocalUser();
      const friendsList = localUserData?.friends.friendsList;

      if (friendsList !== undefined) {
        this.friends = friendsList.map((friendId) => {
          return this.authService.getUserByKey(friendId);
        });
      }
    });

    this.friends = this.authService
      .getUsers()
      .filter((user) => user.username !== localStorage.getItem('username'));
  }

  navigateToGlobalChat(): void {
    if (this.router.url !== '/chat/global') {
      this.router.navigateByUrl('/chat/global');
    }
  }
}
