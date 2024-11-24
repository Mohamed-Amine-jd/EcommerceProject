import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailComponentComponent } from './product-detail-component.component';

describe('ProductDetailComponentComponent', () => {
  let component: ProductDetailComponentComponent;
  let fixture: ComponentFixture<ProductDetailComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductDetailComponentComponent]
    });
    fixture = TestBed.createComponent(ProductDetailComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
