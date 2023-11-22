import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { WrapperComponent } from './components/wrapper/wrapper.component';
import { ChatListComponent } from './components/chat-list/chat-list.component';
import { ChatBarComponent } from './components/chat-bar/chat-bar.component';
import { FormsModule } from '@angular/forms';
import { MessageKebabButtonComponent } from './components/message-kebab-button/message-kebab-button.component';
import { UserMessageComponent } from './components/user-message/user-message.component';
import { GroupChatComponent } from './components/group-chat/group-chat.component';
import { PrivateChatComponent } from './components/private-chat/private-chat.component';

@NgModule({
  declarations: [
    WrapperComponent,
    ChatListComponent,
    ChatBarComponent,
    MessageKebabButtonComponent,
    UserMessageComponent,
    GroupChatComponent,
    PrivateChatComponent,
  ],
  imports: [CommonModule, RouterModule, FormsModule],
  exports: [
    WrapperComponent,
    ChatListComponent,
    ChatBarComponent,
    GroupChatComponent,
    PrivateChatComponent,
    UserMessageComponent,
    MessageKebabButtonComponent,
  ],
})
export class SharedModule {}
