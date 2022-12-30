import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Store } from '@ngrx/store';

import { selectCategories } from './../../../../store/products/products.selectors';
import { CategoriesApiActions } from './../../../../store/products/products.actions';
import { ApiService } from '../../../../services/Api.service';

import { AppStateInterface } from 'src/app/models/appState.model';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltersComponent implements OnInit {
  @Output() showCategory = new EventEmitter<string>();
  public categories$ = this.store.select(selectCategories);

  constructor(
    private readonly apiService: ApiService,
    private store: Store<AppStateInterface>
  ) {}

  ngOnInit(): void {
    this.getCategories();
    this.store.dispatch({ type: '[Products API] Retrieved Categories List' });
    this.store
      .select(selectCategories)
      .subscribe((payload) => console.dir(payload));
  }

  private getCategories(): void {
    this.apiService
      .getAllCategories()
      .subscribe((categories) =>
        this.store.dispatch(
          CategoriesApiActions.retrievedCategoriesList({ categories })
        )
      );
  }

  onShowCategory(category: string): void {
    this.showCategory.emit(category);
  }
}
