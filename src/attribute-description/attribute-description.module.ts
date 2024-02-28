import { Module } from '@nestjs/common';
import { AttributeDescriptionService } from './attribute-description.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttributeDescription } from './attribute-description.entity';

@Module({
  providers: [AttributeDescriptionService],
  imports: [TypeOrmModule.forFeature([AttributeDescription])],
  exports: [TypeOrmModule],
})
export class AttributeDescriptionModule {}
