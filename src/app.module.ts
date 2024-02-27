import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReplicantModule } from './replicant/replicant.module';
import { ChatgptModule } from './chatgpt/chatgpt.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColorsModule } from './color/color.module';
import { ProductModule } from './product/product.module';
import { AttributeController } from './attribute/attribute.controller';
import { AttributeModule } from './attribute/attribute.module';
import { AttributeGroupController } from './attribute-group/attribute-group.controller';
import { AttributeGroupModule } from './attribute-group/attribute-group.module';
import { AttributeGroupDescriptionController } from './attribute-group-description/attribute-group-description.controller';
import { AttributeGroupDescriptionModule } from './attribute-group-description/attribute-group-description.module';
import { AttributeDescriptionController } from './attribute-description/attribute-description.controller';
import { AttributeDescriptionModule } from './attribute-description/attribute-description.module';
import { ProductAttributeController } from './product-attribute/product-attribute.controller';
import { ProductAttributeModule } from './product-attribute/product-attribute.module';

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
    ProductModule,
    AttributeModule,
    AttributeGroupModule,
    AttributeGroupDescriptionModule,
    AttributeDescriptionModule,
    ProductAttributeModule,
  ],
  controllers: [AppController, AttributeController, AttributeGroupController, AttributeGroupDescriptionController, AttributeDescriptionController, ProductAttributeController],
  providers: [AppService],
})
export class AppModule {}
