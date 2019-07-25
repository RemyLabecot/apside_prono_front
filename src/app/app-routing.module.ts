import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './site/home/home.component';
import { AuthGuard } from './services/auth/auth.guard';
import { LoginComponent } from './site/login/login.component';
import { PlayerComponent } from './site/player/player.component';



const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component : HomeComponent,canActivate: [AuthGuard]},
  {path:'players', component : PlayerComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
