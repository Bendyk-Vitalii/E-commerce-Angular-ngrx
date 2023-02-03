import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Product } from '@shared/product.interface';

@Component({
  selector: 'app-product-box',
  templateUrl: './product-box.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductBoxComponent implements OnInit {
  @Input() fullWidthMode = false;
  @Input() product: Product | undefined;

  @Output() addToCart = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
  onAddToCart(): void {
    this.addToCart.emit(this.product);
  }
}
