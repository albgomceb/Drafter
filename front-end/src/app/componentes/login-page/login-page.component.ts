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
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
 
  login:Login;
  loginForm:FormGroup;
  showError:Boolean = false;
  email:FormControl;
  password:FormControl;
  authenticated:Boolean = false;

  constructor(private loginService: LoginService,  private router:Router) { }

  ngOnInit() {
    this.
      loginForm = new FormGroup({
        email : new FormControl(),
        password : new FormControl()
      });
  }

  onSubmit(loginForm){
    this.login = new Login();

    this.login.setEmail(this.loginForm.value.email);
    this.login.setPassword(this.loginForm.value.password);
    
    this.loginService.login(this.login).subscribe((res:any) =>{
      this.loginService.init();
      this.router.navigate(['meeting/']);
    }, error => {
      if(error.status == 424){
        this.showError=true;
      }
  });
  console.log(this.login);
  
  }
}