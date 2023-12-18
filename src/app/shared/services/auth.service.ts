import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import { BehaviorSubject } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

import { ChatService } from './chat.service';
import { User, UserLogin } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private usersSubject: BehaviorSubject<User[]> = new BehaviorSubject<User[]>(
    []
  );
  public users = this.usersSubject.asObservable();
  usersWithoutMe: User[] = [];

  private localUserSubject: BehaviorSubject<User | null> =
    new BehaviorSubject<User | null>(null);
  public localUser = this.localUserSubject.asObservable();

  private dbPath = '/users';
  usersRef: AngularFireList<User>;

  localUsername: string | null = localStorage.getItem('username');

  constructor(
    private router: Router,
    private fbDb: AngularFireDatabase,
    private chatService: ChatService
  ) {
    this.usersRef = fbDb.list(this.dbPath);

    this.usersRef.snapshotChanges().subscribe((usersData) => {
      let usersList = usersData.map((userData) => {
        const userDataPayloadValue = userData.payload.val()!;
        const hasFriendsArrayInUserData =
          Object.keys(userDataPayloadValue).includes('friends');

        if (!hasFriendsArrayInUserData) {
          const userDataReturn = {
            databaseKey: userData.key!,
            ...userDataPayloadValue,
            friends: {
              friendsList: [],
              sentRequests: [],
              receivedRequests: [],
            },
          };

          return userDataReturn;
        } else {
          const friendsProps = Object.keys(userDataPayloadValue.friends);

          const hasFriendsListInUserData = friendsProps.includes('friendsList');
          const hasSentRequestsInUserData =
            friendsProps.includes('sentRequests');
          const hasReceivedRequestsInUserData =
            friendsProps.includes('receivedRequests');

          let userDataReturn = {
            databaseKey: userData.key!,
            ...userDataPayloadValue,
          };

          if (!hasFriendsListInUserData) {
            userDataReturn.friends.friendsList = [];
          }

          if (!hasSentRequestsInUserData) {
            userDataReturn.friends.sentRequests = [];
          }

          if (!hasReceivedRequestsInUserData) {
            userDataReturn.friends.receivedRequests = [];
          }

          return userDataReturn;
        }
      });

      const localUser = usersList.find(
        (userData) => userData.username === this.localUsername
      )!;

      this.localUserSubject.next(localUser);

      this.usersSubject.next(usersList);
      this.usersWithoutMe = usersList.filter(
        (userData) => userData.username !== this.localUsername
      );
    });
  }

  getUser(username: string): User {
    return this.getUsers().find((user) => user.username === username)!;
  }

  getLocalUser(): User {
    return this.localUserSubject.value!;
  }

  getUsers(): User[] {
    return this.usersSubject.value;
  }

  checkIfUserIsRegisteredInDatabase(username: string): boolean {
    return !!this.getUsers().find((user) => user.username === username);
  }

  isUserDataEqualToOneOfTheRegisteredOnes(userData: UserLogin): boolean {
    return !!this.getUsers().find(
      (user) =>
        user.username === userData.username &&
        user.password === userData.password
    );
  }

  registerUser(user: User): void {
    this.usersRef.push(user);
    localStorage.setItem('username', user.username);
  }

  joinUser(user: User): void {
    localStorage.setItem('username', user.username);
    this.localUserSubject.next(user);

    this.router.navigateByUrl('/chat');
  }

  handleAuthentication(userData: any, isNewAccount: boolean): void {
    const user: User = {
      id: uuidv4(),
      ...userData,
      usernameHeadingColor: this.chatService.getRandomColorForUsernameHeading(),
      messages: [],
    };

    if (isNewAccount) {
      this.registerUser(user);
    }

    this.joinUser(user);
  }

  logOutUser(): void {
    localStorage.removeItem('username');
    this.localUserSubject.next(null);
  }

  isThisUserMyFriend(possibleFriend: User): boolean {
    return !![].find((friend: any) => friend === possibleFriend.username);
    // return !!this.userSubject.value?.friends?.find(
    //   (friend: any) => friend === possibleFriend.username
    // );
  }
}
