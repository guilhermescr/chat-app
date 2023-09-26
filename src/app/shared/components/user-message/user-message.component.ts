import { Component, Input } from '@angular/core';
import { Message } from '../../models/message.model';

@Component({
  selector: 'app-user-message',
  templateUrl: './user-message.component.html',
  styleUrls: ['./user-message.component.scss'],
})
export class UserMessageComponent {
  @Input() isHostUserWhoSentTheMessage!: boolean;
  @Input() messageData!: Message;
}
