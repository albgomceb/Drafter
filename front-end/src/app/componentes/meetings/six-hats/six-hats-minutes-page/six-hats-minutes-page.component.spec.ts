import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SixHatsMinutesPageComponent } from './six-hats-minutes-page.component';

describe('SixHatsMinutesPageComponent', () => {
  let component: SixHatsMinutesPageComponent;
  let fixture: ComponentFixture<SixHatsMinutesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SixHatsMinutesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SixHatsMinutesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
