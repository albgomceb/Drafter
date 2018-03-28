import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MeetingPageComponent} from './componentes/meeting-page/meeting-page.component';
import { NotFoundPageComponent } from './componentes/not-found-page/not-found-page.component';
import { LoginPageComponent } from './componentes/login-page/login-page.component';
import { RegisterPageComponent } from './componentes/register-page/register-page.component';
import { HomePageComponent } from './componentes/home-page/home-page.component';
import { StandardMeetingComponent } from './componentes/meetings/standard-meeting/standard-meeting.component';
import { MinutesPageComponent } from './componentes/minutes-page/minutes-page.component';
import { AgendaPageComponent } from './componentes/agenda-page/agenda-page.component';
import { SixHatsMeetingComponent } from './componentes/meetings/six-hats/six-hats-meeting/six-hats-meeting.component';

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'meeting', component: MeetingPageComponent},
  {path: 'login', component: LoginPageComponent},
  {path: 'register', component: RegisterPageComponent},
  {path: 'home', component: HomePageComponent},
  {path: 'meeting/:id', component: StandardMeetingComponent},
  {path: 'minutes/:id', component: MinutesPageComponent},
  {path: 'agenda/:meetingId', component: AgendaPageComponent},
  {path: 'six-hats', component: SixHatsMeetingComponent},
  {path: '**', component: NotFoundPageComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
