import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdeasProsConsComponent } from './ideas-pros-cons.component';

describe('IdeasProsConsComponent', () => {
  let component: IdeasProsConsComponent;
  let fixture: ComponentFixture<IdeasProsConsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdeasProsConsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdeasProsConsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
