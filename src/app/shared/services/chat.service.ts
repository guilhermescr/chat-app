import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private dbPath = '/users';
  tasksRef: AngularFireList<{ username: string }>;

  constructor(private fbDb: AngularFireDatabase) {
    this.tasksRef = fbDb.list(this.dbPath);
  }
}
