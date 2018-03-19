import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import {FormGroup,Validators,FormControl} from '@angular/forms'

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  myform:FormGroup;
  email:FormControl;
  password:FormControl;

  constructor(private auth:AuthenticationService ) { }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }

  createFormControls() {
    this.email = new FormControl('');
    this.password = new FormControl('');
    }

  createForm() {
    this.myform = new FormGroup({
      email: this.email,
      password: this.password,
    });
  }

  onClickGoogleLogin(){
    console.log('google');
  }

  onSubmit(){
    console.log(this.myform.value.email,this.myform.value.password);
    this.auth.login(this.myform.value.email,this.myform.value.password);
  }

}
