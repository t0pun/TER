import { TestBed } from '@angular/core/testing';

import { ListeentityService } from './listeentity.service';

describe('ListeentityService', () => {
  let service: ListeentityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListeentityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
