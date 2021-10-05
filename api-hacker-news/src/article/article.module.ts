import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { MongooseModule } from '@nestjs/mongoose'
import { ArticleSchema } from './schemas/article.schema'
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports:[
    MongooseModule.forFeature([
      {name: 'Article', schema: ArticleSchema}
    ]),
    ScheduleModule.forRoot()
  ],
  controllers: [ArticleController],
  providers: [ArticleService]
})
export class ArticleModule {}
