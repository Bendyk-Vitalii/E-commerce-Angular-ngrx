import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '../../../../store/app.reducer';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltersComponent implements OnInit {
  @Output() showCategory = new EventEmitter<string>();
  @Input() categories!: ReadonlyArray<string> | null;
  //public categories$ = this.store.select(selectCategories);
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    //this.getCategories();
  }

  // private getCategories(): void {
  //   this.store.dispatch(ProductsApiActions.fetch());
  // }

  onShowCategory(category: string): void {
    this.showCategory.emit(category);
  }
}
