import { TestBed } from '@angular/core/testing';

import { DesignChangeService } from './design-change.service';

describe('DesignChangeService', () => {
  let service: DesignChangeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DesignChangeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
