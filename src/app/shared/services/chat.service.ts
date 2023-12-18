import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import { Message } from '../models/message.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private globalChatPath = '/chat/global';
  globalChatRef: AngularFireList<Message>;

  constructor(private fbDb: AngularFireDatabase) {
    this.globalChatRef = fbDb.list(this.globalChatPath);
  }

  getGlobalMessages(): Observable<Message[]> {
    return this.globalChatRef.valueChanges();
  }

  addMessageToGlobalChat(message: Message): void {
    this.globalChatRef.push(message);
  }

  deleteMessageFromGlobalChat(messageKey: string): void {
    const messageRef = this.fbDb.object('chat/global/' + messageKey);
    messageRef.remove();
  }

  getRandomColorForUsernameHeading(): string {
    const colors = [
      '#ff0000',
      '#ffa500',
      '#f0d228',
      '#008000',
      '#0000ff',
      '#4b0082',
      '#ee82ee',
    ];
    const colorIndex = Math.floor(Math.random() * colors.length);
    return colors[colorIndex];
  }
}
