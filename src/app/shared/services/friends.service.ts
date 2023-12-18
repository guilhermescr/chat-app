import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

import { User } from '../models/user.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class FriendsService {
  constructor(
    private fbDb: AngularFireDatabase,
    private authService: AuthService
  ) {}

  sendFriendRequest(user: User): void {
    const localUser = this.authService.getLocalUser();

    const possibleFriendObject = {
      ...user,
      friends: {
        friendsList: user.friends.friendsList,
        sentRequests: user.friends.sentRequests,
        receivedRequests: [
          ...localUser.friends.receivedRequests,
          localUser.databaseKey!,
        ],
      },
    };
    this.fbDb
      .object<User>(`users/${user.databaseKey!}`)
      .update(possibleFriendObject);

    const localUserObject = {
      ...localUser,
      friends: {
        friendsList: localUser.friends.friendsList,
        sentRequests: [...localUser.friends.sentRequests, user.databaseKey!],
        receivedRequests: localUser.friends.receivedRequests,
      },
    };
    this.fbDb
      .object<User>(`users/${localUser.databaseKey!}`)
      .update(localUserObject);
  }
}
