import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {AuthGuard} from './auth.guard';
import {AuthComponent} from './pages/auth/auth.component';
import {MainComponent} from './pages/main/main.component';
const routes222: Routes = [
  {
    path:'auth',
    component:AuthComponent
  },
  {
    path: '**',
    component:MainComponent,
    canActivate: [ AuthGuard ]
  }

];

export const routing = RouterModule.forRoot(routes222);
