import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ParticipantsPageComponent } from './componentes/participants-page/participants-page.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { NotFoundPageComponent } from './componentes/not-found-page/not-found-page.component';
import { LoginPageComponent } from './componentes/login-page/login-page.component';
import { RegisterPageComponent } from './componentes/register-page/register-page.component';
import { HomePageComponent } from './componentes/home-page/home-page.component';

import {HttpClientModule} from "@angular/common/http";
import { AgendaPageComponent } from './componentes/agenda-page/agenda-page.component';
import { AgendaService } from './componentes/services/agenda.service';
import { ParticipantService } from './componentes/services/participant.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RealTimeService } from './services/real-time.service';
import { ChatComponent } from './componentes/chat/chat.component';
import { StandardMeetingComponent } from './componentes/meetings/standard-meeting/standard-meeting.component';


@NgModule({
  declarations: [
    AppComponent,
    ParticipantsPageComponent,
    NavbarComponent,
    NotFoundPageComponent,
    LoginPageComponent,
    RegisterPageComponent,
    HomePageComponent,
    AgendaPageComponent,
    ChatComponent,
    StandardMeetingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    AgendaService,
    ParticipantService,
    FormsModule,
    ReactiveFormsModule,
    RealTimeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
