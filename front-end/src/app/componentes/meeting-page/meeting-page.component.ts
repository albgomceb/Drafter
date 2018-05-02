import { NgModule, Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { OrganizationService } from '../services/organization.service';
import { User } from '../models/user.model';
import { HttpErrorResponse } from '@angular/common/http';

import { Meeting } from '../models/meeting.model';
import { Option } from '../models/option.model';
import { Router } from '@angular/router';
import { Organization } from '../models/organization.model';
import { DynamicMeetingService } from '../services/dynamic-meeting.service';
import { Observable } from 'rxjs/Observable';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/filter';
import { forEach } from '@angular/router/src/utils/collection';
import { LoginService } from '../services/login.service';
import { Subject } from 'rxjs/Subject';
import { debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';

@Component({
  selector: 'meeting-page',
  templateUrl: './meeting-page.component.html',
  styleUrls: ['./meeting-page.component.scss']
})
export class MeetingPageComponent implements OnInit {

  hideme=[]
  searchField: FormControl;
  loading: boolean = false;
  exist:boolean = false;

  users: Array<User>;

  //Participantes (Visibles: solo aparecen participantes)
  thumbnail: Array<Option>;
  //Participantes (No visibles, los participantes + el lider)
  attendants: Array<Option> = [];

  organizations: Array<Organization>
  results: Observable<User[]>;
  searchTerms = new Subject<string>();

  errorListUsers:boolean = false;
  meeting: Meeting;
  kinds: Array<Option>;
  selectedKind: Option;

  constructor(private loginService: LoginService, private userService: UserService,  private meetingService:DynamicMeetingService,private organizationService: OrganizationService, private router:Router) {}
  
  ngOnInit() {

    this.meeting = new Meeting();
    this.thumbnail = new Array<Option>();
    this.meetingService.getMeetingTypes().subscribe(list => 
    {
      this.kinds = list;
      this.selectedKind = this.kinds[0];
    });

    this.userService.getUsers().subscribe(
      data => 
      {
        this.users = data;
      },
      error => {
        this.errorListUsers = true;
      }
    );

    this.organizationService.getOrganizations().subscribe(
      data => 
      {
        this.organizations = data;
      },
      error => {
        this.errorListUsers = true;
      }
    );

    //this.results = this.userService.filterUsers(''); //TODOS LOS USUARIOS
    this.results = this.searchTerms.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap((keyword: string) => this.userService.filterUsers(keyword))
    );
  } 

  search(keyword:string){   
    this.searchTerms.next(keyword);
  }

  addAttendant(attendant:User){

      //AÑADIR EL LIDER COMO PARTICIPANTE NADA MAS SE EMPIECE A CREAR LA REUNION
      let principal:User = this.getLoginService().getPrincipal();
      let principalOption = new Option(principal.id.toString(),principal.name,principal.photo,null,"LEADER",principal.username);

      var index = this.attendants.findIndex( x => x.id === principalOption.id);
      if(index == -1){
        this.attendants.push(principalOption);
      }

      //OBTENER EL USUARIO PARA AÑADIRLO COMO PARTICIPANTE
      let att = new Option(attendant.id.toString(),attendant.name,attendant.photo,null,"USER",attendant.username);

      //SI EL USUARIO NO ESTA AÑADIDO YA COMO PARTICIPANTE
      if(!this.thumbnail.find(x => x.id === att.id)){

        //SI NO ES USUARIO PRINCIPAL
        if(att.id !== principal.id.toString()){
          this.thumbnail.push(att);
          this.attendants.push(att);
        }

      }
  }

  removeAttendant(attendant:User){

    let att = new Option(attendant.id.toString(),attendant.name,attendant.photo,null,"USER",attendant.username);
    var index = this.thumbnail.findIndex( x => x.id === att.id);

    if( index != -1){
      this.thumbnail.splice(index, 1);

      var index2 = this.attendants.findIndex( x => x.id === att.id);
      if( index2 != -1)
        this.attendants.splice(index2, 1);
      
    }
    
  }

  onSubmit(meeting){
      meeting.type = this.selectedKind.id;
      this.meeting.setAttendants(this.attendants);
      this.userService.saveMeeting(meeting).subscribe((res:any) =>{
        if(meeting.type === 'standard'){
          this.router.navigate(['/agenda/'+res.id])
        }else{
          this.router.navigate(['/meeting/'+res.id])

        }
      });

  }

  public getLoginService(): LoginService {
    return this.loginService;
  }


}
