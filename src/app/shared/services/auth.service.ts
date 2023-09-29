import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
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

  private userSubject: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(localStorage.getItem('username'));
  public user = this.userSubject.asObservable();

  constructor(private router: Router, private chatService: ChatService) {
    this.chatService.usersRef
      .valueChanges()
      .subscribe((data) => this.usersSubject.next(data));
  }

  getUsers(): User[] {
    return this.usersSubject.value;
  }

  registerNewUser(username: string): void {
    const newUser = {
      username,
      isOnline: true,
      usernameHeadingColor: this.chatService.getRandomColorForUsernameHeading(),
      friends: [],
      messages: [],
    };

    this.chatService.usersRef.push(newUser);
  }

  joinUser(usernameInput: string): void {
    localStorage.setItem('username', usernameInput);
    this.userSubject.next(usernameInput);
    this.registerNewUser(usernameInput);

    this.router.navigateByUrl('/chat');
  }

  logOutUser(): void {
    localStorage.removeItem('username');
    this.userSubject.next(null);
  }

  isThisUserMyFriend(user: User): boolean {
    return true;
  }
}
