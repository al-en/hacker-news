import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleModule } from './article/article.module';
import { MongooseModule } from '@nestjs/mongoose'

@Module({
  imports: [
    ArticleModule,
    MongooseModule.forRoot("mongodb://mongo/hacker-news")
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
