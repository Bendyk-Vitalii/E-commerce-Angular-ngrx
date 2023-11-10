import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  inject,
  ViewContainerRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '@shared/interface/product.interface';
import { ProductModalComponent } from '../product-modal/product-modal.component';

@Component({
  selector: 'app-product-box',
  templateUrl: './product-box.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductBoxComponent{
  @Input() fullWidthMode = false;
  @Input() product: Product | undefined;
  @Output() addToCart = new EventEmitter();
  vcr = inject(ViewContainerRef);

  public showDescription = false;
  public targetItemId!: number;
  
  constructor(private router: Router) {}

   public onShowModal(e: Event) {
    const target = e.target as HTMLDivElement;
    const productId = parseInt(target.id);
    const compRef = this.vcr.createComponent(ProductModalComponent);
    this.router.navigate(['/product-info', productId]);
    compRef.changeDetectorRef.detectChanges();
  }

  public onAddToCart(): void {
    this.addToCart.emit(this.product);
  }
}
