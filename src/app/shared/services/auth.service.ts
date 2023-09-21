import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ChatService } from './chat.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(localStorage.getItem('username'));
  public user = this.userSubject.asObservable();

  constructor(private router: Router, private chatService: ChatService) {}

  joinUser(usernameInput: string): void {
    localStorage.setItem('username', usernameInput);
    this.userSubject.next(usernameInput);
    this.chatService.registerNewUser(usernameInput);

    this.router.navigateByUrl('/chat');
  }

  logOutUser(): void {
    localStorage.removeItem('username');
    this.userSubject.next(null);
  }
}
