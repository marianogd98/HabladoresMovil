import { TestBed } from '@angular/core/testing';

import { ApimegainsideService } from './apimegainside.service';

describe('ApimegainsideService', () => {
  let service: ApimegainsideService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApimegainsideService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
