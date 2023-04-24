import { TestBed } from '@angular/core/testing';

import { BookseatService } from './bookseat.service';

describe('BookseatService', () => {
  let service: BookseatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookseatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
