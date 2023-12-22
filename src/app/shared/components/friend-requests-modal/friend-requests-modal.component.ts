import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { FriendsService } from '../../services/friends.service';

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
    private authService: AuthService,
    private friendsService: FriendsService
  ) {}

  fireCloseFriendRequestsModalEvent(): void {
    this.closeFriendRequestsModalEvent.emit();
  }

  acceptFriendRequest(possibleFriend: User): void {
    this.friendsService.addFriend(possibleFriend);
  }

  declineFriendRequest(possibleFriend: User): void {}
}
