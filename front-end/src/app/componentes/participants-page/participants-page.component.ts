import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

@Component({
  selector: 'participants-page',
  templateUrl: './participants-page.component.html',
  styleUrls: ['./participants-page.component.scss']
})
export class ParticipantsPageComponent implements OnInit {

  users: Array<User>;

  constructor(private userService: UserService) {

  }

  ngOnInit() {
    this.userService.getUsers().subscribe(data => {
      console.log(data);
      this.users = data;
    });
  };

}
