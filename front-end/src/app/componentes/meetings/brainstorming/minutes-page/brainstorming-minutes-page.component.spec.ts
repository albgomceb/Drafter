import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrainStormingMinutesPageComponent } from './brainstorming-minutes-page.component';



describe('MinutesPageComponent', () => {
  let component: BrainStormingMinutesPageComponent;
  let fixture: ComponentFixture<BrainStormingMinutesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrainStormingMinutesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrainStormingMinutesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
