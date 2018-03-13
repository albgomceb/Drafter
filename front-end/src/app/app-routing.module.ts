import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {ParticipantsPageComponent} from './componentes/participants-page/participants-page.component';
import { NotFoundPageComponent } from './componentes/not-found-page/not-found-page.component';

const routes: Routes = [
  {path: 'participants', component: ParticipantsPageComponent},
  {path: '**', component: NotFoundPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
