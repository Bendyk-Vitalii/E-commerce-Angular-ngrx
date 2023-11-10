import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  ViewContainerRef,
  inject,
} from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { Subject, Subscription, BehaviorSubject } from 'rxjs';

import { ModalService } from '@home/services/modal.service';
import { ProductsFacade } from '@home/store/products/products.facade';
import { Product } from '@shared/interface';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
// import { AdDirective } from '@shared/directives/placeholder.directive';

@Component({
  standalone: true,
  selector: 'app-product-modal',
  imports: [CommonModule, MatIconModule],
  templateUrl: './product-modal.component.html',
})
export class ProductModalComponent implements OnInit, OnDestroy {
  private productSubject = new BehaviorSubject<Product | undefined>(undefined);
  public product$ = this.productSubject.asObservable();
  private ngUnsubscribe = new Subject();
  private routerSubscription: Subscription;
  private browserRefresh = false;
  @Output() addToCart = new EventEmitter();
 // @ViewChild(AdDirective, { static: true }) adHost!: AdDirective;
  //@Output() close = new EventEmitter<void>();
  vcr = inject(ViewContainerRef);

  constructor(
    private productsFacade: ProductsFacade,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: ModalService
  ) {
    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        console.log('refresh');
        this.modalService.toggleModal(false); // Close the modal on route change
      }
    });
  }

  ngOnInit(): void {
    this.getProduct();
    this.modalService.toggleModal(true);
  }

  private getProduct(): void {
    const productId = this.route.snapshot.paramMap.get('id');

    if (productId) {
      this.productsFacade
        .selectProductById$(parseInt(productId))
        .subscribe((product) => {
          this.productSubject.next(product);
        });
    }
  }

  public onAddToCart(): void {
    this.product$.subscribe((product) => {
      if (product) {
        this.addToCart.emit(product);
      }
    });
  }

  onClose(): void {
    this.router.navigateByUrl('/home');
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
}
