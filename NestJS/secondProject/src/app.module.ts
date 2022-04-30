import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import * as mongoose from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatsModule } from './chats/chats.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      // useCreateIndex: true,
      useUnifiedTopology: true,
      // useFindAndModify: false,
    }),
    ChatsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {
  private readonly isDev: boolean = process.env.MODE === 'dev' ? true : false;
  configure() {
    mongoose.set('debug', this.isDev);
  }
}
