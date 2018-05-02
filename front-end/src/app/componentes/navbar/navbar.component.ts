import { LoginService } from './../services/login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private loginService: LoginService, private router:Router) { }

  ngOnInit() {
  }


  public getLoginService(): LoginService {
    return this.loginService;
  }


  navigate() {
    eval("$('.navbar-collapse').collapse('hide')");
  }

  logout() {
    this.getLoginService().logout();
    this.navigate();
  }
}
