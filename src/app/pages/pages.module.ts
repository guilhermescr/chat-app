import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { ChatComponent } from './chat/chat.component';
import { SharedModule } from '../shared/shared.module';
import { UsersComponent } from './users/users.component';
import { FriendsComponent } from './users/friends/friends.component';

@NgModule({
  declarations: [LoginComponent, ChatComponent, UsersComponent, FriendsComponent],
  imports: [CommonModule, FormsModule, SharedModule],
})
export class PagesModule {}
