import {
  Component,
  HostListener,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Location, CommonModule } from '@angular/common';

@Component({
  selector: 'app-error-page-layout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error-page-layout.component.html',
  styleUrls: ['./error-page-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorPageLayoutComponent {
  public yAxis = '-50%';
  public xAxis = '-45%';
  public errorMessage = '';
  public buttonInnerText = '';
  constructor(private location: Location) {}
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

  @HostListener('mousemove', ['$event'])
  onMove(event: MouseEvent) {
    const innerWidth = window.innerWidth;
    const innerHeight = window.innerHeight;
    const mouseY = event.clientY;
    const mouseX = event.clientX / -innerWidth;
    this.yAxis = (((innerWidth / 2 - mouseY) / innerHeight) * 300).toString();
    this.xAxis = (-mouseX * 100 - 100).toString();
  }

  back(): void {
    this.location.back();
  }
}
