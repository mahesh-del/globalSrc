import { Component, ViewChild } from '@angular/core';
import { ApiService } from './api.service';
import { Article, News } from './news';
import { debounceTime, filter, map, take, takeUntil } from 'rxjs';
import { FormControl } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  news!: News[];
  public articles!: Article[];
  bytopic!: News[];
  title = 'globalnews';
  searchByTopic = new FormControl;
  getByCategory = new FormControl;
  value: any = '';
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  currentPage: number = 1;
  selected = '';
  constructor(public apiService: ApiService) {}
  ngOnInit() {
    
    this.getTopHeadlines();
    this.searchByTopic.valueChanges
      .pipe(
        debounceTime(1000),
      )
      .subscribe((filterInput: string) => {
        this.getByTopic(filterInput)
        this.selected=""
      });
    if(this.selected!=null){
      this.getByCategory.valueChanges.pipe().subscribe(res => this.getByCtg(res))
    }
    
    
  }
  getByTopic(val: string) {
    this.apiService.getNewsByTopic(val).pipe(
      map((response: any) => response.articles.map((ele: any) => {
        ele.title = ele.title.substring(0, 96) + "...";
        return ele;
      }
      ))).
      subscribe(res => {
        this.articles = res
      })
  }
  getTopHeadlines()
  {
    this.apiService.getTopHeadlines().pipe(
      map((response: any) => response.articles.map((ele: any) => {
        ele.title = ele.title.substring(0, 67) + "...";
        ele.publishedAt = ele.publishedAt.substring(0, ele.publishedAt.indexOf('T'));
        return ele;
      }))
    ).subscribe(res => {
      this.articles = res
      
    })
  }

  getByCtg(val:string)
  {
    this.apiService.getByCategory(val).pipe(
      map((response: any) => response.articles.map((ele: any) => {
        ele.title = ele.title.substring(0, 96) + "...";
        return ele;
      }
      ))).
      subscribe(res => {
        this.articles = res
      });
  }
  onClear()
  {
    this.searchByTopic.reset();
    this.getTopHeadlines();
  }
}
