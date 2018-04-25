import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MeetingPageComponent} from './componentes/meeting-page/meeting-page.component';
import { NotFoundPageComponent } from './componentes/not-found-page/not-found-page.component';
import { LoginPageComponent } from './componentes/login-page/login-page.component';
import { RegisterPageComponent } from './componentes/register-page/register-page.component';
import { HomePageComponent } from './componentes/home-page/home-page.component';
import { StandardMeetingComponent, DynamicMeetingComponent, DynamicMinutesComponent } from './componentes/meetings';

import { AgendaPageComponent } from './componentes/agenda-page/agenda-page.component';
import { OrganizationDepartmentPageComponent } from './componentes/organization-department-page/organization-department-page.component';
import { ListMeetingPageComponent } from './componentes/list-meeting-page/list-meeting-page.component';
import { ListOrganizationDepartmentPageComponent } from './componentes/list-organization-department-page/list-organization-department-page.component';
import { IdeasProsConsComponent } from './componentes/meetings/brainstorming/ideas-pros-cons/ideas-pros-cons.component';
import { PricingComponent } from './componentes/pricing/pricing.component';

import { IdeasCreateComponent } from './componentes/meetings/brainstorming/ideas-create/ideas-create.component';
import { IdeaVotePageComponent } from './componentes/meetings/brainstorming/idea-vote-page/idea-vote-page.component';

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'pricing',component: PricingComponent},
  {path: 'meeting', component: MeetingPageComponent},
  {path: 'login', component: LoginPageComponent},
  {path: 'register', component: RegisterPageComponent},
  {path: 'home', component: HomePageComponent},
  {path: 'meeting/:id', component: DynamicMeetingComponent},
  {path: 'minutes/:id', component: DynamicMinutesComponent},
  {path: 'agenda/:meetingId', component: AgendaPageComponent},
  {path: 'organization-department/:organizationId', component: OrganizationDepartmentPageComponent},
  {path: 'meeting/list/:userId/page/:p', component: ListMeetingPageComponent},
  {path: 'organization/list/:userId', component: ListOrganizationDepartmentPageComponent},
  {path: 'ideas', component: IdeasCreateComponent},
  {path: '**', component: NotFoundPageComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
