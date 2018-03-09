import { NgModule } from '@angular/core';
import {RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {StarsComponent} from './stars/stars.component';
import {StarDetailComponent} from './star-detail/star-detail.component';

const routes: Routes = [
  {path: 'stars', component: StarsComponent},
  {path: 'dashboard', component: DashboardComponent},
  { path: 'detail/:id', component: StarDetailComponent },
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
