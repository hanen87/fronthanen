import { TestBed } from '@angular/core/testing';

import { GenralDataService } from './genral-data.service';

describe('GenralDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GenralDataService = TestBed.get(GenralDataService);
    expect(service).toBeTruthy();
  });
});
