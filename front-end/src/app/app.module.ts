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
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { BaseRequestOptions } from '@angular/http';
import { UserService } from './componentes/services/user.service';
import { AuthenticationService } from './componentes/services/authentication.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { fakeBackendProvider } from './componentes/helpers/index';
import { AuthGuard } from './componentes/guards/auth.guard';
import { JwtInterceptor } from './componentes/helpers/index';


@NgModule({
  declarations: [
    AppComponent,
    ParticipantsPageComponent,
    NavbarComponent,
    NotFoundPageComponent,
    LoginPageComponent,
    RegisterPageComponent,
    HomePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ AuthGuard,
    AuthenticationService,
    UserService,
    {
        provide: HTTP_INTERCEPTORS,
        useClass: JwtInterceptor,
        multi: true
    },

    // provider used to create fake backend
    fakeBackendProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
