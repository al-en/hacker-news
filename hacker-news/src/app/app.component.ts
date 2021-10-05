import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from './interfaces/article';
import { ArticleService } from './services/article.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'hacker-news';
  articles:Article[];

  constructor(private articleService: ArticleService,
              private router: Router){
    this.articles = [];
    this.articleService.getArticles().subscribe((res:any) =>{
      console.log(res);
      this.articles = res.list.filter((e:Article) => {
        if(!e.story_title && !e.title) return false;
        return true;
      });
      this.articles.sort((a,b) =>{
        let a_date = new Date(a.created_at);
        let b_date = new Date(b.created_at);
        
        return b_date.getTime() - a_date.getTime();
      } )
    });
  }

  goToURL(article:Article){
    if(article.story_url || article.url){
      //this.router.navigateByUrl(article.story_url);
      let url = article.story_url ? article.story_url : article.url;
      window.open(article.story_url ? article.story_url : article.url);
    }
    else{
      console.log("Does not have url");
      
    }
  }

  hasUrl(article:Article){
    if(article.story_url || article.url) return true;
    return false;
  }

  deleteArticle(id:String,event:Event){
    event.stopPropagation();
    if(confirm("Are you sure to delete this item?")) {
      this.articleService.deleteArticle(id).subscribe(res=>{
        console.log("Deleted",res);

        this.articles = this.articles.filter(el =>{        
          return el._id != id;
        });      
      });
    }
  }

}
