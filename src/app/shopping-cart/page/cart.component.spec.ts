import { of } from 'rxjs';
import { provideHttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorPageLayoutComponent } from '@layouts';
import { CartComponent } from './cart.component';
import { CartFacade } from '@shopping-cart/store/cart.facade';
import { CartItem } from '@shopping-cart/interface/cart.interface';


describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CartComponent],
      imports: [ErrorPageLayoutComponent],
      providers: [
        { provide: CartFacade, useValue: { // provide a mock CartFacade object
          cartItems$: of([]),
          totalPrice$: of(0),
          totalQuantity$: of(0)
        }},
        provideHttpClient()
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize cart$, totalPrice$, and totalQuantity$', () => {
    // Assuming you have mock data for cart items
    const mockCartItems: CartItem[] = [{ product: 'sdfsf', name: 'Item 1', price: 10, quantity: 1, id: 1 }];

    const cartFacade = TestBed.inject(CartFacade);
    spyOnProperty(cartFacade, 'cartItems$').and.returnValue(of(mockCartItems));
    spyOnProperty(cartFacade, 'totalPrice$').and.returnValue(of(10));
    spyOnProperty(cartFacade, 'totalQuantity$').and.returnValue(of(1));

    fixture.detectChanges();

    component.cart$.subscribe((cartItems) => {
      expect(cartItems).toEqual(mockCartItems);
    });

    component.totalPrice$.subscribe((totalPrice) => {
      expect(totalPrice).toEqual(10);
    });

    component.totalQuantity$.subscribe((totalQuantity) => {
      expect(totalQuantity).toEqual(1);
    });
  });

  it('should render the template for an empty cart', () => {
    const cartFacade = TestBed.inject(CartFacade);
    spyOnProperty(cartFacade, 'cartItems$').and.returnValue(of([])); // empty cart
    spyOnProperty(cartFacade, 'totalPrice$').and.returnValue(of(0));
    spyOnProperty(cartFacade, 'totalQuantity$').and.returnValue(of(0));

    fixture.detectChanges();

    const emptyCartTemplate = fixture.nativeElement.querySelector('.empty-cart-template');
    const errorPageLayoutComponent = emptyCartTemplate.querySelector('app-error-page-layout');
    expect(errorPageLayoutComponent).toBeTruthy(); // Assert that the error page layout component is rendered
    expect(errorPageLayoutComponent.getAttribute('page')).toEqual('cart-empty'); // Assert that the 'page' attribute has the value 'cart-empty'
  });
});
