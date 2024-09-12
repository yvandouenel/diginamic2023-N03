import { Injectable } from '@angular/core';
import {
  NewProductInterface,
  PatchProductInterface,
  ProductInterface,
} from './interfaces/product.interface';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, catchError, throwError, of } from 'rxjs';

import { Offlinequeue } from './offlinequeue.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  static url = 'http://localhost:3000/products';

  constructor(private http: HttpClient, private offlineQueue: Offlinequeue) {}

  addProduct(
    product: NewProductInterface
  ): Observable<ProductInterface | null> {
    console.log(`Dans addProduct de ProductsService`, product);

    if (navigator.onLine) {
      console.log(`Navigateur en ligne dans addProduct`);
      this.offlineQueue.processQueue();
      return this.http
        .post<ProductInterface>(ProductsService.url, product)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            console.error(`Erreur lors de l'ajout du produit:`, error);
            return of(null);
          })
        );
    } else {
      console.log(`Navigateur hors ligne`);
      // Ajouter à la file d'attente hors ligne
      this.offlineQueue.addToQueue(ProductsService.url, 'POST', product);
      // Retourner un Observable avec un produit simulé (sans id)
      return of({
        ...product,
        id: 'Tmp-' + Date.now().toString(),
      } as ProductInterface);
    }
  }

  loadProducts(): Observable<ProductInterface[]> {
    if (navigator.onLine) {
      console.log(
        `Navigateur en ligne dans loadProducts : appel de processQueue`
      );
      this.offlineQueue.processQueue();
    }
    console.log(`Dans loadProduct de ProductsService`);
    return this.http.get<ProductInterface[]>(ProductsService.url);
  }

  loadOneProduct(id: string): Observable<ProductInterface> {
    console.log(`Dans loadOneProduct de ProductsService`);

    return this.http.get<ProductInterface>(`${ProductsService.url}/${id}`);
  }

  patchProduct(
    id: string,
    partialProduct: PatchProductInterface
  ): Observable<ProductInterface> {
    console.log(`Dans patchProduct de ProductsService`);
    return this.http.patch<ProductInterface>(
      `${ProductsService.url}/${id}`,
      partialProduct
    );
  }
  deleteProduct(id: string): Observable<ProductInterface> {
    console.log(`Dans deleteProduct de ProductsService`);

    return this.http.delete<ProductInterface>(`${ProductsService.url}/${id}`);
  }
}
