import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthLayoutComponent implements OnInit {
  public screenWidth!: number;
  constructor() {}

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
  }
}
