import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { SearchProductDto } from './dto/search-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepository: ProductRepository,
  ) {}

  createProduct(createProductDto: CreateProductDto) {
    return this.productRepository.createProduct(createProductDto);
  }

  getAllProduct() {
    return this.productRepository.getAllProduct();
  }

  searchProducts(searchProductDto: SearchProductDto) {
    return this.productRepository.searchProducts(searchProductDto);
  }

  getProductById(id: number) {
    return this.productRepository.getProductById(id);
  }

  updateProduct(id: number, updateProductDto: UpdateProductDto) {
    return this.productRepository.updateProduct(id, updateProductDto);
  }

  deleteProduct(id: number) {
    return this.productRepository.deleteProduct(id);
  }
}
