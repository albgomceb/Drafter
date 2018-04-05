import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StandardMinutesPageComponent } from './standard-minutes-page.component';


describe('MinutesPageComponent', () => {
  let component: StandardMinutesPageComponent;
  let fixture: ComponentFixture<StandardMinutesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StandardMinutesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StandardMinutesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
