import { TestBed, inject } from '@angular/core/testing';

import { ProsService } from './pros.service';

describe('ProsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProsService]
    });
  });

  it('should be created', inject([ProsService], (service: ProsService) => {
    expect(service).toBeTruthy();
  }));
});