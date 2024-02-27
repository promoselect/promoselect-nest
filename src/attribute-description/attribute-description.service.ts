import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AttributeDescription } from './attribute-description.entity';

@Injectable()
export class AttributeDescriptionService {
    constructor(
    @InjectRepository(AttributeDescription)
        private readonly attributesDescriptionRepository: Repository<AttributeDescription>,
    ) {}

    async findAll(): Promise<AttributeDescription[]> {
        return this.attributesDescriptionRepository.find();
    }

    findOne(id: number): Promise<AttributeDescription> {
        return this.attributesDescriptionRepository.findOneBy({ id: id });
    }

    async remove(id: string): Promise<void> {
        await this.attributesDescriptionRepository.delete(id);
    }
}
