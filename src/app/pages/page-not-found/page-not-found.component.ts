import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ErrorPageLayoutComponent } from '@components/error-page-layout/error-page-layout.component';
import { SharedModule } from '@shared';

@Component({
  standalone: true,
  selector: 'app-page-not-found',
  template: `
    <app-error-page-layout [page]="'page-not-found'"></app-error-page-layout>
  `,
  imports: [SharedModule, ErrorPageLayoutComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageNotFoundComponent {}
