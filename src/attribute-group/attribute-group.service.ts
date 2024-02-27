import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AttributeGroup } from './attribute-group.entity';

@Injectable()
export class AttributeGroupService {
    constructor(
    @InjectRepository(AttributeGroup)
        private readonly attributesGroupRepository: Repository<AttributeGroup>,
    ) {}

    async findAll(): Promise<AttributeGroup[]> {
        return this.attributesGroupRepository.find();
    }

    findOne(id: number): Promise<AttributeGroup> {
        return this.attributesGroupRepository.findOneBy({ id: id });
    }

    async remove(id: string): Promise<void> {
        await this.attributesGroupRepository.delete(id);
    }
}
