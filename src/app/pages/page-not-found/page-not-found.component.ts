import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SharedModule } from '@shared';
import { ErrorPageLayoutComponent } from '@layouts';
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
