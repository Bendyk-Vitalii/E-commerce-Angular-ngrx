import { Observable, Subscription } from 'rxjs';
import { StoreService } from './../../../../services/store/store.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
})
export class FiltersComponent implements OnInit {
  @Output() showCategory = new EventEmitter<string>();
  private categoriesSubscription: Subscription | undefined;
  public categories: string[] | undefined;

  constructor(private readonly storeService: StoreService) {}

  ngOnInit(): void {
    this.getCategories();
  }

  private getCategories(): void {
    this.categoriesSubscription = this.storeService
      .getAllCategories()
      .subscribe((response) => {
        this.categories = response;
      });
  }

  onShowCategory(category: string): void {
    this.showCategory.emit(category);
  }

  ngOnDestroy(): void {
    if (this.categoriesSubscription) {
      this.categoriesSubscription.unsubscribe();
    }
  }
}
