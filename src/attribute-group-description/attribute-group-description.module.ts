import { Module } from '@nestjs/common';
import { AttributeGroupDescriptionService } from './attribute-group-description.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttributeGroupDescription } from './attribute-group-description.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AttributeGroupDescription])],
  providers: [AttributeGroupDescriptionService],
  exports: [TypeOrmModule],
})
export class AttributeGroupDescriptionModule {}
