import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { map, Observable } from 'rxjs';


export enum selectedSortOption {
LowHigh = 'price-low-high',
HighLow = 'price-high-low'
}

@Component({
  selector: 'app-products-header',
  templateUrl: './products-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsHeaderComponent {
  @Output() columnsCountChange = new EventEmitter<number>();
  @Output() itemsCountChange = new EventEmitter<number>();
  @Output() sortChange = new EventEmitter<string>();
  @Output() sortByPrice = new EventEmitter<string>();

  public selectedSortOptions!: selectedSortOption;
  public sort = 'desc';
  public itemsShowCount = 12;
  constructor(private breakpointObserver: BreakpointObserver) {}

  isSmallScreen$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Large)
    .pipe(map((result) => result.matches));

  public onSortByPrice(sortBy: string) {
    this.sortByPrice.emit(sortBy);
  }

  public onSortUpdated(newSort: string): void {
    this.sort = newSort;
    this.sortChange.emit(newSort);
  }

  public onItemsUpdated(count: number): void {
    this.itemsShowCount = count;
    this.itemsCountChange.emit(count);
  }

  public onColumnsUpdated(colsNumber: number): void {
    this.columnsCountChange.emit(colsNumber);
  }
}
