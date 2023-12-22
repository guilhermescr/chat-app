import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FriendsService } from 'src/app/shared/services/friends.service';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss'],
})
export class FriendsComponent {
  users: User[] = [];
  localUser: User | null = null;
  isFriendRequestsModalOpen: boolean = false;

  constructor(
    private authService: AuthService,
    private friendsService: FriendsService
  ) {}

  ngOnInit(): void {
    this.authService.users.subscribe(
      (users) =>
        (this.users = users.filter(
          (user) => user.username !== localStorage.getItem('username')
        ))
    );

    this.authService.localUser.subscribe(
      (localUserData) => (this.localUser = localUserData)
    );
  }

  checkIfUserIsMyFriend(user: User): boolean {
    return this.authService.isThisUserMyFriend(user);
  }

  isPendingFriendRequest(user: User): boolean {
    return user.friends.receivedRequests.includes(
      this.authService.getLocalUser().databaseKey!
    );
  }

  sendFriendRequest(possibleFriend: User): void {
    const hasPossibleFriendTriedToAddMe =
      this.localUser?.friends.receivedRequests.includes(
        possibleFriend.databaseKey!
      );

    if (hasPossibleFriendTriedToAddMe) {
      this.friendsService.addFriend(possibleFriend);
    } else {
      this.friendsService.sendFriendRequest(possibleFriend);
    }
  }

  getPossibleFriends(possibleFriendsKeys: string[]): User[] {
    return possibleFriendsKeys.map((possibleFriendKey) =>
      this.authService.getUserByKey(possibleFriendKey)
    );
  }

  openFriendRequestsModal(): void {
    this.isFriendRequestsModalOpen = true;
  }

  closeFriendRequestsModal(): void {
    this.isFriendRequestsModalOpen = false;
  }
}
