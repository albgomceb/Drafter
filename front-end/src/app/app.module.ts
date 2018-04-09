import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { NotFoundPageComponent } from './componentes/not-found-page/not-found-page.component';
import { LoginPageComponent } from './componentes/login-page/login-page.component';
import { RegisterPageComponent } from './componentes/register-page/register-page.component';
import { HomePageComponent } from './componentes/home-page/home-page.component';

import {HttpClientModule} from "@angular/common/http";
import { AgendaPageComponent } from './componentes/agenda-page/agenda-page.component';
import { AgendaService } from './componentes/services/agenda.service';
import { UserService } from './componentes/services/user.service';
import { MeetingService } from './componentes/services/meeting.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RealTimeService } from './services/real-time.service';
import { ChatComponent } from './componentes/chat/chat.component';
import { StandardMeetingComponent, StandardComponent, DynamicMeetingComponent, SixHatsMeetingComponent, SixHatsComponent, DynamicMinutesComponent, StandardMinutesPageComponent, IdeasProsConsComponent, BrainstormingComponent } from './componentes/meetings';
import { MeetingPageComponent } from './componentes/meeting-page/meeting-page.component';
import { OrganizationDepartmentPageComponent } from './componentes/organization-department-page/organization-department-page.component';
import { Organization } from './componentes/models/organization.model';
import { OrganizationService } from './componentes/services/organization.service';
import { DynamicMeetingService } from './componentes/services/dynamic-meeting.service';
import { SixHatsService } from './componentes/services/sixhats.service';
import { IdeaService } from './componentes/services/idea.service';
import { ListMeetingPageComponent } from './componentes/list-meeting-page/list-meeting-page.component';


@NgModule({
  declarations: [
    AppComponent,
    MeetingPageComponent,
    NavbarComponent,
    NotFoundPageComponent,
    LoginPageComponent,
    RegisterPageComponent,
    HomePageComponent,
    AgendaPageComponent,
    ChatComponent,
    StandardMeetingComponent,
    DynamicMeetingComponent,
    DynamicMinutesComponent,
    OrganizationDepartmentPageComponent,
    StandardComponent,
    StandardMinutesPageComponent,
    AgendaPageComponent,
    SixHatsMeetingComponent,
    SixHatsComponent,
    IdeasProsConsComponent,
    BrainstormingComponent,
    ListMeetingPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],

  providers: [
    UserService, 
    MeetingService,
    AgendaService,
    OrganizationService,
    FormsModule,
    ReactiveFormsModule,
    RealTimeService,
    UserService,
    ReactiveFormsModule,
    DynamicMeetingService,
    SixHatsService,
    IdeaService,
    IdeasProsConsComponent
  ],  
  bootstrap: [AppComponent]
})
export class AppModule { }
