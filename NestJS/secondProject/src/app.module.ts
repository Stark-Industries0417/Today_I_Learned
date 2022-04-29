import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import * as mongoose from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }),
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
