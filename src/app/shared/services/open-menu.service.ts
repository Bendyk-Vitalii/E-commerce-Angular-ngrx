import { Injectable } from '@angular/core';
import { MatLegacyMenuTrigger as MatMenuTrigger } from '@angular/material/legacy-menu';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private menuTrigger!: MatMenuTrigger;

  constructor() {}

  setMenuTrigger(trigger: MatMenuTrigger) {
    this.menuTrigger = trigger;
  }

  openMenu() {
    if (this.menuTrigger) {
      this.menuTrigger.openMenu();
    }
  }
}
