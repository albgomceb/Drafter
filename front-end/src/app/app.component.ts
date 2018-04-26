import { Component } from '@angular/core';
import { AfterViewChecked } from '@angular/core';
import * as $ from 'jquery';
import { LoginService } from './componentes/services/login.service';
 
declare let paypal: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  loaded: boolean;

  constructor(private loginService: LoginService){}

  ngOnInit(){
    this.loaded = false;
    this.loginService.init(() => this.loaded = true);
  }


}
