import { TestBed } from '@angular/core/testing';
import { DataSorterService } from './data-sorter.service';



describe('DataSorterService', () => {
  let service: DataSorterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataSorterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
