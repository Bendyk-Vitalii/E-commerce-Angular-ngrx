import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product-box',
  styleUrls: ['./product-box.component.scss'],
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
