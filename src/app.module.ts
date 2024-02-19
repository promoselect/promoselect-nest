import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReplicantModule } from './replicant/replicant.module';
import { ChatgptModule } from './chatgpt/chatgpt.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColorsModule } from './color/color.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true,
    }),
    ReplicantModule,
    ChatgptModule,
    ColorsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
