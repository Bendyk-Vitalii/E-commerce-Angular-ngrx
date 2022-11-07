import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-products-header',
  templateUrl: './products-header.component.html',
})
export class ProductsHeaderComponent implements OnInit {
  @Output() columnsCountChange = new EventEmitter<number>();
  public sort = 'desc';
  public itemsShowCount = 12;
  constructor() {}

  ngOnInit(): void {}

  public onSortUpdated(newSort: string): void {
    this.sort = newSort;
  }

  public onItemsUpdated(count: number): void {
    this.itemsShowCount = count;
  }

  public onColumnsUpdated(colsNumber: number): void {
    this.columnsCountChange.emit(colsNumber);
  }
}
