import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attribute } from './attribute.entity';

@Injectable()
export class AttributeService {
    constructor(
    @InjectRepository(Attribute)
        private readonly attributesRepository: Repository<Attribute>,
    ) {}

    async findAll(): Promise<Attribute[]> {
        return this.attributesRepository.find();
    }

    findOne(id: number): Promise<Attribute> {
        return this.attributesRepository.findOneBy({ id: id });
    }

    async remove(id: string): Promise<void> {
        await this.attributesRepository.delete(id);
    }
}
