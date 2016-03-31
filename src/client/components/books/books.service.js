'use strict';

import {Injectable} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class BooksService{
  constructor(http){
    this.http = http;
    this.url = '/mock/books';
  }

  static get parameters(){
    return [[Http]];
  }

  ngOnInit(){

  }

  getList(){
    return this.http.get(this.url)
                    .map( res => res.json() )
                    .do( data => console.dir(data) )
                    .catch(this.handleError);
  }

  handleError(err){
    console.error(err);
    return Observable.throw(error.json().error || 'Error in BooksService');
  }
}
