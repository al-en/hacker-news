import { Test, TestingModule } from '@nestjs/testing';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';

describe('ArticleController', () => {
  let articleController: ArticleController;
  let article = {
    "created_at":new Date('2021-10-01T17:06:05.000Z'),
    "title":null,
    "url":null,
    "author":"corpMaverick",
    "story_title":"Engineering Teams Are Just Networks",
    "story_url":"https://bellmar.medium.com/engineering-teams-are-just-networks-1fc16058879a",
  };

  let mockArticleService = {
    getArticles: jest.fn(() => {
      return [article]
    })
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArticleController],
      providers: [ArticleService]
    })
    .overrideProvider(ArticleService)
    .useValue(mockArticleService)
    .compile();

    articleController = module.get<ArticleController>(ArticleController);

    /* articleService = new ArticleService();
    articleController = new ArticleController(articleService); */
  });

  it('should be defined', () => {
    expect(articleController).toBeDefined();
    expect(mockArticleService).toBeDefined();
  });

  

  it('should get a list of articles', async () =>{
    const result: any[] = [article];
    let res = {
      json: function(d) {
        return result;
      },
      status: function(s){this.statusCode = s; return this;}
    }; 


    expect(await articleController.getArticles(res)).toEqual(result);

    expect(mockArticleService.getArticles).toHaveBeenCalled()
  });
});
