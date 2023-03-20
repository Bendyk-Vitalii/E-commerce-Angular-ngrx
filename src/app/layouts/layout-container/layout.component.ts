import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-layout-container',
  templateUrl: './layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutContainerComponent {

}
