import { Module } from '@nestjs/common';
import { AttributeGroupService } from './attribute-group.service';

@Module({
  providers: [AttributeGroupService]
})
export class AttributeGroupModule {}
