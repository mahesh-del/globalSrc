import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { Article, News } from './news';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  baseURL: string = "https://newsapi.org/v2/sources?language=en&apiKey=";
  apiKey='6e2e871e67114f05b6fef3eaa63fc19e'; // new key
  // apiKey ='660675cefef640aba608707b60d8bde6';

  news!: News[];

  getNewsByTopic(val:string): Observable<News[]>
  {
    var url = "https://newsapi.org/v2/everything?qintitle=" + encodeURIComponent(val) + "&language=en&apiKey="+this.apiKey;
    return this.http.get<News[]>(url)
  }
  getTopHeadlines(): Observable<News[]>
  {
    var topURL ="https://newsapi.org/v2/top-headlines?country=in&apiKey="+this.apiKey;
    return this.http.get<News[]>(topURL)
  }
  getByCategory(val:string){
    var url = "https://newsapi.org/v2/top-headlines?country=in&category=" + encodeURIComponent(val) + "&language=en&apiKey=" + this.apiKey;
    return this.http.get<News[]>(url)
  }
  getDummy()
  {
    return this.http.get<Article[]>("https://api.thenewsapi.com/v1/news/top?api_token=N3jhrbRG2pkqKAmjtDYX9F3T5g34hX5eU74XXrQH&locale=us&limit=3");
  }
}
