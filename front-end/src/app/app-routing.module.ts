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
import { LegalPageComponent } from './componentes/legal-page/legal-page.component';

import { IdeasCreateComponent } from './componentes/meetings/brainstorming/ideas-create/ideas-create.component';
import { IdeaVotePageComponent } from './componentes/meetings/brainstorming/idea-vote-page/idea-vote-page.component';
import { VideoconferencesComponent } from './componentes/videoconferences/videoconferences.component';
import { PaymentSuccessPageComponent } from './componentes/payment-success-page/payment-success-page.component';
import { ProfilePageComponent } from './componentes/profile-page/profile-page.component';
import { EditProfilePageComponent } from './componentes/edit-profile-page/edit-profile-page.component';
import { NotificationsPageComponent } from './componentes/notifications-page/notifications-page.component';
import { AuthGuard } from './security/auth.guard';

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'pricing',component: PricingComponent},
  {path: 'legal',component: LegalPageComponent},
  {path: 'success',component: PaymentSuccessPageComponent},
  {path: 'meeting', component: MeetingPageComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginPageComponent},
  {path: 'register', component: RegisterPageComponent},
  {path: 'home', component: HomePageComponent},
  {path: 'notifications',component: NotificationsPageComponent, canActivate: [AuthGuard]},
  {path: 'meeting/:id', component: DynamicMeetingComponent, canActivate: [AuthGuard]},
  {path: 'minutes/:id', component: DynamicMinutesComponent, canActivate: [AuthGuard]},
  {path: 'agenda/:meetingId', component: AgendaPageComponent, canActivate: [AuthGuard]},
  {path: 'organization-department/:organizationId', component: OrganizationDepartmentPageComponent, canActivate: [AuthGuard]},
  {path: 'meeting/list/:userId/page/:p', component: ListMeetingPageComponent, canActivate: [AuthGuard]},
  {path: 'organization/list/:userId', component: ListOrganizationDepartmentPageComponent, canActivate: [AuthGuard]},
  {path: 'ideas', component: IdeasCreateComponent, canActivate: [AuthGuard]},
  {path: 'callings/:id',component: VideoconferencesComponent, canActivate: [AuthGuard]},
  { path: 'me', component: ProfilePageComponent, canActivate: [AuthGuard]},
  { path: 'me/edit', component: EditProfilePageComponent, canActivate: [AuthGuard]},
  {path: '**', component: NotFoundPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }