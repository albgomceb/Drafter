import { TestBed, inject } from '@angular/core/testing';

import { ConsService } from './cons.service';

describe('ConsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConsService]
    });
  });

  it('should be created', inject([ConsService], (service: ConsService) => {
    expect(service).toBeTruthy();
  }));
});
