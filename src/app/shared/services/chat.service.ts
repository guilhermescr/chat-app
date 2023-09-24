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

  constructor(private fbDb: AngularFireDatabase) {
    this.usersRef = fbDb.list(this.dbPath);
    this.globalChatRef = fbDb.list(this.globalChatPath);
  }

  registerNewUser(username: string): void {
    this.usersRef.push({ username, isOnline: true, messages: [] });
  }

  addMessageToGlobalChat(message: Message): void {
    this.globalChatRef.push(message);
  }
}
