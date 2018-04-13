import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationDepartmentPageComponent } from './organization-department-page.component';

describe('OrganizationDepartmentPageComponent', () => {
  let component: OrganizationDepartmentPageComponent;
  let fixture: ComponentFixture<OrganizationDepartmentPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationDepartmentPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationDepartmentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
