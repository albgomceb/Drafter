import { TestBed, inject } from '@angular/core/testing';

import { ConclusionService } from './conclusion.service';

describe('ConclusionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConclusionService]
    });
  });

  it('should be created', inject([ConclusionService], (service: ConclusionService) => {
    expect(service).toBeTruthy();
  }));
});
