import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Color } from './color.entity';

@Injectable()
export class ColorsService {
  constructor(
    @InjectRepository(Color)
    private readonly colorsRepository: Repository<Color>,
  ) {}

  async findAll(): Promise<Color[]> {
    return this.colorsRepository.find();
  }

  findOne(id: number): Promise<Color> {
    return this.colorsRepository.findOneBy({ id: id });
  }

  async remove(id: string): Promise<void> {
    await this.colorsRepository.delete(id);
  }
}
