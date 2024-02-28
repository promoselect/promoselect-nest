import { Module } from '@nestjs/common';
import { AttributeGroupService } from './attribute-group.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {AttributeGroup} from "./attribute-group.entity";

@Module({
  providers: [AttributeGroupService],
  imports: [TypeOrmModule.forFeature([AttributeGroup])],
  exports: [TypeOrmModule]
})
export class AttributeGroupModule {}
