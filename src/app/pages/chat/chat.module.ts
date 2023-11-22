import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatRoutingModule } from './chat-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { ChatComponent } from './chat.component';
import { HomeComponent } from './home/home.component';
import { OneOnOneComponent } from './one-on-one/one-on-one.component';
import { GroupComponent } from './group/group.component';

@NgModule({
  declarations: [ChatComponent, HomeComponent, OneOnOneComponent, GroupComponent],
  imports: [CommonModule, ChatRoutingModule, SharedModule],
})
export class ChatModule {}
