import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReplicantModule } from './replicant/replicant.module';
import { ChatgptModule } from './chatgpt/chatgpt.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Color } from './color/color.entity';
import { ColorsModule } from './color/color.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'promoselect_symfony',
      entities: [Color],
      synchronize: true,
    }),
    ReplicantModule, 
    ChatgptModule,
    ColorsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
