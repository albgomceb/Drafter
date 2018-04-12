import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdeaVotePageComponent } from './idea-vote-page.component';

describe('IdeaVotePageComponent', () => {
  let component: IdeaVotePageComponent;
  let fixture: ComponentFixture<IdeaVotePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdeaVotePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdeaVotePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
