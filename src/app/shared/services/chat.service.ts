import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private dbPath = '/users';
  private globalChatPath = '/global';
  tasksRef: AngularFireList<User>;

  constructor(private fbDb: AngularFireDatabase) {
    this.tasksRef = fbDb.list(this.dbPath);
  }

  registerNewUser(username: string): void {
    this.tasksRef.push({ username, isOnline: true, messages: [] });
  }
}
