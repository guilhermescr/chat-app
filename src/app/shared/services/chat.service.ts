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
  private globalChatPath = '/global';
  globalChatRef: AngularFireList<Message>;

  constructor(private fbDb: AngularFireDatabase) {
    this.globalChatRef = fbDb.list(this.globalChatPath);
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
