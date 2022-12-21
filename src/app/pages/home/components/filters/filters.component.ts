import { Observable, Subscription } from 'rxjs';
import { ApiService } from '../../../../services/Api.service';
import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltersComponent implements OnInit {
  @Output() showCategory = new EventEmitter<string>();
  private categoriesSubscription: Subscription | undefined;
  public categories$!: Observable<string[]>;

  constructor(private readonly apiService: ApiService) {}

  ngOnInit(): void {
    this.getCategories();
  }

  private getCategories(): void {
    this.categories$ = this.apiService
      .getAllCategories()
      .pipe((_categories) => {
        return _categories;
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
