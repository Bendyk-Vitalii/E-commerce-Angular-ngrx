import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResponsiveService {
  private screenWidth = new BehaviorSubject<number>(window.innerWidth);

  constructor() {
    window.addEventListener('resize', () => {
      this.screenWidth.next(window.innerWidth);
    });
  }

  getScreenWidth() {
    return this.screenWidth.asObservable();
  }
}
