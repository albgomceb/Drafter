import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { NotFoundPageComponent } from './componentes/not-found-page/not-found-page.component';
import { LoginPageComponent } from './componentes/login-page/login-page.component';
import { RegisterPageComponent } from './componentes/register-page/register-page.component';
import { HomePageComponent } from './componentes/home-page/home-page.component';
import { MinutesPageComponent } from './componentes/minutes-page/minutes-page.component';

import {HttpClientModule} from "@angular/common/http";
import { AgendaPageComponent } from './componentes/agenda-page/agenda-page.component';
import { AgendaService } from './componentes/services/agenda.service';
import { UserService } from './componentes/services/user.service';
import { MeetingService } from './componentes/services/meeting.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RealTimeService } from './services/real-time.service';
import { ChatComponent } from './componentes/chat/chat.component';
import { StandardMeetingComponent } from './componentes/meetings/standard-meeting/standard-meeting.component';
import { MeetingPageComponent } from './componentes/meeting-page/meeting-page.component';
import { OrganizationDepartmentPageComponent } from './componentes/organization-department-page/organization-department-page.component';
import { Organization } from './componentes/models/organization.model';
import { OrganizationService } from './componentes/services/organization.service';


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
    MinutesPageComponent,
    AgendaPageComponent,
    OrganizationDepartmentPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
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
    ReactiveFormsModule
  ],  
  bootstrap: [AppComponent]
})
export class AppModule { }
