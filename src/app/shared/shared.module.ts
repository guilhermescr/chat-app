import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { WrapperComponent } from './components/wrapper/wrapper.component';
import { ChatListComponent } from './components/chat-list/chat-list.component';
import { ChatBoxComponent } from './components/chat-box/chat-box.component';
import { FormsModule } from '@angular/forms';
import { MessageKebabButtonComponent } from './components/message-kebab-button/message-kebab-button.component';
import { UserMessageComponent } from './components/user-message/user-message.component';

@NgModule({
  declarations: [
    WrapperComponent,
    ChatListComponent,
    ChatBoxComponent,
    MessageKebabButtonComponent,
    UserMessageComponent,
  ],
  imports: [CommonModule, RouterModule, FormsModule],
  exports: [
    WrapperComponent,
    ChatListComponent,
    ChatBoxComponent,
    UserMessageComponent,
    MessageKebabButtonComponent,
  ],
})
export class SharedModule {}
