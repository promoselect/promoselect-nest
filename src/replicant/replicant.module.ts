import { Module } from '@nestjs/common';
import { ReplicantController } from './replicant.controller';
import { ReplicantService } from './replicant.service';
import { ColorsModule } from '../color/color.module';
import { ColorsService } from 'src/color/color.service';
import { ProductModule } from 'src/product/product.module';
import { ProductService } from 'src/product/product.service';

@Module({
  controllers: [ReplicantController],
  providers: [ReplicantService, ColorsService, ProductService],
  imports: [ColorsModule, ProductModule],
})
export class ReplicantModule {}
