import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly ProductRepository: Repository<Product>,
    ) {}

    async findAll(): Promise<Product[]> {
        return this.ProductRepository.find();
    }

    findOne(id: number): Promise<Product> {
        return this.ProductRepository.findOneBy({ id: id });
    }

    async remove(id: string): Promise<void> {
        await this.ProductRepository.delete(id); 
    }

    findOneBySku(sku: string): Promise<Product> {
        return this.ProductRepository.findOneBy({ sku: sku });
    }

    async getProductAttributes(id: string): Promise<Product> {
        return this.ProductRepository.findOneBy(id, { relations: ['attribute'] });
    }
}
