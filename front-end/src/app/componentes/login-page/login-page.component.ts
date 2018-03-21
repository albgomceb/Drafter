import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import {FormGroup,Validators,FormControl} from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  myform:FormGroup;
  email:FormControl;
  password:FormControl;
  model: any = {};
    loading = false;
    returnUrl: string;

  constructor(private route: ActivatedRoute,
    private router: Router,private auth:AuthenticationService ) { }

    ngOnInit() {
      this.createFormControls()
      this.createForm()
      // reset login status
      this.auth.logout();

      // get return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
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

  login() {
    this.loading = true;
    this.auth.login(this.model.email, this.model.password)
        .subscribe(
            data => {
                this.router.navigate([this.returnUrl]);
            },
            error => {
                console.log(error);
                this.loading = false;
            });
}

}
