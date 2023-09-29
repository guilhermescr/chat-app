import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ChatComponent } from './pages/chat/chat.component';

import { AuthGuard } from './core/guards/auth.guard';
import { UsersComponent } from './pages/users/users.component';
import { FriendsComponent } from './pages/users/friends/friends.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/chat',
  },
  {
    path: 'chat',
    canActivate: [AuthGuard],

    children: [
      {
        path: '',
        component: ChatComponent,
      },
    ],
  },
  {
    path: 'users',
    children: [
      {
        path: '',
        component: UsersComponent,
      },
      {
        path: 'friends',
        component: FriendsComponent,
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
