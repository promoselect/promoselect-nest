import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColorsService } from './color.service';
import { Color } from './color.entity';
import { ColorController } from './color.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Color])],
  providers: [ColorsService],
  controllers: [ColorController],
})
export class ColorsModule {}