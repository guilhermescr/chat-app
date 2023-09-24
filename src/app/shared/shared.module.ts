import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WrapperComponent } from './components/wrapper/wrapper.component';
import { ChatListComponent } from './components/chat-list/chat-list.component';
import { ChatBoxComponent } from './components/chat-box/chat-box.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [WrapperComponent, ChatListComponent, ChatBoxComponent],
  imports: [CommonModule, FormsModule],
  exports: [WrapperComponent, ChatListComponent, ChatBoxComponent],
})
export class SharedModule {}
