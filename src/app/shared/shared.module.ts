import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';

import { WrapperComponent } from './components/wrapper/wrapper.component';
import { ChatListComponent } from './components/chat-list/chat-list.component';
import { ChatBarComponent } from './components/chat-bar/chat-bar.component';

import { MessageKebabButtonComponent } from './components/message-kebab-button/message-kebab-button.component';
import { UserMessageComponent } from './components/user-message/user-message.component';
import { GroupChatComponent } from './components/group-chat/group-chat.component';
import { PrivateChatComponent } from './components/private-chat/private-chat.component';
import { FriendRequestsModalComponent } from './components/friend-requests-modal/friend-requests-modal.component';

@NgModule({
  declarations: [
    WrapperComponent,
    ChatListComponent,
    ChatBarComponent,
    MessageKebabButtonComponent,
    UserMessageComponent,
    GroupChatComponent,
    PrivateChatComponent,
    FriendRequestsModalComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatBadgeModule,
  ],
  exports: [
    WrapperComponent,
    ChatListComponent,
    ChatBarComponent,
    GroupChatComponent,
    PrivateChatComponent,
    UserMessageComponent,
    MessageKebabButtonComponent,
    FriendRequestsModalComponent,
  ],
})
export class SharedModule {}
