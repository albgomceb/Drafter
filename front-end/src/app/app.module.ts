import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { FooterComponent } from './componentes/footer/footer.component';
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
import { IdeaService } from './componentes/services/idea.service';

import { DynamicMeetingService } from './componentes/services/dynamic-meeting.service';
import { SixHatsService } from './componentes/services/sixhats.service';

import { LoginService } from './componentes/services/login.service';
import { RegisterService } from './componentes/services/register.service';
import { BaseRequestOptions } from '@angular/http';

@NgModule({
  declarations: [
    AppComponent,
    MeetingPageComponent,
    NavbarComponent,
    FooterComponent,
    NotFoundPageComponent,
    LoginPageComponent,
    RegisterPageComponent,
    HomePageComponent,
    AgendaPageComponent,
    ChatComponent,
    StandardMeetingComponent,
    DynamicMeetingComponent,
    DynamicMinutesComponent,
    StandardComponent,
    StandardMinutesPageComponent,
    AgendaPageComponent,
    SixHatsMeetingComponent,
    SixHatsComponent,
    IdeasProsConsComponent,
    BrainstormingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],

  providers: [
    UserService, 
    LoginService,
    RegisterService,
    MeetingService,
    AgendaService,
    FormsModule,
    ReactiveFormsModule,
    RealTimeService,
    BaseRequestOptions,
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
