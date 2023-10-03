import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JoinComponent } from './join/join.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChatComponent } from './chat/chat.component';
import { SharedModule } from '../shared/shared.module';
import { UsersComponent } from './users/users.component';
import { FriendsComponent } from './users/friends/friends.component';

@NgModule({
  declarations: [
    JoinComponent,
    ChatComponent,
    UsersComponent,
    FriendsComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SharedModule],
})
export class PagesModule {}
