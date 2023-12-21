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
    // this.authService.localUser.subscribe((localUserData) => {
    //   this.friends = localUserData?.friends.friendsList || [];
    // });
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
