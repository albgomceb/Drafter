import { Component, OnInit } from '@angular/core';
import { Option } from '../models/option.model';
import { Organization } from '../models/organization.model';
import { Department } from '../models/department.model';
import { OrganizationService } from '../services/organization.service';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { LoginService } from '../services/login.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'organization-department-page',
  templateUrl: './organization-department-page.component.html',
  styleUrls: ['./organization-department-page.component.scss']
})
export class OrganizationDepartmentPageComponent implements OnInit {
  
  frmRegistro: FormGroup;

  public notAddedUsers: Array<User>;
  public departments: Array<Department>;
  public userId: number;
  public counter: number;
  public organizationId: number;
  public searchField: FormControl;

  errorListUsers:boolean = false;
  errorListOrganizations = false;

  constructor(private fb: FormBuilder,
    private loginService: LoginService, 
    private userService: UserService, 
    private organizationService: OrganizationService, 
    private activatedRoute: ActivatedRoute,
    private router: Router) {
      this.frmRegistro = this.fb.group({  // Esto es la validación de los campos
        enterprise: ['', Validators.compose([Validators.required]) ],
        description: ['', Validators.compose([Validators.required]) ],
        address: ['', Validators.compose([Validators.required]) ],
        phone: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]{9}')]) ],
        email: ['', Validators.compose([Validators.email]) ],
        logo: ['', Validators.compose([Validators.required, 
          Validators.pattern('https?[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}')]) ]
      })
     }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.organizationId = params['organizationId'];
    });
    if(this.organizationId == 0){
      this.departments=[];
      this.departments.push(new Department());
      this.departments[0].id = 0;
      this.departments[0].isInput = true;
      this.departments[0].name = "";
      this.counter = -1;
      // Cogemos todos los usuarios de la base de datos
      this.userService.getUsers().subscribe(
        data => 
        { 
          this.notAddedUsers = data;
          this.departments[0].notAddedUsers = this.notAddedUsers;
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
            // Meto los datos
            this.frmRegistro = this.fb.group({  // Esto es la validación de los campos
            enterprise: [data.enterprise, Validators.compose([Validators.required]) ],
            description: [data.description, Validators.compose([Validators.required]) ],
            address: [data.address, Validators.compose([Validators.required]) ],
            phone: [data.phone, Validators.compose([Validators.required, Validators.pattern('[0-9]{9}')]) ],
            email: [data.email, Validators.compose([Validators.email]) ],
            logo: [data.logo, Validators.compose([Validators.required, 
              Validators.pattern('https?[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}')]) ],
            id: [data.id, ],
            userId: [data.userId, ]
          })

          this.departments = data.departments;
          this.counter = -this.departments.length - 1;
          // Cogemos todos los usuarios que no están metidos para cada departamento
          this.userService.getUsers().subscribe(
            data => 
            { 
              this.notAddedUsers = data;
              var a = 0;
              for(var d of this.departments){
                var notAddedU = new Array<User>();
                for(u of this.notAddedUsers){
                  notAddedU.push(u);
                }
                
                var addedU = d.users;
                for(var u of addedU){
                  let itemIndex = notAddedU.findIndex(item => item.id == u.id);
                  notAddedU.splice(itemIndex, 1);
                }
                this.departments[a].notAddedUsers = notAddedU;
                a += 1;
              }
            },
            error => {
              this.errorListUsers = true;
            }
          );
        },
        error => {
          this.errorListOrganizations = true;
        }
      );
    }
    
    this.searchField = new FormControl();
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

  saveOrganization(departments: Department[], formGroup: FormGroup){
    var temp = new Array<Department>();
    for(var a of departments){
      if(a.name && a.name.trim() != ''){
        temp.push(a);
      }
    }
    this.frmRegistro
    var organization = new Organization();
    organization.enterprise = formGroup.value.enterprise;
    organization.description = formGroup.value.description;
    organization.address = formGroup.value.address;
    organization.phone = formGroup.value.phone;
    organization.email = formGroup.value.email;
    organization.logo = formGroup.value.logo;
    organization.id = formGroup.value.id;
    organization.userId = formGroup.value.userId;
    organization.departments = temp;

    this.organizationService.saveOrganization(organization, this.userId).subscribe(res =>{
      this.router.navigate(["/organization/list/" + this.userId]);
    });
  }

  addDepartment(){
    var length = this.departments.length;
    this.departments.push(new Department());
    this.departments[length].id = this.counter;
    this.counter--;
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

  search(department: Department){

    var scope = this

    if(this.searchField.value.length>0){
      //FILTRAR USUARIOS
      setTimeout(function(){
        scope.userService.filterUsers2(scope.searchField.value).subscribe(
          data => {
            // Elimino lo usuarios que ya tengo metidos en mi departamento
            if(department.users != null){
              for(var u of department.users){
                let index = data.findIndex(item => item.id == u.id);
                if(index >= 0)
                  data.splice(index, 1);
              }
            }
            department.notAddedUsers = data;

            // Actualizo el departamento completo para verlo en la vista
            let itemIndex = scope.departments.findIndex(item => item.id == department.id);
            scope.departments[itemIndex] = department;
          },
          error => {
            scope.errorListUsers = true;
          }
        );
      },400);

    }else{
      setTimeout(function(){
        //TODOS LOS USUARIOS
        scope.userService.filterUsers2(scope.searchField.value).subscribe(
          data => {
            // Elimino lo usuarios que ya tengo metidos en mi departamento
            if(department.users != null){
              for(var u of department.users){
                let index = data.findIndex(item => item.id == u.id);
                if(index >= 0)
                  data.splice(index, 1);
              }
            }
            department.notAddedUsers = data;

            // Actualizo el departamento completo para verlo en la vista
            let itemIndex = scope.departments.findIndex(item => item.id == department.id);
            scope.departments[itemIndex] = department;
          },
          error => {
            scope.errorListUsers = true;
          }
        );
      },400);
    }
  }

}
