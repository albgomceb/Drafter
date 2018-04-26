import { LoginService } from './../services/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }


  public getLoginService(): LoginService {
    return this.loginService;
  }

}
