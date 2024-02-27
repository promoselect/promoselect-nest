import { Module } from '@nestjs/common';
import { ProductAttributeService } from './product-attribute.service';

@Module({
  providers: [ProductAttributeService]
})
export class ProductAttributeModule {}
