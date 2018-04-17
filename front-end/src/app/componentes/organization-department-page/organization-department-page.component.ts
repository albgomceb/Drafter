import { Component, OnInit } from '@angular/core';
import { Option } from '../models/option.model';
import { Organization } from '../models/organization.model';
import { Department } from '../models/department.model';
import { OrganizationService } from '../services/organization.service';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'organization-department-page',
  templateUrl: './organization-department-page.component.html',
  styleUrls: ['./organization-department-page.component.scss']
})
export class OrganizationDepartmentPageComponent implements OnInit {
  
  public notAddedUsers: Array<User>;
  public organization: Organization;
  public departments: Array<Department>;
  public userId: number;
  public counter: number;
  public organizationId: number;

  errorListUsers:boolean = false;
  errorListOrganizations = false;

  constructor(private loginService: LoginService, 
    private userService: UserService, 
    private organizationService: OrganizationService, 
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.organizationId = params['organizationId'];
    });
    if(this.organizationId == 0){
      this.organization = new Organization();
      this.notAddedUsers = new Array<User>();
      this.departments=[];
      this.departments.push(new Department());
      this.departments[0].id = 0;
      this.departments[0].isInput = true;
      this.departments[0].name = "";
      this.counter = 1;
      // Cogemos todos los usuarios de la base de datos
      this.userService.getUsers().subscribe(
        data => 
        { 
          this.notAddedUsers = data;
          this.departments[0].notAddedUsers = this.notAddedUsers;
          console.log(this.departments);
        },
        error => {
          this.errorListUsers = true;
        }
      );
    }else{
      // Cogemos la organization a editar
      this.organizationService.getOrganization(this.organizationId).subscribe(
        data => 
        {
          this.organization = data;
          this.departments = this.organization.departments;
          this.counter = this.departments.length + 1;
          // Meto los usuarios de cada departamento
          //for(var d of this.departments){
            //var ind = 0;
            //for(var u of d.users){
              //this.addUser(u, d, ind);
            //}
            //ind += 1;
          //}
        },
        error => {
          this.errorListOrganizations = true;
        }
      );
    }
    
    this.userId = this.loginService.getPrincipal().id;
  }

  addUser(user:User, department: Department, index: number){
    var notAddedU = new Array<User>();
    // Cojo los usuario no metidos en el departamento
    for(var u of department.notAddedUsers){
      if(u != user){
        // No meto el que va a entrar en el departamento
        notAddedU.push(u);
      }
    }
    // Actualizo la lista
    department.notAddedUsers = notAddedU;

    var addedU = new Array<User>();
    // Cojo los usuario metidos en el departamento
    if(department.users != null){
      for(var u of department.users){
        addedU.push(u);
      }
    }
    // Meto el nuevo usuario en la lista de los usuarios del departamento
    addedU.push(user);
    // Actualizo la lista
    department.users = addedU;

    // Actualizo el departamento completo para verlo en la vista
    let itemIndex = this.departments.findIndex(item => item.id == department.id);
    this.departments[itemIndex] = department;
  }

  deleteUser(user: User, department: Department, index: number){
    var addedU = new Array<User>();
    // Meto todos los usarios que había en el departamento menos el que se ha removido
     for(var u of department.users){
      if(u != user){
        addedU.push(u);
      }
    }
    // Actualizo la lista
    department.users = addedU;

    var notAddedU = new Array<User>();
    // Cojo los usuario no añadidos en el departamento
    if(department.notAddedUsers != null){
      for(var u of department.notAddedUsers){
        notAddedU.push(u);
      }
    }
    // En la lista de no añadidos, meto el usuario que se acaba de remover del departamento
    notAddedU.push(user);
    // Los ordeno por el id
    notAddedU.sort((a: User, b: User) => a.id < b.id ? -1 : 1) 
    // Actualizo la lista
    department.notAddedUsers = notAddedU;

    // Actualizo el departamento completo para verlo en la vista
    let itemIndex = this.departments.findIndex(item => item.id == department.id);
    this.departments[itemIndex] = department;
  }

  saveOrganization(departments: Department[], organization: Organization){
    var temp = new Array<Department>();
    for(var a of departments){
      if(a.name && a.name.trim() != ''){
        temp.push(a);
      }
    }
    organization.departments = temp;

    this.organizationService.saveOrganization(organization, this.userId).subscribe(res =>{
      this.router.navigate(["/organization-department/list/" + this.userId]);
    });
  }

  editOrganization(departments: Department[], organization: Organization){
    // TODO
    var temp = new Array<Department>();
    for(var a of departments){
      if(a.name && a.name.trim() != ''){
        temp.push(a);
      }
    }
    organization.departments = temp;

    this.organizationService.editOrganization(organization).subscribe(res =>{
      this.router.navigate(["/organization/list/" + this.userId]);
    });
  }

  addDepartment(){
    var length = this.departments.length;
    this.departments.push(new Department());
    this.departments[length].id = this.counter;
    this.counter++;
    this.departments[length].isInput = true;
    this.departments[length].name = "";
    this.departments[length].notAddedUsers = this.notAddedUsers;
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
