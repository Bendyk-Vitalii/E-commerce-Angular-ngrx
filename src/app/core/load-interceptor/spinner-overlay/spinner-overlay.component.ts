import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {MatLegacyProgressSpinnerModule as MatProgressSpinnerModule} from '@angular/material/legacy-progress-spinner';

@Component({
  standalone: true,
  selector: 'app-spinner-overlay',
  imports: [CommonModule, MatProgressSpinnerModule],
  template: `<mat-spinner></mat-spinner>`,


})
export class SpinnerOverlayComponent  {
}
