import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SixHatsMeetingComponent } from './six-hats-meeting.component';

describe('SixHatsMeetingComponent', () => {
  let component: SixHatsMeetingComponent;
  let fixture: ComponentFixture<SixHatsMeetingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SixHatsMeetingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SixHatsMeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
