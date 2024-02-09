import { Module } from '@nestjs/common';
import { ReplicantController } from './replicant.controller';
import { ReplicantService } from './replicant.service';

@Module({
  controllers: [ReplicantController],
  providers: [ReplicantService]
})
export class ReplicantModule {}
