import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductAttribute } from './product-attribute.entity';

@Injectable()
export class ProductAttributeService {
    constructor(
    @InjectRepository(ProductAttribute)
        private readonly productsAttirubteRepository: Repository<ProductAttribute>,
    ) {}

    async findAll(): Promise<ProductAttribute[]> {
        return this.productsAttirubteRepository.find();
    }

    findOne(id: number): Promise<ProductAttribute> {
        return this.productsAttirubteRepository.findOneBy({ id: id });
    }

    async remove(id: string): Promise<void> {
        await this.productsAttirubteRepository.delete(id);
    }
}
