import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { ChatComponent } from './chat/chat.component';

@NgModule({
  declarations: [LoginComponent, ChatComponent],
  imports: [CommonModule, FormsModule],
})
export class PagesModule {}
