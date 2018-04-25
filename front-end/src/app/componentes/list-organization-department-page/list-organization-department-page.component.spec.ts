import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOrganizationDepartmentPageComponent } from './list-organization-department-page.component';

describe('ListOrganizationDepartmentPageComponent', () => {
  let component: ListOrganizationDepartmentPageComponent;
  let fixture: ComponentFixture<ListOrganizationDepartmentPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOrganizationDepartmentPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOrganizationDepartmentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
