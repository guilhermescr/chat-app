import { Component } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss'],
})
export class FriendsComponent {
  users: User[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.users.subscribe(
      (users) =>
        (this.users = users.filter(
          (user) => user.username !== localStorage.getItem('username')
        ))
    );
  }

  checkIfUserIsMyFriend(user: User): boolean {
    return this.authService.isThisUserMyFriend(user);
  }
}
