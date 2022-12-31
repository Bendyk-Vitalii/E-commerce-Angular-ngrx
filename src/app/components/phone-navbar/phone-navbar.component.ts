import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-phone-navbar',
  templateUrl: './phone-navbar.component.html',
  styleUrls: ['./phone-navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhoneNavbarComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
