import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  BASE_URL = 'http://127.0.0.1:4000';


  constructor(private http: HttpClient) { }

  getArticles(){
    const articles = this.http.get(`${this.BASE_URL}/article`);
    return articles; 
  }

  deleteArticle(id:String){
    return this.http.delete(`${this.BASE_URL}/article/delete/${id}`);
  }
}
