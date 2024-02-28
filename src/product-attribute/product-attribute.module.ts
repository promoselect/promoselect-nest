import { Module } from '@nestjs/common';
import { ProductAttributeService } from './product-attribute.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductAttribute } from './product-attribute.entity';

@Module({
  providers: [ProductAttributeService],
  imports: [TypeOrmModule.forFeature([ProductAttribute])],
  exports: [TypeOrmModule],
})
export class ProductAttributeModule {}
