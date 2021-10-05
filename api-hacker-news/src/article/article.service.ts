import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Article } from './interfaces/article.interface';
import { CreateArticleDto } from './dto/create-article.dto';
import { Cron, CronExpression } from '@nestjs/schedule';
const axios = require('axios').default;

@Injectable()
export class ArticleService {
    constructor(@InjectModel('Article') private articleModel: Model<Article>){

    }

    async getArticles(): Promise<Article[]>{
        const articles = await this.articleModel.find();
        return articles;
    }

    async getArticle(articleID: string): Promise<Article>{
        const article = await this.articleModel.findById(articleID);
        return article;
    }

    async createArticle(createArticleDto: CreateArticleDto): Promise<Article>{
        const newArticle = await new this.articleModel(createArticleDto);
        return newArticle.save();
    } 

    async deleteArticle(articleID: String): Promise<Article>{
        const deletedArticle = await this.articleModel.findByIdAndDelete(articleID);
        return deletedArticle;
    }

    async makeMigration(){
        const url = "https://hn.algolia.com/api/v1/search_by_date?query=nodejs";

        try {
            const { data } = await axios.get(url);
            //console.log("data",data.hits);
            let i = 0;
            for(let item of data.hits){
                let newArticle: CreateArticleDto = {
                    title: item.title,
                    story_title: item.story_title,
                    author: item.author,
                    created_at: item.created_at,
                    url: item.url,
                    story_url: item.story_url
                }
                let exist = await this.articleModel.exists(newArticle);
                //console.log(exist);
                
                if(!exist){
                    await this.createArticle(newArticle);
                    i++;
                }
                    
            }
            console.log(`${i} registers migrated`);
            return i;
            
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log(error);
                throw error;
            }
        }      
    }

    @Cron(CronExpression.EVERY_HOUR)
    handleCron() {
        this.makeMigration();   
    }
}
