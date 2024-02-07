import {
  Component,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AppRouteEnum } from '@shared/enums';

@Component({
  selector: 'app-error-page-layout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error-page-layout.component.html',
  styleUrls: ['./error-page-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorPageLayoutComponent {
  public errorMessage = '';
  public buttonInnerText = '';
  constructor(private router: Router) {}
  @Input() page!: string;

  ngOnInit(): void {
    if (this.page === 'cart-empty') {
      this.errorMessage = 'You cart is empty';
      this.buttonInnerText = 'Go back to shopping';
    }

    if (this.page === 'page-not-found') {
      this.errorMessage = `It seems like we couldn't find the page you were looking for`;
      this.buttonInnerText = 'Go back';
    }
  }

  back(): void {
    this.router.navigateByUrl('/' + AppRouteEnum.home)
  }
}
