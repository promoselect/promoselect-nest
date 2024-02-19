import { Module } from '@nestjs/common';
import { ReplicantController } from './replicant.controller';
import { ReplicantService } from './replicant.service';
import {ColorsModule} from "../color/color.module";
import { ColorsService } from 'src/color/color.service';

@Module({
  controllers: [ReplicantController],
  providers: [ReplicantService, ColorsService],
  imports: [ColorsModule]
})
export class ReplicantModule {}
