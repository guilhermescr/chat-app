import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JoinComponent } from './pages/join/join.component';
import { HomeComponent } from './pages/chat/home/home.component';

import { AuthGuard } from './core/guards/auth.guard';
import { UsersComponent } from './pages/users/users.component';
import { FriendsComponent } from './pages/friends/friends.component';
import { ChatComponent } from './pages/chat/chat.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/chat',
  },
  {
    path: 'chat',
    canActivate: [AuthGuard],
    component: ChatComponent,
    loadChildren: () =>
      import('./pages/chat/chat.module').then((m) => m.ChatModule),
  },
  {
    path: 'join',
    component: JoinComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
