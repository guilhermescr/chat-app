import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatRoutingModule } from './chat-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { ChatComponent } from './chat.component';
import { HomeComponent } from './home/home.component';
import { OneOnOneComponent } from './one-on-one/one-on-one.component';
import { GlobalComponent } from './global/global.component';

@NgModule({
  declarations: [
    ChatComponent,
    HomeComponent,
    OneOnOneComponent,
    GlobalComponent,
  ],
  imports: [CommonModule, ChatRoutingModule, SharedModule],
})
export class ChatModule {}
