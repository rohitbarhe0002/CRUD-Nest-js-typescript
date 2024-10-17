import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemsModule } from './Items/items.module';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/nestjs-crud'), 
    ItemsModule,
  ],
})
export class AppModule {}
