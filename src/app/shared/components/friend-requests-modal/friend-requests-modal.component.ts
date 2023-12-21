import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-friend-requests-modal',
  templateUrl: './friend-requests-modal.component.html',
  styleUrls: ['./friend-requests-modal.component.scss'],
})
export class FriendRequestsModalComponent {
  @Input() possibleFriendsList: User[] = [];
  @Output() closeFriendRequestsModalEvent = new EventEmitter<null>();

  constructor(
    private fbDb: AngularFireDatabase,
    private authService: AuthService
  ) {}

  fireCloseFriendRequestsModalEvent(): void {
    this.closeFriendRequestsModalEvent.emit();
  }

  acceptFriendRequest(possibleFriend: User): void {
    const localUser = this.authService.getLocalUser();

    const possibleFriendObject = {
      ...possibleFriend,
      friends: {
        friendsList: [
          ...possibleFriend.friends.friendsList,
          localUser.databaseKey!,
        ],
        sentRequests: possibleFriend.friends.sentRequests.filter(
          (receivedRequestKey) => receivedRequestKey !== localUser.databaseKey
        ),
        receivedRequests: possibleFriend.friends.receivedRequests,
      },
    };
    this.fbDb
      .object<User>(`users/${possibleFriend.databaseKey!}`)
      .update(possibleFriendObject);

    const localUserObject = {
      ...localUser,
      friends: {
        friendsList: [
          ...localUser.friends.friendsList,
          possibleFriend.databaseKey!,
        ],
        sentRequests: localUser.friends.sentRequests,
        receivedRequests: localUser.friends.receivedRequests.filter(
          (receivedRequestKey) =>
            receivedRequestKey !== possibleFriend.databaseKey
        ),
      },
    };
    this.fbDb
      .object<User>(`users/${localUser.databaseKey!}`)
      .update(localUserObject);
  }

  declineFriendRequest(possibleFriend: User): void {}
}
