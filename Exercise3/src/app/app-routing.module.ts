import {NgModule}             from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthenticateComponent} from './authenticate/authenticate.component';
import {ProgramsComponent} from './programs/programs.component';
import {AuthenticateGuard} from './authenticate/authenticate.guard';

const appRoutes: Routes = [
  {path: '', component: ProgramsComponent, canActivate: [AuthenticateGuard]},
  {
    path: 'login', component: AuthenticateComponent,
    data: {login: true, register: false}
  },
  {
    path: 'logout',
    component: AuthenticateComponent,
    data: {login: true, register: false},
    canActivate: [AuthenticateGuard]
  },
  {
    path: 'register', component: AuthenticateComponent,
    data: {login: false, register: true}
  },
  {path: '**', component: ProgramsComponent, canActivate: [AuthenticateGuard]},
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
