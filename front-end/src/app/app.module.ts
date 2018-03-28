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
import { StandardMeetingComponent, StandardComponent, DynamicMeetingComponent } from './componentes/meetings';
import { MeetingPageComponent } from './componentes/meeting-page/meeting-page.component';
import { SixHatsMeetingComponent } from './componentes/meetings/six-hats/six-hats-meeting/six-hats-meeting.component';

import { DynamicMeetingService } from './componentes/services/dynamic-meeting.service';


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
    StandardComponent,
    MinutesPageComponent,
    AgendaPageComponent,
    SixHatsMeetingComponent
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
    FormsModule,
    ReactiveFormsModule,
    RealTimeService,
    UserService,
    ReactiveFormsModule,
    DynamicMeetingService
  ],  
  bootstrap: [AppComponent]
})
export class AppModule { }
