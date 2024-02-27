import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AttributeGroupDescription } from './attribute-group-description.entity';

@Injectable()
export class AttributeGroupDescriptionService {
    constructor(
    @InjectRepository(AttributeGroupDescription)
        private readonly attributesGroupDescriptionRepository: Repository<AttributeGroupDescription>,
    ) {}

    async findAll(): Promise<AttributeGroupDescription[]> {
        return this.attributesGroupDescriptionRepository.find();
    }

    findOne(id: number): Promise<AttributeGroupDescription> {
        return this.attributesGroupDescriptionRepository.findOneBy({ id: id });
    }

    async remove(id: string): Promise<void> {
        await this.attributesGroupDescriptionRepository.delete(id);
    }
}
