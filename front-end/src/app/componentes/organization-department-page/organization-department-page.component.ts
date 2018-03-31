import { Component, OnInit } from '@angular/core';
import { Option } from '../models/option.model';
import { Organization } from '../models/organization.model';
import { Department } from '../models/department.model';
import { OrganizationService } from '../services/organization.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'organization-department-page',
  templateUrl: './organization-department-page.component.html',
  styleUrls: ['./organization-department-page.component.scss']
})
export class OrganizationDepartmentPageComponent implements OnInit {

  // TODO Añadir los atributos de la organizacion
  public departments: Array<Department>;
  public userId: number;
  public counter: number;

  constructor(private organizationService: OrganizationService, 
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.userId = params['userId'];
      console.log(this.userId);
    });
    this.departments=[];
    this.departments.push(new Department());
    this.departments[0].id = 0;
    this.departments[0].isInput = true;
    this.departments[0].name = "";
    this.counter = 1;
  }

  saveOrganization(departments: Department[], organization: Organization){
    for(var a of departments){
      if(a.name && a.name.trim() != ''){
        organization.departments.push(a);
      }
    }

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
