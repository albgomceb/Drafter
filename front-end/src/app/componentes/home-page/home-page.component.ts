import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { Login } from '../models/login.model';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
 
  login:Login;
  loginForm:FormGroup;
  showError:Boolean = false;
  email:FormControl;
  password:FormControl;
  authenticated = false;

  constructor(private loginService: LoginService,  private router:Router) { }

  ngOnInit() {
    this.
      loginForm = new FormGroup({
        email : new FormControl(),
        password : new FormControl()
      });
  }

}
