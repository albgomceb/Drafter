import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMeetingPageComponent } from './list-meeting-page.component';

describe('ListMeetingPageComponent', () => {
  let component: ListMeetingPageComponent;
  let fixture: ComponentFixture<ListMeetingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListMeetingPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMeetingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
