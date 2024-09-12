import { Routes } from '@angular/router';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductGetComponent } from './product-get/product-get.component';
import { NewsletterComponent } from './newsletter/newsletter.component';
import { ProductTmpComponent } from './product-tmp/product-tmp.component';

export const routes: Routes = [
  { path: 'add', component: ProductAddComponent },
  { path: 'edit/:id', component: ProductEditComponent },
  { path: 'get', component: ProductGetComponent },
  { path: 'newsletter', component: NewsletterComponent },
  { path: 'tmp', component: ProductTmpComponent },
];
