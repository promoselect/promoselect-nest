import { Module } from '@nestjs/common';
import { AttributeGroupDescriptionService } from './attribute-group-description.service';

@Module({
  providers: [AttributeGroupDescriptionService]
})
export class AttributeGroupDescriptionModule {}
