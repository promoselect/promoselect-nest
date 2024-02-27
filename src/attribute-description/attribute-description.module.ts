import { Module } from '@nestjs/common';
import { AttributeDescriptionService } from './attribute-description.service';

@Module({
  providers: [AttributeDescriptionService]
})
export class AttributeDescriptionModule {}
