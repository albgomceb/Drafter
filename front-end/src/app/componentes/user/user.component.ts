import { Component, OnInit } from '@angular/core';

import { User } from '../models/user.model';
import { UserService } from './user.service';

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  users: Array<any>;

  constructor(private userService: UserService) {

  }

  ngOnInit() {
    this.userService.getUsers().subscribe(data => {

      this.users = data;

    });
  };

}
