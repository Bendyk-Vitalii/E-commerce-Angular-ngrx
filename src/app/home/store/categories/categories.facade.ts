import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { CategoriesActions } from './categories.action';
import * as CategoriesSelectors from './categories.selectors';

@Injectable()
export class CategoriesFacade {
  categories$ = this.store.select(CategoriesSelectors.categoriesSelector);

  constructor(private store: Store) {}

  getCategories() {
    this.store.dispatch(CategoriesActions.categoriesListRequest());
  }
}
