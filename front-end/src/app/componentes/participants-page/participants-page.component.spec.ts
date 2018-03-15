import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantsPageComponent } from './participants-page.component';

describe('ParticipantsPageComponent', () => {
  let component: ParticipantsPageComponent;
  let fixture: ComponentFixture<ParticipantsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParticipantsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipantsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
