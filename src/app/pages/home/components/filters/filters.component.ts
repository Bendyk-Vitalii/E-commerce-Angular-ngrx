import {
  Component,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltersComponent {
  @Output() showCategory = new EventEmitter<string>();
  @Input() categories!: ReadonlyArray<string> | null;
  constructor() {}

  onShowCategory(category: string): void {
    this.showCategory.emit(category);
  }
}
