import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MinutesPageComponent } from './minutes-page.component';

describe('MinutesPageComponent', () => {
  let component: MinutesPageComponent;
  let fixture: ComponentFixture<MinutesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinutesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinutesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
