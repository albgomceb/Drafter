import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileService } from '../services/profile.service';
import { User } from '../models/user.model';

@Component({
  selector: 'edit-profile-page',
  templateUrl: './edit-profile-page.component.html',
  styleUrls: ['./edit-profile-page.component.scss']
})
export class EditProfilePageComponent implements OnInit {

  public user:User;
  
  public profileForm:FormGroup;
  name:string;
  surname:string;
  username:string;
  phone:string;
  email:string;
  password:string;

  errorListUsers:boolean = false;

  constructor(private fb:FormBuilder, private profileService: ProfileService, private router: Router) {
    this.profileForm = this.fb.group({  // Esto es la validación de los campos
      name: ['name', Validators.compose([Validators.required]) ],
      surname: ['surname', Validators.compose([Validators.required]) ],
      username: ['username', Validators.compose([Validators.required, Validators.minLength(5)]) ],
      phone: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]+')]) ],
      email: ['a@a.com', Validators.compose([Validators.email]) ],
      password: ['', Validators.compose([Validators.required, Validators.minLength(5)]) ]
    })


   }

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

  onSubmit(profileForm){
    this.user.name = this.profileForm.value.name;
    this.user.surname = this.profileForm.value.surname;
    this.user.username = this.profileForm.value.username;
    this.user.email = this.profileForm.value.email;
    this.user.password = this.profileForm.value.password;

    if(this.user.password != "" && (this.user.password).length >= 5){
      this.profileService.updateUser(this.user).subscribe((res:any) =>{
        this.router.navigate(['/me/']);
      }, error => {
      });
    }
    
  }

}
