import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {ParticipantsPageComponent} from './componentes/participants-page/participants-page.component';
import { NotFoundPageComponent } from './componentes/not-found-page/not-found-page.component';
import { LoginPageComponent } from './componentes/login-page/login-page.component';
import { RegisterPageComponent } from './componentes/register-page/register-page.component';
import { HomePageComponent } from './componentes/home-page/home-page.component';
import { CallbackComponent } from './callback/callback.component';

const routes: Routes = [
  {path: 'participants', component: ParticipantsPageComponent},
  {path: 'login', component: LoginPageComponent},
  {path: 'register', component: RegisterPageComponent},
  {path: 'home', component: HomePageComponent},
  {path:'callback',component:CallbackComponent},
  {path: '**', component: NotFoundPageComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
