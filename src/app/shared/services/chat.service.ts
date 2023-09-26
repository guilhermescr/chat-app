import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import { User } from '../models/user.model';
import { Message } from '../models/message.model';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private dbPath = '/users';
  private globalChatPath = '/global';
  usersRef: AngularFireList<User>;
  globalChatRef: AngularFireList<Message>;
  users: User[] = [];

  constructor(private fbDb: AngularFireDatabase) {
    this.usersRef = fbDb.list(this.dbPath);
    this.globalChatRef = fbDb.list(this.globalChatPath);

    this.usersRef.valueChanges().subscribe((data) => (this.users = data));
  }

  registerNewUser(username: string): void {
    this.usersRef.push({
      username,
      isOnline: true,
      usernameHeadingColor: this.getRandomColorForUsernameHeading(),
      messages: [],
    });
  }

  addMessageToGlobalChat(message: Message): void {
    this.globalChatRef.push(message);
  }

  deleteMessageFromGlobalChat(messageKey: string): void {
    const messageRef = this.fbDb.object('global/' + messageKey);
    messageRef.remove();
  }

  getRandomColorForUsernameHeading(): string {
    const colors = [
      '#ff0000',
      '#ffa500',
      '#ffff00',
      '#008000',
      '#0000ff',
      '#4b0082',
      '#ee82ee',
    ];
    const colorIndex = Math.floor(Math.random() * colors.length);
    return colors[colorIndex];
  }
}
