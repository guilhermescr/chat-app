import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FriendsComponent } from '../friends/friends.component';
import { OneOnOneComponent } from './one-on-one/one-on-one.component';
import { GlobalComponent } from './global/global.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'friends',
    component: FriendsComponent,
  },
  {
    path: 'global',
    component: GlobalComponent,
  },
  {
    path: 'one-on-one/:id',
    component: OneOnOneComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatRoutingModule {}
