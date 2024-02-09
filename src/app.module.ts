import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReplicantModule } from './replicant/replicant.module';

@Module({
  imports: [ReplicantModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
