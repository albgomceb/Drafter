import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdeasCreateComponent } from './ideas-create.component';

describe('IdeasCreateComponent', () => {
  let component: IdeasCreateComponent;
  let fixture: ComponentFixture<IdeasCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdeasCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdeasCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
