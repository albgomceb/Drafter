import { Component, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from '../models/login.model';
import { ProfileService } from '../services/profile.service';
import { User } from '../models/user.model';

@Component({
  selector: 'profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  public user:User;
  
  errorListUsers:boolean = false;

  constructor(private profileService: ProfileService, private router: Router) { }

  ngOnInit() {
    this.profileService.getUser().subscribe(
      data => {
        this.user = data;
      },
      error => {
        this.errorListUsers = true;
      }
    );
  }

  // onSubmit(loginForm) {

  // }

}