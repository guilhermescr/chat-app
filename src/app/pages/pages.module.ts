import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';

import { JoinComponent } from './join/join.component';
import { UsersComponent } from './users/users.component';
import { FriendsComponent } from './friends/friends.component';

@NgModule({
  declarations: [JoinComponent, UsersComponent, FriendsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MatIconModule,
    MatButtonModule,
    MatBadgeModule,
  ],
})
export class PagesModule {}
