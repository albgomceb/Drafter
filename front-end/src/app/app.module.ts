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
// import { UserService } from './componentes/services/user.service';
import { AgendaPageComponent } from './componentes/agenda-page/agenda-page.component';
import { AgendaService } from './componentes/services/agenda.service';
import { UserService } from './componentes/services/user.service';
import { MeetingService } from './componentes/services/meeting.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MeetingPageComponent } from './componentes/meeting-page/meeting-page.component';


@NgModule({
  declarations: [
    AppComponent,
    MeetingPageComponent,
    NavbarComponent,
    NotFoundPageComponent,
    LoginPageComponent,
    RegisterPageComponent,
    HomePageComponent,
    MinutesPageComponent,
    AgendaPageComponent
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
    UserService,
    ReactiveFormsModule
  ],  
  bootstrap: [AppComponent]
})
export class AppModule { }
