import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardMeetingComponent } from './standard-meeting.component';

describe('StandardMeetingComponent', () => {
  let component: StandardMeetingComponent;
  let fixture: ComponentFixture<StandardMeetingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StandardMeetingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StandardMeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
