import {
  Component,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/store';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltersComponent {
  @Output() showCategory = new EventEmitter<string>();
  @Input() categories!: ReadonlyArray<string> | null;
  //public categories$ = this.store.select(selectCategories);
  constructor(private store: Store<AppState>) {}

  onShowCategory(category: string): void {
    this.showCategory.emit(category);
  }
}
