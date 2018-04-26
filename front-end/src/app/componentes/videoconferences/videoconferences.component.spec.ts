import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoconferencesComponent } from './videoconferences.component';

describe('VideoconferencesComponent', () => {
  let component: VideoconferencesComponent;
  let fixture: ComponentFixture<VideoconferencesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoconferencesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoconferencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
