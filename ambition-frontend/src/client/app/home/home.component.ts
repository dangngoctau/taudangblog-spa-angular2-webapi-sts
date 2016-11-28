import { Component, OnInit } from '@angular/core';
import { ProductService } from './index';

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
})

export class HomeComponent implements OnInit {

  newName: string = '';
  errorMessage: string;
  products: any[] = [];

  /**
   * Creates an instance of the HomeComponent with the injected
   * NameListService.
   *
   * @param {ProductService} productService - The injected ProductService.
   */
  constructor(public productService: ProductService) {}

  /**
   * Get the names OnInit
   */
  ngOnInit() {
    this.loadProducts();
  }

  /**
   * Handle the productService observable
   */
  loadProducts() {
    this.productService.loadProducts()
      .subscribe(
        products => this.products = products,
        error =>  this.errorMessage = <any>error
      );
  }

  /**
   * Pushes a new name onto the names array
   * @return {boolean} false to prevent default form submit behavior to refresh the page.
   */
  addProduct(): boolean {
    // TODO: implement nameListService.post
    this.products.push(this.newName);
    this.newName = '';
    return false;
  }

}
