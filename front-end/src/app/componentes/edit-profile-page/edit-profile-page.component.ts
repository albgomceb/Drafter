import { LoginService } from './../services/login.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileService } from '../services/profile.service';
import { User } from '../models/user.model';
import { environment } from '../../../environments/environment';
import * as $ from 'jquery';

@Component({
  selector: 'edit-profile-page',
  templateUrl: './edit-profile-page.component.html',
  styleUrls: ['./edit-profile-page.component.scss']
})
export class EditProfilePageComponent implements OnInit {

  public user: User;

  public profileForm: FormGroup;
  showError: Boolean = false;
  errorNumber: Boolean = false;
  name: string;
  surname: string;
  username: string;
  phone: string;
  email: string;
  password: string;

  errorListUsers: boolean = false;

  constructor(private fb: FormBuilder, private profileService: ProfileService, private router: Router, private loginService: LoginService) {
    this.profileForm = this.fb.group({  // Esto es la validación de los campos
      name: ['',],
      surname: ['',],
      username: ['',],
      phone: ['',],
      email: ['',],
      password: ['',],
      photo: ['',]
    })


  }

  //  Validators.compose([Validators.required, Validators.minLength(5)]) 

  ngOnInit() {
    this.profileService.getUser().subscribe(
      data => {
        this.user = data;
        if (this.user.photo == "/assets/img/none.png") {
          this.profileForm = this.fb.group({  // Esto es la validación de los campos
            name: [this.user.name, Validators.compose([Validators.required])],
            surname: [this.user.surname, Validators.compose([Validators.required])],
            username: [this.user.username, Validators.compose([Validators.required, Validators.minLength(5)])],
            phone: [this.user.phone, Validators.compose([Validators.required, Validators.minLength(9), Validators.maxLength(9), Validators.pattern('[0-9]+')])],
            email: [this.user.email, Validators.compose([Validators.email])],
            password: [this.user.password, Validators.compose([Validators.minLength(5)])],
            photo: ['', Validators.compose([Validators.pattern('https?[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}')])]
          })
        }

        else {
          this.profileForm = this.fb.group({  // Esto es la validación de los campos
            name: [this.user.name, Validators.compose([Validators.required])],
            surname: [this.user.surname, Validators.compose([Validators.required])],
            username: [this.user.username, Validators.compose([Validators.required, Validators.minLength(5)])],
            phone: [this.user.phone, Validators.compose([Validators.required, Validators.minLength(9), Validators.maxLength(9), Validators.pattern('[0-9]+')])],
            email: [this.user.email, Validators.compose([Validators.email])],
            password: [this.user.password, Validators.compose([Validators.minLength(5)])],
            photo: [this.user.photo, Validators.compose([Validators.pattern('https?[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}')])]
          })
        }
      },
      error => {
        this.errorListUsers = true;
      }
    );

  }

  onSubmit(profileForm) {
    this.user.name = this.profileForm.value.name;
    this.user.surname = this.profileForm.value.surname;
    this.user.username = this.profileForm.value.username;
    this.user.phone = this.profileForm.value.phone;
    this.user.email = this.profileForm.value.email;
    this.user.password = this.profileForm.value.password;

    if ((this.user.phone + '').length >= 10 || (this.user.phone + '').length < 9) {
      this.errorNumber = true;
    }
    else {
      if (this.user.phone != "") {
        this.profileService.updateUser(this.user).subscribe((res: any) => {
          this.router.navigate(['/me/']);
        }, error => {
          this.showError = true;
        });
      }
    }
  }

  changePhoto(event) {
    var elem = $(event.target.parentNode).find('span');
    var text = elem.text();
    elem.text("Uploading...");

    this.resizeAndUpload(event.target.files[0], elem, text);
  }

  private upload(file, elem, text) {
    var formData = new FormData();
    formData.append('file', file);
    $.ajax({
      url: environment.baseApi + '/image/save',
      data: formData,
      cache: false,
      contentType: false,
      processData: false,
      method: 'POST',
      type: 'POST',
      success: (data) => {
        this.user.photo = '';
        this.loginService.getPrincipal().photo = '';
        elem.text(text);
        setTimeout(() => {
          this.user.photo = '/data/image/' + this.user.id;
          this.loginService.getPrincipal().photo = '/data/image/' + this.user.id;
        }, 0);
      }
    });
  }

  private resizeAndUpload(file, elem, text) {
    var reader = new FileReader();
    reader.onloadend = () => {

      var tempImg = new Image();
      tempImg.src = reader.result;
      tempImg.onload = () => {
        var tempW = tempImg.width;
        var tempH = tempImg.height;

        var canvas = document.createElement('canvas');
        canvas.width = 128;
        canvas.height = 128;
        var ctx = canvas.getContext("2d");

        if(tempW > tempH)
          ctx.drawImage(tempImg, tempW/2-tempH/2, 0, tempH, tempH, 0, 0, 128, 128);
        else
          ctx.drawImage(tempImg, 0, tempH/2-tempW/2, tempW, tempW, 0, 0, 128, 128);

        var dataURL = canvas.toDataURL("image/png");
        console.log(dataURL);

        this.upload(file, elem, text);
      }

    }
    reader.readAsDataURL(file);
  }

  private dataURItoBlob(dataURI) {
    var blobBin = atob(dataURI.split(',')[1]);
    var array = [];
    for (var i = 0; i < blobBin.length; i++) {
      array.push(blobBin.charCodeAt(i));
    }
    var file = new Blob([new Uint8Array(array)], { type: 'image/png' });
  }

}
