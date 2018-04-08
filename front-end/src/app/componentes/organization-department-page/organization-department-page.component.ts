import { Component, OnInit } from '@angular/core';
import { Option } from '../models/option.model';
import { Organization } from '../models/organization.model';
import { Department } from '../models/department.model';
import { OrganizationService } from '../services/organization.service';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'organization-department-page',
  templateUrl: './organization-department-page.component.html',
  styleUrls: ['./organization-department-page.component.scss']
})
export class OrganizationDepartmentPageComponent implements OnInit {

  addButton=[]
  removeButton=[]
  
  public users: Array<User>;
  public usersDepartment: Array<User>
  public organization: Organization;
  public departments: Array<Department>;
  public userId: number;
  public counter: number;

  errorListUsers:boolean = false;

  constructor(private userService: UserService, private organizationService: OrganizationService, 
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.userId = params['userId'];
      console.log(this.userId);
    });
    this.organization = new Organization();
    this.usersDepartment = new Array<User>();
    this.departments=[];
    this.departments.push(new Department());
    this.departments[0].id = 0;
    this.departments[0].isInput = true;
    this.departments[0].name = "";
    this.counter = 1;
    console.log(this.departments);

    // Cogemos los usuarios de la base de datos
    this.userService.getUsers().subscribe(
      data => 
      {
        this.users = data;
      },
      error => {
        this.errorListUsers = true;
      }
    );

  }

  addUser(user:User, department: Department, index: number){
    var temp = new Array<User>();
    if(department.users != null){
      for(var u of department.users){
        temp.push(u);
      }
    }
    temp.push(user);
    this.departments.splice(index, 1);
    department.users = temp;
    this.departments.push(department);
  }

  deleteUser(user: User, department: Department, index: number){
    var temp = new Array<User>();
    // Meto todos los usuarios menos el que se quiere eliminar
    for(var u of department.users){
      if(u != user){
        temp.push(u);
      }
    }
    this.departments.splice(index, 1);
    department.users = temp;
    this.departments.push(department);
  }

  saveOrganization(departments: Department[], organization: Organization){
    var temp = new Array<Department>();
    for(var a of departments){
      if(a.name && a.name.trim() != ''){
        temp.push(a);
      }
    }
    organization.departments = temp;
    // TODO Sacar el usuario logueado que hace la organización
    this.userId = 10;

    this.organizationService.saveOrganization(organization, this.userId).subscribe(res =>{
      this.router.navigate(["/organization-department/list/"+this.userId]);
    });
  }

  addDepartment(){
    var length = this.departments.length;
    this.departments.push(new Department());
    this.departments[length].id = this.counter;
    this.counter++;
    this.departments[length].isInput = true;
    this.departments[length].name = "";
    console.log(this.departments);
  } 

  removeDepartment(department : Department, departmenstIndex : number){    
    this.departments.splice(departmenstIndex, 1);
  } 

  convert(department : Department){
    //Si la actual entrada tiene longitud > 0 y además la entrada es un input, se convierte en texto
    if(this.checkNotBlank(department.name) && department.isInput)
      department.isInput = false;

    //Si la entrada es un texto, se convierte en input
    else if(!department.isInput)
      department.isInput = true;
  }

  checkNotBlank(string : String) : boolean{
    var res = true;

    if(string.trim().length == 0){
      res = false;
    }

    return res;
  }

}
