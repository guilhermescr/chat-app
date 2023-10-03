import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import { BehaviorSubject } from 'rxjs';
import { ChatService } from './chat.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private usersSubject: BehaviorSubject<User[]> = new BehaviorSubject<User[]>(
    []
  );
  public users = this.usersSubject.asObservable();
  usersWithoutMe: User[] = [];

  private userSubject: BehaviorSubject<User | null> =
    new BehaviorSubject<User | null>(null);
  public user = this.userSubject.asObservable();

  private dbPath = '/users';
  usersRef: AngularFireList<User>;

  localUsername: string | null = localStorage.getItem('username');

  constructor(
    private router: Router,
    private fbDb: AngularFireDatabase,
    private chatService: ChatService
  ) {
    this.usersRef = fbDb.list(this.dbPath);

    this.usersRef.valueChanges().subscribe((usersData) => {
      this.usersSubject.next(usersData);
      this.usersWithoutMe = usersData.filter(
        (userData) => userData.username !== this.userSubject.value?.username
      );

      console.log(usersData, this.usersWithoutMe);
    });
  }

  getUser(username: string): User {
    return this.getUsers().find((user) => user.username === username)!;
  }

  getUsers(): User[] {
    return this.usersSubject.value;
  }

  checkIfUserIsRegisteredInDatabase(username: string): boolean {
    return !!this.getUsers().find((user) => user.username === username);
  }

  registerUser(user: User): void {
    this.usersRef.push(user);
    localStorage.setItem('username', user.username);
  }

  joinUser(user: User): void {
    localStorage.setItem('username', user.username);
    this.userSubject.next(user);

    this.router.navigateByUrl('/chat');
  }

  handleAuthentication(userData: User, isNewAccount: boolean): void {
    const user: User = {
      ...userData,
      usernameHeadingColor: this.chatService.getRandomColorForUsernameHeading(),
      friends: [],
      messages: [],
    };
    const isUserRegisteredInDatabase = this.checkIfUserIsRegisteredInDatabase(
      userData.username
    );

    if (
      (isNewAccount && isUserRegisteredInDatabase) ||
      (!isNewAccount && !isUserRegisteredInDatabase)
    ) {
      // throw error at JoinComponent View

      return;
    }

    if (isNewAccount) {
      this.registerUser(user);
    }

    this.joinUser(user);
  }

  logOutUser(): void {
    localStorage.removeItem('username');
    this.userSubject.next(null);
  }

  isThisUserMyFriend(possibleFriend: User): boolean {
    return !!this.userSubject.value?.friends?.find(
      (friend) => friend === possibleFriend.username
    );
  }
}
