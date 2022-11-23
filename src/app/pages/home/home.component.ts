import { StoreService } from '../../services/store/Store.service';
import { Product } from './../../models/product.model';
import { CartService } from '../../services/Cart/Cart.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

const ROWS_HEIGHT: { [id: number]: number } = { 1: 400, 3: 335, 4: 350 };

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public cols!: number;
  public category: string | undefined;
  public rowHeight = ROWS_HEIGHT[this.cols];
  public products: Product[] | undefined;
  public sort = 'desc';
  public count = '12';
  public productsSubscription: Subscription | undefined;

  constructor(
    private cartService: CartService,
    private storeService: StoreService
  ) {}

  ngOnInit(): void {
    this.getProducts();
    this.onColumnsCountChange(3);
  }

  getProducts(): void {
    this.productsSubscription = this.storeService
      .getAllProducts(this.count, this.sort, this.category)
      .subscribe((_products) => {
        this.products = _products;
      });
  }

  onColumnsCountChange(colsNumber: number) {
    if (window.screen.width <= 360) {
      // 768px portrait
      this.cols = 1;
      this.rowHeight = ROWS_HEIGHT[this.cols];
    } else {
      this.cols = colsNumber;
      this.rowHeight = ROWS_HEIGHT[this.cols];
    }
  }

  onItemsCountChange(newCount: number): void {
    this.count = newCount.toString();
    this.getProducts();
  }

  onSortChange(newSort: string): void {
    this.sort = newSort;
    this.getProducts();
  }

  onShowCategory(newCategory: string): void {
    this.category = newCategory;
    this.getProducts();
  }

  onAddToCart(product: Product): void {
    this.cartService.addToCart({
      product: product.image,
      name: product.title,
      price: product.price,
      quantity: 1,
      id: product.id,
    });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if (this.productsSubscription) {
      this.productsSubscription.unsubscribe();
    }
  }
}
