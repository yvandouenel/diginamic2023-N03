import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../products.service';
import { ProductInterface } from '../interfaces/product.interface';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-product-get',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-get.component.html',
  styleUrl: './product-get.component.css',
})
export class ProductGetComponent {
  products: ProductInterface[] = [];
  modalVisible = false;
  productToDeleteId: string = '';
  constructor(private productsService: ProductsService) {}
  ngOnInit() {
    this.productsService.loadProducts().subscribe({
      next: (products) => {
        console.log('liste des produits chargées avec succès:', products);
        this.products = products;
      },
      error: (error) => {
        console.error(
          `Erreur lors de la récupération de la liste des produits :`,
          error
        );
        // Gérez l'erreur (par exemple, affichez un message à l'utilisateur)
      },
    });
  }
  handleDeleteProduct(id: string) {
    this.modalVisible = true;
    this.productToDeleteId = id;
  }
  handleConfirmDelete(id: string) {
    this.modalVisible = false;
    this.productToDeleteId = '';
    this.productsService.deleteProduct(id).subscribe({
      next: (product) => {
        console.log('Produit supprimé avec succès:', product);
        this.products = this.products.filter((p) => p.id !== id);
      },
    });
  }
  handleCancelDelete() {
    this.modalVisible = false;
    this.productToDeleteId = '';
  }
}
