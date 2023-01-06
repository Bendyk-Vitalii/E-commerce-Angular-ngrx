import { Location } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  Inject,
} from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageNotFoundComponent {
  private innerWidth = window.innerWidth;
  private innerHeight = window.innerHeight;
  private mouseX = 0;
  private mouseY = 0;
  public yAxis = '-50%';
  public xAxis = '-45%';
  constructor(private location: Location) {}

  @HostListener('mousemove', ['$event'])
  onMove(event: MouseEvent) {
    //verticalAxis
    this.mouseY = event.clientY;
    this.yAxis = (
      ((this.innerWidth / 2 - this.mouseY) / this.innerHeight) *
      300
    ).toString();
    //horizontalAxis
    this.mouseX = event.clientX / -this.innerWidth;
    this.xAxis = (-this.mouseX * 100 - 100).toString();
  }

  back(): void {
    this.location.back();
  }
}
