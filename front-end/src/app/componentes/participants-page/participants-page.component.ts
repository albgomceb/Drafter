import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'participants-page',
  templateUrl: './participants-page.component.html',
  styleUrls: ['./participants-page.component.scss']
})
export class ParticipantsPageComponent implements OnInit {

  public users:Array<any>;
  constructor(private httpClient:HttpClient) { }

  ngOnInit() {
    this.users = this.fakeUsers();
    //this.getUsers();
  }

  public fakeUsers():Array<any>
  {
    let res = [];
    res.push({
      name : 'Josephina Carter',
      job:'Accounting'
    });

    res.push({
      name : 'Randall Philipa',
      job:'Registry'
    });
    return res;
  }

  /*public getUsers():Array<any>
  {
    this.httpClient.get('/users')
    .subscribe(result => {
      this.users = result;
      console.log(this.users);
    });

  }*/

}
