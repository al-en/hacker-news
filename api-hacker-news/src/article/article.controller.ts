import { Controller, Get, Delete, Res, HttpStatus, Req, Post, Body, Param, NotFoundException } from '@nestjs/common';

import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';

@Controller('article')
export class ArticleController {

    constructor(private articleService: ArticleService){

    }

    @Get('/')
    async getArticles(@Res() res){
        const articles = await this.articleService.getArticles();
        return res.status(HttpStatus.OK).json({
            message: "List",
            list: articles
        })
        
    }

    @Post('/create')
    async createArticle(@Res() res, @Body() createArticleDto: CreateArticleDto){
        const article = await this.articleService.createArticle(createArticleDto);
        return res.status(HttpStatus.CREATED).json({
            message: 'Article Created',
            article: article
        })
    }

    @Delete('/delete/:articleID')
    async deleteArticle(@Res() res, @Param('articleID') articleID){
        const deletedArticle = await this.articleService.deleteArticle(articleID);
        if(!deletedArticle)
            throw new NotFoundException("Article does not exist");
        
        return res.status(HttpStatus.OK).json({
            message: `Article ${articleID} deleted`,
            deletedArticle
        });

    }

    // DELETE this endpoint
    @Post('/migrate')
    async makeMigrations(){
        try{
            let migrated = await this.articleService.makeMigration();
            return {
                message: `${migrated} registers migrated`
            }
        }
        catch(err){
            throw err;
        }
    }
}
