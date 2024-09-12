import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductTmpComponent } from './product-tmp.component';

describe('ProductTmpComponent', () => {
  let component: ProductTmpComponent;
  let fixture: ComponentFixture<ProductTmpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductTmpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductTmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
