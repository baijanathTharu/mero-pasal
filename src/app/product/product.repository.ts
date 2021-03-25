import { BadRequestException, NotFoundException } from '@nestjs/common';
import { DeleteResult, EntityRepository, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { SearchProductDto } from './dto/search-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const { name, description } = createProductDto;

    const product = new Product();
    product.name = name;
    product.description = description;

    await product.save();
    return product;
  }

  async getAllProducts(): Promise<Product[]> {
    const query = this.createQueryBuilder();

    const products = await query.getMany();
    return products;
  }

  async getProductById(id: number): Promise<Product> {
    const product = await this.findOne(id);
    if (!product) {
      throw new NotFoundException(`Product with id '${id}' not found`);
    }
    return product;
  }

  async searchProducts(searchProductDto: SearchProductDto): Promise<Product[]> {
    const { search } = searchProductDto;
    const query = this.createQueryBuilder('product');

    if (search) {
      query.andWhere(
        'product.name LIKE :search OR product.description LIKE :search',
        { search: `%${search}%` },
      );
    }

    const products = await query.getMany();
    return products;
  }

  async updateProduct(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const { name, description } = updateProductDto;
    const product = await this.getProductById(id);
    if (name) {
      product.name = name;
    }
    if (description) {
      product.description = description;
    }
    await product.save();
    return product;
  }

  async deleteProduct(id: number): Promise<DeleteResult> {
    const deleted = await this.delete({ id });
    if (!deleted.affected) {
      throw new BadRequestException(`Product with id '${id}' not available`);
    }
    return deleted;
  }
}
